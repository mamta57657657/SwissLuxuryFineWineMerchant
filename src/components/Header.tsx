import React from 'react';
import { Currency } from '../utils/wine-logic.ts';
import { ShoppingBag, Sliders, ShieldCheck, Phone, ChevronDown, Check } from 'lucide-react';

interface HeaderProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  includeVAT: boolean;
  setIncludeVAT: (v: boolean) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  cartCount: number;
  openCart: () => void;
  openCustomizer: () => void;
  openSeoInspector: () => void;
  announcementText?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currency,
  setCurrency,
  includeVAT,
  setIncludeVAT,
  activeNav,
  setActiveNav,
  cartCount,
  openCart,
  openCustomizer,
  openSeoInspector,
  announcementText = 'Spedizione refrigerata gratuita in Svizzera per ordini oltre CHF 500 · Caveau Melano 14°C'
}) => {
  const [lang, setLang] = React.useState<'IT' | 'EN' | 'DE' | 'FR'>('IT');

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#EBE6DF]">
      {/* Top Utility Bar */}
      <div className="bg-[#1A1718] text-[#E5E0D8] text-[11px] py-1 px-3 sm:px-8 border-b border-[#2C2728]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Announcement (hidden on very small screens to avoid clutter) */}
          <div className="hidden md:flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" aria-hidden="true" />
            <p className="truncate text-[11px] font-light tracking-wide text-[#E5E0D8]">
              {announcementText}
            </p>
          </div>

          {/* Controls: Currency, VAT, Lang, Theme Settings */}
          <div className="flex items-center justify-between w-full md:w-auto gap-2.5 sm:gap-4 shrink-0">
            {/* VAT Switcher */}
            <div className="flex items-center gap-1 bg-[#2A2426] px-1.5 py-0.5 rounded border border-[#3D3538]">
              <span className="text-[#A39E98] text-[10px]">IVA:</span>
              <button
                type="button"
                onClick={() => setIncludeVAT(true)}
                className={`px-1 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  includeVAT ? 'bg-[#C5A059] text-[#1A1718]' : 'text-[#D0CBC4] hover:text-white'
                }`}
                title="Prezzo al dettaglio con IVA svizzera 8.1%"
              >
                Inclusa
              </button>
              <button
                type="button"
                onClick={() => setIncludeVAT(false)}
                className={`px-1 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  !includeVAT ? 'bg-[#C5A059] text-[#1A1718]' : 'text-[#D0CBC4] hover:text-white'
                }`}
                title="Prezzo esente IVA (deposito Cassaforte del vino o esportazione)"
              >
                Esclusa
              </button>
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center gap-1">
              <label htmlFor="currency-select" className="sr-only">Valuta</label>
              <select
                id="currency-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-transparent text-[#E5E0D8] hover:text-white text-[11px] cursor-pointer border-none focus:outline-none font-medium"
              >
                <option value="CHF" className="bg-[#1A1718] text-white">CHF</option>
                <option value="EUR" className="bg-[#1A1718] text-white">EUR (€)</option>
                <option value="USD" className="bg-[#1A1718] text-white">USD ($)</option>
                <option value="GBP" className="bg-[#1A1718] text-white">GBP (£)</option>
              </select>
            </div>

            {/* Language */}
            <div className="flex items-center gap-1">
              <label htmlFor="lang-select" className="sr-only">Lingua</label>
              <select
                id="lang-select"
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
                className="bg-transparent text-[#E5E0D8] hover:text-white text-[11px] cursor-pointer border-none focus:outline-none font-medium"
              >
                <option value="IT" className="bg-[#1A1718] text-white">IT</option>
                <option value="EN" className="bg-[#1A1718] text-white">EN</option>
                <option value="DE" className="bg-[#1A1718] text-white">DE</option>
                <option value="FR" className="bg-[#1A1718] text-white">FR</option>
              </select>
            </div>

            {/* Telephone assistance */}
            <a
              href="tel:+41916496888"
              className="hidden lg:flex items-center gap-1 text-[#C5A059] hover:text-[#E4CA92] transition-colors"
              title="Consulenza telefonica ARVI SA"
            >
              <Phone className="w-3 h-3" />
              <span>+41 91 649 68 88</span>
            </a>

            {/* Shopify Theme Settings Inspector */}
            <button
              type="button"
              onClick={openCustomizer}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-medium bg-[#320C17] text-[#E4CA92] border border-[#C5A059]/40 hover:bg-[#4A1525] transition-colors"
              title="Apri impostazioni del tema Shopify e schema Liquid"
            >
              <Sliders className="w-3 h-3" />
              <span className="hidden xs:inline">Theme</span> Settings
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark & Historic Crest */}
        <button
          type="button"
          onClick={() => setActiveNav('home')}
          className="flex items-center gap-2.5 sm:gap-3 text-left group whitespace-nowrap shrink-0"
        >
          <img
            src="/assets/aistudio/0026553_logo_7cacf244.webp"
            alt="ARVI SA Grand Cru Emblem"
            className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wider text-[#1A1718] leading-none">
              ARVI
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#8C827A] mt-0.5">
              Fine Wines · Melano
            </span>
          </div>
        </button>

        {/* Zone 2: Concise Single-Line Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-medium text-[#4A4543]">
          <button
            type="button"
            onClick={() => setActiveNav('catalog')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeNav === 'catalog' ? 'text-[#4A1525] font-semibold' : 'hover:text-[#1A1718]'
            }`}
          >
            Tutti i Vini
            {activeNav === 'catalog' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A1525]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveNav('enprimeur')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeNav === 'enprimeur' ? 'text-[#4A1525] font-semibold' : 'hover:text-[#1A1718]'
            }`}
          >
            En Primeur
            {activeNav === 'enprimeur' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A1525]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveNav('vault')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeNav === 'vault' ? 'text-[#4A1525] font-semibold' : 'hover:text-[#1A1718]'
            }`}
          >
            Cassaforte Melano
            {activeNav === 'vault' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A1525]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveNav('advisory')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeNav === 'advisory' ? 'text-[#4A1525] font-semibold' : 'hover:text-[#1A1718]'
            }`}
          >
            Advisory Cantine
            {activeNav === 'advisory' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A1525]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveNav('eventi')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeNav === 'eventi' ? 'text-[#4A1525] font-semibold' : 'hover:text-[#1A1718]'
            }`}
          >
            Eventi & Club
            {activeNav === 'eventi' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A1525]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveNav('shops')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeNav === 'shops' ? 'text-[#4A1525] font-semibold' : 'hover:text-[#1A1718]'
            }`}
          >
            Negozi
            {activeNav === 'shops' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A1525]" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Bag / Cart Drawer Trigger) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={openSeoInspector}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#4A4543] hover:text-[#1A1718] hover:bg-[#F4EFEB] rounded-md transition-colors"
            title="Verifica Schema.org JSON-LD & SEO"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>SEO & Schema</span>
          </button>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Carrello acquisti con ${cartCount} articoli`}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#4A1525] hover:bg-[#320C17] text-white rounded-md text-xs font-medium tracking-wide shadow-xs transition-all duration-200 hover:shadow"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E4CA92]" />
            <span className="hidden xs:inline whitespace-nowrap">Carrello</span>
            <span className="bg-[#C5A059] text-[#1A1718] font-bold text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded-full min-w-4 text-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Submenu Navigation Strip */}
      <div className="lg:hidden border-t border-[#EBE6DF] px-4 py-2 flex items-center justify-between overflow-x-auto text-[11px] uppercase tracking-wider text-[#4A4543] gap-4 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveNav('home')}
          className={`shrink-0 py-0.5 ${activeNav === 'home' ? 'text-[#4A1525] font-bold border-b border-[#4A1525]' : ''}`}
        >
          Home
        </button>
        <button
          type="button"
          onClick={() => setActiveNav('catalog')}
          className={`shrink-0 py-0.5 ${activeNav === 'catalog' ? 'text-[#4A1525] font-bold border-b border-[#4A1525]' : ''}`}
        >
          Vini
        </button>
        <button
          type="button"
          onClick={() => setActiveNav('enprimeur')}
          className={`shrink-0 py-0.5 ${activeNav === 'enprimeur' ? 'text-[#4A1525] font-bold border-b border-[#4A1525]' : ''}`}
        >
          En Primeur
        </button>
        <button
          type="button"
          onClick={() => setActiveNav('vault')}
          className={`shrink-0 py-0.5 ${activeNav === 'vault' ? 'text-[#4A1525] font-bold border-b border-[#4A1525]' : ''}`}
        >
          Caveau
        </button>
        <button
          type="button"
          onClick={() => setActiveNav('advisory')}
          className={`shrink-0 py-0.5 ${activeNav === 'advisory' ? 'text-[#4A1525] font-bold border-b border-[#4A1525]' : ''}`}
        >
          Advisory
        </button>
        <button
          type="button"
          onClick={() => setActiveNav('eventi')}
          className={`shrink-0 py-0.5 ${activeNav === 'eventi' ? 'text-[#4A1525] font-bold border-b border-[#4A1525]' : ''}`}
        >
          Eventi
        </button>
        <button
          type="button"
          onClick={() => setActiveNav('shops')}
          className={`shrink-0 py-0.5 ${activeNav === 'shops' ? 'text-[#4A1525] font-bold border-b border-[#4A1525]' : ''}`}
        >
          Negozi
        </button>
      </div>
    </header>
  );
};

