import React, { useState, useMemo } from 'react';
import { WineProduct, Currency, filterWines, formatWinePrice } from '../utils/wine-logic.ts';
import { ProductCard } from './ProductCard.tsx';
import { Search, SlidersHorizontal, LayoutGrid, List, Sparkles, X, ShoppingBag, Eye, Plus, Award } from 'lucide-react';

interface CollectionGridProps {
  wines: WineProduct[];
  currency: Currency;
  includeVAT: boolean;
  onQuickView: (wine: WineProduct) => void;
  onAddToCart: (wine: WineProduct) => void;
  wishlistIds: string[];
  onToggleWishlist: (wine: WineProduct) => void;
  onOpenAddWineModal: () => void;
  searchQuery?: string;
  onSearchQueryChange?: (q: string) => void;
  showScoresOnCards?: boolean;
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({
  wines,
  currency,
  includeVAT,
  onQuickView,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onOpenAddWineModal,
  searchQuery = '',
  onSearchQueryChange,
  showScoresOnCards = true,
}) => {
  const [internalSearch, setInternalSearch] = useState('');
  const search = searchQuery !== undefined ? searchQuery : internalSearch;
  const setSearch = (val: string) => {
    if (onSearchQueryChange) {
      onSearchQueryChange(val);
    } else {
      setInternalSearch(val);
    }
  };

  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [vaultOnly, setVaultOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating-desc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Quick Curated Category Pills
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'champagne' | 'bordeaux' | 'burgundy' | 'tuscany' | 'switzerland'>('all');

  const filtered = useMemo(() => {
    let result = filterWines(wines, {
      search,
      region: activeCategoryFilter === 'champagne'
        ? 'Champagne'
        : activeCategoryFilter === 'bordeaux'
        ? 'Bordeaux'
        : activeCategoryFilter === 'burgundy'
        ? 'Burgundy'
        : activeCategoryFilter === 'tuscany'
        ? 'Tuscany'
        : activeCategoryFilter === 'switzerland'
        ? 'Switzerland'
        : selectedRegion,
      type: activeCategoryFilter === 'champagne' ? 'Champagne' : selectedType,
      minScore: selectedRating > 0 ? selectedRating : undefined,
      inStockOnly,
      vaultOnly,
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.priceCHF - b.priceCHF);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.priceCHF - a.priceCHF);
    } else if (sortBy === 'rating-desc') {
      result = [...result].sort((a, b) => {
        const scoreA = Math.max(...a.criticScores.map((s) => s.score), 0);
        const scoreB = Math.max(...b.criticScores.map((s) => s.score), 0);
        return scoreB - scoreA;
      });
    }

    return result;
  }, [wines, search, activeCategoryFilter, selectedRegion, selectedType, selectedRating, inStockOnly, vaultOnly, sortBy]);

  const regions = ['All', 'Bordeaux', 'Champagne', 'Burgundy', 'Tuscany', 'Switzerland'];

  const resetFilters = () => {
    setSearch('');
    setSelectedRegion('All');
    setSelectedType('All');
    setSelectedRating(0);
    setInStockOnly(false);
    setVaultOnly(false);
    setSortBy('featured');
    setActiveCategoryFilter('all');
  };

  const hasActiveFilters =
    search ||
    activeCategoryFilter !== 'all' ||
    selectedRegion !== 'All' ||
    selectedType !== 'All' ||
    selectedRating > 0 ||
    inStockOnly ||
    vaultOnly;

  return (
    <section id="collection-section" className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium block mb-1">
            Collezione Esclusiva
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1718]">
            Selezione Grand Cru & Champagne di Prestigio
          </h2>
        </div>

        {/* Action button: Add Wine + View mode toggle */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button
            type="button"
            onClick={onOpenAddWineModal}
            className="px-3.5 py-2 bg-[#4A1525] hover:bg-[#320C17] text-white rounded-md font-medium text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            title="Aggiungi un nuovo vino alla collezione ARVI"
          >
            <Plus className="w-3.5 h-3.5 text-[#E4CA92]" />
            <span>Aggiungi un Vino</span>
          </button>

          <span className="text-[#8C827A] hidden sm:inline">|</span>

          <span className="font-medium text-[#1A1718] hidden sm:inline">{filtered.length} bottiglie</span>

          <div className="flex items-center bg-white border border-[#EBE6DF] rounded p-0.5">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              aria-label="Vista griglia fotografica"
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-[#4A1525] text-white' : 'text-[#8C827A] hover:text-[#1A1718]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              aria-label="Vista tabella sommelier"
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'table' ? 'bg-[#4A1525] text-white' : 'text-[#8C827A] hover:text-[#1A1718]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Curated Category Quick Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 text-xs scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveCategoryFilter('all')}
          className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${
            activeCategoryFilter === 'all'
              ? 'bg-[#1A1718] text-white shadow-xs'
              : 'bg-white text-[#4A4543] border border-[#EBE6DF] hover:border-[#C5A059]'
          }`}
        >
          Tutte le Selezioni ({wines.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveCategoryFilter('champagne')}
          className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${
            activeCategoryFilter === 'champagne'
              ? 'bg-[#1A1718] text-white shadow-xs'
              : 'bg-white text-[#4A4543] border border-[#EBE6DF] hover:border-[#C5A059]'
          }`}
        >
          Champagne di Prestigio (Krug, Dom Pérignon, Ruinart...)
        </button>

        <button
          type="button"
          onClick={() => setActiveCategoryFilter('bordeaux')}
          className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${
            activeCategoryFilter === 'bordeaux'
              ? 'bg-[#1A1718] text-white shadow-xs'
              : 'bg-white text-[#4A4543] border border-[#EBE6DF] hover:border-[#C5A059]'
          }`}
        >
          Grand Cru Bordeaux (Ausone, Margaux, Pavie...)
        </button>

        <button
          type="button"
          onClick={() => setActiveCategoryFilter('burgundy')}
          className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${
            activeCategoryFilter === 'burgundy'
              ? 'bg-[#1A1718] text-white shadow-xs'
              : 'bg-white text-[#4A4543] border border-[#EBE6DF] hover:border-[#C5A059]'
          }`}
        >
          Borgogna Grand Cru (Romanée-Conti, Rousseau...)
        </button>

        <button
          type="button"
          onClick={() => setActiveCategoryFilter('tuscany')}
          className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${
            activeCategoryFilter === 'tuscany'
              ? 'bg-[#1A1718] text-white shadow-xs'
              : 'bg-white text-[#4A4543] border border-[#EBE6DF] hover:border-[#C5A059]'
          }`}
        >
          Icone Toscane (Sassicaia, Masseto, Colore)
        </button>

        <button
          type="button"
          onClick={() => setActiveCategoryFilter('switzerland')}
          className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${
            activeCategoryFilter === 'switzerland'
              ? 'bg-[#1A1718] text-white shadow-xs'
              : 'bg-white text-[#4A4543] border border-[#EBE6DF] hover:border-[#C5A059]'
          }`}
        >
          Grandi Vini Svizzeri (Gantenbein...)
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-[#EBE6DF] shadow-xs mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Bar */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cerca per Château, produttore, denominazione o annata..."
              className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] border border-[#DDD7CD] focus:border-[#C5A059] focus:outline-none rounded-lg text-xs text-[#1A1718] placeholder-[#8C827A]"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Region Filter */}
          <div className="md:col-span-3">
            <label htmlFor="region-filter" className="sr-only">Regione</label>
            <select
              id="region-filter"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full py-2 px-3 bg-[#FAF7F2] border border-[#DDD7CD] focus:border-[#C5A059] focus:outline-none rounded-lg text-xs text-[#1A1718] cursor-pointer"
            >
              <option value="All">Tutte le Regioni Vitivinicole</option>
              {regions.filter((r) => r !== 'All').map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-2">
            <label htmlFor="sort-filter" className="sr-only">Ordina per</label>
            <select
              id="sort-filter"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2 px-3 bg-[#FAF7F2] border border-[#DDD7CD] focus:border-[#C5A059] focus:outline-none rounded-lg text-xs text-[#1A1718] cursor-pointer"
            >
              <option value="featured">Consigliati ARVI</option>
              <option value="price-asc">Prezzo: Crescente</option>
              <option value="price-desc">Prezzo: Decrescente</option>
              <option value="rating-desc">Punteggio Critica</option>
            </select>
          </div>

          {/* Rating filter */}
          <div className="md:col-span-2">
            <label htmlFor="rating-filter" className="sr-only">Punteggio</label>
            <select
              id="rating-filter"
              value={selectedRating}
              onChange={(e) => setSelectedRating(Number(e.target.value))}
              className="w-full py-2 px-3 bg-[#FAF7F2] border border-[#DDD7CD] focus:border-[#C5A059] focus:outline-none rounded-lg text-xs text-[#1A1718] cursor-pointer"
            >
              <option value={0}>Tutti i Punteggi</option>
              <option value={95}>95+ Punti (Eccellente)</option>
              <option value={98}>98+ Punti (Leggendario)</option>
            </select>
          </div>
        </div>

        {/* Quick Toggles: In Stock & Vault */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F2ECE4] text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer text-[#4A4543]">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-gray-300 text-[#4A1525] focus:ring-[#C5A059]"
              />
              <span>Solo bottiglie disponibili</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-[#4A4543]">
              <input
                type="checkbox"
                checked={vaultOnly}
                onChange={(e) => setVaultOnly(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-gray-300 text-[#4A1525] focus:ring-[#C5A059]"
              />
              <span>Idonee per deposito Cassaforte Melano</span>
            </label>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-[#8A1C2B] hover:underline font-medium"
            >
              Azzera tutti i filtri
            </button>
          )}
        </div>
      </div>

      {/* Grid or Table Results */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#EBE6DF] p-12 text-center max-w-lg mx-auto">
          <p className="font-serif text-xl text-[#1A1718] mb-2">Nessun vino corrisponde ai criteri</p>
          <p className="text-xs text-[#8C827A] mb-4">
            Modifica i filtri o contatta i nostri sommelier a Melano per richieste di millesimi rari o fuori catalogo.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 bg-[#4A1525] text-white text-xs font-medium rounded hover:bg-[#320C17]"
            >
              Reimposta Filtri
            </button>
            <button
              type="button"
              onClick={onOpenAddWineModal}
              className="px-4 py-2 bg-[#C5A059] text-[#1A1718] text-xs font-semibold rounded hover:bg-[#D4B36F]"
            >
              + Aggiungi un Vino
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((wine) => (
            <ProductCard
              key={wine.id}
              wine={wine}
              currency={currency}
              includeVAT={includeVAT}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              isWishlisted={wishlistIds.includes(wine.id)}
              onToggleWishlist={onToggleWishlist}
              showScoresOnCards={showScoresOnCards}
            />
          ))}
        </div>
      ) : (
        /* Sommelier Tabular List View */
        <div className="bg-white rounded-xl border border-[#EBE6DF] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#8C827A] uppercase tracking-wider border-b border-[#EBE6DF] text-[11px]">
                <tr>
                  <th className="py-3 px-4">Vino & Annata</th>
                  <th className="py-3 px-4">Produttore</th>
                  <th className="py-3 px-4">Regione</th>
                  <th className="py-3 px-4">Formato</th>
                  <th className="py-3 px-4">Critica</th>
                  <th className="py-3 px-4 text-right">Prezzo</th>
                  <th className="py-3 px-4 text-center">Azione</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2ECE4]">
                {filtered.map((wine) => {
                  const priceInfo = formatWinePrice(wine.priceCHF, currency, includeVAT);
                  const primaryScore = wine.criticScores[0];
                  return (
                    <tr key={wine.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => onQuickView(wine)}
                          className="font-serif font-medium text-[#1A1718] hover:text-[#4A1525] text-sm text-left"
                        >
                          {wine.name} {wine.vintage !== 'NV' ? wine.vintage : 'NV'}
                        </button>
                        <p className="text-[11px] text-[#8C827A]">{wine.appellation}</p>
                      </td>
                      <td className="py-3.5 px-4 text-[#4A4543] font-medium">{wine.producer}</td>
                      <td className="py-3.5 px-4 text-[#665F58]">{wine.region}</td>
                      <td className="py-3.5 px-4 text-[#665F58]">{wine.format}</td>
                      <td className="py-3.5 px-4">
                        {primaryScore ? (
                          <span className="font-mono text-[#4A1525] font-semibold">
                            {primaryScore.critic} {primaryScore.score}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right font-serif font-semibold text-sm tabular-nums text-[#1A1718]">
                        {priceInfo.formatted}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onQuickView(wine)}
                            className="p-1.5 text-[#665F58] hover:text-[#4A1525] rounded hover:bg-[#F2ECE4]"
                            title="Vedi 360 e scheda"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {wine.stock > 0 ? (
                            <button
                              type="button"
                              onClick={() => onAddToCart(wine)}
                              className="p-1.5 bg-[#4A1525] hover:bg-[#320C17] text-white rounded shadow-xs"
                              title="Aggiungi al carrello"
                            >
                              <ShoppingBag className="w-4 h-4" />
                            </button>
                          ) : (
                            <span className="text-[10px] text-[#8C827A]">Esaurito</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};
