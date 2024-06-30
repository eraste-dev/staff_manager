<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'nomemp' => 'Admin',
            'premp' => '',
            'email' => 'admin@staff_manager.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'matemp' => 'ADMIN',
            'foncemp' => '',
            'avatar' => '/images/users/avatars/logo-sociba-400xauto.png',
            'remember_token' => null,
            'type' => 'EMPLOYEE',
            'status' => 'ACTIVE',
        ]);
    }
}
