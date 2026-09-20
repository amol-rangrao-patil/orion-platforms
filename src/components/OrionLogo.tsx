import React from 'react';

interface OrionLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withGlow?: boolean;
}

export const OrionLogo: React.FC<OrionLogoProps> = ({ 
  size = 'md', 
  className = '', 
  withGlow = true 
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
      {withGlow && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600/30 via-cyan-400/25 to-indigo-600/30 blur-md pointer-events-none -z-10" />
      )}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="orionBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B132B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          <linearGradient id="orionPrimaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          <linearGradient id="orionSecondaryGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>

          <filter id="orionCoreGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Premium Rounded Shield */}
        <rect 
          x="3" 
          y="3" 
          width="94" 
          height="94" 
          rx="24" 
          fill="url(#orionBgGrad)" 
          stroke="url(#orionPrimaryGrad)" 
          strokeWidth="2.5"
        />

        {/* Outer Constellation Polygon (Hexagonal Orbit) */}
        <path 
          d="M50 18 L78 34.5 V67.5 L50 84 L22 67.5 V34.5 Z" 
          stroke="url(#orionSecondaryGrad)" 
          strokeWidth="3.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          strokeOpacity="0.85"
        />

        {/* Inner Hyper-Geometric Facets */}
        <path 
          d="M50 18 V51 L78 67.5" 
          stroke="url(#orionPrimaryGrad)" 
          strokeWidth="2.2" 
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <path 
          d="M50 51 L22 67.5" 
          stroke="url(#orionPrimaryGrad)" 
          strokeWidth="2.2" 
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <path 
          d="M22 34.5 L50 51 L78 34.5" 
          stroke="url(#orionSecondaryGrad)" 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeOpacity="0.5"
        />

        {/* Central Quantum Nexus Core */}
        <circle 
          cx="50" 
          cy="51" 
          r="8" 
          fill="url(#orionPrimaryGrad)" 
          filter="url(#orionCoreGlow)" 
        />
        <circle 
          cx="50" 
          cy="51" 
          r="4.5" 
          fill="#FFFFFF" 
        />

        {/* Orion's Belt: 3 Signature Aligned Cosmic Pulsar Nodes */}
        <circle cx="36" cy="46" r="3.2" fill="#00F0FF" />
        <circle cx="50" cy="51" r="3.2" fill="#FFFFFF" />
        <circle cx="64" cy="56" r="3.2" fill="#00F0FF" />

        {/* Constellation Vertex Nodes */}
        <circle cx="50" cy="18" r="3.5" fill="#38BDF8" />
        <circle cx="78" cy="34.5" r="3.5" fill="#818CF8" />
        <circle cx="78" cy="67.5" r="3.5" fill="#38BDF8" />
        <circle cx="50" cy="84" r="3.5" fill="#818CF8" />
        <circle cx="22" cy="67.5" r="3.5" fill="#38BDF8" />
        <circle cx="22" cy="34.5" r="3.5" fill="#818CF8" />
      </svg>
    </div>
  );
};
