"use client";
import { useEffect } from 'react';
import Background from '@/components/Background';
import Cursor from '@/components/Cursor';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SocialWidget from '@/components/SocialWidget';
import AudioController from '@/components/AudioController';

export default function Home() {
  useEffect(() => {
    // Global Glitch Visual Trigger
    function triggerGlitch() {
      document.body.classList.add('is-glitching');
      setTimeout(() => {
        document.body.classList.remove('is-glitching');
      }, 400);
    }

    let timeoutId;

    // Randomly trigger the glitch every 4 to 8 seconds
    function scheduleNextGlitch() {
      const nextTime = 4000 + Math.random() * 4000;
      timeoutId = setTimeout(() => {
        triggerGlitch();
        scheduleNextGlitch();
      }, nextTime);
    }

    scheduleNextGlitch();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Background />
      <Cursor />
      <SocialWidget />
      <AudioController />
      <Navigation />
      <Hero />
    </>
  );
}
