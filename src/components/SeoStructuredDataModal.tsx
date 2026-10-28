import React, { useState } from 'react';
import { WineProduct, generateWineJsonLd } from '../utils/wine-logic.ts';
import { X, ShieldCheck, Copy, Check, Search, CheckCircle2 } from 'lucide-react';

interface SeoStructuredDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  sampleWine: WineProduct;
}

export const SeoStructuredDataModal: React.FC<SeoStructuredDataModalProps> = ({
  isOpen,
  onClose,
  sampleWine,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const productJsonLd = generateWineJsonLd(sampleWine);

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Winery',
    name: 'ARVI SA',
    alternateName: 'ARVI Swiss Luxury Fine Wine Merchant',
    url: 'https://arvi.ch',
    logo: 'https://arvi.ch/assets/aistudio/0026553_logo_7cacf244.webp',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Pedemonte di Sopra 1',
      addressLocality: 'Melano',
      postalCode: '6818',
      addressRegion: 'Ticino',
      addressCountry: 'CH',
    },
    telephone: '+41 91 649 68 88',
    email: 'info@arvi.ch',
    priceRange: 'CHF 40 - CHF 10000+',
    currenciesAccepted: 'CHF, EUR, USD, GBP',
    paymentAccepted: 'Credit Card, Swiss Bank Transfer',
  };

  const combinedPayload = {
    organization: organizationJsonLd,
    sampleProduct: productJsonLd,
  };

  const jsonString = JSON.stringify(combinedPayload, null, 2);

  const handleCopy = () => {
    navigator.clipboard?.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="seo-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-xl shadow-2xl border border-[#EBE6DF] overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#EBE6DF] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h2 id="seo-modal-title" className="font-serif text-lg font-bold text-[#1A1718]">
                SEO, AEO & Schema.org Rich Snippets
              </h2>
              <p className="text-[11px] text-[#8C827A]">
                Marcatori semantici per motori di ricerca, Google AI Overviews e accessibilità WCAG
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi ispettore SEO"
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs">
          {/* Audit summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-white rounded-lg border border-[#EBE6DF] flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-semibold text-[#1A1718] block">Product Schema</span>
                <span className="text-[11px] text-[#8C827A]">Prezzo, rating & scorte</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-[#EBE6DF] flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-semibold text-[#1A1718] block">Winery / LocalStore</span>
                <span className="text-[11px] text-[#8C827A]">Melano HQ & Negozi</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-[#EBE6DF] flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-semibold text-[#1A1718] block">AEO & Generative AI</span>
                <span className="text-[11px] text-[#8C827A]">Risposte dirette pronte</span>
              </div>
            </div>
          </div>

          {/* JSON-LD Payload */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-[#1A1718]">
                Codice JSON-LD Inserito nel tag &lt;head&gt;
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1 bg-[#4A1525] hover:bg-[#320C17] text-white rounded text-xs font-medium flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiato!' : 'Copia JSON-LD'}</span>
              </button>
            </div>

            <pre className="p-4 bg-[#1A1718] text-[#E5E0D8] rounded-lg font-mono text-[11px] overflow-x-auto leading-relaxed border border-[#2C2728] max-h-72">
              {jsonString}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
