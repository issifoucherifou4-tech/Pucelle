import React, { useState } from 'react';
import { Search, ExternalLink, Copy, Eye, MousePointerClick, Pin, Filter, Plus, Play } from 'lucide-react';
import { AdCampaign } from '../types/ad';

interface AdGridProps {
  ads: AdCampaign[];
  onAdClick: (adId: string) => void;
  onSelectAd: (ad: AdCampaign) => void;
  onCopyLink: (url: string) => void;
  onOpenAddModal: () => void;
}

export const AdGrid: React.FC<AdGridProps> = ({
  ads,
  onAdClick,
  onSelectAd,
  onCopyLink,
  onOpenAddModal,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredAds = ads.filter((ad) => {
    const matchesCategory = filterCategory === 'all' || ad.category === filterCategory;
    const matchesQuery =
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ad.shortUrl.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Controls & Filtering */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-heading">
            Catalogue des Annonces &amp; Codes Publicitaires
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            Gérez vos annonces Pinterest intégrées, suivez les clics et copiez vos liens d'affiliation.
          </p>
        </div>

        {/* Search & Add CTA */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une annonce..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950 transition-colors"
            />
          </div>

          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg shadow-sm transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter une Pub</span>
          </button>
        </div>
      </div>

      {/* Category Filter Tabs (Zero-Pill: clean segmented control) */}
      <div className="flex items-center gap-1.5 mb-8 overflow-x-auto pb-2 border-b border-neutral-200">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            filterCategory === 'all'
              ? 'bg-neutral-950 text-white font-semibold'
              : 'text-neutral-600 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200/70'
          }`}
        >
          Toutes les campagnes ({ads.length})
        </button>
        <button
          onClick={() => setFilterCategory('fashion')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            filterCategory === 'fashion'
              ? 'bg-neutral-950 text-white font-semibold'
              : 'text-neutral-600 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200/70'
          }`}
        >
          Mode &amp; Robes (pin.it/6we2QA6V0)
        </button>
        <button
          onClick={() => setFilterCategory('streetwear')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            filterCategory === 'streetwear'
              ? 'bg-neutral-950 text-white font-semibold'
              : 'text-neutral-600 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200/70'
          }`}
        >
          Streetwear &amp; Caps (pin.it/54XZm9QiJ)
        </button>
      </div>

      {/* Grid */}
      {filteredAds.length === 0 ? (
        <div className="text-center py-16 bg-white border border-neutral-200 rounded-2xl p-8">
          <p className="text-neutral-500 text-sm">Aucune annonce ne correspond à votre recherche.</p>
          <button
            onClick={() => {
              setFilterCategory('all');
              setSearchQuery('');
            }}
            className="mt-3 text-xs font-semibold text-neutral-950 underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAds.map((ad) => (
            <article
              key={ad.id}
              className="group bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Visual */}
                <div
                  onClick={() => onSelectAd(ad)}
                  className="relative aspect-4/3 w-full bg-neutral-100 overflow-hidden cursor-pointer"
                >
                  <img
                    src={ad.imageUrl}
                    alt={ad.title}
                    className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded">
                    {ad.categoryLabel}
                  </div>
                  {ad.videoUrl && (
                    <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/40 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 text-neutral-950 flex items-center justify-center shadow-lg pl-0.5 group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-neutral-950" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-neutral-800 text-[10px] font-mono px-2 py-0.5 rounded shadow-2xs flex items-center gap-1">
                    <Pin className="w-3 h-3 text-red-500 fill-red-500" />
                    {ad.videoUrl ? 'Vidéo HD' : `${ad.pinId.slice(0, 6)}...`}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1.5">
                    <span>Par {ad.advertiser}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-medium">Actif</span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-950 font-heading leading-snug group-hover:text-neutral-800">
                    {ad.title}
                  </h3>

                  <p className="text-xs text-neutral-600 line-clamp-2 mt-1.5 leading-relaxed">
                    {ad.description}
                  </p>

                  {/* Performance micro indicators */}
                  <div className="flex items-center gap-4 mt-4 pt-3 border-t border-neutral-100 text-xs text-neutral-500 font-mono">
                    <span className="flex items-center gap-1">
                      <MousePointerClick className="w-3 h-3 text-neutral-400" />
                      {ad.clicks} clics
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-neutral-400" />
                      {ad.impressions} vues
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-200/60 mb-3">
                  <span className="truncate pr-2 font-medium">{ad.shortUrl}</span>
                  <button
                    onClick={() => onCopyLink(ad.shortUrl)}
                    className="hover:text-neutral-950 p-0.5 rounded transition-colors"
                    title="Copier le lien"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={ad.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onAdClick(ad.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    <span>Ouvrir Pin.it</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => onSelectAd(ad)}
                    className="px-3 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200/80 rounded-lg transition-colors"
                  >
                    Détails
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
