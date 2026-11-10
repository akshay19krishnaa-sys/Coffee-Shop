import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AmbientAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const noiseSourceRef = useRef(null);

  // Broadcast state changes
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('ambient-audio-state', { detail: { isPlaying } }));
  }, [isPlaying]);

  const startAmbientSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Create warm lowpass brown noise mimicking warm roastery hum & gentle espresso steam
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 0.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.5);

      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      noise.start();
      noiseSourceRef.current = noise;
      gainNodeRef.current = gainNode;
      setIsPlaying(true);
    } catch (err) {
      console.warn('AudioContext autoplay restricted or unsupported', err);
    }
  };

  const stopAmbientSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
      setTimeout(() => {
        try {
          noiseSourceRef.current?.stop();
          audioCtxRef.current?.close();
        } catch {
          // ignore
        }
        audioCtxRef.current = null;
        setIsPlaying(false);
      }, 500);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  };

  // Listen to toggle events from Hero's II button
  useEffect(() => {
    const handleToggle = () => toggleSound();
    window.addEventListener('toggle-ambient-audio', handleToggle);
    return () => window.removeEventListener('toggle-ambient-audio', handleToggle);
  });

  // Track scroll position to show floating pill only when scrolled past Hero
  useEffect(() => {
    const checkScroll = () => {
      setScrolledPastHero(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  useEffect(() => {
    return () => {
      try {
        audioCtxRef.current?.close();
      } catch {
        // cleanup
      }
    };
  }, []);

  // When scrolled down, display a subtle bottom-left floating pill
  if (!scrolledPastHero) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-3 transition-opacity duration-300">
      <button
        onClick={toggleSound}
        aria-label="Toggle ambient roastery audio"
        className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#101010]/90 border border-[#F5C518]/30 backdrop-blur-md text-[#F5C518] hover:border-[#F5C518] hover:bg-[#181818] transition-all duration-300 shadow-lg shadow-black/60 cursor-pointer"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-[#F5C518] animate-pulse" />
            <span className="text-xs font-mono font-medium tracking-wider">ROASTERY HUM</span>
            <div className="flex items-center gap-0.5 ml-1 h-3">
              <span className="w-0.5 h-3 bg-[#F5C518] animate-[bounce_1s_infinite_100ms]" />
              <span className="w-0.5 h-2 bg-[#F5C518] animate-[bounce_1s_infinite_300ms]" />
              <span className="w-0.5 h-3.5 bg-[#F5C518] animate-[bounce_1s_infinite_200ms]" />
            </div>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-white/60 group-hover:text-[#F5C518] transition-colors" />
            <span className="text-xs font-mono font-medium tracking-wider text-white/70 group-hover:text-white">
              SOUND OFF
            </span>
          </>
        )}
      </button>
    </div>
  );
};
