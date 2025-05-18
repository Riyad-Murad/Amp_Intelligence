<?php

namespace App\Utils\Schemas;

use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\StringSchema;

class ProviderPrismSchema
{
    public static function metricsReportSchema(): ObjectSchema
    {
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

        return $schema;
    }
}
