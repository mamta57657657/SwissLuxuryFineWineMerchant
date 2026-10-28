export interface WineProduct {
  id: string;
  name: string;
  producer: string;
  vintage: number | 'NV';
  region: string;
  country: string;
  appellation: string;
  type: 'Red' | 'White' | 'Champagne' | 'Rosé' | 'Dessert';
  format: '37.5cl' | '75cl' | '150cl' | '300cl' | 'Case (6x75cl)' | 'Case (9x75cl)';
  priceCHF: number;
  criticScores: {
    critic: 'RP' | 'WS' | 'RG' | 'JS';
    score: number;
  }[];
  stock: number;
  inVaultAvailable: boolean;
  isEnPrimeur?: boolean;
  image: string;
  description: string;
  tastingNotes: {
    nose: string;
    palate: string;
    finish: string;
    aging: string;
    servingTemp: string;
    decantTime: string;
  };
}

export type Currency = 'CHF' | 'EUR' | 'USD' | 'GBP';

export const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; decimals: number }> = {
  CHF: { rate: 1.0, symbol: 'CHF', decimals: 2 },
  EUR: { rate: 1.06, symbol: '€', decimals: 2 },
  USD: { rate: 1.14, symbol: '$', decimals: 2 },
  GBP: { rate: 0.89, symbol: '£', decimals: 2 },
};

export const SWISS_VAT_RATE = 0.081; // 8.1% Swiss VAT
export const SWISS_FREE_SHIPPING_THRESHOLD_CHF = 500;

/**
 * Converts price in CHF to target currency with VAT inclusion / exclusion option
 */
export function formatWinePrice(
  priceCHF: number,
  currency: Currency = 'CHF',
  includeVAT: boolean = true
): { formatted: string; amount: number; rawSymbol: string } {
  const currencyInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.CHF;
  let effectiveCHF = priceCHF;

  // If excluding VAT, strip the 8.1% Swiss VAT included in base catalog prices
  if (!includeVAT) {
    effectiveCHF = priceCHF / (1 + SWISS_VAT_RATE);
  }

  const converted = effectiveCHF * currencyInfo.rate;
  const rounded = Math.round(converted * 100) / 100;

  const numberFormatter = new Intl.NumberFormat('de-CH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formatted = `${currencyInfo.symbol} ${numberFormatter.format(rounded)}`;
  return {
    formatted,
    amount: rounded,
    rawSymbol: currencyInfo.symbol,
  };
}

/**
 * Filter wines based on criteria
 */
export interface WineFilterOptions {
  search?: string;
  region?: string;
  type?: string;
  minScore?: number;
  vintageRange?: [number, number];
  inStockOnly?: boolean;
  vaultOnly?: boolean;
  format?: string;
}

function normalizeSearchText(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[-_]/g, ' ')
    .trim();
}

export function filterWines(wines: WineProduct[], options: WineFilterOptions): WineProduct[] {
  return wines.filter((wine) => {
    if (options.search) {
      const qNorm = normalizeSearchText(options.search);
      const searchTerms = qNorm.split(/\s+/).filter(Boolean);
      const combined = normalizeSearchText(
        `${wine.name} ${wine.producer} ${wine.region} ${wine.appellation} ${wine.country}`
      );
      const matchesAll = searchTerms.every((term) => combined.includes(term));
      if (!matchesAll) {
        return false;
      }
    }

    if (options.region && options.region !== 'All' && wine.region !== options.region) {
      return false;
    }

    if (options.type && options.type !== 'All' && wine.type !== options.type) {
      return false;
    }

    if (options.format && options.format !== 'All' && wine.format !== options.format) {
      return false;
    }

    if (options.inStockOnly && wine.stock <= 0) {
      return false;
    }

    if (options.vaultOnly && !wine.inVaultAvailable) {
      return false;
    }

    if (options.minScore) {
      const maxScore = Math.max(...wine.criticScores.map((c) => c.score), 0);
      if (maxScore < options.minScore) {
        return false;
      }
    }

    if (options.vintageRange && typeof wine.vintage === 'number') {
      const [minV, maxV] = options.vintageRange;
      if (wine.vintage < minV || wine.vintage > maxV) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Calculate cart total and free shipping gap
 */
export function calculateCartMetrics(
  items: { product: WineProduct; quantity: number }[],
  currency: Currency = 'CHF',
  includeVAT: boolean = true
) {
  const subtotalCHF = items.reduce((sum, item) => sum + item.product.priceCHF * item.quantity, 0);
  const remainingForFreeShippingCHF = Math.max(0, SWISS_FREE_SHIPPING_THRESHOLD_CHF - subtotalCHF);
  const freeShippingProgressPercent = Math.min(
    100,
    Math.round((subtotalCHF / SWISS_FREE_SHIPPING_THRESHOLD_CHF) * 100)
  );

  const formattedSubtotal = formatWinePrice(subtotalCHF, currency, includeVAT);
  const formattedRemaining = formatWinePrice(remainingForFreeShippingCHF, currency, includeVAT);

  return {
    subtotalCHF,
    formattedSubtotal: formattedSubtotal.formatted,
    isFreeShippingEligible: remainingForFreeShippingCHF === 0,
    remainingForFreeShippingCHF,
    formattedRemaining: formattedRemaining.formatted,
    freeShippingProgressPercent,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

/**
 * Generates Schema.org JSON-LD for rich snippets (Product & Wine)
 */
export function generateWineJsonLd(wine: WineProduct, appUrl: string = 'https://arvi.ch') {
  const primaryScore = wine.criticScores[0];
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: `${wine.name} ${wine.vintage !== 'NV' ? wine.vintage : 'NV'}`,
    image: wine.image.startsWith('http') ? wine.image : `${appUrl}${wine.image}`,
    description: wine.description,
    brand: {
      '@type': 'Brand',
      name: wine.producer,
    },
    category: `Wine > ${wine.region} > ${wine.type}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CHF',
      price: wine.priceCHF.toFixed(2),
      availability: wine.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'ARVI SA',
        url: 'https://arvi.ch',
      },
    },
    aggregateRating: primaryScore
      ? {
          '@type': 'AggregateRating',
          ratingValue: primaryScore.score,
          bestRating: primaryScore.critic === 'RG' ? 20 : 100,
          ratingCount: wine.criticScores.length,
        }
      : undefined,
  };
}
