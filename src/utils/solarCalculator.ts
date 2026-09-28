import { Appliance, CalculatorParameters, CalculationResult } from '../types/solar';

export function calculateSolarSystem(
  appliances: Appliance[],
  params: CalculatorParameters
): CalculationResult {
  const activeAppliances = appliances.filter((a) => a.quantity > 0);

  // 1. Total Running Load
  let totalRunningWatts = 0;
  let maxSurgeAddition = 0;
  let dailyWattHours = 0;

  activeAppliances.forEach((item) => {
    const running = item.quantity * item.defaultWatts;
    totalRunningWatts += running;

    // Peak surge calculation (inductive loads like compressors, pumps, motors)
    const multiplier = item.surgeMultiplier || 1.0;
    if (multiplier > 1.0) {
      const surgeExtra = (multiplier - 1.0) * item.defaultWatts * Math.min(item.quantity, 2);
      if (surgeExtra > maxSurgeAddition) {
        maxSurgeAddition = surgeExtra;
      }
    }

    // Daily energy
    dailyWattHours += running * (item.hoursPerDay || 4);
  });

  const surgeWatts = Math.round(totalRunningWatts + maxSurgeAddition);
  const dailyKWh = parseFloat((dailyWattHours / 1000).toFixed(2));

  // 2. Inverter Sizing (kVA)
  // Power factor assumed 0.85; buffer of 25%
  const targetWatts = Math.max(totalRunningWatts * 1.25, surgeWatts * 0.7);
  let recommendedInverterKVA = 1.5;
  let inverterVoltage = 12;

  if (targetWatts <= 900) {
    recommendedInverterKVA = 1.5;
    inverterVoltage = 12;
  } else if (targetWatts <= 1800) {
    recommendedInverterKVA = 2.5;
    inverterVoltage = 24;
  } else if (targetWatts <= 2800) {
    recommendedInverterKVA = 3.5;
    inverterVoltage = 24;
  } else if (targetWatts <= 4200) {
    recommendedInverterKVA = 5.0;
    inverterVoltage = 48;
  } else if (targetWatts <= 6500) {
    recommendedInverterKVA = 7.5;
    inverterVoltage = 48;
  } else if (targetWatts <= 9000) {
    recommendedInverterKVA = 10.0;
    inverterVoltage = 48;
  } else if (targetWatts <= 13500) {
    recommendedInverterKVA = 15.0;
    inverterVoltage = 48;
  } else {
    recommendedInverterKVA = Math.ceil(targetWatts / 1000 / 5) * 5;
    inverterVoltage = 48;
  }

  // 3. Battery Sizing (kWh & Ah)
  // Usable capacity factor (DoD): Lithium is 90%, Tubular Gel is 50%
  const dod = params.batteryType === 'lithium' ? 0.9 : 0.5;
  const efficiency = params.inverterEfficiency || 0.9;
  
  // Backup power needed during the blackout/night period
  // We compute based on running watts * requested backup hours
  const energyNeededWh = totalRunningWatts * params.backupHours;
  const grossBatteryKWh = totalRunningWatts > 0 
    ? Math.max(1.2, energyNeededWh / (efficiency * dod * 1000))
    : 0;

  const roundedBatteryKWh = parseFloat(grossBatteryKWh.toFixed(2));
  const batteryAhEquivalent = Math.round((roundedBatteryKWh * 1000) / inverterVoltage);

  // Recommended standard Lithium packs (e.g. 2.56kWh, 5.12kWh, 10.24kWh, 14.3kWh)
  let lithiumModel = '2.56 kWh (24V / 50Ah) LiFePO4';
  let lithiumCount = 1;
  let lithiumCapacity = 2.56;

  if (roundedBatteryKWh <= 3.0) {
    lithiumModel = '2.56 kWh (25.6V / 100Ah) LiFePO4 Smart Battery';
    lithiumCount = 1;
    lithiumCapacity = 2.56;
  } else if (roundedBatteryKWh <= 5.5) {
    lithiumModel = '5.12 kWh (51.2V / 100Ah) LiFePO4 Wall-Mount Power';
    lithiumCount = 1;
    lithiumCapacity = 5.12;
  } else if (roundedBatteryKWh <= 11.0) {
    lithiumModel = '5.12 kWh (51.2V / 100Ah) LiFePO4 Battery Pack';
    lithiumCount = 2;
    lithiumCapacity = 10.24;
  } else if (roundedBatteryKWh <= 16.0) {
    lithiumModel = '5.12 kWh (51.2V / 100Ah) LiFePO4 Bank (3x Stack)';
    lithiumCount = 3;
    lithiumCapacity = 15.36;
  } else {
    lithiumCount = Math.ceil(roundedBatteryKWh / 5.12);
    lithiumModel = `5.12 kWh LiFePO4 Modular Rack Units (${lithiumCount} Units)`;
    lithiumCapacity = parseFloat((lithiumCount * 5.12).toFixed(2));
  }

  // 4. Solar PV Array (kWp)
  // Based on daily energy consumption and peak sun hours (average 5.0h in Nigeria)
  const peakSunHours = params.sunHoursPerDay || 5.0;
  const solarSystemDerate = 0.78; // dust, temperature derating
  const solarArrayWattHours = (dailyWattHours * 1.15) / solarSystemDerate;
  const solarKWpRaw = totalRunningWatts > 0 
    ? Math.max(0.6, (solarArrayWattHours / peakSunHours) / 1000)
    : 0;
  const recommendedSolarKWp = parseFloat(solarKWpRaw.toFixed(2));

  // In 550W Tier 1 Monocrystalline panels
  const panelWattage = 550;
  const minPanels = Math.ceil((recommendedSolarKWp * 1000) / panelWattage);
  // Round to even pairs for dual-string MPPT efficiency
  const recommendedPanels550W = minPanels % 2 === 0 ? minPanels : minPanels + 1;

  // 5. Estimated Cost in Nigerian Naira (₦)
  // Realistic equipment cost for high quality Tier-1 solar + LiFePO4 + Pure sine hybrid inverter + accessories & install
  let baseCostMin = 0;
  let baseCostMax = 0;

  if (totalRunningWatts === 0) {
    baseCostMin = 0;
    baseCostMax = 0;
  } else if (recommendedInverterKVA <= 1.5) {
    baseCostMin = 1450000;
    baseCostMax = 1950000;
  } else if (recommendedInverterKVA <= 2.5) {
    baseCostMin = 2200000;
    baseCostMax = 2850000;
  } else if (recommendedInverterKVA <= 3.5) {
    baseCostMin = 3100000;
    baseCostMax = 3950000;
  } else if (recommendedInverterKVA <= 5.0) {
    baseCostMin = 4800000;
    baseCostMax = 6200000;
  } else if (recommendedInverterKVA <= 7.5) {
    baseCostMin = 7500000;
    baseCostMax = 9500000;
  } else if (recommendedInverterKVA <= 10.0) {
    baseCostMin = 9800000;
    baseCostMax = 12800000;
  } else {
    baseCostMin = recommendedInverterKVA * 1150000;
    baseCostMax = recommendedInverterKVA * 1450000;
  }

  // Adjust for high battery capacity
  if (roundedBatteryKWh > 5.12) {
    const extraKwh = roundedBatteryKWh - 5.12;
    baseCostMin += Math.round(extraKwh * 350000);
    baseCostMax += Math.round(extraKwh * 450000);
  }

  return {
    totalRunningWatts: Math.round(totalRunningWatts),
    surgeWatts,
    dailyKWh,
    recommendedInverterKVA,
    inverterVoltage,
    recommendedBatteryKWh: roundedBatteryKWh,
    batteryAhEquivalent,
    recommendedLithiumBatteries: {
      model: lithiumModel,
      count: lithiumCount,
      capacityKWh: lithiumCapacity,
    },
    recommendedSolarKWp,
    recommendedPanels550W: totalRunningWatts > 0 ? recommendedPanels550W : 0,
    estimatedCostRange: {
      minNaira: baseCostMin,
      maxNaira: baseCostMax,
    },
  };
}

export function formatNaira(amount: number): string {
  if (amount === 0) return '₦0';
  return '₦' + amount.toLocaleString('en-NG');
}
