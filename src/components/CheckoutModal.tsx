import React, { useState } from 'react';
import { CartItem } from './CartDrawer.tsx';
import { Currency, calculateCartMetrics, formatWinePrice } from '../utils/wine-logic.ts';
import { X, ShieldCheck, Truck, Warehouse, CreditCard, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  includeVAT: boolean;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  includeVAT,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const metrics = calculateCartMetrics(items, currency, includeVAT);
  const [deliveryType, setDeliveryType] = useState<'refrigerated' | 'pickup' | 'vault'>('refrigerated');
  const [paymentMethod, setPaymentMethod] = useState<'bank_wire' | 'credit_card'>('credit_card');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'Svizzera (CH)',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `ARVI-CH-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);
    setIsSubmitted(true);
    onOrderSuccess();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-xl shadow-2xl border border-[#EBE6DF] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#EBE6DF] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h2 id="checkout-modal-title" className="font-serif text-lg font-bold text-[#1A1718]">
                ARVI SA · Checkout di Sicurezza Svizzera
              </h2>
              <p className="text-[11px] text-[#8C827A]">
                Conferma d'ordine e allocazione caveau Melano
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi checkout"
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1A1718]">
                Ordine Confermato con Successo!
              </h3>
              <p className="text-sm font-mono text-[#4A1525] font-semibold bg-[#F4EFEB] py-1.5 px-4 rounded inline-block">
                Codice Allocazione: {orderNumber}
              </p>
              <p className="text-xs text-[#665F58] max-w-md mx-auto leading-relaxed">
                Abbiamo riservato le bottiglie selezionate nel nostro caveau di Melano. Una copia del riepilogo con fattura ufficiale e certificato di provenienza è stata inviata a <strong>{form.email || 'tua email'}</strong>.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#4A1525] text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#320C17]"
                >
                  Torna alla Galleria Vini
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery method */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1718] mb-2">
                  Modalità di Consegna / Custodia
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('refrigerated')}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-colors ${
                      deliveryType === 'refrigerated'
                        ? 'bg-white border-[#4A1525] ring-2 ring-[#4A1525]/20 shadow-xs'
                        : 'bg-[#FAF7F2] border-[#EBE6DF] hover:border-[#C5A059]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Truck className="w-4 h-4 text-[#C5A059]" />
                      <span className="font-medium text-[#1A1718]">Furgone Climatizzato</span>
                    </div>
                    <span className="text-[11px] text-[#8C827A]">
                      Consegna a domicilio in Svizzera ed Europa
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('vault')}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-colors ${
                      deliveryType === 'vault'
                        ? 'bg-white border-[#4A1525] ring-2 ring-[#4A1525]/20 shadow-xs'
                        : 'bg-[#FAF7F2] border-[#EBE6DF] hover:border-[#C5A059]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Warehouse className="w-4 h-4 text-[#C5A059]" />
                      <span className="font-medium text-[#1A1718]">Cassaforte Melano</span>
                    </div>
                    <span className="text-[11px] text-[#8C827A]">
                      Stoccaggio a 14°C (Esente da IVA)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-colors ${
                      deliveryType === 'pickup'
                        ? 'bg-white border-[#4A1525] ring-2 ring-[#4A1525]/20 shadow-xs'
                        : 'bg-[#FAF7F2] border-[#EBE6DF] hover:border-[#C5A059]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-4 h-4 text-[#C5A059]" />
                      <span className="font-medium text-[#1A1718]">Ritiro in Boutique</span>
                    </div>
                    <span className="text-[11px] text-[#8C827A]">
                      Melano HQ, Lugano o Zurigo
                    </span>
                  </button>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1718] mb-2">
                  Dati di Fatturazione & Spedizione
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Nome"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Cognome"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email (per certificato di provenienza)"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Telefono (es. +41 79 123 45 67)"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      required
                      placeholder="Indirizzo (Via, Numero civico)"
                      value={form.street}
                      onChange={(e) => setForm({ ...form, street: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Città"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="NPA / CAP"
                      value={form.postalCode}
                      onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded text-xs focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1718] mb-2">
                  Metodo di Pagamento Garantito
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'credit_card' ? 'bg-white border-[#4A1525] ring-2 ring-[#4A1525]/20' : 'bg-[#FAF7F2] border-[#EBE6DF]'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === 'credit_card'}
                        onChange={() => setPaymentMethod('credit_card')}
                        className="text-[#4A1525]"
                      />
                      <div>
                        <span className="font-semibold block text-[#1A1718]">Carta di Credito / AMEX</span>
                        <span className="text-[10px] text-[#8C827A]">Transazione protetta 3D-Secure</span>
                      </div>
                    </div>
                    <CreditCard className="w-4 h-4 text-[#C5A059]" />
                  </label>

                  <label className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'bank_wire' ? 'bg-white border-[#4A1525] ring-2 ring-[#4A1525]/20' : 'bg-[#FAF7F2] border-[#EBE6DF]'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === 'bank_wire'}
                        onChange={() => setPaymentMethod('bank_wire')}
                        className="text-[#4A1525]"
                      />
                      <div>
                        <span className="font-semibold block text-[#1A1718]">Bonifico Bancario Svizzero / QR</span>
                        <span className="text-[10px] text-[#8C827A]">UBS / Credit Suisse IBAN svizzero</span>
                      </div>
                    </div>
                    <Building2 className="w-4 h-4 text-[#C5A059]" />
                  </label>
                </div>
              </div>

              {/* Order total strip */}
              <div className="p-4 bg-white rounded-lg border border-[#EBE6DF] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#8C827A] block">Totale da Corrispondere:</span>
                  <span className="font-serif text-2xl font-bold text-[#1A1718] tabular-nums">
                    {metrics.formattedSubtotal}
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#4A1525] hover:bg-[#320C17] text-white font-semibold text-xs uppercase tracking-wider rounded shadow flex items-center gap-2"
                >
                  <span>Conferma Ordine</span>
                  <ArrowRight className="w-4 h-4 text-[#E4CA92]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
