import React from 'react';
import { Plus, Code2, ExternalLink, Sparkles, TrendingUp } from 'lucide-react';

interface NavbarProps {
  onOpenAddModal: () => void;
  onOpenEmbedModal: () => void;
  totalAds: number;
  totalClicks: number;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAddModal,
  onOpenEmbedModal,
  totalAds,
  totalClicks,
  activeSection,
  setActiveSection
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-neutral-950 text-neutral-300 px-4 py-1.5 text-xs text-center border-b border-neutral-800 flex items-center justify-center gap-2">
        <span className="font-semibold text-white uppercase tracking-wider text-[11px]">Vidéos Publicitaires</span>
        <span aria-hidden="true" className="text-neutral-600">·</span>
        <span>2 campagnes vidéo interactives au format mobile réactif</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand */}
          <div className="flex items-center gap-6">
            <a href="#" className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-neutral-950 font-heading uppercase">
                VOGUE & STREET
              </span>
              <span className="text-[11px] font-medium tracking-widest text-neutral-500 uppercase -mt-1">
                Portail Publicités & Tendances Pinterest
              </span>
            </a>

            {/* Nav tabs */}
            <nav className="hidden md:flex items-center gap-1 ml-4 pl-4 border-l border-neutral-200">
              <button
                onClick={() => setActiveSection('spotlight')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                  activeSection === 'spotlight'
                    ? 'text-neutral-950 bg-neutral-100 font-semibold'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                Campagnes à la Une
              </button>
              <button
                onClick={() => setActiveSection('grid')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                  activeSection === 'grid'
                    ? 'text-neutral-950 bg-neutral-100 font-semibold'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                Toutes les Annonces ({totalAds})
              </button>
              <button
                onClick={() => setActiveSection('formats')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                  activeSection === 'formats'
                    ? 'text-neutral-950 bg-neutral-100 font-semibold'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                Formats & Bannières
              </button>
            </nav>
          </div>

          {/* Quick Stats & Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-xs text-neutral-500 mr-2 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-200/60">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Performance :</span>
              <span className="font-semibold text-neutral-900">{totalClicks} clics réels</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-medium">CTR ~5.2%</span>
            </div>

            <button
              onClick={onOpenEmbedModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-950 bg-white border border-neutral-300 rounded-lg shadow-2xs hover:bg-neutral-50 transition-colors"
              title="Obtenir le code HTML ou iframe des bannières"
            >
              <Code2 className="w-4 h-4 text-neutral-600" />
              <span className="hidden sm:inline">Code d'Intégration</span>
            </button>

            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter une Pub</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
