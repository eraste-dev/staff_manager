<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\NotificationService;
use App\Services\ResponseService;
use App\Utils\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Handle user login
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('matemp', 'password');
        if (!$token = JWTAuth::attempt($credentials)) {
            return ResponseService::error(__('auth.unauthorized'), 401);
        }

        $user = new UserResource(User::where('matemp', $request->matemp)->firstOrFail());
        $expire = time() + JWTAuth::factory()->getTTL() * 60;

        return ResponseService::success(compact('token', 'user', 'expire'));
    }

    /**
     * Handle user registration
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // Validation des données saisies
        $validator = Validator::make($request->all(), [
            'nomemp' => 'required|string|max:255',
            'premp' => 'required|string|max:255',
            'matemp' => 'required|string|max:255|unique:users',
            'foncemp' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'status' => 'nullable|string|in:ACTIVE,INACTIVE,DELETED,REJECTED,PENDING,BLOCKED',
            'type' => 'nullable|string|EMPLOYEE,ADMIN',
        ]);

        // Si la validation échoue, renvoyer les erreurs
        if ($validator->fails()) {
            return ResponseService::error('Erreur de saisie', 422, $validator->errors());
        }

        // Création d'un nouvel utilisateur
        $user = User::create([
            'nomemp' => $request->nomemp,
            'premp' => $request->premp,
            'matemp' => $request->matemp,
            'foncemp' => $request->foncemp,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'status' => $request->status ? $request->status : 'ACTIVE',
            'type' => $request->type ? $request->type : 'EMPLOYEE',
        ]);

        // send notification
        try {
            NotificationService::notify(
                $user,
                'Merci de vous être inscrit',
                'Merci de faire confiance à SOCIBA, vous pouvez publier votre première annonce',
                [
                    'title' => 'Nouvel utilisateur',
                    'message' => 'Nouvel utilisateur enregisté : ' . $user->nomemp . ' ' . $user->premp,
                ]
            );
        } catch (\Throwable $th) {
            //throw $th;
        }

        // Générer le token JWT pour l'utilisateur nouvellement enregistré
        $token = JWTAuth::fromUser($user);
        $user = new UserResource($user);
        $expire = time() + JWTAuth::factory()->getTTL() * 60;

        return ResponseService::success(compact('token', 'user', 'expire'), 'Successfully registered and logged in');
    }

    /**
     * Handle user logout
     *
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {
        try {
            $token = JWTAuth::getToken(); // Obtiens le token JWT actuel
            JWTAuth::invalidate($token); // Invalide le token, l'ajoutant à la liste noire
        } catch (\Throwable $th) {
            return ResponseService::success('Successfully logged out, token invalid');
        }

        return ResponseService::success('Successfully logged out');
    }

    public function updateUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|exists:users,id',
            'nomemp' => 'nullable|string|max:255',
            'premp' => 'nullable|string|max:255',
            'matemp' => 'nullable|string|max:255',
            'foncemp' => 'nullable|string|max:255',
            'password' => 'nullable|string',
            'type' => 'nullable|string|in:EMPLOYEE,ADMIN',
            'status' => 'nullable|string|in:ACTIVE,INACTIVE,DELETED,REJECTED,PENDING,BLOCKED',
            'avatar' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return ResponseService::error('Erreur de mise à jour', 422, $validator->errors());
        }

        try {
            $user = User::findOrFail($request->id);

            $user->fill($request->only([
                'nomemp', 'premp', 'matemp', 'foncemp', 'type', 'status',
            ]));

            if ($request->filled('password')) {
                $user->password = Hash::make($request->password);
            }

            if ($request->hasFile('avatar')) {
                if ($user->avatar) {
                    Storage::disk('public')->delete($user->avatar);
                }
                $user->avatar = $request->file('avatar')->store('avatars', 'public');
            }

            $user->save();

            return ResponseService::success(new UserResource($user), 'Successfully updated');
        } catch (\Throwable $th) {
            return ResponseService::error('Failed to update');
        }
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|exists:users,id',
        ]);

        if ($validator->fails()) {
            return ResponseService::error(
                "Utilisateur introuvale : " . implode(', ', $validator->errors()->all()),
                404,
                $validator->errors()
            );
        }

        // Enregistrer les données dans la base de données
        $validatedData = $validator->validated();

        if (isset($validatedData['id'])) {
            $demande = User::find($validatedData['id']);
            $demande->status = Utils::STATE_DELETED();
            // $demande->updated_by = auth()->user()->id;
            $demande->update($validatedData);
        }

        return ResponseService::success([], "Suppression effectuée avec succès");
    }

    /**
     * Envoie un lien de réinitialisation de mot de passe à l'utilisateur.
     */
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email|exists:users,email']);

        $status = Password::sendResetLink($request->only('email'));

        if ($status == Password::RESET_LINK_SENT) {
            return ResponseService::success([], __($status));
        }

        return ResponseService::error(__($status), 500);
    }

    /**
     * Réinitialise le mot de passe de l'utilisateur.
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return ResponseService::success([], __($status));
        }

        return ResponseService::error(__($status), 500);
    }

    /**
     * Change le mot de passe de l'utilisateur authentifié.
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        $user = Auth::user();

        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Current password is incorrect'],
            ]);
        }

        $user->password = Hash::make($request->new_password);
        // $user->save(); // TODO : fix

        return ResponseService::success([], 'Password changed successfully');
    }
}
