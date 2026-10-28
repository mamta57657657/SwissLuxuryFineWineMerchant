/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { HeroBanner } from './components/HeroBanner.tsx';
import { CollectionGrid } from './components/CollectionGrid.tsx';
import { CassaforteVaultSection } from './components/CassaforteVaultSection.tsx';
import { EstatesShowcase } from './components/EstatesShowcase.tsx';
import { BoutiquesSection } from './components/BoutiquesSection.tsx';
import { WhyArviSection } from './components/WhyArviSection.tsx';
import { EnPrimeurSection } from './components/EnPrimeurSection.tsx';
import { PrivateCellarAdvisorySection } from './components/PrivateCellarAdvisorySection.tsx';
import { EventsGalaSection } from './components/EventsGalaSection.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { CartDrawer, CartItem } from './components/CartDrawer.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { AgeGateModal } from './components/AgeGateModal.tsx';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal.tsx';
import { SeoStructuredDataModal } from './components/SeoStructuredDataModal.tsx';
import { AddWineModal } from './components/AddWineModal.tsx';
import { BoutiqueModal } from './components/BoutiqueModal.tsx';
import { CassaforteModal } from './components/CassaforteModal.tsx';
import { Footer } from './components/Footer.tsx';
import { WINE_CATALOG, BOUTIQUES, BoutiqueLocation } from './data/wines.ts';
import { WineProduct, Currency } from './utils/wine-logic.ts';

export default function App() {
  // Global Commerce & Regional State
  const [currency, setCurrency] = useState<Currency>('CHF');
  const [includeVAT, setIncludeVAT] = useState<boolean>(true);
  const [activeNav, setActiveNav] = useState<string>('home');
  const [catalogSearch, setCatalogSearch] = useState<string>('');

  // Dynamic Catalog State with localStorage persistence for added wines
  const [winesList, setWinesList] = useState<WineProduct[]>(() => {
    try {
      const saved = localStorage.getItem('arvi_custom_wines');
      if (saved) {
        const customWines: WineProduct[] = JSON.parse(saved);
        return [...customWines, ...WINE_CATALOG];
      }
    } catch (e) {
      // fallback
    }
    return WINE_CATALOG;
  });

  // Age Gate (Swiss & international legal requirement, autostart=1 skips for fast verification)
  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      setIsAgeVerified(true);
      return;
    }
    const verified = localStorage.getItem('arvi_age_verified');
    if (!verified) {
      setIsAgeVerified(false);
    }
  }, []);

  const handleAgeConfirm = () => {
    setIsAgeVerified(true);
    try {
      localStorage.setItem('arvi_age_verified', 'true');
    } catch (e) {
      // ignore
    }
  };

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: WINE_CATALOG[1], quantity: 2, inVault: false }, // Pol Roger Brut NV
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(['chateau-ausone-1995-300cl']);

  // Modals & Inspectors
  const [selectedWine, setSelectedWine] = useState<WineProduct | null>(null);
  const [selectedBoutique, setSelectedBoutique] = useState<BoutiqueLocation | null>(null);
  const [isVaultModalOpen, setIsVaultModalOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isSeoOpen, setIsSeoOpen] = useState(false);
  const [isAddWineOpen, setIsAddWineOpen] = useState(false);

  // Theme Settings
  const [announcementText, setAnnouncementText] = useState(
    'Spedizione refrigerata gratuita in Svizzera per ordini oltre CHF 500 · Caveau Melano 14°C'
  );
  const [accentColor, setAccentColor] = useState('#4A1525');
  const [showScoresOnCards, setShowScoresOnCards] = useState(true);

  // Handler for adding a new wine to the collection
  const handleAddNewWine = (newWine: WineProduct) => {
    setWinesList((prev) => {
      const updated = [newWine, ...prev];
      try {
        const savedCustom = localStorage.getItem('arvi_custom_wines');
        const customArr = savedCustom ? JSON.parse(savedCustom) : [];
        customArr.unshift(newWine);
        localStorage.setItem('arvi_custom_wines', JSON.stringify(customArr));
      } catch (e) {
        // storage fallback
      }
      return updated;
    });
  };

  // Cart Actions
  const handleAddToCart = (wine: WineProduct, quantity: number = 1, inVault: boolean = false) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === wine.id && item.inVault === inVault);
      if (existing) {
        return prev.map((item) =>
          item.product.id === wine.id && item.inVault === inVault
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product: wine, quantity, inVault }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleToggleWishlist = (wine: WineProduct) => {
    setWishlistIds((prev) =>
      prev.includes(wine.id) ? prev.filter((id) => id !== wine.id) : [...prev, wine.id]
    );
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1A1718] font-sans selection:bg-[#4A1525] selection:text-white"
      style={{ '--color-bordeaux': accentColor } as React.CSSProperties}
    >
      {/* Age Gate Modal (Prompted on first arrival) */}
      <AgeGateModal
        isOpen={!isAgeVerified}
        onConfirm={handleAgeConfirm}
      />

      {/* Top Header */}
      <Header
        currency={currency}
        setCurrency={setCurrency}
        includeVAT={includeVAT}
        setIncludeVAT={setIncludeVAT}
        activeNav={activeNav}
        setActiveNav={(nav) => {
          setActiveNav(nav);
          if (nav === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
          if (nav === 'catalog') scrollToSection('collection-section');
          if (nav === 'enprimeur') scrollToSection('en-primeur');
          if (nav === 'vault') scrollToSection('vault-section');
          if (nav === 'advisory') scrollToSection('advisory');
          if (nav === 'eventi') scrollToSection('eventi');
          if (nav === 'shops') scrollToSection('shops-section');
        }}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
        openCustomizer={() => setIsCustomizerOpen(true)}
        openSeoInspector={() => setIsSeoOpen(true)}
        announcementText={announcementText}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Banner with Brand Storytelling */}
        <HeroBanner
          onExploreCatalog={() => scrollToSection('collection-section')}
          onExploreVault={() => setIsVaultModalOpen(true)}
          isAgeVerified={isAgeVerified}
          onConfirmAge={handleAgeConfirm}
        />

        {/* Featured Estates Spotlight */}
        <EstatesShowcase
          onSelectEstate={(name) => {
            const cleanName = name.replace('Chateau ', '').replace('Domaine ', '').trim();
            setCatalogSearch(cleanName);
            scrollToSection('collection-section');
          }}
        />

        {/* Wine Collection Grid with Multi-Facet Filters & Add Wine Feature */}
        <CollectionGrid
          wines={winesList}
          currency={currency}
          includeVAT={includeVAT}
          onQuickView={(wine) => setSelectedWine(wine)}
          onAddToCart={(wine) => handleAddToCart(wine, 1, false)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onOpenAddWineModal={() => setIsAddWineOpen(true)}
          searchQuery={catalogSearch}
          onSearchQueryChange={setCatalogSearch}
          showScoresOnCards={showScoresOnCards}
        />

        {/* En Primeur Bordeaux & Burgundy Futures Section */}
        <EnPrimeurSection
          currency={currency}
          includeVAT={includeVAT}
        />

        {/* Cassaforte del Vino (The Wine Bank in Melano) */}
        <CassaforteVaultSection
          onReserveVault={() => setIsVaultModalOpen(true)}
        />

        {/* Private Cellar Advisory & Wine Investment Section */}
        <PrivateCellarAdvisorySection
          currency={currency}
        />

        {/* Events, Masterclasses & Gala Dinners Section */}
        <EventsGalaSection
          currency={currency}
          includeVAT={includeVAT}
        />

        {/* Boutiques & Shops (Melano, Lugano, Zurich) */}
        <BoutiquesSection
          onSelectBoutique={(boutique) => setSelectedBoutique(boutique)}
        />

        {/* Why Buy from ARVI - 4 Core Pillars */}
        <WhyArviSection
          onLearnMore={() => setIsVaultModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(nav) => {
          setActiveNav(nav);
          if (nav === 'catalog') scrollToSection('collection-section');
          if (nav === 'enprimeur') scrollToSection('en-primeur');
          if (nav === 'vault') scrollToSection('vault-section');
          if (nav === 'advisory') scrollToSection('advisory');
          if (nav === 'eventi') scrollToSection('eventi');
          if (nav === 'shops') scrollToSection('shops-section');
        }}
      />

      {/* Add Wine to Collection Modal */}
      <AddWineModal
        isOpen={isAddWineOpen}
        onClose={() => setIsAddWineOpen(false)}
        onAddWine={handleAddNewWine}
      />

      {/* Elevated Product Detail Page (PDP) Modal with 360° bottle viewer */}
      <ProductDetailModal
        wine={selectedWine}
        onClose={() => setSelectedWine(null)}
        currency={currency}
        includeVAT={includeVAT}
        onAddToCart={handleAddToCart}
      />

      {/* Swiss Boutiques Showcase & VIP Tasting Booking Modal */}
      <BoutiqueModal
        boutique={selectedBoutique}
        onClose={() => setSelectedBoutique(null)}
      />

      {/* Cassaforte del Vino Deep Dive & Storage Quote Modal */}
      <CassaforteModal
        isOpen={isVaultModalOpen}
        onClose={() => setIsVaultModalOpen(false)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        currency={currency}
        includeVAT={includeVAT}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={currency}
        includeVAT={includeVAT}
        onOrderSuccess={() => {
          setCartItems([]);
        }}
      />

      {/* Theme Settings & Liquid Schema Inspector */}
      <ThemeCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        announcementText={announcementText}
        setAnnouncementText={setAnnouncementText}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
        showScoresOnCards={showScoresOnCards}
        setShowScoresOnCards={setShowScoresOnCards}
      />

      {/* SEO & Structured Data JSON-LD Inspector */}
      <SeoStructuredDataModal
        isOpen={isSeoOpen}
        onClose={() => setIsSeoOpen(false)}
        sampleWine={winesList[0]}
      />
    </div>
  );
}
