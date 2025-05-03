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
            'master_id'   => 'required|integer|exists:masters,id',
            'voltage_l1'  => 'required|numeric',
            'voltage_l2'  => 'required|numeric',
            'voltage_l3'  => 'required|numeric',
            'power_l1'    => 'required|numeric',
            'power_l2'    => 'required|numeric',
            'power_l3'    => 'required|numeric',
        ];
    }
}
