import React from 'react';

interface OrionBrandWordmarkProps {
  className?: string;
  height?: number | string;
  glow?: boolean;
}

/**
 * Pixel-accurate vector recreation of the custom futuristic ORION logo design
 * provided by the user:
 * - Glowing luminous cyan/mint circular 'O' with neon bloom
 * - Distinctive futuristic open-stencil 'R' with top wing and angled kick leg
 * - Minimalist linear 'I'
 * - Clean geometric circular 'O'
 * - Modern angular 'N'
 * - Generous tracking and balance
 */
export const OrionBrandWordmark: React.FC<OrionBrandWordmarkProps> = ({
  className = '',
  height = 30,
  glow = true
}) => {
  return (
    <div className={`inline-flex items-center shrink-0 select-none ${className}`}>
      <svg
        viewBox="0 0 210 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: typeof height === 'number' ? `${height}px` : height, width: 'auto' }}
        className="overflow-visible"
      >
        <defs>
          {/* Intense Neon Mint-Cyan Aura for the first 'O' */}
          <filter id="orionUserNeonGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur2" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial Backlight for the first 'O' */}
          <radialGradient id="orionHaloRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00F5D4" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#00F5D4" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#00D2B4" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00D2B4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* --- 1. FIRST 'O' with luminous cyan neon aura --- */}
        <g id="letter-O1">
          {glow && (
            <>
              {/* Outer soft ambient halo */}
              <circle
                cx="24"
                cy="22"
                r="22"
                fill="url(#orionHaloRadial)"
                className="opacity-75 dark:opacity-90 animate-pulse-glow"
              />
              {/* Diffuse glow layer */}
              <circle
                cx="24"
                cy="22"
                r="13"
                stroke="#00F5D4"
                strokeWidth="5"
                opacity="0.6"
                filter="url(#orionUserNeonGlow)"
              />
            </>
          )}

          {/* Primary crisp circular ring */}
          <circle
            cx="24"
            cy="22"
            r="13"
            stroke="#00F5D4"
            strokeWidth="3.2"
            className="text-[#00F5D4]"
          />
          {/* Inner core bright ring */}
          <circle
            cx="24"
            cy="22"
            r="13"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            opacity="0.85"
          />
        </g>

        {/* --- 2. FUTURISTIC 'R' --- */}
        {/* Features: top horizontal bar extending left, curving around upper bowl, with stylized bottom kick */}
        <g id="letter-R" className="text-slate-900 dark:text-white">
          {/* Upper wing and bowl */}
          <path
            d="M 52 11 H 73 C 81 11 86 15 86 21 C 86 26.5 81 29.5 73.5 29.5 H 63"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Curved kick leg */}
          <path
            d="M 64.5 28.5 C 69 28.5 73.5 29.5 76.5 33 L 83 34.5"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* --- 3. MINIMALIST 'I' --- */}
        <g id="letter-I" className="text-slate-900 dark:text-white">
          <line
            x1="112"
            y1="10"
            x2="112"
            y2="34"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </g>

        {/* --- 4. GEOMETRIC SECOND 'O' --- */}
        <g id="letter-O2" className="text-slate-900 dark:text-white">
          <circle
            cx="148"
            cy="22"
            r="13"
            stroke="currentColor"
            strokeWidth="3.2"
          />
        </g>

        {/* --- 5. GEOMETRIC SANS 'N' --- */}
        <g id="letter-N" className="text-slate-900 dark:text-white">
          <path
            d="M 180 34 V 10 L 199 34 V 10"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};
