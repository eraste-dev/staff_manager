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
        $startDate = $this->startDate != null ? Carbon::createFromTimestampMs($this->startDate) : null;
        $endDate = $this->endDate != null ? Carbon::createFromTimestampMs($this->endDate) : null;

        return [
            'id' => $this->id,
            'mission' => $this->mission,
            'location' => $this->location,
            'desciption' => $this->desciption,
            'object' => $this->object,
            'status' => $this->status,
            'request_type' => $this->request_type,
            'start_date_timestamp' => $this->startDate,
            'end_date_timestamp' => $this->endDate,
            'startDate' => isset($startDate) ? $startDate->format('d/m/Y à H:i') : null,
            'endDate' => isset($endDate) ? $endDate->format('d/m/Y à H:i') : null,
            'motif' => $this->motif,
            'reject_reason' => $this->reject_reason,
            'user' => $this->getUseResource(),
            'updated_by' => $this->getUpdatedBy(),
            'created_at' => Carbon::parse($this->created_at)->format('d/m/Y H:i'),
            'updated_at' => Carbon::parse($this->updated_at)->diffForHumans(),
        ];
    }
}



// 'href' => 'request/' . $this->id,
// 'nomemp' => $this->nomemp,
// 'premp' => $this->premp,
// 'matemp' => $this->matemp,
// 'foncemp' => $this->foncemp,
// 'email' => $this->email,