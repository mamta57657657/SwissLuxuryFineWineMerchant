import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, Sparkles, UserCheck, Calendar, Phone, CheckCircle2, ChevronRight } from 'lucide-react';
import { Currency } from '../utils/wine-logic.ts';

interface PrivateCellarAdvisorySectionProps {
  currency: Currency;
}

export const PrivateCellarAdvisorySection: React.FC<PrivateCellarAdvisorySectionProps> = ({ currency }) => {
  const [bottleCount, setBottleCount] = useState<number>(250);
  const [selectedFocus, setSelectedFocus] = useState<'bordeaux' | 'burgundy' | 'champagne' | 'diversified'>('diversified');
  const [consultationBooked, setConsultationBooked] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // Dynamic portfolio value calculation based on focus
  const multiplier = {
    bordeaux: 480,
    burgundy: 850,
    champagne: 220,
    diversified: 410,
  }[selectedFocus];

  const estimatedValue = bottleCount * multiplier;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactPhone) {
      setConsultationBooked(true);
      setTimeout(() => {
        setConsultationBooked(false);
        setContactName('');
        setContactPhone('');
      }, 5000);
    }
  };

  return (
    <section id="advisory" className="py-20 bg-[#FBF9F5] border-t border-[#E8E2D8] text-[#1A1718] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#4A1525]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#4A1525] font-semibold">
              Servizio Concierge & Private Banking del Vino
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1718] leading-tight">
            Consulenza Cantine Private & <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#4A1525]">Gestione Patrimoniale dei Grand Cru.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#665F58] leading-relaxed">
            Per i collezionisti più esigenti, family office e investitori: ARVI SA offre un servizio di advisory personalizzato 
            diretto dal nostro comitato di Masters of Wine e Head Sommelier. Dalla valutazione assicurativa dell'intera collezione 
            all'approvvigionamento dei millesimi più rari del Novecento.
          </p>
        </div>

        {/* Dual Visual Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Visual 1: Sommelier pouring rare vintage (7 cols) */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-lg border border-[#E3DDD4] group min-h-[380px]">
            <img
              src="/src/assets/images/sommelier_decanter_crystal_1793199088489.jpg"
              alt="ARVI Master Sommelier Decanting Grand Cru"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#C5A059] text-[#1A1718] font-bold text-[10px] rounded uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Head Sommelier Dedicato
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-light">
                Esperienza di Servizio & Scelta del Calice Perfetto
              </h3>
              <p className="text-xs sm:text-sm text-[#DDD7CD] mt-1 max-w-xl">
                Ogni bottiglia custodita da ARVI viene curata secondo protocolli d'eccellenza: analisi della curva evolutiva, 
                controllo delle temperature e suggerimento puntuale del momento ideale di stappatura.
              </p>
            </div>
          </div>

          {/* Visual 2: Ancient Vault Archives with Historic Patina (5 cols) */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg border border-[#E3DDD4] group min-h-[380px] flex flex-col justify-end">
            <img
              src="/src/assets/images/historic_wine_archive_1793199117633.jpg"
              alt="Archivio Storico Millesimi Rari ARVI Melano"
              className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161314]/90 via-[#161314]/50 to-transparent" />
            <div className="relative z-10 p-6 text-white">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded text-[10px] font-medium tracking-wider uppercase mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                Archivio Storico Melano
              </span>
              <h3 className="font-serif text-lg font-normal">Millesimi Leggendari del Novecento</h3>
              <p className="text-xs text-[#DDD7CD] mt-1">
                Bottiglie con patina d'epoca autentica e certificata: 1945, 1961, 1982, 1990 conservate senza interruzioni termiche.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Core Advisory Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-white rounded-xl border border-[#E3DDD4] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#DDD7CD] flex items-center justify-center text-[#4A1525] mb-4">
              <TrendingUp className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h4 className="font-serif text-lg font-medium text-[#1A1718] mb-1.5">Audit & Certificazione Valore</h4>
            <p className="text-xs text-[#665F58] leading-relaxed">
              Inventario dettagliato della tua cantina con perizia dello stato di conservazione (livelli di colmatura, etichette, capsule) e stima del valore assicurativo aggiornato in tempo reale.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#E3DDD4] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#DDD7CD] flex items-center justify-center text-[#4A1525] mb-4">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h4 className="font-serif text-lg font-medium text-[#1A1718] mb-1.5">Ricerca Bottiglie Introvabili</h4>
            <p className="text-xs text-[#665F58] leading-relaxed">
              Hai bisogno di un’annata specifica per un anniversario o per completare una verticale? La rete globale di ARVI individua e acquisisce bottiglie d'eccezione con garanzia di tracciabilità.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#E3DDD4] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#DDD7CD] flex items-center justify-center text-[#4A1525] mb-4">
              <UserCheck className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h4 className="font-serif text-lg font-medium text-[#1A1718] mb-1.5">Cantiniere Privato a Domicilio</h4>
            <p className="text-xs text-[#665F58] leading-relaxed">
              Organizzazione fisica della cantina a casa del cliente: catalogazione su app digitale, rotazione dei millesimi e consulenza sugli abbinamenti per le vostre cene private.
            </p>
          </div>
        </div>

        {/* Interactive Cellar Valuation Estimator & Appointment Booking */}
        <div className="bg-[#1A1718] rounded-2xl p-6 sm:p-10 text-white shadow-xl border border-[#332C2A]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Calculator (7 cols) */}
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium block mb-1">
                Calcolatore Indicativo di Portafoglio
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mb-6">
                Stima il Valore della tua Collezione
              </h3>

              <div className="space-y-6 text-xs">
                {/* Bottle count slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#DDD7CD]">Numero di Bottiglie Pregiate:</span>
                    <span className="font-mono text-base font-semibold text-[#E8D4B0]">
                      {bottleCount} bottiglie
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="50"
                    value={bottleCount}
                    onChange={(e) => setBottleCount(Number(e.target.value))}
                    className="w-full accent-[#C5A059] bg-[#332C2A] h-2 rounded cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#8C827A] mt-1">
                    <span>50 bts (Cantina Iniziale)</span>
                    <span>500 bts (Collezionista)</span>
                    <span>2000+ bts (UHNW Portafoglio)</span>
                  </div>
                </div>

                {/* Focus selection */}
                <div>
                  <label className="block text-[#DDD7CD] mb-2">Composizione Principale della Collezione</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'bordeaux', label: 'Bordeaux Grand Cru' },
                      { id: 'burgundy', label: 'Borgogna Rara' },
                      { id: 'champagne', label: 'Champagne Prestige' },
                      { id: 'diversified', label: 'Misto / Icone' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedFocus(f.id as any)}
                        className={`p-2.5 rounded text-left border text-xs transition-colors ${
                          selectedFocus === f.id
                            ? 'bg-[#C5A059] text-[#1A1718] border-[#C5A059] font-semibold'
                            : 'bg-white/5 text-[#DDD7CD] border-white/10 hover:border-white/30'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculated Result Block */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-[#A69E96] block uppercase tracking-wider">
                      Stima Indicativa di Mercato (CHF)
                    </span>
                    <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#E8D4B0] tabular-nums">
                      CHF {estimatedValue.toLocaleString('de-CH')}.00
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 block font-medium">Idonea per Caveau Melano</span>
                    <span className="text-[10px] text-[#8C827A]">Custodia a partire dallo 0.6% / anno</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column (5 cols) */}
            <div className="lg:col-span-5 bg-white/[0.04] p-6 rounded-xl border border-white/10">
              <h4 className="font-serif text-lg text-white font-medium mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                Richiedi un Audit Confidenziale
              </h4>
              <p className="text-xs text-[#A69E96] mb-4">
                Incontro riservato presso le nostre boutique di Lugano, Zurigo o nella Cassaforte di Melano.
              </p>

              {consultationBooked ? (
                <div className="p-6 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="font-serif text-base text-white">Richiesta Ricevuta</p>
                  <p className="text-xs text-emerald-200 mt-1">
                    Il nostro Head Sommelier vi contatterà al numero indicato con assoluta riservatezza.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#DDD7CD] mb-1">Nome e Cognome / Family Office</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="es. Avv. Mario Rossi"
                      className="w-full bg-[#181415] border border-[#443C3A] rounded px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#DDD7CD] mb-1">Recapito Telefonico Svizzero / Internazionale</label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+41 91 000 00 00"
                      className="w-full bg-[#181415] border border-[#443C3A] rounded px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-[#C5A059] hover:bg-[#D4B26F] text-[#1A1718] font-semibold rounded text-xs transition-colors flex items-center justify-center gap-1.5 shadow"
                  >
                    <span>Prenota Colloquio con Head Sommelier</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-[#8C827A] text-center pt-1">
                    Trattamento dati sotto il segreto professionale svizzero.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
