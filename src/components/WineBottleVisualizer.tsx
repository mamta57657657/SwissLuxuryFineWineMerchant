import React, { useState, useRef } from 'react';
import { WineProduct } from '../utils/wine-logic.ts';
import { RotateCw, ZoomIn, ShieldCheck, Camera, Maximize2 } from 'lucide-react';

interface WineBottleVisualizerProps {
  wine: WineProduct;
  interactiveMode?: 'spin' | 'zoom' | 'static';
}

export const WineBottleVisualizer: React.FC<WineBottleVisualizerProps> = ({
  wine,
  interactiveMode = 'spin',
}) => {
  const [viewMode, setViewMode] = useState<'photo' | '360'>(wine.image ? 'photo' : '360');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [imageError, setImageError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag handlers for 360° rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewMode === '360') {
      setIsDragging(true);
      setStartX(e.clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (viewMode === '360' && isDragging) {
      const delta = e.clientX - startX;
      setRotationAngle((prev) => (prev + delta * 0.8 + 360) % 360);
      setStartX(e.clientX);
    } else if (viewMode === 'photo' && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      setZoomPos({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (viewMode === '360') {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (viewMode === '360' && isDragging) {
      const delta = e.touches[0].clientX - startX;
      setRotationAngle((prev) => (prev + delta * 0.8 + 360) % 360);
      setStartX(e.touches[0].clientX);
    }
  };

  // Determine bottle theme colors based on type
  const isWhiteOrChampagne = wine.type === 'White' || wine.type === 'Champagne';
  const isRose = wine.type === 'Rosé';
  const glassColor = isRose
    ? 'rgba(235, 140, 150, 0.75)'
    : isWhiteOrChampagne
    ? 'rgba(195, 160, 80, 0.45)'
    : 'rgba(20, 10, 12, 0.95)';
  const foilColor = wine.type === 'Champagne' ? '#C5A059' : '#8A1C2B';

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-5 bg-gradient-to-b from-[#F7F4EF] to-[#EDE7DE] rounded-xl overflow-hidden select-none border border-[#E3DDD4]">
      {/* Top Controls: Mode Switcher & Cellar Badge */}
      <div className="w-full flex items-center justify-between gap-2 z-20 mb-2">
        <div className="inline-flex p-0.5 bg-white/90 backdrop-blur-sm rounded-lg border border-[#DDD7CD] shadow-2xs">
          <button
            type="button"
            onClick={() => setViewMode('photo')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              viewMode === 'photo'
                ? 'bg-[#4A1525] text-white shadow-xs'
                : 'text-[#665F58] hover:text-[#1A1718]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Foto Studio</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('360')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              viewMode === '360'
                ? 'bg-[#4A1525] text-white shadow-xs'
                : 'text-[#665F58] hover:text-[#1A1718]'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>360° Caveau</span>
          </button>
        </div>

        <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#1A1718]/85 backdrop-blur-sm rounded-md text-[10px] font-medium text-[#E5E0D8]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Caveau Melano</span>
        </span>
      </div>

      {/* Main Interactive Showcase Stage */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setIsDragging(false);
          setIsZooming(false);
        }}
        onMouseEnter={() => setIsZooming(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
        className={`relative w-full max-w-[280px] h-[340px] sm:h-[390px] flex items-center justify-center ${
          viewMode === '360' ? 'cursor-grab active:cursor-grabbing' : 'cursor-crosshair'
        }`}
        title={viewMode === '360' ? 'Trascina orizzontalmente per ruotare la bottiglia a 360°' : 'Passa il mouse per ingrandire i dettagli'}
      >
        {/* Soft pedestal shadow */}
        <div
          className="absolute bottom-2 w-44 h-7 bg-black/15 rounded-full blur-md"
          style={{
            transform: viewMode === '360'
              ? `scale(${1 + Math.sin((rotationAngle * Math.PI) / 180) * 0.05})`
              : 'scale(1)',
          }}
        />

        {/* View Mode 1: High-Res Real Studio Photography */}
        {viewMode === 'photo' && !imageError && wine.image && (
          <div className="relative w-full h-full flex items-center justify-center p-2">
            <img
              src={wine.image}
              alt={`Studio shot of ${wine.name}`}
              onError={() => setImageError(true)}
              className="h-full w-auto max-h-[350px] object-contain drop-shadow-xl transition-transform duration-300"
              style={{
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                transform: isZooming ? 'scale(1.35)' : 'scale(1)',
              }}
            />

            {/* Subtle Zoom Hint */}
            {!isZooming && (
              <div className="absolute bottom-1 right-2 inline-flex items-center gap-1 text-[10px] text-[#8C827A] bg-white/80 px-2 py-0.5 rounded shadow-2xs pointer-events-none">
                <ZoomIn className="w-3 h-3 text-[#C5A059]" />
                <span>Hover per zoom</span>
              </div>
            )}
          </div>
        )}

        {/* View Mode 2: Interactive 360° 3D-perspective SVG Model */}
        {(viewMode === '360' || imageError || !wine.image) && (
          <div
            className="relative w-full h-full flex items-center justify-center transition-transform duration-75"
            style={{
              transform: `perspective(600px) rotateY(${rotationAngle}deg)`,
            }}
          >
          <svg
            viewBox="0 0 200 600"
            className="w-full h-full drop-shadow-2xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Glass reflections */}
              <linearGradient id={`glassGrad-${wine.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#111" stopOpacity="0.9" />
                <stop offset="25%" stopColor={glassColor} stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="75%" stopColor={glassColor} stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.95" />
              </linearGradient>

              {/* Foil capsule gradient */}
              <linearGradient id={`foilGrad-${wine.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#300" />
                <stop offset="40%" stopColor={foilColor} />
                <stop offset="70%" stopColor="#F5D080" />
                <stop offset="100%" stopColor="#200" />
              </linearGradient>

              {/* Label paper texture */}
              <linearGradient id={`labelGrad-${wine.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EFECE5" />
                <stop offset="50%" stopColor="#FAF8F3" />
                <stop offset="100%" stopColor="#DFD9CE" />
              </linearGradient>
            </defs>

            {/* Bottle Silhouette */}
            {/* Neck & Lip */}
            <path
              d="M86 50 H114 V80 C114 82, 116 85, 116 90 L116 160 C116 210, 150 240, 150 280 L150 540 C150 550, 145 555, 135 555 H65 C55 555, 50 550, 50 540 L50 280 C50 240, 84 210, 84 160 L84 90 C84 85, 86 82, 86 80 Z"
              fill={`url(#glassGrad-${wine.id})`}
              stroke="#2B2724"
              strokeWidth="1.5"
            />

            {/* Foil Capsule */}
            <path
              d="M85 45 H115 V110 C115 115, 117 125, 117 135 H83 C83 125, 85 115, 85 110 Z"
              fill={`url(#foilGrad-${wine.id})`}
            />
            {/* Capsule embossed band */}
            <rect x="85" y="70" width="30" height="4" fill="#C5A059" opacity="0.9" />

            {/* Authentic Wine Label */}
            <g
              transform={`translate(0, 0)`}
              opacity={
                // Hide label when turned backwards (between 90 and 270 degrees)
                rotationAngle > 95 && rotationAngle < 265 ? 0.08 : 1
              }
            >
              <rect
                x="56"
                y="270"
                width="88"
                height="150"
                rx="2"
                fill={`url(#labelGrad-${wine.id})`}
                stroke="#C5A059"
                strokeWidth="0.8"
                strokeDasharray="2 1"
              />

              {/* Inner golden crest */}
              <circle cx="100" cy="298" r="10" stroke="#C5A059" strokeWidth="0.8" fill="none" />
              <path d="M96 298 L100 292 L104 298 L100 304 Z" fill="#C5A059" />

              {/* Label Typography */}
              <text
                x="100"
                y="322"
                textAnchor="middle"
                fontFamily="serif"
                fontSize="11"
                fontWeight="700"
                fill="#1A1718"
              >
                {wine.name.length > 15 ? wine.name.substring(0, 13) + '…' : wine.name}
              </text>

              <text
                x="100"
                y="336"
                textAnchor="middle"
                fontSize="7"
                letterSpacing="1"
                fill="#665F58"
              >
                {wine.producer.length > 18 ? wine.producer.substring(0, 16) + '…' : wine.producer}
              </text>

              <line x1="75" y1="344" x2="125" y2="344" stroke="#C5A059" strokeWidth="0.5" />

              <text
                x="100"
                y="358"
                textAnchor="middle"
                fontFamily="serif"
                fontSize="14"
                fontWeight="600"
                fill="#4A1525"
              >
                {wine.vintage}
              </text>

              <text
                x="100"
                y="372"
                textAnchor="middle"
                fontSize="6"
                letterSpacing="0.5"
                fill="#555"
              >
                {wine.appellation.length > 20 ? wine.appellation.substring(0, 18) + '…' : wine.appellation}
              </text>

              <text
                x="100"
                y="386"
                textAnchor="middle"
                fontSize="6"
                fontWeight="600"
                letterSpacing="1"
                fill="#C5A059"
              >
                MIS EN BOUTEILLE
              </text>

              <text
                x="100"
                y="402"
                textAnchor="middle"
                fontSize="6"
                fill="#8C827A"
              >
                {wine.format} · 13.5% vol
              </text>
            </g>

            {/* Back label when rotated */}
            {rotationAngle > 90 && rotationAngle < 270 && (
              <g transform="translate(0, 0)">
                <rect
                  x="60"
                  y="290"
                  width="80"
                  height="120"
                  rx="2"
                  fill="#E6E0D4"
                  stroke="#A89E90"
                  strokeWidth="0.6"
                />
                <text x="100" y="315" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#333">
                  ARVI SA · MELANO
                </text>
                <text x="100" y="330" textAnchor="middle" fontSize="5.5" fill="#666">
                  SWISS BONDED VAULT INSPECTED
                </text>
                <line x1="70" y1="340" x2="130" y2="340" stroke="#999" strokeWidth="0.5" />
                <rect x="75" y="350" width="50" height="15" fill="#fff" stroke="#666" strokeWidth="0.5" />
                <text x="100" y="360" textAnchor="middle" fontSize="5" fontFamily="monospace" fill="#000">
                  CH-BONDED-6818
                </text>
              </g>
            )}

            {/* Glass Curvature Highlights */}
            <path
              d="M60 280 L60 535 C60 540, 65 545, 75 545"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.3"
            />
            <path
              d="M90 95 L90 155"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>
        </div>
      )}

      {/* Main Container closes after all elements */}
        {interactiveMode === 'zoom' && isZooming && (
          <div
            className="absolute pointer-events-none rounded-full border-2 border-[#C5A059] shadow-2xl overflow-hidden w-28 h-28 hidden md:block"
            style={{
              left: `${zoomPos.x}%`,
              top: `${zoomPos.y}%`,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(240,235,225,0.95) 100%)',
            }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-2 text-[10px]">
              <span className="font-serif font-bold text-[#4A1525]">{wine.producer}</span>
              <span className="text-[9px] text-[#666]">Capsula & Livello: Eccellente</span>
              <span className="text-[8px] text-[#C5A059] font-mono mt-0.5">Controllo ARVI OK</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar: Mode-specific Controls */}
      {viewMode === '360' ? (
        <div className="w-full max-w-[260px] flex items-center justify-between text-xs text-[#8C827A] mt-2 pt-2 border-t border-[#E3DDD4]">
          <button
            type="button"
            onClick={() => setRotationAngle(0)}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              rotationAngle === 0 ? 'bg-[#4A1525] text-white font-medium' : 'hover:text-[#1A1718]'
            }`}
          >
            Fronte
          </button>
          <button
            type="button"
            onClick={() => setRotationAngle(90)}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              rotationAngle === 90 ? 'bg-[#4A1525] text-white font-medium' : 'hover:text-[#1A1718]'
            }`}
          >
            Profilo
          </button>
          <button
            type="button"
            onClick={() => setRotationAngle(180)}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              rotationAngle === 180 ? 'bg-[#4A1525] text-white font-medium' : 'hover:text-[#1A1718]'
            }`}
          >
            Retro (Sigillo)
          </button>
          <button
            type="button"
            onClick={() => setRotationAngle((prev) => (prev + 45) % 360)}
            className="p-1 hover:text-[#4A1525] text-[#C5A059]"
            title="Ruota di 45 gradi"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="w-full max-w-[280px] flex items-center justify-between text-[11px] text-[#8C827A] mt-2 pt-2 border-t border-[#E3DDD4]">
          <span className="truncate">Fotografia originale in cantina</span>
          <button
            type="button"
            onClick={() => setViewMode('360')}
            className="text-[#4A1525] font-medium hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <RotateCw className="w-3 h-3 text-[#C5A059]" />
            <span>Passa a 360°</span>
          </button>
        </div>
      )}
    </div>
  );
};
