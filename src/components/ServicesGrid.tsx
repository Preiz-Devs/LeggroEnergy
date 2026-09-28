import React from 'react';
import { Sun, Battery, Wind, Wrench, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import inverterImg from '../assets/images/solar_inverter_battery_1790592972733.jpg';
import hvacImg from '../assets/images/ac_hvac_installation_1790592984747.jpg';
import applianceImg from '../assets/images/washing_machine_service_1790592996576.jpg';

interface ServicesGridProps {
  onOpenBooking: (serviceName?: string) => void;
  onScrollToCalculator: () => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onOpenBooking, onScrollToCalculator }) => {
  return (
    <section id="services" className="py-24 bg-white text-slate-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            <span>What We Do</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="text-slate-500">Comprehensive Energy & Appliance Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display tracking-tight text-balance">
            Engineered Power, Climate Control & Precision Repairs
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From seamless rooftop solar microgrids and lithium storage to industrial ventilation and prompt appliance repairs, Leggero Energy keeps your home and enterprise powered.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Card 1: Solar Solutions & Inverters (Span 7) */}
          <div id="solar-solutions" className="lg:col-span-7 bg-slate-950 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-xl flex flex-col justify-between group">
            <div className="p-8 sm:p-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider uppercase text-amber-400 font-mono">
                  01. Clean Energy
                </span>
                <span className="text-xs text-slate-400">Residential & Commercial</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  Reliable Solar Solutions & Inverter Systems
                </h3>
                <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  Turnkey solar panel installation with pure sine wave hybrid inverters. Enjoy 24/7 electricity with automated switchover, zero fuel costs, and smart energy monitoring.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Monocrystalline Tier-1 PV Panels</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Hybrid Inverters (1.5kVA – 20kVA)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Zero-Transfer Switchover</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Integrated Lightning & Surge Protections</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={onScrollToCalculator}
                  className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Size Your Setup</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenBooking('Solar & Inverter Installation')}
                  className="text-xs font-semibold text-white hover:text-amber-300 underline underline-offset-4 cursor-pointer"
                >
                  Book Site Audit
                </button>
              </div>
            </div>

            <div className="h-64 sm:h-72 w-full overflow-hidden relative">
              <img
                src={inverterImg}
                alt="Leggero Energy Inverter and Lithium Battery Storage System"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>
          </div>

          {/* Card 2: Lithium Battery Storage (Span 5) */}
          <div className="lg:col-span-5 bg-blue-950 text-white rounded-3xl p-8 sm:p-10 border border-blue-900 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider uppercase text-blue-300 font-mono">
                  02. Energy Storage
                </span>
                <span className="text-xs text-blue-200">LiFePO4 Technology</span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white font-display">
                  Lithium Battery Systems
                </h3>
                <p className="mt-3 text-blue-100 text-sm leading-relaxed">
                  Upgrade from bulky, short-lived acid batteries to high-density LiFePO4 wall-mount packs. Enjoy 90% usable capacity, 5,000+ deep cycles, and a 10-year lifespan.
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-blue-100">
                <div className="p-3 bg-blue-900/60 rounded-xl border border-blue-800/80 flex items-center justify-between">
                  <span>2.56 kWh (25.6V 100Ah)</span>
                  <span className="font-bold text-amber-400">Compact Home</span>
                </div>
                <div className="p-3 bg-blue-900/60 rounded-xl border border-blue-800/80 flex items-center justify-between">
                  <span>5.12 kWh (51.2V 100Ah)</span>
                  <span className="font-bold text-amber-400">Popular Choice</span>
                </div>
                <div className="p-3 bg-blue-900/60 rounded-xl border border-blue-800/80 flex items-center justify-between">
                  <span>10.24 kWh – 20 kWh+</span>
                  <span className="font-bold text-amber-400">Server & Duplex Rack</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-blue-900">
                <div className="flex items-center gap-2 text-xs text-blue-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>5 Years Full Warranty</span>
                </div>
                <button
                  onClick={() => onOpenBooking('Lithium Battery Upgrade')}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
                >
                  Inquire Battery Upgrade →
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Air Conditioning & Heat Extractors (Span 5) */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group">
            <div className="p-8 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider uppercase text-blue-700 font-mono">
                  03. Climate Solutions
                </span>
                <span className="text-xs text-slate-500">HVAC & Kitchen</span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                  Air Conditioning & Heat Extractors
                </h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                  Keep indoor spaces cool and kitchens fume-free. We supply, mount, and service high-efficiency inverter ACs and commercial-grade heat extractor hoods.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Inverter Split AC Installation & Gas Charging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Industrial & Domestic Heat Extractor Hoods</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>HVAC Ducting & Ventilation Solutions</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenBooking('Air Conditioning & Heat Extractor')}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-all cursor-pointer"
                >
                  Book AC / Extractor Service
                </button>
              </div>
            </div>

            <div className="h-48 w-full overflow-hidden relative">
              <img
                src={hvacImg}
                alt="Air conditioning and ventilation heat extractor unit"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 4: Professional Washing Machine Repair Services (Span 7) */}
          <div id="appliance-repairs" className="lg:col-span-7 bg-amber-500/10 border-2 border-amber-400/80 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group">
            <div className="p-8 sm:p-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider uppercase text-blue-900 font-mono">
                  04. Appliance Care
                </span>
                <span className="text-xs font-bold text-amber-800">
                  Doorstep Diagnostics
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
                  Professional Washing Machine Repair Services
                </h3>
                <p className="mt-2 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  Keep Your Washing Machine Working Like New. Our certified field technicians provide prompt doorstep diagnostics, genuine parts, and lasting repairs.
                </p>
              </div>

              {/* Exact service bullets from Leggero Energy flyer 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-800">
                <div className="flex items-center gap-2.5 p-2 bg-white/80 rounded-xl border border-amber-200">
                  <Wrench className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Washing Machine Repairs</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 bg-white/80 rounded-xl border border-amber-200">
                  <CheckCircle className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Installation & Plumbing Setup</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 bg-white/80 rounded-xl border border-amber-200">
                  <CheckCircle className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Routine Maintenance</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 bg-white/80 rounded-xl border border-amber-200">
                  <Wrench className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Troubleshooting & Motor Fixes</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 bg-white/80 rounded-xl border border-amber-200 sm:col-span-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>100% Genuine Replacement Parts (Pumps, Belts, PCBs, Valves)</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/2348061677539?text=Hello%20Leggero%20Energy,%20I%20need%20professional%20washing%20machine%20repair%20services.%20My%20machine%20issue%20is:%20"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Book Repair on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => onOpenBooking('Washing Machine Repair')}
                  className="px-4 py-2.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer"
                >
                  Request Technician Visit
                </button>
              </div>
            </div>

            <div className="h-56 w-full overflow-hidden relative">
              <img
                src={applianceImg}
                alt="Leggero Energy technician repairing washing machine"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
