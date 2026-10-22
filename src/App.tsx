/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroAdsSpotlight } from './components/HeroAdsSpotlight';
import { AdGrid } from './components/AdGrid';
import { BannerFormats } from './components/BannerFormats';
import { AddAdModal } from './components/AddAdModal';
import { AdDetailModal } from './components/AdDetailModal';
import { EmbedCodeModal } from './components/EmbedCodeModal';
import { FloatingAdBanner } from './components/FloatingAdBanner';
import { Toast } from './components/Toast';
import { INITIAL_ADS } from './data/defaultAds';
import { AdCampaign } from './types/ad';
import { ExternalLink, Copy, CheckCircle2, Pin, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

export default function App() {
  const [ads, setAds] = useState<AdCampaign[]>(() => {
    try {
      const saved = localStorage.getItem('vogue_street_ads');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: AdCampaign) => {
            const match = INITIAL_ADS.find((d) => d.id === item.id);
            if (match) {
              return { ...item, ...match, videoUrl: match.videoUrl };
            }
            return item;
          });
        }
      }
    } catch (e) {
      console.error('Failed to load ads from localStorage:', e);
    }
    return INITIAL_ADS;
  });

  const [activeSection, setActiveSection] = useState<'spotlight' | 'grid' | 'formats'>('spotlight');
  const [selectedAd, setSelectedAd] = useState<AdCampaign | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync ads with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vogue_street_ads', JSON.stringify(ads));
    } catch (e) {
      console.error('Failed to save ads to localStorage:', e);
    }
  }, [ads]);

  // Click tracker: increments clicks and updates storage
  const handleAdClick = (adId: string) => {
    setAds((prevAds) =>
      prevAds.map((ad) => {
        if (ad.id === adId) {
          return {
            ...ad,
            clicks: ad.clicks + 1,
            impressions: ad.impressions + 1,
          };
        }
        return ad;
      })
    );
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setToastMessage(`Lien copié : ${url}`);
  };

  const handleAddNewAd = (newAd: AdCampaign) => {
    setAds((prev) => [newAd, ...prev]);
    setToastMessage(`Nouvelle annonce "${newAd.title}" ajoutée avec succès !`);
  };

  const handleResetToDefault = () => {
    setAds(INITIAL_ADS);
    localStorage.removeItem('vogue_street_ads');
    setToastMessage('Campagnes réinitialisées aux deux codes publicitaires Pinterest par défaut.');
  };

  const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0);

  return (
    <div className="min-h-screen bg-stone-50/50 text-neutral-900 flex flex-col font-sans selection:bg-neutral-950 selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenEmbedModal={() => setIsEmbedModalOpen(true)}
        totalAds={ads.length}
        totalClicks={totalClicks}
        activeSection={activeSection}
        setActiveSection={(sec) => setActiveSection(sec as any)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Section 1: Hero Ads Spotlight */}
        {(activeSection === 'spotlight' || activeSection === 'grid') && (
          <HeroAdsSpotlight
            ads={ads}
            onAdClick={handleAdClick}
            onSelectAd={setSelectedAd}
            onCopyLink={handleCopyLink}
          />
        )}

        {/* Section 2: Full Ads Grid & Catalog */}
        <AdGrid
          ads={ads}
          onAdClick={handleAdClick}
          onSelectAd={setSelectedAd}
          onCopyLink={handleCopyLink}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />

        {/* Section 3: Banner Formats Simulator & Exporter */}
        <BannerFormats
          ads={ads}
          onAdClick={handleAdClick}
          onCopyLink={handleCopyLink}
        />
      </main>

      {/* Floating Bottom Promotional Banner */}
      <FloatingAdBanner ads={ads} onAdClick={handleAdClick} />

      {/* Modals */}
      <AddAdModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddAd={handleAddNewAd}
      />

      <AdDetailModal
        ad={selectedAd}
        onClose={() => setSelectedAd(null)}
        onAdClick={handleAdClick}
        onCopyLink={handleCopyLink}
      />

      <EmbedCodeModal
        isOpen={isEmbedModalOpen}
        onClose={() => setIsEmbedModalOpen(false)}
        ads={ads}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 mt-16 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <span className="text-lg font-black text-white uppercase tracking-tight font-heading">
                VOGUE &amp; STREET
              </span>
              <p className="mt-2 text-xs text-neutral-400 max-w-sm leading-relaxed">
                Plateforme éditoriale et gestionnaire d'espaces publicitaires. Intégration optimisée des flux et campagnes publicitaires Pinterest pour monétiser et valoriser vos partenariats mode et streetwear.
              </p>
              <div className="mt-4 flex items-center gap-3 text-neutral-500 font-mono text-[11px]">
                <span>2 campagnes sponsorisées intégrées</span>
                <span aria-hidden="true">·</span>
                <span>{totalClicks} clics comptabilisés</span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold uppercase tracking-wider text-[11px] mb-3">
                Campagnes Vérifiées
              </h4>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <a
                    href="https://pin.it/6we2QA6V0"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleAdClick(ads[0]?.id || '')}
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>Lit Outfits (pin.it/6we2QA6V0)</span>
                    <ExternalLink className="w-3 h-3 text-neutral-500" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://pin.it/54XZm9QiJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleAdClick(ads[1]?.id || '')}
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>PIPY TIDA (pin.it/54XZm9QiJ)</span>
                    <ExternalLink className="w-3 h-3 text-neutral-500" />
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setIsEmbedModalOpen(true)}
                    className="hover:text-white transition-colors text-left"
                  >
                    Codes d'intégration HTML / React
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold uppercase tracking-wider text-[11px] mb-3">
                Gestion des Annonces
              </h4>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="hover:text-white transition-colors text-left"
                  >
                    + Ajouter une nouvelle annonce
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleResetToDefault}
                    className="hover:text-white transition-colors text-left flex items-center gap-1 text-neutral-400"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Réinitialiser les annonces</span>
                  </button>
                </li>
                <li className="text-neutral-500 text-[11px] pt-1">
                  Tous les liens s'ouvrent en mode sécurisé avec rel="noopener noreferrer".
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 text-[11px]">
            <div>© {new Date().getFullYear()} Vogue &amp; Street. Tous droits réservés.</div>
            <div className="flex items-center gap-4">
              <span>Partenariat Pinterest Ad Network</span>
              <span aria-hidden="true">·</span>
              <span>Conforme RGPD &amp; Confidentialité</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
