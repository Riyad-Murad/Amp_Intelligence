<?php

namespace App\Http\Requests\Client;

use App\Traits\ResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class ClientRequestMetric extends FormRequest
{
    use ResponseTrait;
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
            'masterId' => 'required|string',
            'modbusId' => 'required|string',
            'voltage'  => 'required|numeric',
            'current'  => 'required|numeric',
            'power'    => 'required|numeric',
            'energy'   => 'required|numeric',
        ];
    }
}
