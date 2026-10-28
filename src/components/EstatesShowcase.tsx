import React from 'react';

interface EstatesShowcaseProps {
  onSelectEstate: (estateName: string) => void;
}

export const EstatesShowcase: React.FC<EstatesShowcaseProps> = ({ onSelectEstate }) => {
  const estates = [
    {
      id: 'pontet-canet',
      name: 'Chateau Pontet Canet',
      image: '/src/assets/images/chateau_bordeaux_estate_1793186968365.jpg',
      alt: 'Chateau Pontet Canet entrance and yellow flowers',
    },
    {
      id: 'chavy-chouet',
      name: 'Chavy Chouet',
      image: '/src/assets/images/chavy_chouet_glass_1793198287769.jpg',
      alt: 'Chavy Chouet glass overlooking Burgundy vineyards',
    },
    {
      id: 'chateau-pavie',
      name: 'Chateau Pavie',
      image: '/src/assets/images/historic_wine_archive_1793199117633.jpg',
      alt: 'Chateau Pavie Grand Cru Classé A Saint-Émilion',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {estates.map((estate) => (
          <div
            key={estate.id}
            onClick={() => onSelectEstate(estate.name)}
            className="group cursor-pointer flex flex-col"
          >
            {/* Aspect Square / Portrait Photo */}
            <div className="aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-[#F2F2F2]">
              <img
                src={estate.image}
                alt={estate.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Estate Title & Scopri Link */}
            <div className="pt-3">
              <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1A1718] group-hover:text-[#4A1525] transition-colors">
                {estate.name}
              </h3>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectEstate(estate.name);
                }}
                className="text-xs text-[#555] hover:text-[#1A1718] underline underline-offset-4 mt-1 transition-colors cursor-pointer"
              >
                Scopri
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
