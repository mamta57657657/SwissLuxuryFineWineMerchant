import React, { useRef } from 'react';
import { WineProduct, Currency, formatWinePrice } from '../utils/wine-logic.ts';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-react';

interface ProductCarouselSectionProps {
  title: string;
  headerType: 'banner' | 'underlined';
  wines: WineProduct[];
  currency: Currency;
  includeVAT: boolean;
  onQuickView: (wine: WineProduct) => void;
  onAddToCart: (wine: WineProduct) => void;
  wishlistIds: string[];
  onToggleWishlist: (wine: WineProduct) => void;
}

export const ProductCarouselSection: React.FC<ProductCarouselSectionProps> = ({
  title,
  headerType,
  wines,
  currency,
  includeVAT,
  onQuickView,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
      {/* Header Variant 1: Dark Grey Banner (e.g. Selezione di Champagne di Prestigio) */}
      {headerType === 'banner' ? (
        <div className="bg-[#2D2D2D] text-white px-5 py-3 rounded-none flex items-center gap-3 mb-6">
          <div className="w-5 h-5 flex items-center justify-center text-[#E5E0D8]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <circle cx="9" cy="12" r="6" />
              <circle cx="15" cy="12" r="6" />
            </svg>
          </div>
          <h2 className="font-sans text-sm sm:text-base font-normal tracking-wide text-[#FAF7F2]">
            {title}
          </h2>
        </div>
      ) : (
        /* Header Variant 2: Underlined Clean Title (e.g. Iconic Fine Wines>>, Limited Edition Gift Selections) */
        <div className="border-b border-[#2D2D2D] pb-2 mb-6">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1A1718] tracking-tight">
            {title}
          </h2>
        </div>
      )}

      {/* Carousel Container with Absolute Navigation Arrows */}
      <div className="relative group/carousel">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={() => scroll('left')}
          aria-label={`Scorri ${title} a sinistra`}
          className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-black hover:bg-[#333] text-white rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scrollable Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 px-1"
        >
          {wines.map((wine) => {
            const priceInfo = formatWinePrice(wine.priceCHF, currency, includeVAT);
            const isWishlisted = wishlistIds.includes(wine.id);
            const primaryScore = wine.criticScores[0];
            const isOutOfStock = wine.stock <= 0;

            return (
              <div
                key={wine.id}
                className="w-[240px] sm:w-[260px] shrink-0 bg-white flex flex-col justify-between group transition-shadow"
              >
                {/* Media Stage: Pale Grey Background */}
                <div className="relative w-full h-72 sm:h-80 bg-[#F8F8F8] flex items-center justify-center p-3 overflow-hidden cursor-pointer">
                  {/* Critic Score (Top Left) */}
                  {primaryScore && (
                    <div className="absolute top-3 left-3 z-10 text-[11px] font-sans font-medium text-[#222]">
                      <span className="font-mono text-[#666] mr-1">{primaryScore.critic}</span>
                      <span className="font-bold">
                        {primaryScore.critic === 'RG' ? `${primaryScore.score}` : `${primaryScore.score}`}
                      </span>
                    </div>
                  )}

                  {/* Bottle Format (Under score or top left) */}
                  <span className="absolute top-8 left-3 z-10 text-[11px] text-[#777] font-sans">
                    {wine.format}
                  </span>

                  {/* Wishlist Heart Icon (Top Right) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(wine);
                    }}
                    aria-label={`Aggiungi ${wine.name} ai desideri`}
                    className="absolute top-3 right-3 z-10 text-[#777] hover:text-[#4A1525] p-1 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? 'fill-[#4A1525] text-[#4A1525]' : 'stroke-current'
                      }`}
                    />
                  </button>

                  {/* Real Studio Bottle Photography */}
                  <div
                    onClick={() => onQuickView(wine)}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={wine.image}
                      alt={`${wine.name} - ${wine.producer}`}
                      className="max-h-60 sm:max-h-68 w-auto object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Wine Information & Purchase Action */}
                <div className="pt-3 pb-2 flex flex-col justify-between flex-1">
                  <div>
                    {/* Title */}
                    <h3
                      onClick={() => onQuickView(wine)}
                      className="font-serif text-sm sm:text-base font-medium text-[#1A1718] hover:text-[#4A1525] cursor-pointer line-clamp-1"
                    >
                      {wine.name} {wine.vintage !== 'NV' ? wine.vintage : ''}
                    </h3>

                    {/* Producer */}
                    <p className="text-xs text-[#777] line-clamp-1 mt-0.5">
                      {wine.producer}
                    </p>
                  </div>

                  {/* Price & Cart Button Row */}
                  <div className="pt-2 mt-2 flex items-center justify-between">
                    <div>
                      {isOutOfStock ? (
                        <span className="text-xs font-bold text-red-600 tracking-wider uppercase">
                          ESAURITO
                        </span>
                      ) : (
                        <span className="font-sans text-sm font-semibold text-[#1A1718] tabular-nums">
                          {priceInfo.formatted}
                        </span>
                      )}
                    </div>

                    {/* Shopping Bag Button (Outline like arvi.ch) */}
                    <button
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => onAddToCart(wine)}
                      aria-label={`Aggiungi ${wine.name} al carrello`}
                      className="p-1.5 text-[#555] hover:text-[#1A1718] hover:bg-[#F2ECE4] rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={() => scroll('right')}
          aria-label={`Scorri ${title} a destra`}
          className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-black hover:bg-[#333] text-white rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
