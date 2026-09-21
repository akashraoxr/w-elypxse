"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function AudioController() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    // Initial slide up animation for the button to match social widget
    gsap.fromTo(btnRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 2.2, ease: "power4.out" }
    );

    const handleInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.volume = 0.4; // Slightly lower volume for background
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          }).catch(error => {
            console.log("Audio autoplay prevented by browser:", error);
          });
        }
      }
    };

    // Browsers block autoplay until the user interacts with the page
    document.addEventListener('click', handleInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, [hasInteracted]);

  const toggleMute = (e) => {
    e.stopPropagation(); // Don't trigger the document click event
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      setHasInteracted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/song.mp3" loop preload="auto" />
      
      <button 
        ref={btnRef}
        onClick={toggleMute}
        style={{
          position: 'fixed',
          bottom: 'clamp(20px, 4vh, 40px)',
          left: 'clamp(20px, 4vw, 40px)',
          zIndex: 100,
          background: 'none',
          border: 'none',
          color: isPlaying ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.4)',
          fontFamily: "'Space Mono', sans-serif", // Matches global font stack
          fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
          letterSpacing: '2px',
          cursor: 'none', // Uses our custom cursor
          transition: 'all 0.3s ease',
        }}
        onMouseOver={(e) => {
          e.target.style.color = '#ffffff';
          e.target.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        }}
        onMouseOut={(e) => {
          e.target.style.color = isPlaying ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.4)';
          e.target.style.textShadow = 'none';
        }}
      >
        SOUND [{isPlaying ? 'ON' : 'OFF'}]
      </button>
    </>
  );
}
