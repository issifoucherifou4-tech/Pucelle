import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Volume2,
  VolumeX,
  Maximize2,
  ExternalLink,
  Sun,
  Music,
  RotateCcw
} from 'lucide-react';
import { AdCampaign } from '../types/ad';

interface VideoAdPlayerProps {
  ad: AdCampaign;
  onAdClick: (adId: string) => void;
  onSelectAd: (ad: AdCampaign) => void;
  onCopyLink: (url: string) => void;
  autoPlayWithSound?: boolean;
  hideTextOverlay?: boolean;
}

export const VideoAdPlayer: React.FC<VideoAdPlayerProps> = ({
  ad,
  onAdClick,
  onSelectAd,
  onCopyLink,
  autoPlayWithSound = true,
  hideTextOverlay = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [brightness, setBrightness] = useState<number>(1.25); // +25% default boosted brightness
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60); // 1 minute = 60 seconds

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 1.0;
    if (video.duration && !isNaN(video.duration) && video.duration > 0) {
      setDuration(video.duration);
    }

    // Try unmuted autoplay with music first
    video.muted = false;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => setIsPlaying(false));
        });
    }
  }, [ad.videoUrl]);

  const playVideoAndMusic = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1.0;
    setIsMuted(false);
    setVolume(1.0);
    video.play().then(() => {
      setIsPlaying(true);
    }).catch((err) => console.log('Playback error:', err));
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      playVideoAndMusic();
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      video.volume = 1.0;
      setVolume(1.0);
      if (video.paused) {
        video.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    const video = videoRef.current;
    if (video) {
      video.volume = newVol;
      if (newVol > 0 && video.muted) {
        video.muted = false;
        setIsMuted(false);
      } else if (newVol === 0) {
        video.muted = true;
        setIsMuted(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    const videoDur = video.duration || 60;
    setProgress((video.currentTime / videoDur) * 100);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setDuration(video.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const targetDur = video.duration || 60;
    const seekTime = (parseFloat(e.target.value) / 100) * targetDur;
    video.currentTime = seekTime;
    setCurrentTime(seekTime);
    setProgress(parseFloat(e.target.value));
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen?.().catch((err) => console.error(err));
    } else {
      document.exitFullscreen?.();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col w-full max-w-[400px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 bg-neutral-950 transition-all duration-300 select-none group"
    >
      {/* 9:16 Vertical Mobile Video Canvas */}
      <div
        onClick={togglePlay}
        className="relative w-full aspect-[9/16] max-h-[660px] bg-neutral-950 flex items-center justify-center cursor-pointer overflow-hidden"
      >
        {ad.videoUrl ? (
          <video
            ref={videoRef}
            src={ad.videoUrl}
            poster={ad.imageUrl}
            playsInline
            loop
            muted={isMuted}
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            style={{
              filter: `brightness(${brightness}) contrast(1.06) saturate(1.15)`,
            }}
            className="w-full h-full object-cover pointer-events-none transition-all duration-300 group-hover:scale-[1.01]"
          />
        ) : (
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className="w-full h-full object-cover"
          />
        )}

        {/* Center Pause/Play Button (Clean icon only if hideTextOverlay is true) */}
        {!isPlaying && (
          <div
            onClick={playVideoAndMusic}
            className="absolute inset-0 bg-neutral-950/40 backdrop-blur-2xs flex flex-col items-center justify-center gap-2 z-30 cursor-pointer"
          >
            <div className="w-18 h-18 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-2xl pl-1 transform group-hover:scale-110 transition-transform">
              <Play className="w-9 h-9 fill-neutral-950" />
            </div>
            {!hideTextOverlay && (
              <span className="text-white text-xs font-bold tracking-wide uppercase bg-neutral-900/80 px-4 py-1.5 rounded-full border border-white/20">
                ▶️ Lancer la Vidéo &amp; Musique (1:00 min)
              </span>
            )}
          </div>
        )}

        {/* Unmute alert banner ONLY if not in hideTextOverlay mode */}
        {!hideTextOverlay && isPlaying && isMuted && (
          <div className="absolute top-16 left-4 right-4 z-30 pointer-events-auto">
            <button
              onClick={playVideoAndMusic}
              className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl shadow-xl flex items-center justify-center gap-2 text-xs transition-transform active:scale-95 animate-pulse"
            >
              <Music className="w-4 h-4 fill-neutral-950" />
              <span>🔊 Cliquez ici pour lancer la Musique !</span>
            </button>
          </div>
        )}

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto z-20">
          {/* If hideTextOverlay is true: NO text badge at all */}
          {hideTextOverlay ? (
            <div className="flex items-center gap-1.5 bg-neutral-950/60 backdrop-blur-md p-1.5 rounded-full border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-white text-[11px] font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-emerald-300">1:00 min (60s)</span>
              <span aria-hidden="true" className="text-white/40">·</span>
              <span>HD Lumineux</span>
            </div>
          )}

          {/* Minimal Controls: Brightness icon, Sound icon, Fullscreen icon */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setBrightness((prev) => (prev >= 1.4 ? 1.15 : prev + 0.15));
              }}
              className="p-2 rounded-full bg-neutral-950/80 backdrop-blur-md text-amber-300 hover:bg-neutral-900 border border-white/15 transition-colors flex items-center justify-center"
              title="Luminosité (Cliquez pour ajuster)"
            >
              <Sun className="w-4 h-4 text-amber-400" />
            </button>

            <button
              onClick={toggleMute}
              className={`p-2 rounded-full backdrop-blur-md border border-white/15 transition-all ${
                isMuted
                  ? 'bg-red-500/80 text-white hover:bg-red-600'
                  : 'bg-emerald-500/90 text-white hover:bg-emerald-600'
              }`}
              title={isMuted ? 'Activer le son' : 'Couper le son'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4 fill-white" />
              )}
            </button>

            <button
              onClick={handleFullscreen}
              className="p-2 rounded-full bg-neutral-950/80 backdrop-blur-md text-white hover:bg-neutral-900 border border-white/15 transition-colors"
              title="Plein écran"
            >
              <Maximize2 className="w-4 h-4 text-neutral-300" />
            </button>
          </div>
        </div>

        {/* Bottom Overlay:
            If hideTextOverlay is true: NO TEXT AT ALL ON THE VIDEO.
            Only a clean subtle progress bar at the very bottom edge.
        */}
        {hideTextOverlay ? (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-auto z-20">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={handleSeek}
              onClick={(e) => e.stopPropagation()}
              className="w-full h-1 bg-white/40 rounded-lg appearance-none cursor-pointer accent-white"
              title="Progression"
            />
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 pt-16 pb-4 px-4 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-transparent pointer-events-auto z-20">
            {/* Progress Scrubber */}
            <div className="mb-2.5">
              <div className="flex items-center justify-between text-[11px] text-neutral-300 font-mono mb-1">
                <span className="font-semibold text-white">{formatTime(currentTime)}</span>
                <span className="text-neutral-400">/ 1:00 min</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={handleSeek}
                onClick={(e) => e.stopPropagation()}
                className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-amber-400"
                title="Naviguer dans la minute (60s)"
              />
            </div>

            {/* Sound & Brightness Mini Bar */}
            <div className="mb-3 flex items-center justify-between gap-3 bg-neutral-900/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10 text-xs">
              <div className="flex items-center gap-1.5 flex-1">
                <button
                  onClick={toggleMute}
                  className="text-neutral-400 hover:text-white"
                  title="Son"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5 text-red-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  onClick={(e) => e.stopPropagation()}
                  className="w-20 sm:w-24 h-1 bg-white/30 rounded-md appearance-none cursor-pointer accent-emerald-400"
                  title="Volume de la musique"
                />
                <span className="text-[10px] font-mono text-neutral-300">
                  {isMuted ? 'Muet' : `${Math.round(volume * 100)}%`}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-amber-300 font-medium">
                <Sun className="w-3 h-3 text-amber-400" />
                <span>+{Math.round((brightness - 1) * 100)}% Lum</span>
              </div>
            </div>

            {/* Info & Title */}
            <div className="mb-2">
              <div className="flex items-center gap-2 text-[11px] text-amber-400 font-semibold mb-0.5">
                <span>{ad.advertiser}</span>
                <span aria-hidden="true" className="text-white/40">·</span>
                <span className="text-neutral-300 font-normal">Sponsorisé Pinterest</span>
              </div>
              <h3 className="text-base font-bold text-white font-heading leading-tight drop-shadow-sm">
                {ad.title}
              </h3>
              <p className="text-xs text-neutral-300 line-clamp-2 mt-1 leading-relaxed">
                {ad.description}
              </p>
            </div>

            {/* Action CTAs */}
            <div className="pt-1.5 flex items-center gap-2">
              <a
                href={ad.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdClick(ad.id);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-neutral-950 bg-white hover:bg-neutral-100 shadow-lg active:scale-98 transition-all"
              >
                <span>{ad.ctaText}</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-950" />
              </a>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectAd(ad);
                }}
                className="py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 transition-all shrink-0"
                title="Détails de l'annonce"
              >
                Détails
              </button>
            </div>
          </div>
        )}
      </div>

      {/* When hideTextOverlay is true: Place title & button UNDERNEATH the video container, so the video has ZERO text on it! */}
      {hideTextOverlay && (
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 text-left">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span className="font-semibold text-white">{ad.advertiser}</span>
            <span className="text-emerald-400 font-mono text-[11px]">1:00 min</span>
          </div>
          <h3 className="text-sm font-bold text-white font-heading truncate">
            {ad.title}
          </h3>
          <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5 mb-3">
            {ad.subtitle}
          </p>

          <div className="flex items-center gap-2">
            <a
              href={ad.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onAdClick(ad.id)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-neutral-950 bg-white hover:bg-neutral-200 shadow-sm transition-all"
            >
              <span>{ad.ctaText}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => onSelectAd(ad)}
              className="py-2 px-3 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-all"
            >
              Détails
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
