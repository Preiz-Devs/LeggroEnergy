import React from 'react';
import { ShieldCheck, Award, Wrench, Clock, Instagram, ArrowUpRight, Zap, Phone } from 'lucide-react';

interface WhyLeggeroProps {
  onOpenBooking: () => void;
}

export const WhyLeggero: React.FC<WhyLeggeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            <Zap className="w-4 h-4 fill-current text-amber-400" />
            <span>Why Choose Leggero Energy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display text-balance">
            Zero Guesswork. Certified Energy Engineering & Rapid Service.
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            We don’t just install panels; we design balanced electrical architectures that safeguard your expensive appliances, prevent overloads, and maximize your savings.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Tier-1 Components Only</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We exclusively deploy Tier-1 Monocrystalline solar panels, pure sine wave inverters, and Grade-A LiFePO4 cells with smart BMS protocols.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Multi-Layer Protections</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every system includes DC disconnect breakers, rapid AC surge suppressors, robust lightning arrestors, and heavy-gauge copper earthing.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Prompt Doorstep Response</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              From solar inspections to urgent washing machine troubleshooting, our mobile technicians deploy with specialized diagnostics tools.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Genuine Replacement Parts</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No counterfeit substandard parts. We source authentic manufacturer OEM spare parts for washing machines, ACs, and inverter control boards.
            </p>
          </div>
        </div>

        {/* Instagram & Social Connect Card */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Instagram className="w-4 h-4 text-amber-400" />
              <span>Connect on Instagram @leggeroenergy</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              See Our Recent Project Installations & Live Demos
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Follow Leggero Energy on Instagram for weekly Monday energy tips, live field setup videos, client testimonials, and appliance maintenance guides.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href="https://www.instagram.com/leggeroenergy?stkn=MXJub3o0bzV5Ymg0ag=="
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
              <span>Visit @leggeroenergy</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="tel:08167958095"
              className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>08167958095</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
