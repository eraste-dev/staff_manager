<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\ResponseService;
use App\Utils\Utils;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function listUsers()
    {
        return ResponseService::success(
            UserResource::collection(User::whereNotIn('status', [Utils::STATE_DELETED()])->get()),
            'users retrieved successfully'
        );
    }
}
