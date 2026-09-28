import React from 'react';
import { Phone, Mail, Instagram, MapPin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onScrollToCalculator: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToCalculator, onOpenBooking }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          
          {/* Col 1: Brand & Slogan (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                <div className="flex items-center gap-1.5 transform -skew-x-12">
                  <span className="w-1.5 h-6 bg-amber-400 rounded-full"></span>
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                LEGGERO <span className="text-amber-400">ENERGY</span>
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-300">
              "Stay Energized with Leggero Energy"
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Providing dependable solar power systems, hybrid inverters, long-life LiFePO4 battery storage, climate HVAC solutions, and certified washing machine repair services.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/leggeroenergy?stkn=MXJub3o0bzV5Ymg0ag=="
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-amber-400 hover:text-slate-950 border border-slate-800 flex items-center justify-center text-slate-300 transition-colors"
                title="Instagram @leggeroenergy"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/2348061677539"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-emerald-500 hover:text-white border border-slate-800 flex items-center justify-center text-slate-300 transition-colors"
                title="WhatsApp Hotline"
              >
                <Phone className="w-4 h-4" />
              </a>

              <a
                href="mailto:leggeroenergy@gmail.com"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-blue-600 hover:text-white border border-slate-800 flex items-center justify-center text-slate-300 transition-colors"
                title="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links & Tools (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onScrollToCalculator}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Solar Power Calculator
                </button>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  All Services
                </a>
              </li>
              <li>
                <a href="#solar-solutions" className="hover:text-amber-400 transition-colors">
                  Solar & Hybrid Inverters
                </a>
              </li>
              <li>
                <a href="#appliance-repairs" className="hover:text-amber-400 transition-colors">
                  Washing Machine Repairs
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Book Technical Survey
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Breakdown (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Our Capabilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Reliable Solar Solutions</li>
              <li>• Pure Sine Wave Inverters</li>
              <li>• LiFePO4 Lithium Battery Systems</li>
              <li>• Inverter Air Conditioning (HVAC)</li>
              <li>• Heat Extractor Installation</li>
              <li>• Washing Machine Diagnostics & Repairs</li>
              <li>• Genuine OEM Replacement Parts</li>
            </ul>
          </div>

          {/* Col 4: Contact & Channels (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <a href="tel:08061677539" className="hover:text-white block font-mono">
                    08061677539 (WhatsApp)
                  </a>
                  <a href="tel:08167958095" className="hover:text-white block font-mono">
                    08167958095 (Hotline)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="break-all">
                  <a href="mailto:leggeroenergy@gmail.com" className="hover:text-white block">
                    leggeroenergy@gmail.com
                  </a>
                  <a href="mailto:Leggerotech@gmail.com" className="hover:text-white block">
                    Leggerotech@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Instagram className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href="https://www.instagram.com/leggeroenergy?stkn=MXJub3o0bzV5Ymg0ag=="
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white inline-flex items-center gap-1 text-amber-400 font-semibold"
                  >
                    @leggeroenergy
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <div className="text-[11px] text-slate-500">Facebook · Instagram · TikTok</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Unboxed Metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Leggero Energy (LeggeroTech). All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>Clean Energy Engineering</span>
            <span aria-hidden="true">·</span>
            <span>Solar & Inverter Storage</span>
            <span aria-hidden="true">·</span>
            <span>HVAC & Appliance Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
