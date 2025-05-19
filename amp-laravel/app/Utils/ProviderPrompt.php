<?php

namespace App\Utils;

use Exception;
use App\Models\Metric;

class ProviderPrompt
{
    public static function providerBuildPromptFromMetrics(): string
    {
        $metrics = Metric::orderBy('date_month', 'desc')->get();

        if ($metrics->isEmpty()) {
            throw new Exception('No metrics found across devices.');
        }

        $metricsText = $metrics->map(function ($m) {
            return "Date: {$m->date_month}, Voltage: {$m->voltage}V, Current: {$m->current}A, Power: {$m->power}W, Energy: {$m->energy}kWh";
        })->implode("\n");

        $prompt = <<<EOT
                    You are a high-level energy analytics assistant that helps utility providers understand and predict system-wide energy usage patterns.

                    You will be provided with historical monthly energy readings from multiple devices across the network.

                    Your task is to output a structured JSON report that includes:

                    - **summary** — An executive overview of consumption patterns across all monitored devices. Note any systemic trends, seasonal behavior, or usage cycles.
                    - **voltageInsights** — Evaluate voltage trends across the entire device fleet. Flag any anomalies, common peak periods, or areas for voltage optimization.
                    - **powerInsights** — Identify periods of significant power usage, detect signs of demand surges, and assess load consistency.
                    - **energyInsights** — Summarize total energy usage over time and uncover high/low periods. Point out whether the data suggests any forecastable changes.
                    - **recommendations** — Provide technical, scalable strategies to enhance energy efficiency and forecasting accuracy. Bullet each action clearly. Avoid referencing any specific device IDs.

                    Ensure the output is formatted **strictly in this JSON structure**:
                    {
                    "summary": "...",
                    "voltageInsights": "...",
                    "powerInsights": "...",
                    "energyInsights": "...",
                    "recommendations": "• Recommendation 1\n• Recommendation 2\n• Recommendation 3"
                    }

                    Metrics:
                    $metricsText
                    EOT;

        return $prompt;
    }
}
