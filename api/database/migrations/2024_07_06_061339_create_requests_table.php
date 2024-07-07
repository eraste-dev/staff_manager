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
            $table->text('mission')->nullable();
            $table->string('location')->nullable();
            $table->text('desciption')->nullable();
            $table->text('object')->nullable();
            $table->integer('user_id')->nullable();
            $table->integer('updated_by')->nullable();

            $table->string('startDate')->nullable();
            $table->string('endDate')->nullable();
            $table->text('motif')->nullable();
            $table->text('reject_reason')->nullable();

            $table->enum('status', ['ACTIVE', 'INACTIVE', 'DELETED', 'REJECTED', 'PENDING', 'BLOCKED'])->default('ACTIVE');
            // MISSION_REQUEST
            // ABSENCE_REQUEST
            // CONGES_REQUEST
            // REQUEST_FOR_EXPRESSION_OF_NEEDS
            // REQUEST_FOR_TELEPHONE_CREDIT_EXTENSION
            // REQUEST_FOR_CREDIT_ON_XEROX_MULTIFUNCTION_UNITS
            // MATERIALS_REQUEST
            // REQUEST_FOR_RETURN_TO_SERVICE
            // VEHICLE_EXIT_REQUEST
            // REQUEST_FOR_ON_CALL_TIME

            $table->enum('request_type', [
                'MISSION_REQUEST',
                'ABSENCE_REQUEST',
                'CONGES_REQUEST',
                'REQUEST_FOR_EXPRESSION_OF_NEEDS',
                'REQUEST_FOR_TELEPHONE_CREDIT_EXTENSION',
                'REQUEST_FOR_CREDIT_ON_XEROX_MULTIFUNCTION_UNITS',
                'MATERIALS_REQUEST',
                'REQUEST_FOR_RETURN_TO_SERVICE',
                'VEHICLE_EXIT_REQUEST',
                'REQUEST_FOR_ON_CALL_TIME',
            ])->default('MISSION_REQUEST');

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
