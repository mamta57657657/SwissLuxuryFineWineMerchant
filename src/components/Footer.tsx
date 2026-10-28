import React, { useState } from 'react';
import { Mail, Phone, Instagram, Linkedin, Facebook, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#120F10] text-[#D0CBC4] border-t border-[#2C2728] pt-14 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Assistance Bar */}
        <div className="p-6 bg-[#1A1718] rounded-xl border border-[#2C2728] mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <span className="text-[#8C827A] block text-[11px]">Scrivici un’e-mail</span>
              <a
                href="mailto:info@arvi.ch"
                className="font-medium text-white hover:text-[#C5A059] transition-colors"
              >
                info@arvi.ch
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <span className="text-[#8C827A] block text-[11px]">Chiamaci a Melano</span>
              <a
                href="tel:+41916496888"
                className="font-medium text-white hover:text-[#C5A059] transition-colors"
              >
                +41 91 649 68 88
              </a>
            </div>
          </div>

          <div>
            <span className="text-[#8C827A] block text-[11px]">Hai domande?</span>
            <span className="font-medium text-white">Consulta i nostri Sommelier & FAQ</span>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo & Newsletter (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/logo-white.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/aistudio/0026553_logo_7cacf244.webp';
                }}
                alt="ARVI SA"
                className="h-12 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
              <span className="font-serif text-2xl tracking-widest text-white font-medium">
                ARVI
              </span>
            </div>

            <p className="text-[#8C827A] text-[11px] leading-relaxed">
              ARVI SA è il punto di riferimento in Svizzera e nel mondo per l’acquisto, la compravendita e la custodia dei più prestigiosi vini da collezione.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <label htmlFor="newsletter-input" className="block text-white font-medium text-[11px] uppercase tracking-wider">
                Iscriviti alla Newsletter En Primeur
              </label>
              <div className="flex gap-2">
                <input
                  id="newsletter-input"
                  type="email"
                  required
                  placeholder="Inserisci l'indirizzo e-mail"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#221D1F] border border-[#3D3538] rounded text-white text-xs placeholder-[#666] focus:border-[#C5A059] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4B36F] text-[#1A1718] font-bold rounded text-xs transition-colors shrink-0"
                >
                  {newsletterSubscribed ? <Check className="w-4 h-4" /> : '→'}
                </button>
              </div>
              {newsletterSubscribed && (
                <p className="text-[11px] text-emerald-400">Grazie per l'iscrizione! Riceverai le nostre allocazioni esclusive.</p>
              )}
            </form>

            <div className="flex items-center gap-3 pt-2 text-[#8C827A]">
              <span className="text-[11px]">Seguici:</span>
              <a
                href="https://www.instagram.com/arvi_finewines"
                target="_blank"
                rel="noreferrer"
                aria-label="Profilo Instagram ARVI"
                className="hover:text-[#C5A059] transition-colors p-1"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/arvi-sa"
                target="_blank"
                rel="noreferrer"
                aria-label="Profilo LinkedIn ARVI"
                className="hover:text-[#C5A059] transition-colors p-1"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pagina Facebook ARVI"
                className="hover:text-[#C5A059] transition-colors p-1"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Sede & Contatti */}
          <div>
            <h4 className="text-white font-serif font-bold text-sm mb-3">Connettiti con Noi</h4>
            <div className="space-y-1 text-[#8C827A] text-[11px]">
              <p className="font-semibold text-white">ARVI SA</p>
              <p>Via Pedemonte di Sopra 1</p>
              <p>6818 Melano (Ticino)</p>
              <p>Svizzera</p>
              <p className="pt-2">IVA CHE-112.553.892</p>
            </div>
          </div>

          {/* Prodotti */}
          <div>
            <h4 className="text-white font-serif font-bold text-sm mb-3">Prodotti</h4>
            <ul className="space-y-2 text-[#8C827A] text-[11px]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors"
                >
                  Vini Pregiati
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors"
                >
                  Champagne di Prestigio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors"
                >
                  Casse & Edizioni Limitate
                </button>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Accessori Sommelier</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Distillati Rari</span>
              </li>
            </ul>
          </div>

          {/* En Primeur & Servizi Esclusivi */}
          <div>
            <h4 className="text-white font-serif font-bold text-sm mb-3">Servizi & Club</h4>
            <ul className="space-y-2 text-[#8C827A] text-[11px]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('enprimeur')}
                  className="hover:text-white transition-colors text-left"
                >
                  Allocazioni En Primeur
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('advisory')}
                  className="hover:text-white transition-colors text-left"
                >
                  Advisory Cantine Private
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('eventi')}
                  className="hover:text-white transition-colors text-left"
                >
                  Masterclass & Cene Gala
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('vault')}
                  className="hover:text-white transition-colors text-left"
                >
                  Cassaforte Melano 14°C
                </button>
              </li>
            </ul>
          </div>

          {/* I Nostri Negozi */}
          <div>
            <h4 className="text-white font-serif font-bold text-sm mb-3">I Nostri Negozi</h4>
            <ul className="space-y-2 text-[#8C827A] text-[11px]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shops')}
                  className="hover:text-white transition-colors"
                >
                  Melano (HQ & Caveau)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shops')}
                  className="hover:text-white transition-colors"
                >
                  Lugano (Via Nassa)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shops')}
                  className="hover:text-white transition-colors"
                >
                  Zurigo (Paradeplatz)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('vault')}
                  className="hover:text-white transition-colors"
                >
                  Cassaforte del Vino
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-[#2C2728] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#8C827A] text-[11px]">
          <p>© {new Date().getFullYear()} ARVI SA | Vini Pregiati e da Collezione. Tutti i diritti riservati.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-white cursor-pointer">Termini e Condizioni</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-white cursor-pointer">Cookie Preferences</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-white cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
