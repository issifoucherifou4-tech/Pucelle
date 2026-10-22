import React, { useState } from 'react';
import { X, Plus, Pin, Link, Image as ImageIcon, Tag, Sparkles } from 'lucide-react';
import { AdCampaign } from '../types/ad';

interface AddAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAd: (newAd: AdCampaign) => void;
}

export const AddAdModal: React.FC<AddAdModalProps> = ({ isOpen, onClose, onAddAd }) => {
  const [shortUrl, setShortUrl] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState<'fashion' | 'streetwear' | 'accessories' | 'lifestyle'>('fashion');
  const [advertiser, setAdvertiser] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  if (!isOpen) return null;

  const handleUrlChange = (url: string) => {
    setShortUrl(url);
    // If user pastes a pin shortlink, suggest default values if empty
    if (url.includes('pin.it/') && !title) {
      setTitle('Nouvelle Campagne Pinterest');
      setSubtitle('Collection sponsorisée tendance');
      setAdvertiser('Partenaire Pinterest');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shortUrl.trim() || !title.trim()) return;

    // Extract pin ID or generate unique ID
    const pinMatch = shortUrl.match(/pin\.it\/([a-zA-Z0-9_-]+)/);
    const pinId = pinMatch ? pinMatch[1] : `pin-${Date.now()}`;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newAd: AdCampaign = {
      id: `ad-${Date.now()}`,
      pinId,
      shortUrl: shortUrl.trim(),
      directUrl: shortUrl.trim(),
      title: title.trim(),
      subtitle: subtitle.trim() || 'Sélection exclusive & tendance',
      description: description.trim() || 'Campagne publicitaire sponsorisée intégrée sur le site.',
      imageUrl:
        imageUrl.trim() ||
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
      videoUrl: videoUrl.trim() || undefined,
      category,
      categoryLabel:
        category === 'fashion'
          ? 'Mode & Robes'
          : category === 'streetwear'
          ? 'Streetwear & Caps'
          : category === 'accessories'
          ? 'Accessoires'
          : 'Lifestyle',
      advertiser: advertiser.trim() || 'Partenaire Sponsorisé',
      tags: tags.length > 0 ? tags : ['Tendance', 'Pinterest Ads'],
      clicks: 0,
      impressions: 1,
      featured: false,
      active: true,
      createdAt: new Date().toISOString().split('T')[0],
      ctaText: 'Découvrir sur Pinterest',
      badgeText: 'Nouvelle Annonce'
    };

    onAddAd(newAd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200">
        {/* Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-neutral-950 font-heading">
              Ajouter un Code ou une Annonce Publicitaire
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Intégrez un nouveau lien Pinterest (ex: https://pin.it/...) ou une bannière partenaire.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1">
              Lien / Code Publicitaire Pinterest <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Link className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                required
                value={shortUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://pin.it/6we2QA6V0 ou https://pin.it/..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950"
              />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Collez n'importe quel lien court pin.it ou lien d'affiliation publicitaire.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Titre de l'Annonce <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Robes Moulantes Afro-Chic"
                className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Catégorie
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950"
              >
                <option value="fashion">Mode &amp; Robes</option>
                <option value="streetwear">Streetwear &amp; Casquettes</option>
                <option value="accessories">Accessoires</option>
                <option value="lifestyle">Lifestyle &amp; Tendance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Sous-titre / Accroche
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ex: Collection Urbaine 2026"
                className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Nom de l'Annonceur / Marque
              </label>
              <input
                type="text"
                value={advertiser}
                onChange={(e) => setAdvertiser(e.target.value)}
                placeholder="Ex: PIPY TIDA ou Lit Outfits"
                className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1">
              URL de l'image (Pinterest ou externe)
            </label>
            <div className="relative">
              <ImageIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://i.pinimg.com/... ou lien d'image"
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950"
              />
            </div>
            {imageUrl && (
              <div className="mt-2 flex items-center gap-3 p-2 bg-neutral-50 rounded-lg border border-neutral-200">
                <img
                  src={imageUrl}
                  alt="Aperçu"
                  className="w-12 h-12 object-cover rounded-md"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="text-[11px] text-neutral-600">Aperçu de la vignette validé</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1">
              URL de la vidéo (Optionnel, ex: flux MP4 Pinterest)
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://v1.pinimg.com/...mp4 ou lien vidéo direct"
              className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1">
              Description de l'Annonce
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description détaillée de la campagne ou du produit mis en avant..."
              className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1">
              Tags (séparés par des virgules)
            </label>
            <div className="relative">
              <Tag className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Casquettes, Robes, Streetwear, Mode"
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950"
              />
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publier l'Annonce</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
