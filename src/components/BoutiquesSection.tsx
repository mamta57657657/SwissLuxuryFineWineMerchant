import React from 'react';
import { BoutiqueLocation, BOUTIQUES } from '../data/wines.ts';

interface BoutiquesSectionProps {
  onSelectBoutique?: (boutique: BoutiqueLocation) => void;
}

export const BoutiquesSection: React.FC<BoutiquesSectionProps> = ({ onSelectBoutique }) => {
  return (
    <section id="shops-section" className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
      {/* Centered Heading matching arvi.ch.jpg */}
      <h2 className="text-center font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#1A1718] mb-8">
        SCOPRI I NOSTRI SHOPS
      </h2>

      {/* 3 Dark Photograph Cards with Centered City Name and Link */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {BOUTIQUES.map((shop) => (
          <div
            key={shop.id}
            onClick={() => onSelectBoutique?.(shop)}
            className="group relative aspect-[4/3] sm:aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-black flex items-center justify-center cursor-pointer rounded-xs"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectBoutique?.(shop);
              }
            }}
            aria-label={`Scopri dettagli e prenota appuntamento boutique ${shop.city}`}
          >
            {/* Background Photography with Dim Scrim */}
            <img
              src={shop.image}
              alt={`ARVI Boutique ${shop.city}`}
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] group-hover:scale-105 group-hover:brightness-[0.6] transition-all duration-500"
              loading="lazy"
            />

            {/* Centered Overlay Text */}
            <div className="relative z-10 flex flex-col items-center text-center p-4">
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-3 tracking-wide">
                {shop.city}
              </h3>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBoutique?.(shop);
                }}
                className="text-xs uppercase tracking-widest text-white/90 underline underline-offset-4 group-hover:text-[#E4CA92] transition-colors cursor-pointer"
              >
                SCOPRI DI PIU'
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
