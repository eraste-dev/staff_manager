<?php

namespace App\Http\Controllers;

use App\Http\Resources\RequestResource;
use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\RequestModel;
use App\Services\ProudctPaginationService;
use App\Services\ResponseService;
use App\Utils\Utils;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class RequestBookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function get(Request $request)
    {
        $all = RequestResource::collection(RequestModel::all());
        return ResponseService::success(
            $all, //RequestModel::all(), // $all,
            Response::HTTP_OK,
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'nullable|integer|exists:request,id',
            // 'nomemp' => 'nullable|string',
            // 'premp' => 'nullable|string',
            // 'matemp' => 'nullable|string',
            // 'foncemp' => 'nullable|string',
            // 'email' => 'nullable|email',
            'user_id' => 'required|integer|exists:users,id',
            'mission' => 'nullable|string',
            'location' => 'nullable|string',
            'desciption' => 'nullable|string',
            'object' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return ResponseService::error(
                "Erreur d'enregistrement : " . implode(', ', $validator->errors()->all()),
                422,
                $validator->errors()
            );
        }

        // Enregistrer les données dans la base de données
        $validatedData = $validator->validated();

        if (isset($validatedData['id'])) {
            // ? UPDATE
            $demande = RequestModel::find($validatedData['id']);
            $demande->status = $validatedData['status'] ?? $demande->status;
            $demande->updated_by = auth()->user()->id;
            $demande->update($validatedData);
        } else {
            // ? CREATION
            $demande = new RequestModel();
            $demande->fill($validatedData);
            $demande->status = 'PENDING';
            $demande->save();
        }

        return ResponseService::success($demande->refresh(), "Store successfully");
    }
}
