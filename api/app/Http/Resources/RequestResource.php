<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class RequestResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray($request): array
    {
        return [
            // 'href' => 'request/' . $this->id,
            // 'nomemp' => $this->nomemp,
            // 'premp' => $this->premp,
            // 'matemp' => $this->matemp,
            // 'foncemp' => $this->foncemp,
            // 'email' => $this->email,

            'mission' => $this->mission,
            'location' => $this->location,
            'desciption' => $this->desciption,
            'object' => $this->object,
            'user' => $this->getUseResource(),
            'updated_by' => $this->getUpdatedBy(),
            'created_at' => Carbon::parse($this->created_at)->format('d/m/Y H:i'),
            'updated_at' => Carbon::parse($this->updated_at)->format('d/m/Y H:i'),
        ];
    }
}
