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
                    You are an AI assistant that analyzes monthly energy usage metrics and generates structured, in-depth reports.

                    Based on the following device readings, provide a **comprehensive and detailed** analysis including:

                    - **Performance Summary** — A thorough overview of overall energy usage patterns, key events, and trends.
                    - **Voltage Insights** — Analyze stability, peaks, troughs, and possible causes of fluctuations.
                    - **Power Usage Insights** — Identify high-load events, consistent patterns, and anomalies.
                    - **Energy Usage Insights** — Discuss consumption levels, distribution over time, and periods of peak/low usage.
                    - **Actionable Recommendations** — Provide clear, technical, and practical suggestions (start each on a new line using a bullet point), and **do not mention device IDs**.

                    Ensure each section provides detailed insights and explanations that a technical team or energy manager would find useful.

                    Data:
                    $metricsText
                    EOT;

        return $prompt;
    }
}
