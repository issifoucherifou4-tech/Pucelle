import React, { useState } from 'react';
import { X, Copy, Check, Code2, Monitor, Layers } from 'lucide-react';
import { AdCampaign } from '../types/ad';

interface EmbedCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  ads: AdCampaign[];
}

export const EmbedCodeModal: React.FC<EmbedCodeModalProps> = ({ isOpen, onClose, ads }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'react' | 'iframe' | 'script'>('script');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const scriptCode = `<!-- Script Publicitaire Partenaire (Afders Network) -->
<script data-cfasync="false" src="https://afders.org/1/5d039403107b0bce60bdf1a7557f2500"></script>`;

  const ad1 = ads[0] || {
    shortUrl: 'https://pin.it/6we2QA6V0',
    title: 'Lit Outfits & Robes Glamour',
    imageUrl: 'https://i.pinimg.com/736x/9e/ed/a5/9eeda59b83c9d275e542b20b7995a10d.jpg'
  };

  const ad2 = ads[1] || {
    shortUrl: 'https://pin.it/54XZm9QiJ',
    title: 'PIPY TIDA Streetwear & Casquettes',
    imageUrl: 'https://i.pinimg.com/736x/30/7f/50/307f50d89f9f786178a18b8d623b16dd.jpg'
  };

  const htmlCode = `<!-- Vogue & Street Advertising Units -->
<!-- Ad #1: Lit Outfits Glamour -->
<div class="vogue-ad-banner" style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid #e2e8f0;border-radius:10px;background:#ffffff;margin-bottom:12px;">
  <img src="${ad1.imageUrl}" alt="${ad1.title}" style="width:64px;height:64px;object-fit:cover;border-radius:6px;" />
  <div style="flex:1;">
    <div style="font-size:10px;text-transform:uppercase;color:#64748b;font-weight:700;">Publicité Partenaire</div>
    <div style="font-size:14px;font-weight:700;color:#0f172a;">${ad1.title}</div>
  </div>
  <a href="${ad1.shortUrl}" target="_blank" rel="noopener noreferrer" style="background:#0f172a;color:#fff;padding:8px 14px;border-radius:6px;font-size:12px;text-decoration:none;font-weight:600;">
    Voir sur Pinterest ↗
  </a>
</div>

<!-- Ad #2: PIPY TIDA Streetwear -->
<div class="vogue-ad-banner" style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid #e2e8f0;border-radius:10px;background:#ffffff;">
  <img src="${ad2.imageUrl}" alt="${ad2.title}" style="width:64px;height:64px;object-fit:cover;border-radius:6px;" />
  <div style="flex:1;">
    <div style="font-size:10px;text-transform:uppercase;color:#64748b;font-weight:700;">Publicité Partenaire</div>
    <div style="font-size:14px;font-weight:700;color:#0f172a;">${ad2.title}</div>
  </div>
  <a href="${ad2.shortUrl}" target="_blank" rel="noopener noreferrer" style="background:#0f172a;color:#fff;padding:8px 14px;border-radius:6px;font-size:12px;text-decoration:none;font-weight:600;">
    Voir sur Pinterest ↗
  </a>
</div>`;

  const reactCode = `import React from 'react';

export const PinterestSponsoredBanner = () => {
  return (
    <aside className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Campagne 1: Lit Outfits */}
      <a
        href="${ad1.shortUrl}"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-900 transition-colors shadow-sm"
      >
        <img src="${ad1.imageUrl}" alt="${ad1.title}" className="w-16 h-16 rounded-lg object-cover" />
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Publicité</span>
          <h4 className="text-sm font-bold text-neutral-900">${ad1.title}</h4>
          <span className="text-xs text-neutral-600 underline mt-1 block">Découvrir le look ↗</span>
        </div>
      </a>

      {/* Campagne 2: PIPY TIDA */}
      <a
        href="${ad2.shortUrl}"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-900 transition-colors shadow-sm"
      >
        <img src="${ad2.imageUrl}" alt="${ad2.title}" className="w-16 h-16 rounded-lg object-cover" />
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Publicité</span>
          <h4 className="text-sm font-bold text-neutral-900">${ad2.title}</h4>
          <span className="text-xs text-neutral-600 underline mt-1 block">Découvrir le style ↗</span>
        </div>
      </a>
    </aside>
  );
};`;

  const iframeCode = `<!-- Intégration Iframe directe pour sites tiers & CMS -->
<iframe 
  src="${ad1.shortUrl}" 
  width="100%" 
  height="300" 
  title="${ad1.title}" 
  style="border:none;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);"
  loading="lazy">
</iframe>`;

  const handleCopy = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200">
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-neutral-100 rounded-lg">
              <Code2 className="w-5 h-5 text-neutral-800" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-950 font-heading">
                Générateur de Codes Publicitaires
              </h3>
              <p className="text-xs text-neutral-500">
                Exportez vos deux codes publicitaires Pinterest pour n'importe quel site ou CMS.
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

        <div className="p-6">
          {/* Format selection */}
          <div className="flex items-center gap-2 mb-4 border-b border-neutral-200 pb-3">
            <button
              onClick={() => setActiveTab('script')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'script' ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Script Régie (Afders)
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'html' ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              HTML Standard &amp; CSS
            </button>
            <button
              onClick={() => setActiveTab('react')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'react' ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Composant React / Next.js
            </button>
            <button
              onClick={() => setActiveTab('iframe')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'iframe' ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Iframe Simple
            </button>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-neutral-500 font-mono">
                {activeTab === 'script'
                  ? 'Script Partenaire (Actif dans <head> de votre site)'
                  : activeTab === 'html'
                  ? 'Code HTML autonome (prêt à coller)'
                  : activeTab === 'react'
                  ? 'Composant JSX avec Tailwind CSS'
                  : 'Code iframe'}
              </span>
              <button
                onClick={() =>
                  handleCopy(
                    activeTab === 'script'
                      ? scriptCode
                      : activeTab === 'html'
                      ? htmlCode
                      : activeTab === 'react'
                      ? reactCode
                      : iframeCode,
                    activeTab
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
              >
                {copiedType === activeTab ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copié dans le presse-papier !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-700" />
                    <span>Copier tout le code</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 bg-neutral-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto max-h-72 leading-relaxed border border-neutral-800">
              {activeTab === 'script' && scriptCode}
              {activeTab === 'html' && htmlCode}
              {activeTab === 'react' && reactCode}
              {activeTab === 'iframe' && iframeCode}
            </pre>
          </div>

          <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 space-y-1">
            <strong className="text-neutral-900 block">Informations sur les codes publicitaires :</strong>
            <div>• Annonce 1 : <code className="text-neutral-900 font-bold">{ad1.shortUrl}</code> (Robes &amp; Élégance)</div>
            <div>• Annonce 2 : <code className="text-neutral-900 font-bold">{ad2.shortUrl}</code> (Streetwear &amp; Casquettes)</div>
            <div className="text-neutral-500 text-[11px] mt-1">
              Les liens s'ouvrent en toute sécurité dans un nouvel onglet sans bloquer votre site.
            </div>
          </div>
        </div>

        <div className="p-6 pt-3 border-t border-neutral-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
