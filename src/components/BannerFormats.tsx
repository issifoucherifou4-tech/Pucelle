import React, { useState } from 'react';
import { ExternalLink, Copy, Check, LayoutGrid, Monitor, Smartphone, Layers, Pin } from 'lucide-react';
import { AdCampaign } from '../types/ad';

interface BannerFormatsProps {
  ads: AdCampaign[];
  onAdClick: (adId: string) => void;
  onCopyLink: (url: string) => void;
}

export const BannerFormats: React.FC<BannerFormatsProps> = ({ ads, onAdClick, onCopyLink }) => {
  const [selectedAdId, setSelectedAdId] = useState<string>(ads[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'rectangle' | 'native' | 'story'>('leaderboard');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const currentAd = ads.find((a) => a.id === selectedAdId) || ads[0];

  if (!currentAd) return null;

  const getEmbedHtml = () => {
    switch (activeTab) {
      case 'leaderboard':
        return `<!-- Vogue & Street Leaderboard Banner -->
<div style="max-width:728px;margin:1rem auto;background:#fff;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.05);display:flex;align-items:center;padding:12px 16px;gap:16px;">
  <img src="${currentAd.imageUrl}" alt="${currentAd.title}" style="width:70px;height:70px;object-fit:cover;border-radius:8px;" />
  <div style="flex:1;">
    <span style="font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Sponsorisé · ${currentAd.advertiser}</span>
    <h4 style="margin:2px 0;font-size:16px;font-weight:700;color:#0a0a0a;">${currentAd.title}</h4>
    <p style="margin:0;font-size:12px;color:#525252;">${currentAd.subtitle}</p>
  </div>
  <a href="${currentAd.shortUrl}" target="_blank" rel="noopener noreferrer" style="background:#0a0a0a;color:#fff;padding:8px 16px;border-radius:6px;font-size:12px;text-decoration:none;font-weight:600;white-space:nowrap;">
    Découvrir ↗
  </a>
</div>`;
      case 'rectangle':
        return `<!-- Vogue & Street Medium Rectangle Banner (300x250) -->
<div style="width:300px;background:#fff;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.05);padding:16px;font-family:sans-serif;">
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:11px;color:#737373;">
    <span>PUBLICITÉ PARTENAIRE</span>
    <span>PINTEREST</span>
  </div>
  <img src="${currentAd.imageUrl}" alt="${currentAd.title}" style="width:100%;height:140px;object-fit:cover;border-radius:8px;margin-bottom:10px;" />
  <h5 style="margin:0 0 4px;font-size:14px;font-weight:700;color:#0a0a0a;">${currentAd.title}</h5>
  <p style="margin:0 0 12px;font-size:12px;color:#525252;line-height:1.4;">${currentAd.subtitle}</p>
  <a href="${currentAd.shortUrl}" target="_blank" rel="noopener noreferrer" style="display:block;text-align:center;background:#0a0a0a;color:#fff;padding:8px;border-radius:6px;font-size:12px;text-decoration:none;font-weight:600;">
    Voir sur Pinterest ↗
  </a>
</div>`;
      case 'story':
        return `<!-- Vogue & Street Vertical Card -->
<div style="width:260px;background:#000;color:#fff;border-radius:16px;overflow:hidden;position:relative;">
  <img src="${currentAd.imageUrl}" alt="${currentAd.title}" style="width:100%;height:380px;object-fit:cover;opacity:0.85;" />
  <div style="position:absolute;bottom:0;left:0;right:0;padding:20px;background:linear-gradient(to top, rgba(0,0,0,0.95), transparent);">
    <span style="font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#f59e0b;">Annonce Pinterest</span>
    <h3 style="font-size:16px;font-weight:700;margin:4px 0;">${currentAd.title}</h3>
    <a href="${currentAd.shortUrl}" target="_blank" style="display:inline-block;margin-top:8px;background:#fff;color:#000;padding:6px 14px;border-radius:6px;font-size:12px;font-weight:700;text-decoration:none;">
      Ouvrir le Pin ↗
    </a>
  </div>
</div>`;
      case 'native':
      default:
        return `<!-- Vogue & Street Native In-Article Ad -->
<aside style="background:#f9f9f8;border:1px solid #e5e5e5;border-radius:10px;padding:16px;margin:24px 0;display:flex;gap:16px;align-items:center;">
  <img src="${currentAd.imageUrl}" alt="${currentAd.title}" style="width:96px;height:96px;border-radius:8px;object-fit:cover;" />
  <div>
    <span style="font-size:11px;color:#888;letter-spacing:0.5px;">CONTENU RECOMMANDÉ · PINTEREST</span>
    <h4 style="margin:4px 0;font-size:16px;font-weight:700;">${currentAd.title}</h4>
    <p style="margin:0 0 8px;font-size:13px;color:#444;">${currentAd.description}</p>
    <a href="${currentAd.shortUrl}" target="_blank" style="font-size:12px;font-weight:600;color:#0a0a0a;text-decoration:underline;">Consulter la collection Pinterest &rarr;</a>
  </div>
</aside>`;
    }
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(getEmbedHtml());
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2500);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
            <span>Simulateur d'Emplacements</span>
            <span aria-hidden="true">·</span>
            <span>Formats Publicitaires Réactifs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-heading">
            Comment Vos Publicités Apparaissent
          </h2>
          <p className="text-sm text-neutral-600 mt-1 max-w-xl">
            Testez le rendu de vos deux annonces Pinterest sous différents formats d'affichage pour votre site web ou ceux de vos partenaires.
          </p>
        </div>

        {/* Campaign selector dropdown / segmented controls */}
        <div className="flex items-center gap-2 p-1 bg-neutral-100 rounded-lg border border-neutral-200 self-start md:self-auto">
          {ads.map((ad, idx) => (
            <button
              key={ad.id}
              onClick={() => setSelectedAdId(ad.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                selectedAdId === ad.id
                  ? 'bg-white text-neutral-950 shadow-2xs font-semibold'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              <span>Pub #{idx + 1}</span>
              <span className="max-w-[120px] truncate">({ad.title.split(' ')[0]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Format Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-neutral-200 pb-3">
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'leaderboard'
              ? 'bg-neutral-900 text-white'
              : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Bannière Horizontale (728x90)</span>
        </button>

        <button
          onClick={() => setActiveTab('rectangle')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'rectangle'
              ? 'bg-neutral-900 text-white'
              : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Pavé Carré / Sidebar (300x250)</span>
        </button>

        <button
          onClick={() => setActiveTab('story')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'story'
              ? 'bg-neutral-900 text-white'
              : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Format Story / Mobile (9:16)</span>
        </button>

        <button
          onClick={() => setActiveTab('native')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'native'
              ? 'bg-neutral-900 text-white'
              : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Native In-Feed Editorial</span>
        </button>
      </div>

      {/* Preview Area & Code Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Visual Live Preview */}
        <div className="lg:col-span-7 bg-neutral-100/80 border border-neutral-200/80 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[380px]">
          <div className="text-xs text-neutral-500 font-mono mb-4 w-full text-center">
            Aperçu dynamique de la publicité en situation réelle :
          </div>

          {activeTab === 'leaderboard' && (
            <div className="w-full max-w-2xl bg-white border border-neutral-300 rounded-xl p-3 sm:p-4 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={currentAd.imageUrl}
                  alt={currentAd.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover object-top rounded-lg shrink-0 border border-neutral-200"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                    <span className="font-semibold text-neutral-900 uppercase">Sponsorisé</span>
                    <span aria-hidden="true">·</span>
                    <span>{currentAd.advertiser}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-neutral-950 truncate font-heading">
                    {currentAd.title}
                  </h4>
                  <p className="text-xs text-neutral-600 truncate hidden sm:block">
                    {currentAd.subtitle}
                  </p>
                  <span className="text-[11px] text-neutral-400 font-mono">{currentAd.shortUrl}</span>
                </div>
              </div>
              <a
                href={currentAd.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onAdClick(currentAd.id)}
                className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <span>Visiter</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {activeTab === 'rectangle' && (
            <div className="w-[300px] bg-white border border-neutral-300 rounded-xl p-4 shadow-sm flex flex-col">
              <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-2">
                <span className="font-semibold uppercase tracking-wider text-neutral-800">Publicité</span>
                <span className="flex items-center gap-1">
                  <Pin className="w-3 h-3 text-red-500 fill-red-500" />
                  Pinterest
                </span>
              </div>
              <img
                src={currentAd.imageUrl}
                alt={currentAd.title}
                className="w-full h-36 object-cover object-top rounded-lg mb-3 border border-neutral-200"
              />
              <h4 className="text-sm font-bold text-neutral-950 font-heading leading-snug">
                {currentAd.title}
              </h4>
              <p className="text-xs text-neutral-600 line-clamp-2 mt-1 mb-3">
                {currentAd.subtitle}
              </p>
              <a
                href={currentAd.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onAdClick(currentAd.id)}
                className="w-full text-center py-2 px-3 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Découvrir l'annonce</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {activeTab === 'story' && (
            <div className="w-64 h-[400px] bg-neutral-950 text-white rounded-2xl overflow-hidden relative shadow-lg group">
              {currentAd.videoUrl ? (
                <video
                  src={currentAd.videoUrl}
                  poster={currentAd.imageUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ filter: 'brightness(1.25) contrast(1.06) saturate(1.15)' }}
                  className="w-full h-full object-cover pointer-events-none"
                />
              ) : (
                <img
                  src={currentAd.imageUrl}
                  alt={currentAd.title}
                  className="w-full h-full object-cover object-top opacity-85 group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent p-5 flex flex-col justify-end">
                <div className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold mb-1">
                  Annonce Pinterest Partenaire
                </div>
                <h4 className="text-base font-bold font-heading leading-tight mb-1 text-white">
                  {currentAd.title}
                </h4>
                <p className="text-xs text-neutral-300 line-clamp-2 mb-3">
                  {currentAd.subtitle}
                </p>
                <a
                  href={currentAd.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onAdClick(currentAd.id)}
                  className="w-full py-2 px-3 text-xs font-bold text-neutral-950 bg-white hover:bg-neutral-100 rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Voir le Pin</span>
                  <ExternalLink className="w-3 h-3 text-neutral-900" />
                </a>
              </div>
            </div>
          )}

          {activeTab === 'native' && (
            <div className="w-full max-w-xl bg-white border border-neutral-300 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
              <img
                src={currentAd.imageUrl}
                alt={currentAd.title}
                className="w-full sm:w-28 h-28 object-cover object-top rounded-lg shrink-0 border border-neutral-200"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[11px] text-neutral-500 mb-1">
                  <span className="font-semibold text-neutral-900 uppercase">Recommandé</span>
                  <span aria-hidden="true">·</span>
                  <span>Sélection Mode &amp; Urban</span>
                </div>
                <h4 className="text-base font-bold text-neutral-950 font-heading">
                  {currentAd.title}
                </h4>
                <p className="text-xs text-neutral-600 line-clamp-2 mt-1 mb-2">
                  {currentAd.description}
                </p>
                <div className="flex items-center justify-between">
                  <a
                    href={currentAd.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onAdClick(currentAd.id)}
                    className="text-xs font-bold text-neutral-950 hover:underline flex items-center gap-1"
                  >
                    <span>Explorer sur Pinterest</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-[11px] font-mono text-neutral-400">{currentAd.shortUrl}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ready to Copy HTML / Embed Code Box */}
        <div className="lg:col-span-5 bg-neutral-900 text-neutral-200 rounded-2xl p-6 border border-neutral-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
              Code HTML d'Intégration
            </span>
            <button
              onClick={handleCopySnippet}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-white hover:bg-neutral-100 rounded-md transition-colors"
            >
              {copiedSnippet ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-700" />
                  <span>Copier le Code</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-neutral-400 mb-3">
            Collez directement ce code HTML dans votre site web, blog WordPress, Shopify ou application pour afficher l'annonce :
          </p>

          <pre className="p-3 bg-neutral-950 rounded-lg text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-56 leading-relaxed border border-neutral-800">
            {getEmbedHtml()}
          </pre>

          <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <span>Redirige vers : <strong className="text-neutral-200">{currentAd.shortUrl}</strong></span>
            <button
              onClick={() => onCopyLink(currentAd.shortUrl)}
              className="text-xs text-neutral-300 hover:text-white underline"
            >
              Copier l'URL seule
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
