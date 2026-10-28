import React from 'react';

interface HeroBannerProps {
  onExploreCatalog: () => void;
  onExploreVault: () => void;
  isAgeVerified: boolean;
  onConfirmAge: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreCatalog,
  onExploreVault,
  isAgeVerified,
  onConfirmAge,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#1A1718] text-white">
      {/* Full-width Autumn Alpine Vineyard Hero */}
      <div className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center justify-center">
        <img
          src="/src/assets/images/hero_swiss_vineyard_1793186967803.jpg"
          alt="Una selezione di grandi vini per il tartufo, la selvaggina e i migliori sapori dell'autunno"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.05]"
          fetchPriority="high"
        />

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Centered Welcome / Age Gate Box (matching arvi.ch.jpg) */}
        {!isAgeVerified ? (
          <div className="relative z-20 max-w-lg mx-4 p-8 sm:p-10 bg-white text-[#1A1718] text-center shadow-2xl rounded-xs">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-4 text-[#1A1718]">
              Benvenuto in ARVI!
            </h2>
            <p className="text-xs sm:text-sm text-[#555] font-light leading-relaxed mb-6">
              Accedendo al sito di ARVI SA, dichiaro di avere l'età minima per l'acquisto e consumo di alcolici nel paese in cui risiedo.
            </p>
            <button
              type="button"
              onClick={onConfirmAge}
              className="w-full sm:w-auto px-8 py-3 bg-[#8B7355] hover:bg-[#7A6448] text-white text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors shadow-sm"
            >
              Dichiaro di avere l'età minima
            </button>
          </div>
        ) : (
          /* When Verified: Autumn Narrative Callout (matching arvi.ch.jpg) */
          <div className="relative z-10 max-w-3xl mx-auto px-4 text-center py-16 flex flex-col items-center">
            <p className="font-serif text-xl sm:text-3xl lg:text-4xl font-normal leading-snug text-[#FAF7F2] text-balance mb-6 drop-shadow-md">
              Una selezione di grandi vini per il tartufo, la selvaggina e i migliori sapori dell’autunno.
            </p>

            <button
              type="button"
              onClick={onExploreCatalog}
              className="px-8 py-3 bg-[#8B7355] hover:bg-[#7A6448] text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-lg transition-all duration-200"
            >
              SCOPRI DI PIÙ
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
