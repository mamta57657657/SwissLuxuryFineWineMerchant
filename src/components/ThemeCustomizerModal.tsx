import React, { useState } from 'react';
import { X, Sliders, Palette, Layout, Shield, FileCode, Copy, Check, Info } from 'lucide-react';

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcementText: string;
  setAnnouncementText: (text: string) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  showScoresOnCards: boolean;
  setShowScoresOnCards: (show: boolean) => void;
}

export const ThemeCustomizerModal: React.FC<ThemeCustomizerModalProps> = ({
  isOpen,
  onClose,
  announcementText,
  setAnnouncementText,
  accentColor,
  setAccentColor,
  showScoresOnCards,
  setShowScoresOnCards,
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'liquid' | 'guide'>('settings');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const colorPresets = [
    { name: 'Swiss Grand Cru (Predefinito)', bordeaux: '#4A1525', gold: '#C5A059' },
    { name: 'Royal Cellar (Caveau Noir)', bordeaux: '#1A1718', gold: '#D4B36F' },
    { name: 'Heritage Burgundy', bordeaux: '#611D32', gold: '#E4CA92' },
    { name: 'Bordeaux Impérial', bordeaux: '#380B17', gold: '#B89248' },
  ];

  const shopifySettingsSchemaJson = `{
  "name": "ARVI Swiss Luxury Theme",
  "settings": [
    {
      "type": "header",
      "content": "Identità & Colori Luxury"
    },
    {
      "type": "color",
      "id": "color_primary_bordeaux",
      "label": "Bordeaux Principale",
      "default": "${accentColor}"
    },
    {
      "type": "color",
      "id": "color_accent_gold",
      "label": "Oro Svizzero / Accento",
      "default": "#C5A059"
    },
    {
      "type": "header",
      "content": "Barra Annunci & Spedizioni"
    },
    {
      "type": "text",
      "id": "announcement_bar_text",
      "label": "Testo Annuncio Superiore",
      "default": "${announcementText}"
    },
    {
      "type": "number",
      "id": "free_shipping_threshold",
      "label": "Soglia Spedizione Gratuita (CHF)",
      "default": 500
    },
    {
      "type": "header",
      "content": "Cassaforte del Vino (Caveau Melano)"
    },
    {
      "type": "checkbox",
      "id": "enable_vault_deposit_option",
      "label": "Abilita opzione deposito in Cassaforte (Esente IVA)",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_critic_scores_on_cards",
      "label": "Mostra badge punteggi critici (RP, WS, RG)",
      "default": ${showScoresOnCards}
    }
  ]
}`;

  const handleCopySchema = () => {
    navigator.clipboard?.writeText(shopifySettingsSchemaJson);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme-customizer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl bg-[#FBF9F5] rounded-xl shadow-2xl border border-[#EBE6DF] overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#EBE6DF] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-[#4A1525]" />
            <div>
              <h2 id="theme-customizer-title" className="font-serif text-lg font-bold text-[#1A1718]">
                Shopify Theme Settings & Customizer
              </h2>
              <p className="text-[11px] text-[#8C827A]">
                Pannello di configurazione live e schema Liquid per il team ARVI
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi customizer"
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="bg-[#FAF7F2] px-6 border-b border-[#EBE6DF] flex items-center gap-6 text-xs uppercase tracking-wider font-medium shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`py-3 transition-colors relative flex items-center gap-1.5 ${
              activeTab === 'settings' ? 'text-[#4A1525] font-bold' : 'text-[#8C827A] hover:text-[#1A1718]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Impostazioni Live</span>
            {activeTab === 'settings' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A1525]" />}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('liquid')}
            className={`py-3 transition-colors relative flex items-center gap-1.5 ${
              activeTab === 'liquid' ? 'text-[#4A1525] font-bold' : 'text-[#8C827A] hover:text-[#1A1718]'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Schema Liquid (settings_schema.json)</span>
            {activeTab === 'liquid' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A1525]" />}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`py-3 transition-colors relative flex items-center gap-1.5 ${
              activeTab === 'guide' ? 'text-[#4A1525] font-bold' : 'text-[#8C827A] hover:text-[#1A1718]'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Guida Manutenzione No-Code</span>
            {activeTab === 'guide' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A1525]" />}
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Palette Preset Picker */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1718] mb-2">
                  Tavolozza Colori Luxury & Accenti
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setAccentColor(preset.bordeaux)}
                      className={`p-3 rounded-lg border text-left flex items-center justify-between transition-colors ${
                        accentColor === preset.bordeaux
                          ? 'bg-white border-[#4A1525] ring-2 ring-[#4A1525]/20 shadow-xs'
                          : 'bg-[#FAF7F2] border-[#EBE6DF] hover:border-[#C5A059]'
                      }`}
                    >
                      <span className="font-medium text-[#1A1718]">{preset.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: preset.bordeaux }}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: preset.gold }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Announcement Bar Customizer */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1718] mb-1">
                  Testo Barra Annunci Superiore
                </label>
                <p className="text-[11px] text-[#8C827A] mb-2">
                  Visibile in cima a tutte le pagine per comunicare promozioni stagionali o soglie di spedizione.
                </p>
                <input
                  type="text"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded focus:border-[#C5A059] focus:outline-none text-xs"
                />
              </div>

              {/* Product Badges Switch */}
              <div className="pt-4 border-t border-[#EBE6DF]">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="font-semibold text-[#1A1718] block">
                      Mostra Badge Punteggi Critici sulle Card
                    </span>
                    <span className="text-[11px] text-[#8C827A]">
                      Mostra in evidenza i punteggi Robert Parker (RP), Wine Spectator (WS) e René Gabriel (RG).
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={showScoresOnCards}
                    onChange={(e) => setShowScoresOnCards(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#4A1525] focus:ring-[#C5A059]"
                  />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'liquid' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#665F58]">
                  Copia questo schema JSON nel file <code>config/settings_schema.json</code> del tuo tema Shopify per permettere al team di modificare testo, colori e impostazioni dall'editor visuale di Shopify.
                </p>
                <button
                  type="button"
                  onClick={handleCopySchema}
                  className="px-3 py-1.5 bg-[#4A1525] hover:bg-[#320C17] text-white rounded text-xs font-medium flex items-center gap-1.5 shrink-0"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copiato!' : 'Copia Schema'}</span>
                </button>
              </div>

              <pre className="p-4 bg-[#1A1718] text-[#E5E0D8] rounded-lg font-mono text-[11px] overflow-x-auto leading-relaxed border border-[#2C2728]">
                {shopifySettingsSchemaJson}
              </pre>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-4 leading-relaxed text-[#4A4543]">
              <div className="p-3.5 bg-white rounded-lg border border-[#EBE6DF]">
                <h4 className="font-serif font-bold text-sm text-[#1A1718] mb-1">
                  1. Integrazione con Shopify Online Store 2.0
                </h4>
                <p className="text-xs">
                  Questo tema è strutturato a sezioni modulari (JSON templates). Dal pannello di amministrazione Shopify (<strong>Negozio online → Temi → Personalizza</strong>), il team commerciale può aggiungere o riordinare sezioni come i caroselli di Champagne, i banner dei Châteaux o i blocchi dei negozi fisici senza toccare una riga di codice.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-[#EBE6DF]">
                <h4 className="font-serif font-bold text-sm text-[#1A1718] mb-1">
                  2. Gestione Fiscale Svizzera (IVA 8.1% vs Deposito Caveau)
                </h4>
                <p className="text-xs">
                  Nel checkout Shopify, la logica di calcolo IVA è mappata sul metafield del prodotto: le bottiglie acquistate con l'opzione "Cassaforte del Vino" vengono automaticamente contrassegnate per l'esenzione IVA secondo le disposizioni doganali svizzere per depositi autorizzati a Melano.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-[#EBE6DF]">
                <h4 className="font-serif font-bold text-sm text-[#1A1718] mb-1">
                  3. Compatibilità con App di Terze Parti
                </h4>
                <p className="text-xs">
                  Il tema supporta nativamente le app di Age Verification, Shopify Markets (per la conversione automatica CHF / EUR / USD), Klaviyo per le newsletter En Primeur e app di prenotazione appuntamenti per le degustazioni in boutique.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
