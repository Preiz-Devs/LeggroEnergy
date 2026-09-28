import React, { useState } from 'react';
import { Phone, MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
  onScrollToCalculator: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onScrollToCalculator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single Brand Lockup Wordmark (Top Bar Contract) */}
          <a href="#" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg">
            <div className="relative flex items-center justify-center w-11 h-11 bg-slate-950 rounded-xl overflow-hidden shadow-inner">
              {/* Distinctive double diagonal energy lightning slashes (Yellow & Royal Blue) */}
              <div className="flex items-center gap-1.5 transform -skew-x-12">
                <span className="w-2 h-7 bg-amber-400 rounded-full transition-transform group-hover:scale-y-110"></span>
                <span className="w-2 h-7 bg-blue-600 rounded-full transition-transform group-hover:scale-y-110"></span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-950 font-display">
                LEGGERO <span className="text-amber-500">ENERGY</span>
              </span>
            </div>
          </a>

          {/* Zone 2: 4-6 Clean Text Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <a href="#services" className="hover:text-blue-700 transition-colors">
              Services
            </a>
            <button
              onClick={onScrollToCalculator}
              className="hover:text-amber-600 transition-colors cursor-pointer text-sm font-semibold text-slate-700"
            >
              Solar Calculator
            </button>
            <a href="#solar-solutions" className="hover:text-blue-700 transition-colors">
              Solar & Inverters
            </a>
            <a href="#appliance-repairs" className="hover:text-blue-700 transition-colors">
              Appliance Repairs
            </a>
            <a
              href="https://www.instagram.com/leggeroenergy?stkn=MXJub3o0bzV5Ymg0ag=="
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-amber-600 transition-colors"
            >
              Instagram
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </nav>

          {/* Zone 3: 1-2 Primary Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/2348061677539?text=Hello%20Leggero%20Energy,%20I%20would%20like%20to%20inquire%20about%20your%20solar%20solutions%20and%20services."
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-blue-700" />
              <span>08061677539</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-lg shadow-sm transition-all whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Book Service / Inspection</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-blue-700"
          >
            Services
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToCalculator();
            }}
            className="block w-full text-left py-2 text-base font-semibold text-slate-800 hover:text-amber-600"
          >
            Solar Calculator
          </button>
          <a
            href="#solar-solutions"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-blue-700"
          >
            Solar & Inverter Solutions
          </a>
          <a
            href="#appliance-repairs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-blue-700"
          >
            Washing Machine & Appliance Repairs
          </a>
          <a
            href="https://www.instagram.com/leggeroenergy?stkn=MXJub3o0bzV5Ymg0ag=="
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between py-2 text-base font-semibold text-slate-800 hover:text-amber-600"
          >
            <span>Instagram (@leggeroenergy)</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="tel:08061677539"
              className="flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-slate-800 bg-slate-100 rounded-lg"
            >
              <Phone className="w-4 h-4 text-blue-700" />
              <span>Call / WhatsApp 08061677539</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-bold text-slate-950 bg-amber-400 rounded-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Book Site Survey / Repair</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
