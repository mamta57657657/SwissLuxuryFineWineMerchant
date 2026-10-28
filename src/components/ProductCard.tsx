import React, { useState } from 'react';
import { WineProduct, Currency, formatWinePrice } from '../utils/wine-logic.ts';
import { ShoppingBag, Eye, Heart } from 'lucide-react';

interface ProductCardProps {
  wine: WineProduct;
  currency: Currency;
  includeVAT: boolean;
  onQuickView: (wine: WineProduct) => void;
  onAddToCart: (wine: WineProduct) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (wine: WineProduct) => void;
  showScoresOnCards?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  wine,
  currency,
  includeVAT,
  onQuickView,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
  showScoresOnCards = true,
}) => {
  const [imageError, setImageError] = useState(false);
  const priceInfo = formatWinePrice(wine.priceCHF, currency, includeVAT);
  const primaryScore = wine.criticScores[0];
  const isOutOfStock = wine.stock <= 0;

  // Clean title display without repeating vintage
  const displayTitle = wine.name.includes(String(wine.vintage))
    ? wine.name
    : `${wine.name} ${wine.vintage !== 'NV' ? wine.vintage : ''}`.trim();

  return (
    <article className="group relative flex flex-col bg-white rounded-lg border border-[#EBE6DF] hover:border-[#C5A059]/60 hover:shadow-md transition-all duration-300">
      {/* Top Media Showcase Container */}
      <div className="relative w-full h-64 sm:h-72 bg-[#F7F4EF] rounded-t-lg overflow-hidden flex items-center justify-center p-3">
        {/* Top Badges / Metadata - clean unboxed */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
          {primaryScore && showScoresOnCards && (
            <div className="text-[11px] font-semibold tracking-wider text-[#4A1525] bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded border border-[#E2DDD3] shadow-2xs">
              <span className="font-mono text-[#8C827A] mr-1">{primaryScore.critic}</span>
              <span className="font-serif text-sm">{scoreDisplay(primaryScore)}</span>
            </div>
          )}
          <span className="text-[10px] uppercase tracking-wider text-[#665F58] bg-white/90 px-1.5 py-0.5 rounded shadow-2xs">
            {wine.format}
          </span>
        </div>

        {/* Wishlist button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist?.(wine);
          }}
          aria-label={isWishlisted ? `Rimuovi ${wine.name} dai preferiti` : `Aggiungi ${wine.name} ai preferiti`}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-[#665F58] hover:text-[#4A1525] transition-colors shadow-xs"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#4A1525] text-[#4A1525]' : ''}`} />
        </button>

        {/* Real Bottle Photography */}
        <button
          type="button"
          onClick={() => onQuickView(wine)}
          className="w-full h-full flex items-center justify-center cursor-pointer focus:outline-none"
          title={`Visualizza scheda e 360° di ${displayTitle}`}
        >
          {!imageError && wine.image ? (
            <img
              src={wine.image}
              alt={`Bottiglia di ${displayTitle} - ${wine.producer}`}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="h-full w-auto max-h-56 object-contain filter drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            /* Styled Fallback Vector if image cannot be retrieved */
            <div className="relative h-48 sm:h-56 w-24 flex items-center justify-center">
              <svg viewBox="0 0 100 320" className="h-full w-auto drop-shadow-md">
                <path
                  d="M43 20 H57 V50 C57 52, 58 55, 58 60 L58 110 C58 140, 78 160, 78 190 L78 300 C78 308, 74 312, 68 312 H32 C26 312, 22 308, 22 300 L22 190 C22 160, 42 140, 42 110 L42 60 C42 55, 43 52, 43 50 Z"
                  fill={wine.type === 'Rosé' ? '#D68C96' : wine.type === 'Champagne' || wine.type === 'White' ? '#A38B42' : '#221518'}
                  stroke="#1A1718"
                  strokeWidth="1"
                />
                <rect x="26" y="160" width="48" height="85" rx="1" fill="#FAF8F3" stroke="#C5A059" strokeWidth="0.5" />
                <text x="50" y="185" textAnchor="middle" fontFamily="serif" fontSize="7" fontWeight="bold" fill="#1A1718">
                  {wine.name.substring(0, 10)}
                </text>
                <text x="50" y="202" textAnchor="middle" fontFamily="serif" fontSize="9" fontWeight="600" fill="#4A1525">
                  {wine.vintage}
                </text>
              </svg>
            </div>
          )}
        </button>

        {/* Quick View Hover Action */}
        <div className="absolute inset-x-4 bottom-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={() => onQuickView(wine)}
            className="flex-1 py-2 px-3 bg-[#1A1718]/90 hover:bg-[#1A1718] text-white text-xs font-medium rounded shadow flex items-center justify-center gap-1.5 backdrop-blur-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#E4CA92]" />
            <span>Scheda & 360°</span>
          </button>
        </div>
      </div>

      {/* Card Content & Purchasing Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Producer / Region Kicker */}
          <div className="flex items-center gap-1.5 text-xs text-[#8C827A] mb-1 font-medium tracking-wide">
            <span className="truncate">{wine.producer}</span>
            <span aria-hidden="true">·</span>
            <span className="shrink-0">{wine.region}</span>
          </div>

          {/* Product Name & Vintage */}
          <h3 className="font-serif text-lg font-medium text-[#1A1718] leading-snug group-hover:text-[#4A1525] transition-colors line-clamp-1">
            <button
              type="button"
              onClick={() => onQuickView(wine)}
              className="text-left hover:underline focus:outline-none"
            >
              {displayTitle}
            </button>
          </h3>

          {/* Appellation & Vault Tag */}
          <p className="text-xs text-[#665F58] line-clamp-1 mt-0.5">
            {wine.appellation}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-2 border-t border-[#F2ECE4] flex items-center justify-between gap-2">
          <div>
            <div className="font-serif text-base font-semibold text-[#1A1718] tabular-nums">
              {priceInfo.formatted}
            </div>
            <div className="text-[10px] text-[#8C827A]">
              {includeVAT ? 'IVA svizzera inclusa' : 'Esente IVA (deposito)'}
            </div>
          </div>

          {isOutOfStock ? (
            <span className="text-xs font-medium text-[#8C827A] bg-[#EFECE6] px-2.5 py-1 rounded">
              Esaurito
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onAddToCart(wine)}
              className="p-2 rounded-md bg-[#FAF7F2] hover:bg-[#4A1525] text-[#4A1525] hover:text-white border border-[#E2DDD3] hover:border-[#4A1525] transition-colors flex items-center justify-center shadow-xs"
              title={`Aggiungi ${displayTitle} al carrello`}
              aria-label={`Aggiungi ${displayTitle} al carrello`}
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

function scoreDisplay(score: { critic: string; score: number }) {
  if (score.critic === 'RG') return `${score.score}/20`;
  return `${score.score}`;
}
