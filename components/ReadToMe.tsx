'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

type ReadState = 'idle' | 'playing' | 'paused';

export default function ReadToMe() {
  const [state, setState] = useState<ReadState>('idle');
  const [supported, setSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported('speechSynthesis' in window);
    // Cleanup on unmount
    return () => {
      if ('speechSynthesis' in window) speechSynthesis.cancel();
    };
  }, []);

  const getBestVoice = useCallback((): SpeechSynthesisVoice | null => {
    const voices = speechSynthesis.getVoices();
    // Target deep, calm, masculine English voices — closest to Ryan Gosling
    const preferred = ['Evan', 'Aaron', 'Rishi', 'Thomas', 'Alex', 'Daniel', 'Oliver', 'James'];
    for (const name of preferred) {
      const v = voices.find(v => v.name.includes(name) && v.lang.startsWith('en'));
      if (v) return v;
    }
    // Fallback: any US English voice
    return voices.find(v => v.lang === 'en-US') || voices.find(v => v.lang.startsWith('en')) || null;
  }, []);

  const getArticleText = useCallback((): string => {
    const body = document.querySelector('.article-body');
    return body?.textContent?.trim().replace(/\s+/g, ' ') || '';
  }, []);

  const startReading = useCallback(() => {
    speechSynthesis.cancel();

    const text = getArticleText();
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);

    const applyVoice = () => {
      const voice = getBestVoice();
      if (voice) utterance.voice = voice;
      utterance.rate = 0.88;   // slightly slow — Gosling's measured delivery
      utterance.pitch = 0.82;  // lower pitch = deeper voice
      utterance.volume = 1;
    };

    if (speechSynthesis.getVoices().length > 0) {
      applyVoice();
    } else {
      speechSynthesis.addEventListener('voiceschanged', applyVoice, { once: true });
    }

    utterance.onend = () => setState('idle');
    utterance.onerror = () => setState('idle');

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
    setState('playing');
  }, [getArticleText, getBestVoice]);

  const handleClick = useCallback(() => {
    if (state === 'idle') {
      startReading();
    } else if (state === 'playing') {
      speechSynthesis.pause();
      setState('paused');
    } else if (state === 'paused') {
      speechSynthesis.resume();
      setState('playing');
    }
  }, [state, startReading]);

  if (!supported) return null;

  const label = state === 'idle' ? 'READ TO ME' : state === 'playing' ? 'STOP READING' : 'RESUME';
  const Icon = state === 'playing' ? Pause : Play;

  return (
    <div className="mb-8">
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-150"
        style={{
          background: state === 'idle' ? 'rgba(0,201,107,0.12)' : state === 'playing' ? 'rgba(0,201,107,0.18)' : 'rgba(255,255,255,0.06)',
          border: `1px solid ${state === 'paused' ? 'rgba(255,255,255,0.12)' : 'rgba(0,201,107,0.35)'}`,
          color: state === 'paused' ? 'rgba(255,255,255,0.5)' : 'rgb(0,201,107)',
        }}
        aria-label={label}
      >
        {state === 'playing'
          ? <Pause size={12} />
          : state === 'paused'
          ? <Volume2 size={12} />
          : <Play size={12} />
        }
        {label}
      </button>
    </div>
  );
}
