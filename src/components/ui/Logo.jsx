export default function Logo({ size = 28, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Crown facets */}
      <path d="M7 5 L25 5 L31 13 L1 13 Z" fill="#2563eb" />
      {/* Top highlight */}
      <path d="M12 5 L20 5 L23 13 L9 13 Z" fill="#3b82f6" fillOpacity="0.6" />
      {/* Pavilion */}
      <path d="M1 13 L16 29 L31 13 Z" fill="#1d4ed8" />
      {/* Pavilion center highlight */}
      <path d="M9 13 L16 29 L23 13 Z" fill="#2563eb" fillOpacity="0.5" />
      {/* Crown lines */}
      <path d="M7 5 L1 13 M25 5 L31 13 M12 5 L9 13 M20 5 L23 13 M16 5 L16 13"
        stroke="white" strokeOpacity="0.25" strokeWidth="0.6" strokeLinecap="round" />
      {/* Girdle */}
      <line x1="1" y1="13" x2="31" y2="13" stroke="white" strokeOpacity="0.3" strokeWidth="0.8" />
      {/* Pavilion lines */}
      <path d="M1 13 L16 29 M31 13 L16 29 M9 13 L16 29 M23 13 L16 29"
        stroke="white" strokeOpacity="0.15" strokeWidth="0.6" strokeLinecap="round" />
    </svg>
  )
}
