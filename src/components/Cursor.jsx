"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const cursor = cursorRef.current;

    if (!cursor) return;

    if (!isTouchDevice) {
      const onMouseMove = (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: "power2.out"
        });
      };

      const onMouseLeaveWindow = () => {
        gsap.to(cursor, { opacity: 0, duration: 0.3 });
      };

      const onMouseEnterWindow = () => {
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseleave', onMouseLeaveWindow);
      document.addEventListener('mouseenter', onMouseEnterWindow);

      // Handle hover states on links and specific elements
      const handleMouseOver = (e) => {
        if (e.target.closest('a, .status, .logo')) {
          cursor.classList.add('hovered');
        }
      };
      
      const handleMouseOut = (e) => {
        if (e.target.closest('a, .status, .logo')) {
          cursor.classList.remove('hovered');
        }
      };

      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);

      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseleave', onMouseLeaveWindow);
        document.removeEventListener('mouseenter', onMouseEnterWindow);
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseout', handleMouseOut);
      };
    } else {
      cursor.style.display = 'none';
    }
  }, []);

  return <div ref={cursorRef} className="cursor"></div>;
}
