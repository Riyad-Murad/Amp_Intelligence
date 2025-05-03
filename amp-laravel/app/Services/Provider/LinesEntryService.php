<?php

namespace App\Services\Provider;

use App\Models\Master;

class LinesEntryService
{
    public static function addLines(array $data)
    {
        $master = Master::where('name', $data['master_id'])->firstOrFail();

        $line = $master->lines()->create([
            'voltage_l1' => $data['voltageL1'],
            'voltage_l2' => $data['voltageL2'],
            'voltage_l3' => $data['voltageL3'],
            'power_l1' => $data['powerL1'],
            'power_l2' => $data['powerL2'],
            'power_l3' => $data['powerL3'],
        ]);

        return $line->toArray();
    }
}
