import React, { useState } from 'react';
import { Film, Volume2, VolumeX, Sun, Clock, Music } from 'lucide-react';
import { AdCampaign } from '../types/ad';
import { VideoAdPlayer } from './VideoAdPlayer';

interface HeroAdsSpotlightProps {
  ads: AdCampaign[];
  onAdClick: (adId: string) => void;
  onSelectAd: (ad: AdCampaign) => void;
  onCopyLink: (url: string) => void;
}

export const HeroAdsSpotlight: React.FC<HeroAdsSpotlightProps> = ({
  ads,
  onAdClick,
  onSelectAd,
  onCopyLink,
}) => {
  const featuredAds = ads.filter((ad) => ad.featured).slice(0, 2);
  // Guarantee ONLY 1 single audio track plays at any time across both videos
  const [activeAudioAdId, setActiveAudioAdId] = useState<string | null>(featuredAds[0]?.id || null);

  const toggleGlobalSound = () => {
    if (activeAudioAdId) {
      setActiveAudioAdId(null);
    } else {
      setActiveAudioAdId(featuredAds[0]?.id || null);
    }
  };

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="mb-6 sm:mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
          <Film className="w-4 h-4 text-neutral-700" />
          <span>Vidéos Publicitaires Officielles</span>
          <span aria-hidden="true">·</span>
          <span>Format Mobile &amp; Réactif</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-neutral-950 font-heading tracking-tight leading-tight">
          Nos Deux Vidéos Publicitaires
        </h1>
        <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
          Visionnez les vidéos de vos deux annonces partenaires. Une bande sonore unique et harmonisée accompagne les deux vidéos, sans chevauchement ni interférence.
        </p>

        {/* Feature Badges - Zero-Pill clean row */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-neutral-700">
          <button
            onClick={toggleGlobalSound}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              activeAudioAdId
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-neutral-100 text-neutral-600 border-neutral-200'
            }`}
          >
            {activeAudioAdId ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Son Unique : Actif (1 seul flux)</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-neutral-500" />
                <span>Son Unique : En sourdine</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-lg">
            <Sun className="w-4 h-4 text-amber-600" />
            <span>Luminosité Augmentée (+25%)</span>
          </div>

          <div className="flex items-center gap-1.5 text-neutral-900 bg-neutral-100 border border-neutral-200 px-3 py-1.5 rounded-lg">
            <Clock className="w-4 h-4 text-neutral-700" />
            <span>Durée : 1:00 Minute (60s)</span>
          </div>
        </div>
      </div>

      {/* Responsive Duo Video Display - Centered, mobile-optimized 9:16 layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 justify-items-center items-start max-w-4xl mx-auto">
        {featuredAds.map((ad, index) => (
          <div key={ad.id} className="w-full flex flex-col items-center">
            {/* Direct Responsive Mobile Video Player */}
            <VideoAdPlayer
              ad={ad}
              onAdClick={onAdClick}
              onSelectAd={onSelectAd}
              onCopyLink={onCopyLink}
              hideTextOverlay={index === 1 || ad.id === 'ad-pin-54XZm9QiJ'}
              isAudioActive={activeAudioAdId === ad.id}
              onActivateAudio={() => setActiveAudioAdId(ad.id)}
              onDeactivateAudio={() => {
                if (activeAudioAdId === ad.id) {
                  setActiveAudioAdId(null);
                }
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
