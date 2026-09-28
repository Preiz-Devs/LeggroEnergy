/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SolarCalculator } from './components/SolarCalculator';
import { ServicesGrid } from './components/ServicesGrid';
import { WhyLeggero } from './components/WhyLeggero';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialService, setBookingInitialService] = useState('Solar System Site Audit');
  const [bookingInitialNotes, setBookingInitialNotes] = useState('');

  const handleOpenBooking = (service?: string, notes?: string) => {
    if (service) setBookingInitialService(service);
    if (notes) setBookingInitialNotes(notes);
    setBookingModalOpen(true);
  };

  const handleScrollToCalculator = () => {
    const el = document.getElementById('solar-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Bar */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onScrollToCalculator={handleScrollToCalculator}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onScrollToCalculator={handleScrollToCalculator}
          onOpenBooking={() => handleOpenBooking('General Site Inspection')}
        />

        {/* Services Bento Grid */}
        <ServicesGrid
          onOpenBooking={(service) => handleOpenBooking(service)}
          onScrollToCalculator={handleScrollToCalculator}
        />

        {/* Core Feature: Solar Power Load Calculator (modeled after itelsolar) */}
        <SolarCalculator
          onOpenBooking={(notes) => handleOpenBooking('Solar System Installation', notes)}
        />

        {/* Why Choose Leggero & Instagram Social Connect */}
        <WhyLeggero
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* Footer */}
      <Footer
        onScrollToCalculator={handleScrollToCalculator}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Booking / Technical Survey Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialService={bookingInitialService}
        initialNotes={bookingInitialNotes}
      />
    </div>
  );
}
