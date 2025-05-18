<?php

namespace Database\Seeders;

use App\Models\ContactForm;
use Illuminate\Database\Seeder;

class ContactFormSeeder extends Seeder
{
    public function run(): void
    {
        ContactForm::factory()->count(10)->create();
    }
}
