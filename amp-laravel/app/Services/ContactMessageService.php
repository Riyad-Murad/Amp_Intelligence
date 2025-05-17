<?php

namespace App\Services;

use App\Models\ContactForm;

class ContactMessageService
{
    public static function insertMessage(array $data): ContactForm
    {
        return ContactForm::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone_number' => $data['phone_number'],
            'message' => $data['message'] ?? null,
        ]);
    }
}
