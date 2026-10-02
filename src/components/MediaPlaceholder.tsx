/** Generated geometric thumbnail used when a media item has no image: dark field, grid, globe arcs. */
export default function MediaPlaceholder({ label }: { label: string }) {
  return (
    <svg className="media-placeholder" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="mp-glow" cx="70%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#c8a96a" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#c8a96a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mp-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d1424" />
          <stop offset="100%" stopColor="#070a12" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="url(#mp-bg)" />
      <rect width="640" height="360" fill="url(#mp-glow)" />
      <g stroke="#9fb4d6" strokeOpacity="0.12" strokeWidth="1">
        {Array.from({ length: 13 }, (_, i) => <line key={`v${i}`} x1={i * 53.3} y1="0" x2={i * 53.3} y2="360" />)}
        {Array.from({ length: 8 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 51.4} x2="640" y2={i * 51.4} />)}
      </g>
      <g fill="none" stroke="#9fb4d6" strokeOpacity="0.28" strokeWidth="1">
        <circle cx="450" cy="170" r="120" />
        <ellipse cx="450" cy="170" rx="120" ry="40" />
        <ellipse cx="450" cy="170" rx="55" ry="120" />
        <ellipse cx="450" cy="170" rx="100" ry="120" strokeOpacity="0.15" />
      </g>
      <path d="M392 150 Q 440 90 500 138" fill="none" stroke="#c8a96a" strokeOpacity="0.7" strokeWidth="1.4" />
      <circle cx="392" cy="150" r="3.5" fill="#c8a96a" />
      <circle cx="500" cy="138" r="3.5" fill="#c8a96a" />
      <text x="36" y="318" fill="#f2efe8" fillOpacity="0.9" fontFamily="Georgia, serif" fontSize="44" letterSpacing="10">
        {label}
      </text>
      <rect x="36" y="328" width="56" height="2" fill="#c8a96a" />
    </svg>
  );
}
