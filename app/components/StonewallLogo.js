'use client'

// Stonewall Logo - Fortress/Wall Icon
export function StonewallLogo({ className = "w-8 h-8", gradient = true }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="stonewallGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B7280" />
          <stop offset="50%" stopColor="#9CA3AF" />
          <stop offset="100%" stopColor="#4B5563" />
        </linearGradient>
        <linearGradient id="stonewallAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#C9A227" />
        </linearGradient>
      </defs>

      {/* Base Wall */}
      <rect
        x="4"
        y="28"
        width="56"
        height="32"
        rx="2"
        fill={gradient ? "url(#stonewallGradient)" : "currentColor"}
      />

      {/* Stone Pattern - Row 1 */}
      <rect x="6" y="30" width="16" height="8" rx="1" fill="#374151" opacity="0.5" />
      <rect x="24" y="30" width="12" height="8" rx="1" fill="#374151" opacity="0.4" />
      <rect x="38" y="30" width="20" height="8" rx="1" fill="#374151" opacity="0.5" />

      {/* Stone Pattern - Row 2 */}
      <rect x="6" y="40" width="10" height="8" rx="1" fill="#374151" opacity="0.4" />
      <rect x="18" y="40" width="18" height="8" rx="1" fill="#374151" opacity="0.5" />
      <rect x="38" y="40" width="8" height="8" rx="1" fill="#374151" opacity="0.4" />
      <rect x="48" y="40" width="10" height="8" rx="1" fill="#374151" opacity="0.5" />

      {/* Stone Pattern - Row 3 */}
      <rect x="6" y="50" width="14" height="8" rx="1" fill="#374151" opacity="0.5" />
      <rect x="22" y="50" width="10" height="8" rx="1" fill="#374151" opacity="0.4" />
      <rect x="34" y="50" width="16" height="8" rx="1" fill="#374151" opacity="0.5" />
      <rect x="52" y="50" width="6" height="8" rx="1" fill="#374151" opacity="0.4" />

      {/* Left Tower */}
      <rect
        x="4"
        y="12"
        width="16"
        height="20"
        rx="2"
        fill={gradient ? "url(#stonewallGradient)" : "currentColor"}
      />
      {/* Tower Battlement */}
      <rect x="4" y="8" width="5" height="6" fill={gradient ? "url(#stonewallGradient)" : "currentColor"} />
      <rect x="11" y="8" width="5" height="6" fill={gradient ? "url(#stonewallGradient)" : "currentColor"} />

      {/* Right Tower */}
      <rect
        x="44"
        y="12"
        width="16"
        height="20"
        rx="2"
        fill={gradient ? "url(#stonewallGradient)" : "currentColor"}
      />
      {/* Tower Battlement */}
      <rect x="44" y="8" width="5" height="6" fill={gradient ? "url(#stonewallGradient)" : "currentColor"} />
      <rect x="51" y="8" width="5" height="6" fill={gradient ? "url(#stonewallGradient)" : "currentColor"} />

      {/* Center Shield/Emblem */}
      <circle cx="32" cy="22" r="10" fill={gradient ? "url(#stonewallAccent)" : "currentColor"} />
      <path
        d="M32 15L28 19V25L32 28L36 25V19L32 15Z"
        fill="#0A0A0B"
        opacity="0.8"
      />
    </svg>
  )
}

// Simplified version for favicon
export function StonewallLogoSimple({ className = "w-8 h-8" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="stonewallGradientSimple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B7280" />
          <stop offset="100%" stopColor="#4B5563" />
        </linearGradient>
        <linearGradient id="stonewallAccentSimple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#C9A227" />
        </linearGradient>
      </defs>

      {/* Wall */}
      <rect x="2" y="14" width="28" height="16" rx="2" fill="url(#stonewallGradientSimple)" />

      {/* Towers */}
      <rect x="2" y="6" width="8" height="12" rx="1" fill="url(#stonewallGradientSimple)" />
      <rect x="22" y="6" width="8" height="12" rx="1" fill="url(#stonewallGradientSimple)" />

      {/* Battlements */}
      <rect x="2" y="4" width="3" height="4" fill="url(#stonewallGradientSimple)" />
      <rect x="7" y="4" width="3" height="4" fill="url(#stonewallGradientSimple)" />
      <rect x="22" y="4" width="3" height="4" fill="url(#stonewallGradientSimple)" />
      <rect x="27" y="4" width="3" height="4" fill="url(#stonewallGradientSimple)" />

      {/* Center emblem */}
      <circle cx="16" cy="12" r="5" fill="url(#stonewallAccentSimple)" />
    </svg>
  )
}
