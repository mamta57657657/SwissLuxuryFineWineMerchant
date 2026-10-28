import React from 'react';

interface CassaforteVaultSectionProps {
  onReserveVault: () => void;
}

export const CassaforteVaultSection: React.FC<CassaforteVaultSectionProps> = ({ onReserveVault }) => {
  return (
    <section id="vault-section" className="w-full my-8 sm:my-12 overflow-hidden bg-[#EFECE6]">
      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[380px] sm:min-h-[440px]">
        {/* Left Side: Editorial Headline & Scopri di Più Button */}
        <div className="flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-12 bg-[#F3F0EA] relative">
          {/* Subtle textured line pattern */}
          <div className="max-w-md">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1718] mb-3 leading-tight tracking-tight">
              Cassaforte del vino
            </h2>

            <p className="font-serif text-base sm:text-lg text-[#555] italic mb-6">
              Conserva i tuoi vini da noi
            </p>

            <button
              type="button"
              onClick={onReserveVault}
              className="px-8 py-3 bg-[#8B7355] hover:bg-[#7A6448] text-white text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors shadow-sm"
            >
              SCOPRI DI PIÙ
            </button>
          </div>
        </div>

        {/* Right Side: Close-up Photography of Hygrometer, Thermometer and Cellar Hardware */}
        <div className="relative min-h-[260px] md:min-h-full overflow-hidden bg-[#1A1718]">
          <img
            src="/src/assets/images/cassaforte_hygrometer_1793198288877.jpg"
            alt="Hygromètre et thermomètre de précision dans la cave ARVI à Melano"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
