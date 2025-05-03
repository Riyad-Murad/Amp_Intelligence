<?php

namespace App\Http\Requests\Client;

use App\Traits\ResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class ClientRequestCheckin extends FormRequest
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
            'master_id' => 'required|integer|exists:masters,id',
            'modbus_id' => 'required|integer',
        ];
    }
}
