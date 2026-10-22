import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, Pin, Share2, BarChart2, ShieldCheck, Code2 } from 'lucide-react';
import { AdCampaign } from '../types/ad';

interface AdDetailModalProps {
  ad: AdCampaign | null;
  onClose: () => void;
  onAdClick: (adId: string) => void;
  onCopyLink: (url: string) => void;
}

export const AdDetailModal: React.FC<AdDetailModalProps> = ({
  ad,
  onClose,
  onAdClick,
  onCopyLink,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [utmSource, setUtmSource] = useState('vogue_street_site');

  if (!ad) return null;

  const trackedUrl = `${ad.shortUrl}?utm_source=${utmSource}&utm_medium=banner&utm_campaign=${ad.pinId}`;

  const iframeSnippet = `<iframe src="${ad.shortUrl}" width="100%" height="450" frameborder="0" style="border-radius:12px;border:1px solid #e5e5e5;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);"></iframe>`;

  const pinterestWidgetSnippet = `<!-- Pinterest Pin Widget -->
<a data-pin-do="embedPin" href="${ad.directUrl}"></a>
<script async defer src="//assets.pinterest.com/js/pinit.js"></script>`;

  const handleCopyCode = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-red-50 text-red-600 rounded-lg">
              <Pin className="w-4 h-4 fill-red-600" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-neutral-950 font-heading">
                Fiche de la Campagne Publicitaire
              </h3>
              <p className="text-xs text-neutral-500">
                Code ID : <span className="font-mono text-neutral-800">{ad.pinId}</span> · {ad.categoryLabel}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Top visual and summary */}
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-full sm:w-48 aspect-[9/16] rounded-xl overflow-hidden bg-neutral-950 shrink-0 border border-neutral-200 relative group">
              {ad.videoUrl ? (
                <div className="relative w-full h-full">
                  <video
                    src={ad.videoUrl}
                    poster={ad.imageUrl}
                    controls
                    playsInline
                    style={{ filter: 'brightness(1.25) contrast(1.06) saturate(1.15)' }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-neutral-950/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded shadow pointer-events-none">
                    1:00 min · Musique HD
                  </div>
                </div>
              ) : (
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-full h-full object-cover object-top"
                />
              )}
            </div>

            <div className="flex-1">
              <div className="text-xs text-neutral-500 mb-1">
                Annonceur officiel : <strong className="text-neutral-800">{ad.advertiser}</strong>
              </div>
              <h2 className="text-xl font-bold text-neutral-950 font-heading leading-snug">
                {ad.title}
              </h2>
              <p className="text-xs font-medium text-neutral-700 mt-1 mb-2">
                {ad.subtitle}
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                {ad.description}
              </p>

              {/* Verified links */}
              <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Lien Publicitaire Court :</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-neutral-900">{ad.shortUrl}</span>
                    <button
                      onClick={() => onCopyLink(ad.shortUrl)}
                      className="p-1 hover:bg-neutral-200 text-neutral-600 rounded transition-colors"
                      title="Copier"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400">URL directe Pinterest :</span>
                  <a
                    href={ad.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 hover:text-neutral-900 truncate max-w-[200px] underline"
                  >
                    {ad.directUrl}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-center">
            <div>
              <div className="text-xl font-bold text-neutral-950 font-mono">{ad.clicks}</div>
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider mt-0.5">Clics Générés</div>
            </div>
            <div>
              <div className="text-xl font-bold text-neutral-950 font-mono">{ad.impressions}</div>
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider mt-0.5">Impressions</div>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-700 font-mono">
                {((ad.clicks / Math.max(ad.impressions, 1)) * 100).toFixed(1)}%
              </div>
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider mt-0.5">Taux de Clic (CTR)</div>
            </div>
          </div>

          {/* Integration Snippet Exporter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-neutral-600" />
                <span>Code d'Intégration Web (Widget Pinterest)</span>
              </span>
              <button
                onClick={() => handleCopyCode(pinterestWidgetSnippet)}
                className="text-xs text-neutral-800 hover:text-neutral-950 underline font-semibold flex items-center gap-1"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copié !' : 'Copier le code'}</span>
              </button>
            </div>
            <pre className="p-3 bg-neutral-900 text-emerald-400 text-[11px] font-mono rounded-lg overflow-x-auto leading-relaxed border border-neutral-800">
              {pinterestWidgetSnippet}
            </pre>
          </div>

          {/* UTM Tracking Generator */}
          <div className="pt-2 border-t border-neutral-100">
            <label className="block text-xs font-semibold text-neutral-800 mb-1">
              Générateur de Lien Publicitaire avec Paramètres de Suivi (UTM) :
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={trackedUrl}
                className="flex-1 px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-700 font-mono"
              />
              <button
                onClick={() => onCopyLink(trackedUrl)}
                className="px-3 py-1.5 text-xs font-semibold text-neutral-800 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-1 shrink-0"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copier</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
          >
            Fermer
          </button>

          <a
            href={ad.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onAdClick(ad.id)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg shadow-sm transition-colors"
          >
            <span>Ouvrir l'annonce sur Pinterest ({ad.shortUrl})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
