<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->id();

            // $table->string('nomemp')->nullable();
            // $table->string('premp')->nullable();
            // $table->string('matemp')->nullable();
            // $table->string('foncemp')->nullable();
            // $table->string('email')->nullable();
            $table->string('mission')->nullable();
            $table->string('location')->nullable();
            $table->string('desciption')->nullable();
            $table->string('object')->nullable();
            $table->integer('user_id')->nullable();
            $table->integer('updated_by')->nullable();
            $table->enum('status', ['ACTIVE', 'INACTIVE', 'DELETED', 'REJECTED', 'PENDING', 'BLOCKED'])->default('ACTIVE');
            $table->enum('request_type', ['MISSION_REQUEST',])->default('MISSION_REQUEST');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};
