<?php

namespace App\Models;

use App\Http\Resources\UserResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestModel extends Model
{
    use HasFactory;

    protected $table = 'requests';

    protected $guarded = ['id'];

    protected $fillable = [
        // 'nomemp',
        // 'premp',
        // 'matemp',
        // 'foncemp',
        // 'email',

        'mission',
        'location',
        'desciption',
        'object',
        'user_id',

        'startDate',
        'endDate',
        'motif',
    ];

    /**
     * Get the user that owns the request.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Retrieves the resource associated with the user ID stored in the model.
     *
     * @return \App\Http\Resources\UserResource|null The UserResource object if the user is found, null otherwise.
     */
    public function getUseResource()
    {
        $user = User::find($this->user_id);
        if ($user) {
            return new UserResource($user);
        } else {
            return null;
        }
    }

    /**
     * Retrieves the user associated with the updated_by field of the current instance.
     *
     * @return UserResource|null The UserResource object if the user is found, null otherwise.
     */
    public function getUpdatedBy()
    {
        $user = User::find($this->updated_by);
        if ($user != null) {
            return new UserResource($user);
        } else {
            return null;
        }
    }
}
