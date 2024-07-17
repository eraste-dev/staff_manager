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
            'foncemp' => 'ADMINISTRATEUR',
            'avatar' => '/images/users/avatars/logo-sociba-400xauto.png',
            'remember_token' => null,
            'type' => 'ADMIN', // 'EMPLOYEE'
            'status' => 'ACTIVE',
        ]);


        User::create([
            'nomemp' => 'Dja',
            'premp' => 'Marc',
            'email' => 'dja_marc@staff_manager.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'matemp' => 'DJA056669',
            'foncemp' => 'Monteur vidéo',
            'remember_token' => null,
            'type' => 'EMPLOYEE', // 'EMPLOYEE'
            'status' => 'ACTIVE',
        ]);

        User::create([
            'nomemp' => 'Dupont',
            'premp' => 'Jean',
            "foncemp" => "Transitaire",
            'email' => 'dupont_jean@staff_manager.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'matemp' => 'DUP123456',
            'remember_token' => null,
            'type' => 'EMPLOYEE',
            'status' => 'ACTIVE',
        ]);

        User::create([
            'nomemp' => 'Smith',
            'premp' => 'Emma',
            "foncemp" => "Gestionnaire",
            'email' => 'smith_emma@staff_manager.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'matemp' => 'SMI789012',
            'remember_token' => null,
            'type' => 'EMPLOYEE',
            'status' => 'ACTIVE',
        ]);

        User::create([
            'nomemp' => 'Garcia',
            'premp' => 'Maria',
            "foncemp" => "Manager",
            'email' => 'garcia_maria@staff_manager.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'matemp' => 'GAR345678',
            'remember_token' => null,
            'type' => 'EMPLOYEE',
            'status' => 'ACTIVE',
        ]);

        User::create([
            'nomemp' => 'Lee',
            'premp' => 'David',
            "foncemp" => "Chef de projet",
            'email' => 'lee_david@staff_manager.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'matemp' => 'LEE901234',
            'remember_token' => null,
            'type' => 'EMPLOYEE',
            'status' => 'ACTIVE',
        ]);

        User::create([
            'nomemp' => 'Johnson',
            'premp' => 'Emily',
            "foncemp" => "Cassier",
            'email' => 'johnson_emily@staff_manager.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'matemp' => 'JOH567890',
            'remember_token' => null,
            'type' => 'EMPLOYEE',
            'status' => 'ACTIVE',
        ]);
    }
}
