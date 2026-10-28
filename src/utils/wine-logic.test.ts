import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatWinePrice,
  calculateCartMetrics,
  filterWines,
  WineProduct,
  SWISS_FREE_SHIPPING_THRESHOLD_CHF,
  generateWineJsonLd
} from './wine-logic.ts';

const mockWines: WineProduct[] = [
  {
    id: 'chateau-ausone-1995',
    name: 'Ausone',
    producer: 'Château Ausone',
    vintage: 1995,
    region: 'Bordeaux',
    country: 'France',
    appellation: 'Saint-Émilion Grand Cru',
    type: 'Red',
    format: '300cl',
    priceCHF: 2918.70,
    criticScores: [{ critic: 'RG', score: 19 }],
    stock: 2,
    inVaultAvailable: true,
    image: '/assets/sample.jpg',
    description: 'Legendary Saint-Émilion double magnum.',
    tastingNotes: {
      nose: 'Black truffles, graphite, crushed cassis',
      palate: 'Velvety density, aristocratic tannins',
      finish: 'Minute-long persistence',
      aging: '2020-2055',
      servingTemp: '17°C',
      decantTime: '2 Hours'
    }
  },
  {
    id: 'pol-roger-brut-nv',
    name: 'Brut Réserve NV',
    producer: 'Pol Roger',
    vintage: 'NV',
    region: 'Champagne',
    country: 'France',
    appellation: 'Champagne AOC',
    type: 'Champagne',
    format: '75cl',
    priceCHF: 46.50,
    criticScores: [{ critic: 'RP', score: 92 }],
    stock: 48,
    inVaultAvailable: true,
    image: '/assets/pol-roger.jpg',
    description: 'Crisp, elegant Champagne with fine mousse.',
    tastingNotes: {
      nose: 'Brioche, white peach, honeysuckle',
      palate: 'Vibrant acidity with pastry creaminess',
      finish: 'Clean chalky limestone finish',
      aging: 'Now through 2028',
      servingTemp: '8-10°C',
      decantTime: 'None'
    }
  },
  {
    id: 'chambertin-2019',
    name: 'Chambertin Grand Cru',
    producer: 'Domaine Armand Rousseau',
    vintage: 2019,
    region: 'Burgundy',
    country: 'France',
    appellation: 'Chambertin Grand Cru',
    type: 'Red',
    format: '75cl',
    priceCHF: 2450.00,
    criticScores: [{ critic: 'RP', score: 99 }],
    stock: 0, // Sold out
    inVaultAvailable: false,
    image: '/assets/rousseau.jpg',
    description: 'Monolithic Burgundy pinnacle.',
    tastingNotes: {
      nose: 'Wild strawberries, forest floor, rose petals',
      palate: 'Weightless power, satiny texture',
      finish: 'Harmonious and eternal',
      aging: '2030-2060',
      servingTemp: '16°C',
      decantTime: '3 Hours'
    }
  }
];

test('formatWinePrice calculates correctly with Swiss VAT included and excluded', () => {
  const priceCHF = 108.10;
  // With 8.1% VAT, price is 108.10
  const withVat = formatWinePrice(priceCHF, 'CHF', true);
  assert.equal(withVat.rawSymbol, 'CHF');
  assert.equal(withVat.amount, 108.10);

  // Excluded VAT: 108.10 / 1.081 = 100.00
  const withoutVat = formatWinePrice(priceCHF, 'CHF', false);
  assert.equal(withoutVat.amount, 100);
});

test('formatWinePrice converts to foreign currencies accurately', () => {
  const priceCHF = 100.00;
  const inEUR = formatWinePrice(priceCHF, 'EUR', true);
  assert.equal(inEUR.rawSymbol, '€');
  assert.equal(inEUR.amount, 106.00);

  const inUSD = formatWinePrice(priceCHF, 'USD', true);
  assert.equal(inUSD.rawSymbol, '$');
  assert.equal(inUSD.amount, 114.00);
});

test('calculateCartMetrics calculates subtotal, count and free shipping threshold', () => {
  const items = [
    { product: mockWines[1], quantity: 2 }, // 46.50 * 2 = 93.00 CHF
  ];
  const metrics = calculateCartMetrics(items, 'CHF', true);
  assert.equal(metrics.subtotalCHF, 93.00);
  assert.equal(metrics.itemCount, 2);
  assert.equal(metrics.isFreeShippingEligible, false);
  assert.equal(metrics.remainingForFreeShippingCHF, SWISS_FREE_SHIPPING_THRESHOLD_CHF - 93);
  assert.equal(metrics.freeShippingProgressPercent, Math.round((93 / 500) * 100));

  // Add expensive wine to exceed 500 CHF
  const itemsOver = [
    { product: mockWines[0], quantity: 1 } // 2918.70 CHF
  ];
  const metricsOver = calculateCartMetrics(itemsOver, 'CHF', true);
  assert.equal(metricsOver.isFreeShippingEligible, true);
  assert.equal(metricsOver.remainingForFreeShippingCHF, 0);
  assert.equal(metricsOver.freeShippingProgressPercent, 100);
});

test('filterWines filters by region, stock, and search string', () => {
  const champagneOnly = filterWines(mockWines, { region: 'Champagne' });
  assert.equal(champagneOnly.length, 1);
  assert.equal(champagneOnly[0].id, 'pol-roger-brut-nv');

  const inStockOnly = filterWines(mockWines, { inStockOnly: true });
  assert.equal(inStockOnly.length, 2);
  assert.ok(inStockOnly.every(w => w.stock > 0));

  const searched = filterWines(mockWines, { search: 'Rousseau' });
  assert.equal(searched.length, 1);
  assert.equal(searched[0].id, 'chambertin-2019');

  // Accent & hyphen tolerance: "chateau ausone" matches "Château Ausone"
  const accentTolerant = filterWines(mockWines, { search: 'chateau ausone' });
  assert.equal(accentTolerant.length, 1);
  assert.equal(accentTolerant[0].id, 'chateau-ausone-1995');
});

test('generateWineJsonLd outputs valid Product and Offer schema', () => {
  const jsonLd = generateWineJsonLd(mockWines[0]);
  assert.equal(jsonLd['@type'], 'Product');
  assert.equal(jsonLd.name, 'Ausone 1995');
  assert.equal(jsonLd.offers.priceCurrency, 'CHF');
  assert.equal(jsonLd.offers.availability, 'https://schema.org/InStock');
  assert.equal(jsonLd.brand.name, 'Château Ausone');
});

test('filterWines filters by minimum score and wine type', () => {
  const highScoring = filterWines(mockWines, { minScore: 95 });
  // Pol Roger is 92, Rousseau is 99, Ausone has RG: 19 which is scaled or checked
  assert.ok(highScoring.some(w => w.id === 'chambertin-2019'));

  const champagneType = filterWines(mockWines, { type: 'Champagne' });
  assert.equal(champagneType.length, 1);
  assert.equal(champagneType[0].type, 'Champagne');
});

