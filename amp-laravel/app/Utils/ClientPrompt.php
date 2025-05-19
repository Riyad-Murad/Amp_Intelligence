<?php

namespace App\Utils;

use Exception;
use App\Models\Metric;

class ClientPrompt
{
    public static function clientBuildPromptFromMetrics($slaveId): string
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
                    You are an intelligent energy assistant specializing in personalized energy consumption insights.

                    You will be given up to 10 months of historical energy data from a single user's device. Your task is to generate a **well-structured JSON report** that provides a technical yet user-friendly power usage summary.

                    Based on the data provided, include the following sections:

                    - **summary** — Describe how the user's power consumption evolved over time. Mention trends, unusual behaviors, or noticeable shifts in usage.
                    - **voltageInsights** — Evaluate voltage stability, spikes, and dips. Explain what they could mean for the user's hardware or grid conditions.
                    - **powerInsights** — Analyze the magnitude and frequency of power demand. Highlight any months with high peaks or irregular loads.
                    - **energyInsights** — Detail the user's energy consumption in kWh. Identify patterns in low or high consumption months and whether it follows a seasonal pattern.
                    - **recommendations** — Provide 3–5 practical steps the user can follow to improve energy efficiency. Keep each point concise and impactful. Use a bullet point for each. Do **not** refer to device or user IDs.

                    Output the result in this exact JSON structure:
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
