import React, { useState } from 'react';
import { BoutiqueLocation } from '../data/wines.ts';
import { X, MapPin, Clock, Phone, Mail, ShieldCheck, Calendar, Users, CheckCircle2, Wine } from 'lucide-react';

interface BoutiqueModalProps {
  boutique: BoutiqueLocation | null;
  onClose: () => void;
}

export const BoutiqueModal: React.FC<BoutiqueModalProps> = ({ boutique, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '14:30',
    guests: '2',
    notes: 'Degustazione comparativa Grand Cru e consulenza cantina privata',
  });
  const [isBooked, setIsBooked] = useState(false);

  if (!boutique) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && (formData.email || formData.phone)) {
      setIsBooked(true);
      setTimeout(() => {
        setIsBooked(false);
        onClose();
      }, 4000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="boutique-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-xl shadow-2xl border border-[#EBE6DF] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header with imagery */}
        <div className="relative h-48 sm:h-56 bg-black overflow-hidden shrink-0">
          <img
            src={boutique.image}
            alt={boutique.name}
            className="w-full h-full object-cover filter brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi informazioni boutique"
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-1">
              ARVI SA · Boutiques Svizzere
            </span>
            <h2 id="boutique-modal-title" className="font-serif text-2xl sm:text-3xl font-normal">
              {boutique.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-[#1A1718]">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-lg border border-[#EBE6DF]">
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-[#4A4543]">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A1718] block">{boutique.address}</strong>
                  <span className="text-[#777]">{boutique.postalCode}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#4A4543]">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{boutique.hours}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#4A4543]">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`tel:${boutique.phone.replace(/\s+/g, '')}`} className="hover:underline font-medium text-[#1A1718]">
                  {boutique.phone}
                </a>
              </div>

              <div className="flex items-center gap-2 text-[#4A4543]">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`mailto:${boutique.email}`} className="hover:underline font-medium text-[#1A1718]">
                  {boutique.email}
                </a>
              </div>
            </div>
          </div>

          {/* Description & Features */}
          <div>
            <p className="text-[#555] leading-relaxed mb-3">
              {boutique.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {boutique.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F4EFEB] text-[#4A1525] rounded text-[11px] font-medium border border-[#E2DDD3]"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Booking Form */}
          <div className="bg-white p-5 rounded-lg border border-[#EBE6DF]">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#F2ECE4]">
              <Wine className="w-4 h-4 text-[#4A1525]" />
              <h3 className="font-serif text-base font-semibold text-[#1A1718]">
                Prenota un Appuntamento o Degustazione Privata
              </h3>
            </div>

            {isBooked ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-emerald-900">
                  Richiesta di Appuntamento Confermata!
                </h4>
                <p className="text-emerald-800 text-xs">
                  Il nostro Head Sommelier per la sede di {boutique.city} ha ricevuto la richiesta e ti contatterà al {formData.phone || formData.email} per personalizzare i millesimi da servire.
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
                      placeholder="es. Mario Rossi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-[#DDD7CD] bg-[#FBF9F5] focus:outline-none focus:border-[#4A1525]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#4A4543] mb-1">
                      Recapito Telefonico *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+41 79 123 45 67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-[#DDD7CD] bg-[#FBF9F5] focus:outline-none focus:border-[#4A1525]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#4A4543] mb-1">
                      Data Desiderata
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-[#DDD7CD] bg-[#FBF9F5] focus:outline-none focus:border-[#4A1525]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#4A4543] mb-1">
                      Orario
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-[#DDD7CD] bg-[#FBF9F5] focus:outline-none focus:border-[#4A1525]"
                    >
                      <option value="11:00">11:00</option>
                      <option value="14:30">14:30</option>
                      <option value="16:30">16:30</option>
                      <option value="18:00">18:00</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#4A4543] mb-1">
                      Numero Ospiti
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-[#DDD7CD] bg-[#FBF9F5] focus:outline-none focus:border-[#4A1525]"
                    >
                      <option value="1">1 Ospite</option>
                      <option value="2">2 Ospiti</option>
                      <option value="4">3 - 4 Ospiti</option>
                      <option value="6+">Gruppo Privato (5+)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#4A4543] mb-1">
                    Preferenze o Richieste Speciali
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-[#DDD7CD] bg-[#FBF9F5] focus:outline-none focus:border-[#4A1525]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#4A1525] hover:bg-[#320C17] text-white rounded font-medium tracking-wide uppercase text-xs shadow-xs transition-colors"
                >
                  Invia Richiesta di Appuntamento a {boutique.city}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
