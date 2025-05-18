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

        return $prompt;
    }
}
