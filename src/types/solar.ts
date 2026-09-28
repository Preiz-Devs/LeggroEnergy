export interface Appliance {
  id: string;
  name: string;
  category: 'lighting' | 'cooling' | 'entertainment' | 'kitchen' | 'heavy' | 'custom';
  defaultWatts: number;
  quantity: number;
  hoursPerDay: number;
  surgeMultiplier?: number;
  custom?: boolean;
}

export type BatteryType = 'lithium' | 'tubular';

export interface CalculatorParameters {
  backupHours: number;
  batteryType: BatteryType;
  sunHoursPerDay: number; // default 5.0 in Nigeria
  inverterEfficiency: number; // default 0.90 (90%)
  safetyMargin: number; // default 1.25 (25% buffer)
}

export interface CalculationResult {
  totalRunningWatts: number;
  surgeWatts: number;
  dailyKWh: number;
  recommendedInverterKVA: number;
  inverterVoltage: number; // 12V, 24V, or 48V
  recommendedBatteryKWh: number;
  batteryAhEquivalent: number;
  recommendedLithiumBatteries: {
    model: string;
    count: number;
    capacityKWh: number;
  };
  recommendedSolarKWp: number;
  recommendedPanels550W: number;
  estimatedCostRange: {
    minNaira: number;
    maxNaira: number;
  };
}

export interface PresetProfile {
  id: string;
  name: string;
  description: string;
  tag: string;
  recommendedFor: string;
  appliances: Array<{ id: string; quantity: number; hoursPerDay?: number }>;
}
