import React, { useState } from 'react';
import { ExternalLink, X, ChevronRight, Pin } from 'lucide-react';
import { AdCampaign } from '../types/ad';

interface FloatingAdBannerProps {
  ads: AdCampaign[];
  onAdClick: (adId: string) => void;
}

export const FloatingAdBanner: React.FC<FloatingAdBannerProps> = ({ ads, onAdClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isVisible || ads.length === 0) return null;

  const currentAd = ads[currentIndex % ads.length];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ads.length);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-30 bg-neutral-950 text-white rounded-xl shadow-2xl border border-neutral-800 p-3 sm:p-3.5 transition-all duration-300 animate-slide-up">
      <div className="flex items-center gap-3">
        {/* Thumbnail */}
        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-neutral-900 border border-neutral-800">
          <img
            src={currentAd.imageUrl}
            alt={currentAd.title}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-semibold tracking-wider text-amber-400">
            <Pin className="w-2.5 h-2.5 fill-amber-400" />
            <span>Sponsorisé Pinterest · #{currentIndex + 1}/{ads.length}</span>
          </div>
          <h4 className="text-xs font-bold text-white truncate font-heading">
            {currentAd.title}
          </h4>
          <span className="text-[11px] text-neutral-400 truncate block font-mono">
            {currentAd.shortUrl}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <a
            href={currentAd.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onAdClick(currentAd.id)}
            className="px-2.5 py-1.5 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded-md transition-colors flex items-center gap-1"
            title="Consulter l'annonce"
          >
            <span>Voir</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {ads.length > 1 && (
            <button
              onClick={handleNext}
              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
              title="Campagne suivante"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setIsVisible(false)}
            className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
            title="Fermer la bannière"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
