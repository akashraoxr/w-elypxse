"use client";
import { useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Hero() {

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to('.line', {
      y: '0%',
      duration: 1.5,
      stagger: 0.12,
      delay: 0.3
    })
    .to('.nav', {
      opacity: 1,
      y: 0,
      duration: 1.5
    }, "-=1")
    .to('.hero-bottom', {
      opacity: 1,
      y: 0,
      duration: 1.5
    }, "-=1.2");
  }, []);

  return (
    <main className="container">
      <div className="hero">
        <h1 className="title">
          <div className="line-wrap"><div className="line">REDEFINING</div></div>
          <div className="line-wrap"><div className="line">DIGITAL</div></div>
          <div className="line-wrap"><div className="line">EXPERIENCES.</div></div>
        </h1>
        
        <div className="hero-bottom" style={{ opacity: 0, transform: 'translateY(30px)' }}>
          <p className="subtitle">Elypxse Developments is currently operating in stealth mode. An extraordinary digital landscape is being crafted. Stay tuned for the unveiling.</p>
          
          <div className="coming-soon-wrap">
            <span className="coming-soon-text">COMING SOON</span>
          </div>
        </div>
      </div>
    </main>
  );
}
