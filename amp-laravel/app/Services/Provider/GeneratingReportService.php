<?php

namespace App\Services\Provider;

use App\Models\Metric;

use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;

use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\StringSchema;

class GeneratingReportService
{
    public static function generateReport()
    {
        $metrics = Metric::orderBy('date_month', 'desc')->get();

        if ($metrics->isEmpty()) {
            throw new \Exception('No metrics found across devices.');
        }

        $metricsText = $metrics->map(function ($m) {
            return "Date: {$m->date_month}, Voltage: {$m->voltage}V, Current: {$m->current}A, Power: {$m->power}W, Energy: {$m->energy}kWh";
        })->implode("\n");

        $prompt = <<<EOT
                    You are an AI assistant that analyzes monthly energy usage metrics collected from all devices and generates structured, high-level, and **detailed** reports.

                    Based on the following aggregated readings from multiple devices, provide a **rich and insightful** analysis including:

                    - **Performance Summary** — An extended overview highlighting cross-device trends, seasonal variations, and overall energy behaviors.
                    - **Voltage Insights** — Examine voltage range stability across all devices, flag irregularities, and suggest potential issues or improvements.
                    - **Power Usage Insights** — Detect usage intensity trends, major consumption periods, and possible inefficiencies.
                    - **Energy Usage Insights** — Highlight general usage profiles, identify spikes, valleys, and time-based variations across devices.
                    - **Actionable Recommendations** — List meaningful, technical, and scalable actions to optimize energy usage and monitoring (each starting on a new line with a bullet point), and **do not refer to specific device IDs**.

                    Be as detailed as possible. This report is meant for energy analysts and system operators.

                    Data:
                    $metricsText
                    EOT;

        $schema = new ObjectSchema(
            name: 'metrics_report',
            description: 'A structured global energy metrics report across devices',
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

        // Fix formatting issues
        $structured['recommendations'] = str_replace('\n', "\n", $structured['recommendations']);
        $structured['summary'] = preg_replace('/device\s+\d+/i', 'a device', $structured['summary']);

        return $structured;
    }
}
