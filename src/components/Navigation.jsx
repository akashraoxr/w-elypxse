"use client";

export default function Navigation() {
  return (
    <nav className="nav" style={{ opacity: 0, transform: 'translateY(-20px)' }}>
      <div className="logo">ELYPXSE.</div>
      <div className="status">
        STATUS: <span className="pulse">BUILDING</span>
      </div>
    </nav>
  );
}
