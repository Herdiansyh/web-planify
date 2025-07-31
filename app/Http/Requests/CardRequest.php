<?php

namespace App\Http\Requests;

use App\Enums\CardPriority;
use App\Enums\CardStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class CardRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'title' => ['required', 'string','max:255'],   
            'description' => ['nullable','string',],
            'deadline' => ['nullable', 'date'],
            'status' => ['required', new Enum(CardStatus::class)],
            'priority' => ['required', new Enum (CardPriority::class)],
        ];
    }

    public function attributes(): array
    {
        return [
            'title' => 'Judul',
            'description' => 'Deskripsi',
            'deadline' => 'Deadline',
            'status' => 'Status',
            'priority' => 'Prioritas',
        ];
    }
}
