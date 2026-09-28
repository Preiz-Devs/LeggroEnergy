import React from 'react';
import { Sun, ShieldCheck, Zap, Wrench, ArrowRight } from 'lucide-react';
import heroImage from '../assets/images/hero_solar_residential_1790592960657.jpg';

interface HeroProps {
  onScrollToCalculator: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCalculator, onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Graphic & Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Leggero Energy Residential and Commercial Solar Power Installation"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/60" />
        <div className="absolute inset-0 bg-radial at-top-left from-amber-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Clean unboxed domain kicker */}
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-amber-400">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Reliable Solar & Energy Engineering</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">Nigeria</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display text-balance">
              Stay Energized with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                Leggero Energy
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
              End erratic grid blackouts and skyrocketing fuel bills. We engineer custom solar power setups, high-capacity lithium battery banks, commercial HVAC solutions, and professional home appliance repairs.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onScrollToCalculator}
                className="flex items-center gap-3 px-6 py-4 text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl shadow-lg shadow-amber-400/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <Zap className="w-5 h-5 text-slate-950 fill-current" />
                <span>Calculate Your Solar Load</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooking}
                className="flex items-center gap-3 px-6 py-4 text-base font-semibold text-white bg-blue-700/80 hover:bg-blue-600 border border-blue-500/30 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <Wrench className="w-5 h-5 text-amber-300" />
                <span>Book Technician / Site Survey</span>
              </button>
            </div>

            {/* Claim-to-Proof Adjacency Row */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-white font-mono-data">500+</p>
                <p className="text-xs text-slate-400 mt-1">Solar & Inverter Sites</p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-amber-400 font-mono-data">5 Years</p>
                <p className="text-xs text-slate-400 mt-1">Lithium Battery Warranty</p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-white font-mono-data">100%</p>
                <p className="text-xs text-slate-400 mt-1">Pure Sine Wave Power</p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-amber-400 font-mono-data">24/7</p>
                <p className="text-xs text-slate-400 mt-1">Prompt Field Engineers</p>
              </div>
            </div>

          </div>

          {/* Right Hero Card / Quick Feature Spotlight */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold tracking-wider uppercase text-amber-400">
                  Quick Sizing Guide
                </span>
                <span className="text-xs text-slate-400">2026 Standards</span>
              </div>

              <div className="mt-5 space-y-4">
                <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/60">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Starter Backup</span>
                    <span className="text-xs font-mono font-bold text-amber-400">1.5 - 2.5 kVA</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Lights, fans, TV, WiFi router, laptops & device chargers.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950/70 rounded-xl border border-blue-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Family Comfort</span>
                    <span className="text-xs font-mono font-bold text-blue-400">3.5 - 5.0 kVA</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Adds inverter refrigerator, freezer, home audio & blenders.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/60">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Heavy Duplex / SME</span>
                    <span className="text-xs font-mono font-bold text-amber-400">7.5 - 15 kVA</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Runs multiple Inverter ACs, washing machine, pump & servers.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Free technical advice</span>
                </div>
                <button
                  onClick={onScrollToCalculator}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
                >
                  Configure My Load →
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
