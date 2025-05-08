<?php

namespace App\Services\Admin;

use App\Models\ContactForm;

class getAllContactMessagesService
{
    public static function getAll()
    {
        return ContactForm::all();
    }
}
