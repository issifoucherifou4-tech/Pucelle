import React, { useEffect } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface BiceaAdBannerProps {
  className?: string;
  showLabel?: boolean;
}

export const BiceaAdBanner: React.FC<BiceaAdBannerProps> = ({
  className = '',
  showLabel = true,
}) => {
  useEffect(() => {
    // Check if script is already present; if not, inject it to ensure execution
    const containerId = 'container-a39b1655f5d12a1ad801c327f3ae2816';
    const scriptSrc = 'https://bicea.org/21/a39b1655f5d12a1ad801c327f3ae2816';

    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto my-8 px-4 ${className}`}>
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 text-center overflow-hidden">
        {showLabel && (
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-neutral-100 text-xs text-neutral-500">
            <div className="flex items-center gap-1.5 font-medium text-neutral-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Espace Publicitaire Partenaire</span>
            </div>
            <span className="font-mono text-[10px] text-neutral-400">Régie Bicea</span>
          </div>
        )}

        {/* Official Ad Network Container */}
        <div className="flex items-center justify-center min-h-[90px] w-full">
          <div
            id="container-a39b1655f5d12a1ad801c327f3ae2816"
            className="w-full flex items-center justify-center overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
};
