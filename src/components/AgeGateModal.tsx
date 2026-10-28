import React, { useState } from 'react';
import { ShieldAlert, Check } from 'lucide-react';

interface AgeGateModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export const AgeGateModal: React.FC<AgeGateModalProps> = ({ isOpen, onConfirm }) => {
  const [remember, setRemember] = useState(true);
  const [underageWarning, setUnderageWarning] = useState(false);

  if (!isOpen) return null;

  const handleAccept = () => {
    if (remember) {
      localStorage.setItem('arvi_age_verified', 'true');
    }
    onConfirm();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 sm:p-8 text-center border border-[#EBE6DF]">
        {/* ARVI Logo */}
        <div className="flex justify-center mb-5">
          <img
            src="/assets/aistudio/0026553_logo_7cacf244.webp"
            alt="ARVI SA"
            className="h-16 w-auto object-contain"
          />
        </div>

        <h2 id="age-gate-title" className="font-serif text-2xl font-normal text-[#1A1718] mb-2">
          Benvenuto in ARVI
        </h2>

        <p className="text-xs text-[#665F58] leading-relaxed mb-6">
          Accedendo al sito di ARVI SA, dichiaro di avere l'età legale minima per l'acquisto e il consumo di bevande alcoliche nel paese in cui risiedo.
        </p>

        {underageWarning && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800 text-left">
            L'accesso ai contenuti enologici e all'acquisto è riservato esclusivamente a utenti maggiorenni.
          </div>
        )}

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleAccept}
            className="w-full py-3.5 px-4 bg-[#4A1525] hover:bg-[#320C17] text-white font-medium text-xs uppercase tracking-widest rounded shadow transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4 text-[#E4CA92]" />
            <span>Dichiaro di Avere l'Età Minima</span>
          </button>

          <button
            type="button"
            onClick={() => setUnderageWarning(true)}
            className="w-full py-2 px-3 text-xs text-[#8C827A] hover:text-[#1A1718] transition-colors"
          >
            Non ho l'età legale
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-[#F2ECE4] flex items-center justify-center gap-2">
          <label className="flex items-center gap-2 text-[11px] text-[#8C827A] cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-gray-300 text-[#4A1525] focus:ring-[#C5A059]"
            />
            <span>Ricorda questa scelta su questo dispositivo</span>
          </label>
        </div>
      </div>
    </div>
  );
};
