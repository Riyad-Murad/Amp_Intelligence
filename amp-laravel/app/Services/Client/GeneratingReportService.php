<?php

namespace App\Services\Client;

use App\Models\Metric;

use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;

use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\StringSchema;

class GeneratingReportService
{
    public static function generateReport($slaveId)
    {
        $metrics = Metric::where('slave_id', $slaveId)
            ->orderBy('date_month', 'desc')
            ->take(10)
            ->get();

        if ($metrics->isEmpty()) {
            throw new \Exception('No metrics found for the specified device.');
        }

        $metricsText = $metrics->map(function ($m) {
            return "Date: {$m->date_month}, Voltage: {$m->voltage}V, Current: {$m->current}A, Power: {$m->power}W, Energy: {$m->energy}kWh";
        })->implode("\n");

        $prompt = <<<EOT
                    You are an AI assistant that analyzes monthly energy usage metrics and generates structured reports.

                    Based on the following readings, provide:

                    - A concise performance summary
                    - Voltage insights
                    - Power usage insights
                    - Energy usage insights
                    - Actionable recommendations (start each on a new line, no device ID mention)

                    Data:
                    $metricsText
                    EOT;

        $schema = new ObjectSchema(
            name: 'metrics_report',
            description: 'A structured energy metrics report for a slave device',
            properties: [
                new StringSchema('summary', 'Overall performance summary'),
                new StringSchema('voltageInsights', 'Insights on voltage trends'),
                new StringSchema('powerInsights', 'Insights on power consumption'),
                new StringSchema('energyInsights', 'Insights on energy usage'),
                new StringSchema('recommendations', 'Recommended actions based on data')
            ],
            requiredFields: ['summary', 'voltageInsights', 'powerInsights', 'energyInsights']
        );

        $response = Prism::structured()
            ->using(Provider::OpenAI, 'o4-mini')
            ->withSchema($schema)
            ->withPrompt($prompt)
            ->asStructured();

        $structured = $response->structured;

        $structured['recommendations'] = str_replace('\n', "\n", $structured['recommendations']);
        $structured['summary'] = preg_replace('/device\s+\d+/i', 'the device', $structured['summary']);

        return $structured;
    }
}
