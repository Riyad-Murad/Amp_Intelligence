<?php

namespace App\Services\Provider;

use App\Models\Master;

class LinesEntryService
{
    public static function addLines(array $data): array
    {
        $master = Master::where('id', $data['master_id'])->firstOrFail();

        $line = $master->lines()->create([
            'voltage_l1' => $data['voltage_l1'],
            'voltage_l2' => $data['voltage_l2'],
            'voltage_l3' => $data['voltage_l3'],
            'power_l1'   => $data['power_l1'],
            'power_l2'   => $data['power_l2'],
            'power_l3'   => $data['power_l3'],
        ]);

        return $line->toArray();
    }
}
