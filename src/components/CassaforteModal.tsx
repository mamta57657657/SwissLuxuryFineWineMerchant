import React, { useState } from 'react';
import { X, ShieldCheck, Thermometer, Droplets, Lock, FileCheck, CheckCircle2, Warehouse, Sparkles } from 'lucide-react';

interface CassaforteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CassaforteModal: React.FC<CassaforteModalProps> = ({ isOpen, onClose }) => {
  const [bottles, setBottles] = useState('120');
  const [serviceTier, setServiceTier] = useState<'standard' | 'family_office'>('standard');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && (email || phone)) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 4000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="vault-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl bg-[#FBF9F5] rounded-xl shadow-2xl border border-[#EBE6DF] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header with image */}
        <div className="relative h-48 sm:h-56 bg-black overflow-hidden shrink-0">
          <img
            src="/assets/images/cassaforte_wine_vault_1793186967559.jpg"
            alt="Cassaforte del Vino ARVI Melano"
            className="w-full h-full object-cover filter brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi dettagli Cassaforte del vino"
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-1">
              ARVI SA · Melano (Svizzera)
            </span>
            <h2 id="vault-modal-title" className="font-serif text-2xl sm:text-3xl font-normal">
              Cassaforte del Vino
            </h2>
            <p className="text-xs text-[#E5DFD7] font-light mt-0.5">
              Il caveau ad alta sicurezza e deposito doganale più prestigioso d'Europa
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-[#1A1718]">
          {/* 4 Pillars of Excellence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 bg-white rounded-lg border border-[#EBE6DF] flex flex-col items-start">
              <Thermometer className="w-5 h-5 text-[#4A1525] mb-2" />
              <strong className="text-[#1A1718] font-medium text-xs">14.0°C Costanti</strong>
              <span className="text-[11px] text-[#777] mt-0.5">Climatizzazione ridondante a doppio circuito ermetico.</span>
            </div>

            <div className="p-3.5 bg-white rounded-lg border border-[#EBE6DF] flex flex-col items-start">
              <Droplets className="w-5 h-5 text-[#4A1525] mb-2" />
              <strong className="text-[#1A1718] font-medium text-xs">68% - 72% Umidità</strong>
              <span className="text-[11px] text-[#777] mt-0.5">Conservazione millimetrica dell'integrità dei tappi storici.</span>
            </div>

            <div className="p-3.5 bg-white rounded-lg border border-[#EBE6DF] flex flex-col items-start">
              <Lock className="w-5 h-5 text-[#4A1525] mb-2" />
              <strong className="text-[#1A1718] font-medium text-xs">Sicurezza Blindata</strong>
              <span className="text-[11px] text-[#777] mt-0.5">Caveau sotterraneo con accesso biometrico e vigilanza armata.</span>
            </div>

            <div className="p-3.5 bg-white rounded-lg border border-[#EBE6DF] flex flex-col items-start">
              <ShieldCheck className="w-5 h-5 text-[#C5A059] mb-2" />
              <strong className="text-[#1A1718] font-medium text-xs">Dogana Esente IVA</strong>
              <span className="text-[11px] text-[#777] mt-0.5">Deposito franco doganale svizzero (0% IVA per investimenti o export).</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-5 rounded-lg border border-[#EBE6DF] leading-relaxed text-[#555] space-y-3">
            <h3 className="font-serif text-base font-semibold text-[#1A1718]">
              Perché Custodire la Propria Collezione in Cassaforte ARVI
            </h3>
            <p>
              La nostra Cassaforte a Melano ospita oltre un milione di bottiglie appartenenti a privati, ristoranti stellati, casate reali e collezionisti da oltre 60 paesi.
              Ogni bottiglia viene registrata elettronicamente tramite RFID, verificata all'ingresso con perizia fotografica ad alta risoluzione del livello (ullage) e dello stato di capsula ed etichetta.
            </p>
            <p>
              Tutte le giacenze sono coperte da polizza assicurativa <em>All-Risks</em> stipulata con sindacati Lloyd's di Londra fino a CHF 50,000,000.
            </p>
          </div>

          {/* Interactive Quote / Storage Request Form */}
          <div className="bg-[#FAF7F2] p-5 rounded-lg border border-[#EBE6DF]">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#EBE6DF]">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <h3 className="font-serif text-base font-semibold text-[#1A1718]">
                Richiedi Preventivo Custodia Caveau
              </h3>
            </div>

            {submitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-emerald-900">
                  Richiesta Ricevuta con Successo!
                </h4>
                <p className="text-emerald-800 text-xs">
                  Il nostro Direttore Caveau a Melano analizzerà la tua richiesta per {bottles} bottiglie e ti ricontatterà entro 24 ore lavorative.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#4A4543] mb-1">
                      Nome e Cognome *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="es. Carlo Fontana"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-[#DDD7CD] bg-white focus:outline-none focus:border-[#4A1525]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#4A4543] mb-1">
                      Email / Recapito *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="email@example.com o +41..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-[#DDD7CD] bg-white focus:outline-none focus:border-[#4A1525]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#4A4543] mb-1">
                      Stima Numero Bottiglie da Custodire
                    </label>
                    <select
                      value={bottles}
                      onChange={(e) => setBottles(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-[#DDD7CD] bg-white focus:outline-none focus:border-[#4A1525]"
                    >
                      <option value="24">1 - 24 bottiglie (1-2 casse)</option>
                      <option value="60">25 - 60 bottiglie</option>
                      <option value="120">60 - 150 bottiglie (Armadio Caveau Dedicato)</option>
                      <option value="300">150 - 500 bottiglie (Spazio Privato)</option>
                      <option value="1000+">Oltre 500 bottiglie (Cella Riservata)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#4A4543] mb-1">
                      Regime Fiscale Richiesto
                    </label>
                    <select
                      value={serviceTier}
                      onChange={(e) => setServiceTier(e.target.value as any)}
                      className="w-full px-3 py-2 rounded border border-[#DDD7CD] bg-white focus:outline-none focus:border-[#4A1525]"
                    >
                      <option value="standard">Nazionale Svizzero (Uso personale & ritiro)</option>
                      <option value="family_office">Punto Franco Doganale Esente IVA (0% VAT)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#4A1525] hover:bg-[#320C17] text-white rounded font-medium tracking-wide uppercase text-xs shadow-xs transition-colors"
                >
                  Richiedi Allocazione Caveau Melano
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
