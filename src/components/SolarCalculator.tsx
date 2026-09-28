import React, { useState, useMemo } from 'react';
import {
  Sun,
  Zap,
  Battery,
  Layers,
  Plus,
  Minus,
  Trash2,
  Share2,
  Printer,
  Search,
  Sparkles,
  Info,
  Clock,
  ShieldCheck,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { Appliance, BatteryType, CalculatorParameters } from '../types/solar';
import { INITIAL_APPLIANCES, PRESET_PROFILES } from '../data/appliances';
import { calculateSolarSystem, formatNaira } from '../utils/solarCalculator';

interface SolarCalculatorProps {
  onOpenBooking: (initialNotes?: string) => void;
}

export const SolarCalculator: React.FC<SolarCalculatorProps> = ({ onOpenBooking }) => {
  const [appliances, setAppliances] = useState<Appliance[]>(INITIAL_APPLIANCES);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [backupHours, setBackupHours] = useState<number>(8);
  const [batteryType, setBatteryType] = useState<BatteryType>('lithium');
  const [activePreset, setActivePreset] = useState<string>('starter');

  // Custom appliance state
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customWatts, setCustomWatts] = useState(100);
  const [customQty, setCustomQty] = useState(1);
  const [customHours, setCustomHours] = useState(6);

  // Parameters
  const params: CalculatorParameters = useMemo(
    () => ({
      backupHours,
      batteryType,
      sunHoursPerDay: 5.0,
      inverterEfficiency: 0.9,
      safetyMargin: 1.25,
    }),
    [backupHours, batteryType]
  );

  // Calculation Results
  const result = useMemo(() => calculateSolarSystem(appliances, params), [appliances, params]);

  // Update appliance quantity
  const updateQuantity = (id: string, delta: number) => {
    setAppliances((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
    setActivePreset('custom');
  };

  // Update direct quantity
  const setDirectQuantity = (id: string, qty: number) => {
    const validQty = isNaN(qty) ? 0 : Math.max(0, Math.min(99, qty));
    setAppliances((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: validQty } : item))
    );
    setActivePreset('custom');
  };

  // Update hours per day
  const updateHours = (id: string, hours: number) => {
    setAppliances((prev) =>
      prev.map((item) => (item.id === id ? { ...item, hoursPerDay: Math.max(1, Math.min(24, hours)) } : item))
    );
    setActivePreset('custom');
  };

  // Apply preset
  const applyPreset = (presetId: string) => {
    const preset = PRESET_PROFILES.find((p) => p.id === presetId);
    if (!preset) return;

    setAppliances((prev) =>
      prev.map((item) => {
        const found = preset.appliances.find((p) => p.id === item.id);
        if (found) {
          return {
            ...item,
            quantity: found.quantity,
            hoursPerDay: found.hoursPerDay || item.hoursPerDay,
          };
        }
        return { ...item, quantity: 0 };
      })
    );
    setActivePreset(presetId);
  };

  // Clear all
  const clearAllAppliances = () => {
    setAppliances((prev) => prev.map((item) => ({ ...item, quantity: 0 })));
    setActivePreset('cleared');
  };

  // Add custom appliance
  const handleAddCustomAppliance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newAppliance: Appliance = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      category: 'custom',
      defaultWatts: Math.max(1, customWatts),
      quantity: Math.max(1, customQty),
      hoursPerDay: Math.max(1, Math.min(24, customHours)),
      surgeMultiplier: 1.2,
      custom: true,
    };

    setAppliances((prev) => [newAppliance, ...prev]);
    setCustomName('');
    setCustomWatts(100);
    setCustomQty(1);
    setShowAddCustom(false);
    setActivePreset('custom');
  };

  // Delete custom appliance
  const deleteCustom = (id: string) => {
    setAppliances((prev) => prev.filter((item) => item.id !== id));
  };

  // Filter appliances
  const filteredAppliances = appliances.filter((item) => {
    const matchesCat =
      activeCategory === 'all' ||
      (activeCategory === 'custom' ? item.custom : item.category === activeCategory);
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Active appliance count
  const activeItemsCount = appliances.filter((a) => a.quantity > 0).length;

  // Generate WhatsApp message
  const getWhatsAppMessage = () => {
    const activeList = appliances
      .filter((a) => a.quantity > 0)
      .map((a) => `• ${a.quantity}x ${a.name} (${a.quantity * a.defaultWatts}W, ${a.hoursPerDay}h/day)`)
      .join('\n');

    return encodeURIComponent(
      `Hello Leggero Energy,\n\nI just sized my solar requirements on your Solar Calculator:\n\n` +
      `📊 *SYSTEM REQUIREMENTS:*\n` +
      `• Total Running Load: ${result.totalRunningWatts} Watts (${(result.totalRunningWatts / 1000).toFixed(2)} kW)\n` +
      `• Peak Surge Capacity: ${result.surgeWatts} Watts\n` +
      `• Daily Energy Usage: ${result.dailyKWh} kWh/day\n` +
      `• Desired Battery Backup: ${backupHours} Hours\n` +
      `• Battery Technology: ${batteryType === 'lithium' ? 'LiFePO4 Lithium (Recommended)' : 'Tubular Deep-Cycle'}\n\n` +
      `⚡ *RECOMMENDED SPECIFICATIONS:*\n` +
      `• Inverter: ${result.recommendedInverterKVA} kVA (${result.inverterVoltage}V System)\n` +
      `• Battery Bank: ${result.recommendedLithiumBatteries.capacityKWh} kWh (${result.recommendedLithiumBatteries.model})\n` +
      `• Solar PV Array: ${result.recommendedSolarKWp} kWp (${result.recommendedPanels550W}x 550W Tier-1 Mono Panels)\n` +
      `• Budget Range: ${formatNaira(result.estimatedCostRange.minNaira)} - ${formatNaira(result.estimatedCostRange.maxNaira)}\n\n` +
      `📋 *SELECTED APPLIANCES:*\n${activeList || 'None selected'}\n\n` +
      `Please provide an official invoice and schedule a technical site inspection.`
    );
  };

  const handlePrintSheet = () => {
    window.print();
  };

  return (
    <section id="solar-calculator" className="py-20 bg-slate-100 text-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">
            <Zap className="w-4 h-4 text-amber-500 fill-current" />
            <span>Smart Solar Load Sizing Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display tracking-tight text-balance">
            Interactive Solar Power Calculator
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Select your household or business appliances, set your backup duration, and receive an instant, accurate inverter, lithium battery, and solar panel recommendation.
          </p>
        </div>

        {/* Quick Presets Bar */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Quick Setup Presets:</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {PRESET_PROFILES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activePreset === preset.id
                      ? 'bg-blue-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {preset.name}
                </button>
              ))}

              <button
                onClick={clearAllAppliances}
                className="px-3 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors whitespace-nowrap ml-auto sm:ml-2"
              >
                Reset All (0)
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Calculator & Live Sizing Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Appliance Picker (7 cols on lg, 8 on xl) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* Category Filter Tabs & Search */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search appliances (e.g. TV, Fridge, AC, Fan)..."
                    className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900 transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Add Custom Appliance Button */}
                <button
                  onClick={() => setShowAddCustom(!showAddCustom)}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-blue-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all whitespace-nowrap cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Custom Appliance</span>
                </button>
              </div>

              {/* Category Segmented Control */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-medium text-slate-600 no-scrollbar">
                {[
                  { id: 'all', label: 'All Appliances' },
                  { id: 'lighting', label: 'Lighting' },
                  { id: 'cooling', label: 'Cooling & AC' },
                  { id: 'entertainment', label: 'Entertainment & IT' },
                  { id: 'kitchen', label: 'Kitchen' },
                  { id: 'heavy', label: 'Heavy Utilities' },
                  { id: 'custom', label: 'Custom' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Add Custom Appliance Collapse Form */}
              {showAddCustom && (
                <form
                  onSubmit={handleAddCustomAppliance}
                  className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                    <span>Add Any Custom Device</span>
                    <button
                      type="button"
                      onClick={() => setShowAddCustom(false)}
                      className="text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Device Name
                      </label>
                      <input
                        type="text"
                        required
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="e.g. CCTV Server / Sewing Machine"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Power (Watts)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="15000"
                        value={customWatts}
                        onChange={(e) => setCustomWatts(Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Hours / Day
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="24"
                        value={customHours}
                        onChange={(e) => setCustomHours(Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
                    >
                      Save Appliance
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Appliances List */}
            <div className="space-y-2.5">
              {filteredAppliances.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-500">
                  <p className="text-sm font-medium">No appliances found matching "{searchQuery}".</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="mt-3 text-xs font-semibold text-blue-700 hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                filteredAppliances.map((item) => {
                  const isSelected = item.quantity > 0;
                  const itemRunningWatts = item.quantity * item.defaultWatts;

                  return (
                    <div
                      key={item.id}
                      className={`bg-white border rounded-xl p-3.5 sm:p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-blue-500 shadow-sm bg-blue-50/20'
                          : 'border-slate-200/90 hover:border-slate-300'
                      }`}
                    >
                      {/* Left: Appliance Details */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-mono text-xs font-bold ${
                            isSelected
                              ? 'bg-amber-400 text-slate-950 font-extrabold'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.defaultWatts}W
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900 truncate">
                              {item.name}
                            </h4>
                            {item.custom && (
                              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                                Custom
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                            <span>Rating: {item.defaultWatts} Watts</span>
                            <span aria-hidden="true">·</span>
                            <span>{item.hoursPerDay} hrs/day</span>
                            {isSelected && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="font-semibold text-blue-700 font-mono">
                                  Subtotal: {itemRunningWatts}W
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Quantity Stepper & Hour control */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        {/* Hours Slider for fine-tuning */}
                        {isSelected && (
                          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <select
                              value={item.hoursPerDay}
                              onChange={(e) => updateHours(item.id, Number(e.target.value))}
                              className="text-xs bg-slate-100 border-none rounded py-1 px-1.5 font-medium text-slate-700 focus:ring-1 focus:ring-blue-600 cursor-pointer"
                            >
                              {[1, 2, 3, 4, 6, 8, 10, 12, 16, 24].map((h) => (
                                <option key={h} value={h}>
                                  {h} hrs/day
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* Stepper Buttons */}
                        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity === 0}
                            aria-label={`Decrease ${item.name}`}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:bg-white hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>

                          <input
                            type="number"
                            min="0"
                            max="99"
                            value={item.quantity}
                            onChange={(e) => setDirectQuantity(item.id, parseInt(e.target.value))}
                            className="w-10 text-center font-bold font-mono text-sm bg-transparent border-none focus:outline-none text-slate-900"
                          />

                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label={`Increase ${item.name}`}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:bg-white hover:text-slate-900 transition-all cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.custom && (
                          <button
                            onClick={() => deleteCustom(item.id)}
                            title="Remove custom appliance"
                            className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Sizing Parameters Adjuster */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                <Battery className="w-5 h-5 text-blue-700" />
                <span>Backup Parameters & Battery Choice</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Desired Backup Hours */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Desired Battery Backup Duration:</span>
                    <span className="font-bold text-blue-700 font-mono text-sm">
                      {backupHours} Hours
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="24"
                    step="2"
                    value={backupHours}
                    onChange={(e) => setBackupHours(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>2 hrs</span>
                    <span>6 hrs</span>
                    <span>8 hrs (Standard)</span>
                    <span>12 hrs</span>
                    <span>24 hrs</span>
                  </div>
                </div>

                {/* Battery Chemistry */}
                <div className="space-y-2">
                  <span className="block text-xs font-semibold text-slate-700">
                    Battery Technology:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setBatteryType('lithium')}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        batteryType === 'lithium'
                          ? 'border-blue-600 bg-blue-50 text-blue-950 ring-1 ring-blue-600 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold">Lithium LiFePO4</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        90% DoD · 10+ Yr Life
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBatteryType('tubular')}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        batteryType === 'tubular'
                          ? 'border-blue-600 bg-blue-50 text-blue-950 ring-1 ring-blue-600 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold">Tubular Gel</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        50% DoD · Budget Choice
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Engineering Sizing & Bill of Materials (5 cols on lg, 4 on xl) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-28 space-y-6">
            
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-800 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

              {/* Title & Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold font-display text-white">System Sizing Output</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Leggero Certified Sizing</p>
                </div>
                <div className="px-2.5 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-[11px] font-mono font-bold">
                  {activeItemsCount} Devices
                </div>
              </div>

              {/* Primary Key Metrics */}
              <div className="grid grid-cols-2 gap-3 my-5">
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800/80">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400">Continuous Load</div>
                  <div className="text-2xl font-bold font-mono-data text-amber-400 mt-1">
                    {result.totalRunningWatts} <span className="text-xs text-slate-300 font-normal">W</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {(result.totalRunningWatts / 1000).toFixed(2)} kW Running
                  </div>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800/80">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400">Daily Demand</div>
                  <div className="text-2xl font-bold font-mono-data text-blue-400 mt-1">
                    {result.dailyKWh} <span className="text-xs text-slate-300 font-normal">kWh</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Surge: {result.surgeWatts}W
                  </div>
                </div>
              </div>

              {/* Equipment Recommendations */}
              <div className="space-y-3 pb-5 border-b border-slate-800">
                
                {/* 1. Inverter */}
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 flex items-start gap-3">
                  <div className="p-2 bg-amber-400/10 rounded-lg text-amber-400 shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 fill-current" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Inverter Capacity</span>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {result.recommendedInverterKVA} kVA / {result.inverterVoltage}V
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200 mt-0.5 truncate">
                      Pure Sine Wave Smart Hybrid
                    </p>
                  </div>
                </div>

                {/* 2. Battery Bank */}
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 flex items-start gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 shrink-0 mt-0.5">
                    <Battery className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Battery Storage</span>
                      <span className="text-xs font-mono font-bold text-blue-400">
                        {result.recommendedLithiumBatteries.capacityKWh} kWh
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200 mt-0.5 truncate">
                      {result.recommendedLithiumBatteries.model}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Delivers ~{backupHours} hours backup at rated load
                    </p>
                  </div>
                </div>

                {/* 3. Solar PV Array */}
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 flex items-start gap-3">
                  <div className="p-2 bg-amber-400/10 rounded-lg text-amber-400 shrink-0 mt-0.5">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Solar PV Array</span>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {result.recommendedSolarKWp} kWp
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200 mt-0.5">
                      {result.recommendedPanels550W}x 550W Tier-1 Mono Panels
                    </p>
                    <p className="text-[10px] text-slate-500">
                      High-efficiency dual MPPT solar generation
                    </p>
                  </div>
                </div>

              </div>

              {/* Investment Range */}
              <div className="pt-4 pb-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Estimated Turnkey Cost (NGN):</span>
                  <span className="text-[10px] text-amber-400">Equipment + Install</span>
                </div>
                <div className="mt-1 text-xl sm:text-2xl font-bold font-mono-data text-white">
                  {formatNaira(result.estimatedCostRange.minNaira)}{' '}
                  <span className="text-sm font-normal text-slate-400">–</span>{' '}
                  {formatNaira(result.estimatedCostRange.maxNaira)}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  *Includes surge protectors, DC cables, mounting rails, and technical warranty.
                </p>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-2">
                {/* Send To WhatsApp */}
                <a
                  href={`https://wa.me/2348061677539?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-xl shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Send Quote to WhatsApp</span>
                </a>

                {/* Book Free Site Inspection */}
                <button
                  onClick={() =>
                    onOpenBooking(
                      `Solar Calculator Quote:\nLoad: ${result.totalRunningWatts}W, Inverter: ${result.recommendedInverterKVA}kVA, Battery: ${result.recommendedLithiumBatteries.capacityKWh}kWh.`
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-600 rounded-xl transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Request Free Site Inspection</span>
                </button>

                {/* Print Sheet */}
                <button
                  onClick={handlePrintSheet}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print System Sizing Specification</span>
                </button>
              </div>

            </div>

            {/* Need expert advice banner */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-slate-800 text-xs space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <Info className="w-4 h-4 text-amber-600" />
                <span>Have high inductive loads?</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                If you have heavy boreholes, central pumping machines, or non-inverter air conditioners, our engineers can conduct an on-site harmonic surge audit. Call{' '}
                <a href="tel:08167958095" className="font-bold text-blue-800 hover:underline">
                  08167958095
                </a>
                .
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
