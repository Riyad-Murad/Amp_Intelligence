<?php

namespace App\Http\Requests\Provider;

use App\Traits\ResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class ProviderRequestLine extends FormRequest
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
            'masterId'   => 'required|string',
            'voltageL1'  => 'required|numeric',
            'voltageL2'  => 'required|numeric',
            'voltageL3'  => 'required|numeric',
            'powerL1'    => 'required|numeric',
            'powerL2'    => 'required|numeric',
            'powerL3'    => 'required|numeric',
        ];
    }
}
