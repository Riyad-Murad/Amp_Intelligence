<?php

namespace App\Http\Controllers\Clients;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;

use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\StringSchema;
use Prism\Prism\Schema\ArraySchema;

class ClientFunctionsController extends Controller
{
    public static function generateReport()
    {
        $schema = new ObjectSchema(
            name: 'movie_review',
            description: 'A structured movie review',
            properties: [
                new StringSchema('title', 'The movie title'),
                new StringSchema('rating', 'Rating out of 5 stars'),
                new StringSchema('summary', 'Brief review summary')
            ],
            requiredFields: ['title', 'rating', 'summary']
        );

        $response = Prism::structured()
            ->using(Provider::OpenAI, 'gpt-4o')
            ->withSchema($schema)
            ->withPrompt('Review the movie Inception')
            ->asStructured();

        // Access your structured data
        $review = $response->structured;
        echo $review['title'];    // "Inception"
        echo $review['rating'];   // "5 stars"
        echo $review['summary'];  // "A mind-bending..."

        // $response = Prism::text()
        //     ->using(Provider::Anthropic, 'o4-mini')
        //     ->withSystemPrompt('You are an expert mathematician who explains concepts simply.')
        //     ->withPrompt('Explain the Pythagorean theorem.')
        //     ->asText();

        // return response()->json($response);
    }
}
