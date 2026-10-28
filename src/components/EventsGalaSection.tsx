import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Award, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Currency, formatWinePrice } from '../utils/wine-logic.ts';

interface EventsGalaSectionProps {
  currency: Currency;
  includeVAT: boolean;
}

interface WineEvent {
  id: string;
  title: string;
  location: string;
  city: 'Melano' | 'Lugano' | 'Zurigo';
  date: string;
  time: string;
  priceCHF: number;
  availableSeats: number;
  sommelier: string;
  featuredWines: string[];
  description: string;
}

const UPCOMING_EVENTS: WineEvent[] = [
  {
    id: 'gala-pavie-melano',
    title: 'Verticale Storica Château Pavie: 25 Anni di Saint-Émilion',
    location: 'Cassaforte del Vino ARVI, Caveau Blindato',
    city: 'Melano',
    date: '14 Novembre 2026',
    time: '19:30 - 23:00',
    priceCHF: 650.00,
    availableSeats: 6,
    sommelier: 'Gérard Maux (Master Sommelier ARVI)',
    featuredWines: ['Château Pavie 1998', 'Château Pavie 2005', 'Château Pavie 2010 (100 RP)', 'Château Pavie 2016'],
    description: 'Una serata irripetibile all’interno del nostro caveau a 14°C: cena gourmet a 5 portate e degustazione comparativa di 4 annate leggendarie del 1er Grand Cru Classé A di Saint-Émilion.'
  },
  {
    id: 'masterclass-burgundy-zurich',
    title: 'I Monopole della Borgogna: Da Vosne-Romanée a Gevrey',
    location: 'ARVI Wine Lounge, Paradeplatz',
    city: 'Zurigo',
    date: '28 Novembre 2026',
    time: '18:30 - 21:30',
    priceCHF: 890.00,
    availableSeats: 4,
    sommelier: 'Hélène Delacroix (Bordeaux & Burgundy Specialist)',
    featuredWines: ['Armand Rousseau Chambertin', 'Comte Liger-Belair La Romanée', 'DRC Échézeaux Grand Cru'],
    description: 'Masterclass esclusiva per 12 collezionisti incentrata sulla finezza estrema dei terroir borgognoni. Servizio in calici Zalto Burgundy e approfondimento geologico dei cru.'
  },
  {
    id: 'champagne-caviar-lugano',
    title: 'Soirée de Prestige: Grandi Champagne & Caviale Reale',
    location: 'ARVI Boutique & Salotto, Via Nassa',
    city: 'Lugano',
    date: '12 Dicembre 2026',
    time: '19:00 - 22:00',
    priceCHF: 420.00,
    availableSeats: 8,
    sommelier: 'Matteo Bernasconi (Head Sommelier Ticino)',
    featuredWines: ['Krug Grande Cuvée 171ème', 'Dom Pérignon 2013', 'Ruinart Blanc de Blancs Magnum'],
    description: 'L’eleganza del perlage più nobile d’oltralpe abbinata a una selezione di caviale imperiale. Una celebrazione natalizia per gli estimatori delle grandi maison.'
  }
];

export const EventsGalaSection: React.FC<EventsGalaSectionProps> = ({ currency, includeVAT }) => {
  const [selectedEvent, setSelectedEvent] = useState<WineEvent | null>(null);
  const [ticketCount, setTicketCount] = useState(2);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEvent && attendeeName && attendeeEmail) {
      setBookingConfirmed(true);
      setTimeout(() => {
        setSelectedEvent(null);
        setBookingConfirmed(false);
        setAttendeeName('');
        setAttendeeEmail('');
        setTicketCount(2);
      }, 4000);
    }
  };

  return (
    <section id="eventi" className="py-20 bg-[#161314] text-[#FBF9F5] border-t border-[#2C2725] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-[#C5A059]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
                Club Degustazioni & Salotti ARVI
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
              Eventi Privati & Masterclass <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#E8D4B0]">nei nostri salotti svizzeri.</span>
            </h2>

            <p className="mt-4 text-sm text-[#DDD7CD] leading-relaxed">
              Incontri intimi a numero chiuso dedicati alla cultura enologica più pura. Degustazioni guidate dai nostri Masters of Wine, 
              con bottiglie storiche estratte direttamente dalla Cassaforte del Vino di Melano.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3 text-xs text-[#C5A059] font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Posti Limitati · Prenotazione Richiesta</span>
          </div>
        </div>

        {/* Hero Event Banner Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-14 aspect-[21/9] min-h-[300px]">
          <img
            src="/src/assets/images/private_tasting_dinner_1793199117326.jpg"
            alt="ARVI Private Gala Dinner overlooking Swiss Lake"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C5A059] text-[#1A1718] font-bold text-[11px] rounded uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Cene Esclusive ARVI Club
              </span>
              <h3 className="font-serif text-xl sm:text-3xl text-white font-light">
                Momenti Unici Attorno al Calice
              </h3>
              <p className="text-xs sm:text-sm text-[#DDD7CD] mt-1 max-w-xl">
                Dalle sponde del Ceresio a Lugano alle serate alpine di Zurigo: unisciti a una cerchia ristretta di appassionati e collezionisti.
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {UPCOMING_EVENTS.map((ev) => {
            const formattedPrice = formatWinePrice(ev.priceCHF, currency, includeVAT);
            return (
              <div
                key={ev.id}
                className="bg-white/5 border border-white/10 hover:border-[#C5A059]/60 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:bg-white/[0.08] group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#A69E96] mb-3">
                    <span className="inline-flex items-center gap-1 font-semibold text-[#E8D4B0]">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      {ev.city}
                    </span>
                    <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-white">
                      {ev.availableSeats} posti rimasti
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-medium text-white mb-2 group-hover:text-[#E8D4B0] transition-colors leading-snug">
                    {ev.title}
                  </h4>

                  <p className="text-xs text-[#B8B2AA] mb-4 line-clamp-3 leading-relaxed">
                    {ev.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-[#DDD7CD] py-3 border-y border-white/10 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span>{ev.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span>{ev.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span className="truncate">{ev.sommelier}</span>
                    </div>
                  </div>

                  {/* Featured bottle tags */}
                  <div className="mb-4">
                    <span className="text-[10px] uppercase tracking-wider text-[#A69E96] block mb-1">
                      Millesimi in Degustazione:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {ev.featuredWines.map((wineName, i) => (
                        <span key={i} className="text-[10px] bg-black/40 border border-white/10 px-2 py-0.5 rounded text-[#DDD7CD]">
                          {wineName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-serif text-xl font-semibold text-white tabular-nums">
                      {formattedPrice.formatted}
                    </span>
                    <span className="text-[10px] text-[#A69E96] block">a persona · all inclusive</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedEvent(ev)}
                    className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4B26F] text-[#1A1718] font-semibold text-xs rounded transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span>Riserva Posto</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking RSVP Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#221D1E] border border-[#C5A059]/40 rounded-xl p-6 shadow-2xl text-white">
            <h4 className="font-serif text-2xl text-[#E8D4B0] mb-1">
              Prenotazione Masterclass ARVI
            </h4>
            <p className="text-xs text-[#A69E96] mb-4">
              {selectedEvent.title} · {selectedEvent.location} ({selectedEvent.date})
            </p>

            {bookingConfirmed ? (
              <div className="p-6 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-center">
                <Check className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <p className="font-serif text-lg text-white font-medium">Invito e Conferma Riservati</p>
                <p className="text-xs text-emerald-200 mt-1">
                  Abbiamo riservato {ticketCount} {ticketCount === 1 ? 'posto' : 'posti'} a nome di {attendeeName}. Ti abbiamo inviato il pass d'ingresso via email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#DDD7CD] mb-1">Numero di Partecipanti</label>
                  <select
                    value={ticketCount}
                    onChange={(e) => setTicketCount(Number(e.target.value))}
                    className="w-full bg-[#181415] border border-[#443C3A] rounded px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Ospite' : 'Ospiti'} (CHF {(selectedEvent.priceCHF * num).toLocaleString('de-CH')}.00)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#DDD7CD] mb-1">Nome e Cognome del Partecipante Principale</label>
                  <input
                    type="text"
                    required
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                    placeholder="es. Dott. Alessandro Fontana"
                    className="w-full bg-[#181415] border border-[#443C3A] rounded px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[#DDD7CD] mb-1">Email per Ricezione Pass & Dettagli di Accesso</label>
                  <input
                    type="email"
                    required
                    value={attendeeEmail}
                    onChange={(e) => setAttendeeEmail(e.target.value)}
                    placeholder="alessandro.fontana@lugano.ch"
                    className="w-full bg-[#181415] border border-[#443C3A] rounded px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    className="px-4 py-2 rounded text-[#A69E96] hover:text-white"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#D4B26F] text-[#1A1718] font-semibold rounded flex items-center gap-1.5 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>Conferma Partecipazione</span>
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
