import React, { useState } from 'react';
import { ShieldCheck, Calendar, ArrowUpRight, Award, Sparkles, Check, Send } from 'lucide-react';
import { Currency, formatWinePrice } from '../utils/wine-logic.ts';

interface EnPrimeurSectionProps {
  currency: Currency;
  includeVAT: boolean;
}

interface EnPrimeurItem {
  id: string;
  chateau: string;
  appellation: string;
  vintage: number;
  expectedScore: string;
  indicativePriceCHF: number;
  deliveryDate: string;
  status: 'Allocazione Aperta' | 'Ultime Casse' | 'In Esaurimento';
  notes: string;
}

const EN_PRIMEUR_LIST: EnPrimeurItem[] = [
  {
    id: 'ep-chateau-margaux-2023',
    chateau: 'Château Margaux',
    appellation: 'Margaux 1er Grand Cru Classé',
    vintage: 2023,
    expectedScore: '98-100 RP',
    indicativePriceCHF: 540.00,
    deliveryDate: 'Primavera 2026',
    status: 'Allocazione Aperta',
    notes: 'Una purezza aromatica celestiale, velluto di viola e cassis con trama tannica di millimetrica precisione.'
  },
  {
    id: 'ep-cheval-blanc-2023',
    chateau: 'Château Cheval Blanc',
    appellation: 'Saint-Émilion 1er Grand Cru Classé A',
    vintage: 2023,
    expectedScore: '99-100 JS',
    indicativePriceCHF: 580.00,
    deliveryDate: 'Primavera 2026',
    status: 'Ultime Casse',
    notes: 'Trionfo di Cabernet Franc e Merlot con freschezza minerale straordinaria e longevità monumentale.'
  },
  {
    id: 'ep-chateau-haut-brion-2023',
    chateau: 'Château Haut-Brion',
    appellation: 'Pessac-Léognan 1er Grand Cru Classé',
    vintage: 2023,
    expectedScore: '97-99 WS',
    indicativePriceCHF: 530.00,
    deliveryDate: 'Primavera 2026',
    status: 'In Esaurimento',
    notes: 'Fumé aristocratico, grafite, mirtilli neri e complessità terziaria già vibrante in botte.'
  }
];

export const EnPrimeurSection: React.FC<EnPrimeurSectionProps> = ({ currency, includeVAT }) => {
  const [selectedEstate, setSelectedEstate] = useState<EnPrimeurItem | null>(null);
  const [submittedEstate, setSubmittedEstate] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [caseCount, setCaseCount] = useState(1);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEstate && emailInput) {
      setSubmittedEstate(selectedEstate.chateau);
      setTimeout(() => {
        setSelectedEstate(null);
        setSubmittedEstate(null);
        setEmailInput('');
      }, 3000);
    }
  };

  return (
    <section id="en-primeur" className="py-20 bg-[#161314] text-[#FBF9F5] relative overflow-hidden border-t border-[#2C2725]">
      {/* Background Ambience with generated barrel cellar photo */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-luminosity">
        <img
          src="/src/assets/images/barrel_cellar_enprimeur_1793199090519.jpg"
          alt="Bordeaux Barrel Cellar"
          className="w-full h-full object-cover filter brightness-75 contrast-125"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Kicker & Editorial Title */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#C5A059]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
              Campagna Esclusiva Bordeaux Futures
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
            Allocazioni En Primeur <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#E8D4B0]">direttamente dallo Château.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#D0CBC4] leading-relaxed">
            Acquista in anteprima i grandi millesimi del mondo mentre affinano ancora in barrique a Bordeaux. 
            ARVI garantisce provenienza al 100% diretta dalla proprietà, tracciabilità totale, e custodia opzionale 
            in deposito doganale a Melano senza imposizione di IVA fino al riscatto.
          </p>
        </div>

        {/* 3 Steps of the ARVI En Primeur Journey */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] font-serif font-bold text-base mb-4">
              01
            </div>
            <h3 className="font-serif text-lg text-white font-medium mb-1.5">Degustazione & Selezione</h3>
            <p className="text-xs text-[#B8B2AA] leading-relaxed">
              Il team di sommelier e Masters of Wine ARVI assaggia ogni botte in primavera per selezionare solo i cru destinati all'eccellenza.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] font-serif font-bold text-base mb-4">
              02
            </div>
            <h3 className="font-serif text-lg text-white font-medium mb-1.5">Garanzia del Prezzo di Lancio</h3>
            <p className="text-xs text-[#B8B2AA] leading-relaxed">
              Blocchi l'allocazione al prezzo di prima uscita, storicamente il più vantaggioso prima dell'imbottigliamento e della rivalutazione.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] font-serif font-bold text-base mb-4">
              03
            </div>
            <h3 className="font-serif text-lg text-white font-medium mb-1.5">Consegna OWC o Caveau Melano</h3>
            <p className="text-xs text-[#B8B2AA] leading-relaxed">
              Le casse in legno originali (OWC) arrivano direttamente a Melano in furgoni climatizzati. Scegli se riceverle a casa o custodirle in caveau esente IVA.
            </p>
          </div>
        </div>

        {/* Featured En Primeur Allocations Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1E1A1B] p-6 sm:p-8 rounded-2xl border border-[#3A3331]">
          {/* Left Column: Visual Backdrop (5 cols) */}
          <div className="lg:col-span-5 relative rounded-xl overflow-hidden aspect-[4/3] group">
            <img
              src="/src/assets/images/barrel_cellar_enprimeur_1793199090519.jpg"
              alt="Bordeaux Barriques ARVI"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#C5A059] text-[#1A1718] font-semibold text-[11px] rounded uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Allocazioni Garantite
              </span>
              <p className="font-serif text-lg text-white font-medium">Bordeaux Millésime 2023</p>
              <p className="text-xs text-[#DDD7CD]">Chai d'Élevage · Certificazione ARVI SA</p>
            </div>
          </div>

          {/* Right Column: Active Estates Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#362F2D] pb-3">
              <h3 className="font-serif text-xl text-white font-light">Cru Disponibili in Allocazione Anticipata</h3>
              <span className="text-xs text-[#C5A059] font-medium tracking-wide">Casse da 6x 75cl OWC</span>
            </div>

            <div className="space-y-3">
              {EN_PRIMEUR_LIST.map((item) => {
                const formattedPrice = formatWinePrice(item.indicativePriceCHF, currency, includeVAT);
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#C5A059]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#C5A059]/20 text-[#E8D4B0] border border-[#C5A059]/30">
                          {item.status}
                        </span>
                        <span className="text-[11px] text-[#A69E96] font-mono">
                          {item.expectedScore}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg font-medium text-white">
                        {item.chateau} {item.vintage}
                      </h4>
                      <p className="text-xs text-[#8C827A]">{item.appellation}</p>
                      <p className="text-[11px] text-[#B8B2AA] mt-1 max-w-md line-clamp-1">{item.notes}</p>
                    </div>

                    <div className="flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-center gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                      <div className="text-left sm:text-right">
                        <span className="font-serif text-lg text-white font-semibold tabular-nums">
                          {formattedPrice.formatted}
                        </span>
                        <span className="text-[10px] text-[#A69E96] block">a bottiglia · Cassa OWC</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedEstate(item)}
                        className="px-3.5 py-1.5 bg-[#C5A059] hover:bg-[#D4B26F] text-[#1A1718] font-semibold text-xs rounded transition-colors flex items-center gap-1 shadow-sm"
                      >
                        <span>Richiedi</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {selectedEstate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#221D1E] border border-[#C5A059]/40 rounded-xl p-6 shadow-2xl text-white">
            <h4 className="font-serif text-2xl text-[#E8D4B0] mb-1">
              Richiesta Allocazione En Primeur
            </h4>
            <p className="text-xs text-[#A69E96] mb-4">
              {selectedEstate.chateau} {selectedEstate.vintage} ({selectedEstate.appellation})
            </p>

            {submittedEstate === selectedEstate.chateau ? (
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-center">
                <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-serif text-base text-white font-medium">Richiesta inviata con successo</p>
                <p className="text-xs text-emerald-200 mt-1">
                  Il nostro Wine Advisor ARVI ti contatterà entro 24 ore con il prospetto di allocazione.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#DDD7CD] mb-1">Numero di Casse OWC (6x 75cl)</label>
                  <select
                    value={caseCount}
                    onChange={(e) => setCaseCount(Number(e.target.value))}
                    className="w-full bg-[#181415] border border-[#443C3A] rounded px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
                  >
                    {[1, 2, 3, 5, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Cassa (6 bottiglie)' : 'Casse (' + num * 6 + ' bottiglie)'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#DDD7CD] mb-1">Indirizzo Email o Telefono</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="nome@dominio.ch"
                    className="w-full bg-[#181415] border border-[#443C3A] rounded px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="p-3 bg-[#181415] rounded border border-[#332C2A] text-[11px] text-[#A69E96]">
                  <p>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059] inline mr-1" />
                    Allocazione soggetta a conferma della proprietà. Nessun addebito anticipato fino all'emissione del contratto di acquisto En Primeur ARVI SA.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedEstate(null)}
                    className="px-4 py-2 rounded text-[#A69E96] hover:text-white"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#C5A059] hover:bg-[#D4B26F] text-[#1A1718] font-semibold rounded flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Invia Richiesta</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
