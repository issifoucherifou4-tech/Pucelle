import React from 'react';
import { Film, Volume2, Sun, Clock, Sparkles } from 'lucide-react';
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

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header - Clean, no code clutter */}
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
          Visionnez les vidéos haute définition de vos deux annonces partenaires. La vidéo et la musique sont synchronisées, la luminosité optimisée et la durée réduite à 1 minute (60s).
        </p>

        {/* Feature Badges - Zero-Pill clean row */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-neutral-700">
          <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-lg">
            <Volume2 className="w-4 h-4 text-emerald-600" />
            <span>Vidéo &amp; Musique Actives</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-lg">
            <Sun className="w-4 h-4 text-amber-600" />
            <span>Luminosité Augmentée (+25% / +50%)</span>
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
            />
          </div>
        ))}
      </div>
    </section>
  );
};
