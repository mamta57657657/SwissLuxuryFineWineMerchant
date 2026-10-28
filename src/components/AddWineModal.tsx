import React, { useState } from 'react';
import { WineProduct } from '../utils/wine-logic.ts';
import { X, Plus, Sparkles, Check, Wine, ShieldCheck } from 'lucide-react';

interface AddWineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWine: (wine: WineProduct) => void;
}

export const AddWineModal: React.FC<AddWineModalProps> = ({
  isOpen,
  onClose,
  onAddWine,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [producer, setProducer] = useState('');
  const [vintage, setVintage] = useState<string>('2020');
  const [region, setRegion] = useState<string>('Champagne');
  const [appellation, setAppellation] = useState('');
  const [type, setType] = useState<'Champagne' | 'Red' | 'White' | 'Rosé'>('Champagne');
  const [format, setFormat] = useState<'75cl' | '150cl' | '300cl' | 'Case (6x75cl)'>('75cl');
  const [priceCHF, setPriceCHF] = useState<string>('280.00');
  const [critic, setCritic] = useState<'RP' | 'WS' | 'RG' | 'JS'>('RP');
  const [score, setScore] = useState<string>('97');
  const [stock, setStock] = useState<number>(6);
  const [inVaultAvailable, setInVaultAvailable] = useState<boolean>(true);
  const [nose, setNose] = useState('Note eleganti di piccoli frutti, mineralità gessosa e pasticceria fine.');
  const [palate, setPalate] = useState('Attacco aristocratico, trama setosa e finale persistente e salino.');
  const [servingTemp, setServingTemp] = useState('10°C - 12°C');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !producer) return;

    const parsedPrice = parseFloat(priceCHF) || 100;
    const parsedScore = parseInt(score, 10) || 95;
    const parsedVintage = vintage.toUpperCase() === 'NV' ? 'NV' : parseInt(vintage, 10) || 'NV';

    const newWine: WineProduct = {
      id: `custom-${Date.now()}-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name,
      producer,
      vintage: parsedVintage,
      region,
      country: region === 'Tuscany' ? 'Italy' : region === 'Switzerland' ? 'Switzerland' : 'France',
      appellation: appellation || `${region} AOC`,
      type,
      format,
      priceCHF: parsedPrice,
      criticScores: [{ critic, score: parsedScore }],
      stock,
      inVaultAvailable,
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
      description: `Rara allocazione di ${name} firmata da ${producer}. Custodita e certificata da ARVI SA nel caveau di Melano.`,
      tastingNotes: {
        nose,
        palate,
        finish: 'Lunghissimo, aristocratico e persistente.',
        aging: '2024 - 2045+',
        servingTemp,
        decantTime: type === 'Red' ? '2 ore' : 'Servire fresco',
      },
    };

    onAddWine(newWine);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-wine-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-xl shadow-2xl border border-[#EBE6DF] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#EBE6DF] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#4A1525]/10 rounded text-[#4A1525]">
              <Wine className="w-5 h-5 text-[#4A1525]" />
            </div>
            <div>
              <h2 id="add-wine-modal-title" className="font-serif text-lg font-bold text-[#1A1718]">
                Aggiungi un Vino alla Collezione Grand Cru & Champagne
              </h2>
              <p className="text-[11px] text-[#8C827A]">
                Inserisci una nuova referenza o allocazione per ARVI SA
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi"
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 text-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#1A1718] mb-1">
                Nome del Vino / Cuvée *
              </label>
              <input
                type="text"
                required
                placeholder="es. Krug Clos du Mesnil"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#1A1718] mb-1">
                Produttore / Château / Domaine *
              </label>
              <input
                type="text"
                required
                placeholder="es. Maison Krug"
                value={producer}
                onChange={(e) => setProducer(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#1A1718] mb-1">
                Annata (Vintage o NV) *
              </label>
              <input
                type="text"
                required
                placeholder="es. 2008 o NV"
                value={vintage}
                onChange={(e) => setVintage(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#1A1718] mb-1">
                Regione Vitivinicola
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none cursor-pointer"
              >
                <option value="Champagne">Champagne</option>
                <option value="Bordeaux">Bordeaux</option>
                <option value="Burgundy">Borgogna (Burgundy)</option>
                <option value="Tuscany">Toscana (Tuscany)</option>
                <option value="Switzerland">Svizzera (Switzerland)</option>
                <option value="Piedmont">Piemonte</option>
                <option value="Rhône">Valle del Rodano</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#1A1718] mb-1">
                Tipologia Vino
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none cursor-pointer"
              >
                <option value="Champagne">Champagne</option>
                <option value="Red">Vino Rosso</option>
                <option value="White">Vino Bianco</option>
                <option value="Rosé">Rosé</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#1A1718] mb-1">
                Formato Bottiglia
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none cursor-pointer"
              >
                <option value="75cl">Standard (75cl)</option>
                <option value="150cl">Magnum (150cl)</option>
                <option value="300cl">Double Magnum (300cl)</option>
                <option value="Case (6x75cl)">Cassa Legno OWC (6x 75cl)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#1A1718] mb-1">
                Prezzo al Dettaglio (CHF) *
              </label>
              <input
                type="number"
                step="0.05"
                required
                placeholder="es. 490.00"
                value={priceCHF}
                onChange={(e) => setPriceCHF(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#1A1718] mb-1">
                Denominazione / Appellation
              </label>
              <input
                type="text"
                placeholder="es. Champagne Grand Cru AOC"
                value={appellation}
                onChange={(e) => setAppellation(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none"
              />
            </div>

            {/* Critic Score */}
            <div>
              <label className="block text-[11px] font-semibold text-[#1A1718] mb-1">
                Punteggio Critica
              </label>
              <div className="flex gap-2">
                <select
                  value={critic}
                  onChange={(e) => setCritic(e.target.value as any)}
                  className="w-1/2 p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none"
                >
                  <option value="RP">Robert Parker (RP)</option>
                  <option value="WS">Wine Spectator (WS)</option>
                  <option value="JS">James Suckling (JS)</option>
                  <option value="RG">René Gabriel (RG)</option>
                </select>
                <input
                  type="number"
                  placeholder="Punteggio (es. 98)"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="w-1/2 p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#1A1718] mb-1">
                Quantità Disponibile in Caveau
              </label>
              <input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value, 10) || 0)}
                className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-white rounded border border-[#EBE6DF]">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={inVaultAvailable}
                onChange={(e) => setInVaultAvailable(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#4A1525] focus:ring-[#C5A059]"
              />
              <span className="font-semibold text-[#1A1718]">
                Idoneo per custodia nella Cassaforte del Vino a Melano (Esente IVA)
              </span>
            </label>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-[#DDD7CD] text-[#4A4543] hover:bg-[#F2ECE4] rounded text-xs font-medium"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#4A1525] hover:bg-[#320C17] text-white rounded text-xs font-semibold uppercase tracking-wider shadow flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-[#E4CA92]" />
              <span>Aggiungi alla Collezione</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
