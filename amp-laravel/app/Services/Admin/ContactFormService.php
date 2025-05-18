<?php

namespace App\Services\Admin;

use App\Models\ContactForm;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ContactFormService
{
    public static function delete($id): bool
    {
        $message = ContactForm::find($id);

        if (!$message) {
            throw new ModelNotFoundException("Contact message with ID {$id} not found.");
        }

        return $message->delete();
    }

    public static function getAll()
    {
        return ContactForm::all();
    }
}
