import React, { useState } from 'react';
import { WineProduct, Currency, formatWinePrice } from '../utils/wine-logic.ts';
import { WineBottleVisualizer } from './WineBottleVisualizer.tsx';
import {
  X,
  ShoppingBag,
  ShieldCheck,
  Award,
  Thermometer,
  Clock,
  Sparkles,
  Share2,
  Check,
  Warehouse,
  Play,
  RotateCw
} from 'lucide-react';

interface ProductDetailModalProps {
  wine: WineProduct | null;
  onClose: () => void;
  currency: Currency;
  includeVAT: boolean;
  onAddToCart: (wine: WineProduct, quantity: number, inVault: boolean) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  wine,
  onClose,
  currency,
  includeVAT,
  onAddToCart,
}) => {
  if (!wine) return null;

  const [quantity, setQuantity] = useState(1);
  const [depositInVault, setDepositInVault] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'sommelier' | 'video'>('details');
  const [selectedFormat, setSelectedFormat] = useState(wine.format);
  const [copiedLink, setCopiedLink] = useState(false);

  const priceInfo = formatWinePrice(wine.priceCHF, currency, includeVAT);
  const isOutOfStock = wine.stock <= 0;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#FBF9F5] rounded-xl shadow-2xl border border-[#EBE6DF] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-3.5 border-b border-[#EBE6DF] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#8C827A] font-medium tracking-wide">
            <span>{wine.region}</span>
            <span aria-hidden="true">/</span>
            <span>{wine.producer}</span>
            <span aria-hidden="true">/</span>
            <span className="font-serif text-[#1A1718] font-bold">{wine.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 text-[#665F58] hover:text-[#1A1718] hover:bg-[#F4EFEB] rounded transition-colors"
              title="Copia link prodotto"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi scheda prodotto"
              className="p-1.5 text-[#665F58] hover:text-[#1A1718] hover:bg-[#F4EFEB] rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive 360° Visualizer & Imagery (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="aspect-[3/4] w-full">
                <WineBottleVisualizer wine={wine} interactiveMode="spin" />
              </div>

              {/* Swiss Storage & Provenance Guarantee Badge */}
              <div className="p-3 bg-white rounded-lg border border-[#EBE6DF] flex items-center gap-3 text-xs">
                <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0" />
                <div>
                  <p className="font-semibold text-[#1A1718]">Controllo Qualità ARVI Melano</p>
                  <p className="text-[#8C827A] text-[11px]">
                    Capsula e livello verificati dai nostri esperti. Conservato a 14°C.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module & Editorial Specs (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              {/* Producer & Vintage */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8C827A] font-medium mb-1">
                  {wine.producer}
                </p>
                <h2
                  id="pdp-modal-title"
                  className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1718] leading-tight"
                >
                  {wine.name} {wine.vintage !== 'NV' ? wine.vintage : 'NV'}
                </h2>
                <p className="text-xs text-[#665F58] mt-1">
                  {wine.appellation} · {wine.country}
                </p>
              </div>

              {/* Critic Scores Badges */}
              {wine.criticScores.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {wine.criticScores.map((score, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F4EFEB] rounded text-xs font-medium text-[#4A1525] border border-[#DDD7CD]"
                    >
                      <Award className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span className="font-mono text-[#8C827A]">{score.critic}:</span>
                      <span className="font-serif font-bold text-sm">
                        {score.score}
                        {score.critic === 'RG' ? '/20' : '/100'}
                      </span>
                    </div>
                  ))}
                  <span className="text-xs text-[#8C827A]">Punteggi critici certificati</span>
                </div>
              )}

              {/* Pricing Module */}
              <div className="p-4 bg-white rounded-lg border border-[#EBE6DF]">
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1718] tabular-nums">
                      {priceInfo.formatted}
                    </span>
                    <span className="text-xs text-[#8C827A] ml-2">
                      {includeVAT ? 'IVA 8.1% inclusa' : 'Esente IVA'}
                    </span>
                  </div>

                  <div className="text-right">
                    {wine.stock > 0 ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
                        <Check className="w-3.5 h-3.5" />
                        <span>Disponibile ({wine.stock} bts)</span>
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded">
                        Esaurito
                      </span>
                    )}
                  </div>
                </div>

                {/* Cassaforte del Vino Deposit Option Toggle */}
                {wine.inVaultAvailable && (
                  <div className="mt-4 pt-3 border-t border-[#F2ECE4]">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={depositInVault}
                        onChange={(e) => setDepositInVault(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#4A1525] focus:ring-[#C5A059]"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-[#1A1718] flex items-center gap-1.5">
                          <Warehouse className="w-3.5 h-3.5 text-[#C5A059]" />
                          Custodisci nella mia Cassaforte del Vino a Melano
                        </span>
                        <p className="text-[#8C827A] text-[11px] mt-0.5">
                          Stoccaggio in caveau refrigerato 14°C ad alta sicurezza. Esente da IVA svizzera se esportato o mantenuto in deposito doganale.
                        </p>
                      </div>
                    </label>
                  </div>
                )}

                {/* Format selection */}
                <div className="mt-4 pt-3 border-t border-[#F2ECE4]">
                  <label className="block text-xs font-medium text-[#4A4543] mb-1.5">
                    Formato Bottiglia
                  </label>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {['75cl', '150cl Magnum', 'Case (6x75cl)'].map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setSelectedFormat(fmt as any)}
                        className={`px-3 py-1.5 rounded border transition-colors ${
                          selectedFormat.includes(fmt.substring(0, 4))
                            ? 'bg-[#4A1525] text-white border-[#4A1525] font-medium'
                            : 'bg-white text-[#4A4543] border-[#EBE6DF] hover:border-[#C5A059]'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Add to Cart button */}
                <div className="mt-4 pt-4 border-t border-[#F2ECE4] flex items-center gap-3">
                  <div className="flex items-center border border-[#DDD7CD] rounded bg-[#FAF7F2]">
                    <button
                      type="button"
                      disabled={quantity <= 1 || isOutOfStock}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-[#4A4543] hover:text-black disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="px-2 font-mono text-sm tabular-nums font-semibold text-[#1A1718]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      disabled={quantity >= wine.stock || isOutOfStock}
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-2 text-[#4A4543] hover:text-black disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    disabled={isOutOfStock}
                    onClick={() => {
                      onAddToCart(wine, quantity, depositInVault);
                      onClose();
                    }}
                    className="flex-1 py-3 px-6 bg-[#4A1525] hover:bg-[#320C17] disabled:bg-gray-400 text-white font-medium text-xs tracking-wider uppercase rounded shadow transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#E4CA92]" />
                    <span>
                      {isOutOfStock ? 'Attualmente Esaurito' : 'Aggiungi al Carrello'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Tabs: Details / Sommelier Notes / Video */}
              <div className="border-b border-[#EBE6DF] flex items-center gap-6 text-xs uppercase tracking-wider font-medium">
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'details' ? 'text-[#4A1525] font-bold' : 'text-[#8C827A] hover:text-[#1A1718]'
                  }`}
                >
                  Descrizione
                  {activeTab === 'details' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A1525]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('sommelier')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'sommelier' ? 'text-[#4A1525] font-bold' : 'text-[#8C827A] hover:text-[#1A1718]'
                  }`}
                >
                  Note del Sommelier
                  {activeTab === 'sommelier' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A1525]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('video')}
                  className={`pb-2.5 transition-colors relative flex items-center gap-1.5 ${
                    activeTab === 'video' ? 'text-[#4A1525] font-bold' : 'text-[#8C827A] hover:text-[#1A1718]'
                  }`}
                >
                  <Play className="w-3 h-3 text-[#C5A059]" />
                  <span>Degustazione Video</span>
                  {activeTab === 'video' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A1525]" />}
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === 'details' && (
                <div className="text-xs text-[#4A4543] leading-relaxed space-y-3">
                  <p>{wine.description}</p>
                  <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-[#665F58]">
                    <div className="p-2.5 bg-white rounded border border-[#EBE6DF]">
                      <span className="block text-[#8C827A] uppercase text-[10px] tracking-wider">Paese & Denominazione</span>
                      <span className="font-medium text-[#1A1718]">{wine.country} · {wine.appellation}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded border border-[#EBE6DF]">
                      <span className="block text-[#8C827A] uppercase text-[10px] tracking-wider">Potenziale di Invecchiamento</span>
                      <span className="font-medium text-[#1A1718]">{wine.tastingNotes.aging}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sommelier' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-white rounded border border-[#EBE6DF]">
                    <h4 className="font-serif font-bold text-[#4A1525] text-sm mb-1">Profilo Olfattivo (Naso)</h4>
                    <p className="text-[#4A4543]">{wine.tastingNotes.nose}</p>
                  </div>

                  <div className="p-3 bg-white rounded border border-[#EBE6DF]">
                    <h4 className="font-serif font-bold text-[#4A1525] text-sm mb-1">Esame Gustativo (Palato)</h4>
                    <p className="text-[#4A4543]">{wine.tastingNotes.palate}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div className="p-2.5 bg-white rounded border border-[#EBE6DF] flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-[#C5A059]" />
                      <div>
                        <span className="text-[#8C827A] block">Temp. di Servizio</span>
                        <span className="font-medium text-[#1A1718]">{wine.tastingNotes.servingTemp}</span>
                      </div>
                    </div>
                    <div className="p-2.5 bg-white rounded border border-[#EBE6DF] flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#C5A059]" />
                      <div>
                        <span className="text-[#8C827A] block">Decantazione</span>
                        <span className="font-medium text-[#1A1718]">{wine.tastingNotes.decantTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'video' && (
                <div className="p-4 bg-white rounded border border-[#EBE6DF] text-xs">
                  <div className="relative aspect-video bg-[#1A1718] rounded overflow-hidden flex flex-col items-center justify-center text-center p-4">
                    <img
                      src="/assets/images/arvi_luxury_boutique_1793186969082.jpg"
                      alt="Tasting session lounge"
                      className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-[#C5A059] flex items-center justify-center text-[#1A1718] shadow-lg mb-2">
                        <Play className="w-5 h-5 ml-0.5 fill-[#1A1718]" />
                      </div>
                      <span className="font-serif text-white font-medium text-sm">
                        Masterclass con Head Sommelier ARVI
                      </span>
                      <span className="text-[11px] text-[#D0CBC4] mt-0.5">
                        Analisi sensoriale dell’annata {wine.vintage} e guida all’apertura
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
