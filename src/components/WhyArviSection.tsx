import React from 'react';
import { Wine, Truck, UserCheck, Award, Mail, Phone, HelpCircle } from 'lucide-react';

interface WhyArviSectionProps {
  onLearnMore?: () => void;
}

export const WhyArviSection: React.FC<WhyArviSectionProps> = ({ onLearnMore }) => {
  const pillars = [
    {
      icon: Wine,
      title: 'Eccezionale selezione di vini',
      description: 'Offriamo una selezione dei vini più pregiati di tutto il mondo',
      linkText: 'Scopri di più',
    },
    {
      icon: Truck,
      title: 'Consegna accurata',
      description: 'Garantiamo una consegna precisa e puntuale',
      linkText: 'Scopri di più',
    },
    {
      icon: UserCheck,
      title: 'Consulenza professionale',
      description: 'Approfitta della guida esperta dei nostri consulenti per scegliere il vino perfetto',
      linkText: 'Scopri di più',
    },
    {
      icon: Award,
      title: 'Qualità ed autenticità',
      description: 'Ogni bottiglia acquistata è autentica e di ottima qualità',
      linkText: 'Scopri di più',
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Centered Heading matching arvi.ch.jpg */}
        <h2 className="text-center font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#1A1718] mb-10">
          PERCHÉ COMPRARE DA NOI
        </h2>

        {/* 4 Light Sand Rounded Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F5EFEB] border border-[#EAE2D8] flex flex-col justify-between hover:shadow-xs transition-shadow"
              >
                <div>
                  {/* Clean Thin-line Icon */}
                  <div className="mb-4 text-[#222]">
                    <Icon className="w-8 h-8 stroke-[1.25]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-medium text-sm text-[#1A1718] mb-2 leading-snug">
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#555] leading-relaxed mb-4">
                    {p.description}
                  </p>
                </div>

                {/* Scopri di più link */}
                <button
                  type="button"
                  onClick={onLearnMore}
                  className="text-xs text-[#555] hover:text-black underline underline-offset-4 text-left transition-colors font-sans"
                >
                  {p.linkText}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Helpline / Contact Bar Strip (matching arvi.ch.jpg) */}
      <div className="w-full bg-[#F7F5F0] border-t border-b border-[#EBE6DE] py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Email */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Mail className="w-5 h-5 text-[#333] shrink-0" strokeWidth={1.5} />
            <div className="text-xs">
              <span className="text-[#777] block text-[11px]">Scrivici un'e-mail</span>
              <a
                href="mailto:info@arvi.ch"
                className="font-medium text-[#1A1718] hover:underline"
              >
                info@arvi.ch
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Phone className="w-5 h-5 text-[#333] shrink-0" strokeWidth={1.5} />
            <div className="text-xs">
              <span className="text-[#777] block text-[11px]">Chiamaci</span>
              <a
                href="tel:+41916496888"
                className="font-medium text-[#1A1718] hover:underline"
              >
                +41 91 649 68 88
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            <HelpCircle className="w-5 h-5 text-[#333] shrink-0" strokeWidth={1.5} />
            <div className="text-xs">
              <span className="text-[#777] block text-[11px]">Domande?</span>
              <button
                type="button"
                onClick={onLearnMore}
                className="font-medium text-[#1A1718] hover:underline"
              >
                Leggi le nostre FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
