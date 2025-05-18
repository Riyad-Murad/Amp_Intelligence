<?php

namespace App\Services\Provider;

use Prism\Prism\Prism;
use App\Utils\ProviderPrompt;
use Prism\Prism\Enums\Provider;
use App\Utils\Schemas\ProviderPrismSchema;

class GeneratingReportService
{
    public static function generateReport()
    {
        $prompt = ProviderPrompt::providerBuildPromptFromMetrics();
        $schema = ProviderPrismSchema::metricsReportSchema();

        $response = Prism::structured()
            ->using(Provider::OpenAI, 'gpt-4.1')
            ->withSchema($schema)
            ->withPrompt($prompt)
            ->asStructured();

        $structured = $response->structured;

        $structured['recommendations'] = str_replace('\n', "\n", $structured['recommendations']);
        $structured['summary'] = preg_replace('/device\s+\d+/i', 'a device', $structured['summary']);

        return $structured;
    }
}
