<?php

namespace App\Services\Provider;

use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;

use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\StringSchema;
// use Prism\Prism\Schema\ArraySchema;

class GeneratingReportService
{
    // public static function generateReport($id)
    public static function generateReport()
    {
        $schema = new ObjectSchema(
            name: 'movie_review',
            // description: 'A structured movie review for client ID: ' . $id,
            description: 'A structured movie review',
            properties: [
                new StringSchema('title', 'The movie title'),
                new StringSchema('rating', 'Rating out of 5 stars'),
                new StringSchema('summary', 'Brief review summary')
            ],
            requiredFields: ['title', 'rating', 'summary']
        );

        $response = Prism::structured()
            ->using(Provider::OpenAI, 'o4-mini')
            ->withSchema($schema)
            // ->withPrompt('Review the movie Inception for client ID: ' . $id)
            ->withPrompt('Review the movie Inception')
            ->asStructured();

        // Access your structured data
        $review = $response->structured;
        return $review;
        // return response()->json($review);
    }
}
