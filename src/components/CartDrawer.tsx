import React, { useState } from 'react';
import { WineProduct, Currency, calculateCartMetrics, formatWinePrice } from '../utils/wine-logic.ts';
import { X, Trash2, Warehouse, Truck, ShieldCheck, ArrowRight, Check } from 'lucide-react';

export interface CartItem {
  product: WineProduct;
  quantity: number;
  inVault?: boolean;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  currency: Currency;
  includeVAT: boolean;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  currency,
  includeVAT,
  onCheckout,
}) => {
  const [giftNote, setGiftNote] = useState('');
  const [showGiftInput, setShowGiftInput] = useState(false);

  if (!isOpen) return null;

  const metrics = calculateCartMetrics(items, currency, includeVAT);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Carrello della spesa"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl flex flex-col border-l border-[#EBE6DF]">
          {/* Header */}
          <div className="p-5 border-b border-[#EBE6DF] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-medium text-[#1A1718]">Il Tuo Carrello</span>
              <span className="text-xs bg-[#FAF7F2] text-[#4A1525] font-semibold px-2 py-0.5 rounded border border-[#E2DDD3]">
                {metrics.itemCount} articoli
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi carrello"
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#FAF7F2] p-4 border-b border-[#EBE6DF] text-xs">
            {metrics.isFreeShippingEligible ? (
              <div className="flex items-center gap-2 text-emerald-800 font-medium">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hai diritto alla <strong>spedizione refrigerata gratuita</strong> in Svizzera!</span>
              </div>
            ) : (
              <div>
                <p className="text-[#4A4543]">
                  Aggiungi altri <strong className="text-[#4A1525]">{metrics.formattedRemaining}</strong> per la{' '}
                  <span className="font-semibold">spedizione refrigerata gratuita</span> in Svizzera.
                </p>
                <div className="w-full bg-[#E5DFD7] h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-[#C5A059] h-full rounded-full transition-all duration-300"
                    style={{ width: `${metrics.freeShippingProgressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EBE6DF]">
            {items.length === 0 ? (
              <div className="py-16 text-center text-xs text-[#8C827A]">
                <p className="font-serif text-lg text-[#1A1718] mb-1">Il tuo carrello è vuoto</p>
                <p>Esplora la nostra cantina e aggiungi i tuoi millesimi preferiti.</p>
              </div>
            ) : (
              items.map((item) => {
                const itemPrice = formatWinePrice(
                  item.product.priceCHF * item.quantity,
                  currency,
                  includeVAT
                );
                return (
                  <div key={item.product.id} className="py-4 flex gap-4 items-start">
                    {/* Thumbnail Studio Photo with Vector fallback */}
                    <div className="w-16 h-20 bg-white rounded border border-[#EBE6DF] flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-auto object-contain drop-shadow-2xs"
                        />
                      ) : (
                        <svg viewBox="0 0 40 100" className="h-full w-auto">
                          <path
                            d="M17 10 H23 V25 L23 45 C23 55, 30 60, 30 70 L30 95 H10 L10 70 C10 60, 17 55, 17 45 Z"
                            fill={item.product.type === 'Rosé' ? '#D68C96' : '#221518'}
                          />
                          <rect x="12" y="55" width="16" height="25" fill="#FAF8F3" stroke="#C5A059" strokeWidth="0.5" />
                        </svg>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 text-xs">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[11px] text-[#8C827A]">{item.product.producer}</p>
                          <h4 className="font-serif font-medium text-sm text-[#1A1718]">
                            {item.product.name} {item.product.vintage !== 'NV' ? item.product.vintage : ''}
                          </h4>
                          <span className="text-[10px] text-[#665F58]">
                            {item.product.format} · {item.product.region}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id)}
                          aria-label={`Rimuovi ${item.product.name} dal carrello`}
                          className="text-gray-400 hover:text-rose-700 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Vault indicator */}
                      {item.inVault && (
                        <div className="inline-flex items-center gap-1 text-[10px] text-[#C5A059] bg-[#1A1718] px-2 py-0.5 rounded mt-1 font-medium">
                          <Warehouse className="w-3 h-3" />
                          <span>Custodia Cassaforte Melano (Esente IVA)</span>
                        </div>
                      )}

                      {/* Quantity selector & price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#DDD7CD] rounded bg-white">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-1 text-gray-600 hover:text-black"
                          >
                            -
                          </button>
                          <span className="px-2 font-mono text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:text-black"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif text-sm font-semibold tabular-nums text-[#1A1718]">
                          {itemPrice.formatted}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#EBE6DF] bg-white space-y-4">
              {/* Optional Gift message */}
              <div>
                {!showGiftInput ? (
                  <button
                    type="button"
                    onClick={() => setShowGiftInput(true)}
                    className="text-xs text-[#C5A059] hover:underline font-medium"
                  >
                    + Aggiungi un biglietto d'auguri o sigillo regalo
                  </button>
                ) : (
                  <div className="space-y-1">
                    <label className="block text-[11px] text-[#8C827A] font-medium">
                      Biglietto con monogramma ARVI
                    </label>
                    <textarea
                      rows={2}
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Scrivi una dedica personalizzata per il destinatario..."
                      className="w-full text-xs p-2 bg-[#FAF7F2] border border-[#DDD7CD] rounded focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Subtotal */}
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-[#665F58] font-medium">Totale Parziale:</span>
                <span className="font-serif text-2xl font-semibold tabular-nums text-[#1A1718]">
                  {metrics.formattedSubtotal}
                </span>
              </div>
              <p className="text-[11px] text-[#8C827A] -mt-2">
                {includeVAT ? 'Comprensivo di IVA svizzera 8.1%' : 'Prezzo netto esente IVA (deposito/esportazione)'}
              </p>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={onCheckout}
                className="w-full py-3.5 px-4 bg-[#4A1525] hover:bg-[#320C17] text-white font-medium text-xs uppercase tracking-widest rounded shadow transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Procedi al Checkout Sicuro</span>
                <ArrowRight className="w-4 h-4 text-[#E4CA92]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C827A]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pagamenti crittografati · Bonifico bancario svizzero & Carte</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
