interface BigThicketLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function BigThicketLogo({ 
  className = "", 
  width = 400, 
  height = 400 
}: BigThicketLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="400" height="400" fill="#f5f5dc" />
      
      {/* Left Pine Tree */}
      <g transform="translate(50, 80)">
        <polygon
          points="15,0 0,25 30,25"
          fill="#0f5132"
        />
        <polygon
          points="15,15 5,35 25,35"
          fill="#0f5132"
        />
        <polygon
          points="15,25 8,40 22,40"
          fill="#0f5132"
        />
        <rect x="13" y="40" width="4" height="15" fill="#8b4513" />
      </g>
      
      {/* BIG Text */}
      <text
        x="200"
        y="80"
        textAnchor="middle"
        fontSize="48"
        fontWeight="bold"
        fill="#dc2626"
        fontFamily="Impact, Arial Black, sans-serif"
      >
        BIG
      </text>
      
      {/* THICKET Text */}
      <text
        x="200"
        y="140"
        textAnchor="middle"
        fontSize="42"
        fontWeight="bold"
        fill="#dc2626"
        fontFamily="Impact, Arial Black, sans-serif"
      >
        THICKET
      </text>
      
      {/* Sunset/Sunrise Stripes Background */}
      <rect x="0" y="160" width="400" height="20" fill="#f97316" />
      <rect x="0" y="180" width="400" height="15" fill="#fb923c" />
      <rect x="0" y="195" width="400" height="15" fill="#fdba74" />
      <rect x="0" y="210" width="400" height="15" fill="#fed7aa" />
      <rect x="0" y="225" width="400" height="15" fill="#22d3ee" />
      <rect x="0" y="240" width="400" height="15" fill="#0891b2" />
      <rect x="0" y="255" width="400" height="15" fill="#0e7490" />
      
      {/* Right Pine Tree */}
      <g transform="translate(80, 170)">
        <polygon
          points="20,0 0,40 40,40"
          fill="#0f5132"
        />
        <polygon
          points="20,25 5,55 35,55"
          fill="#0f5132"
        />
        <polygon
          points="20,40 10,65 30,65"
          fill="#0f5132"
        />
        <rect x="18" y="65" width="4" height="20" fill="#8b4513" />
      </g>
      
      {/* Riding Mower SVG */}
      <g transform="translate(200, 180)">
        {/* Mower Body */}
        <rect x="0" y="20" width="80" height="25" rx="5" fill="#0f5132" stroke="#f5f5dc" strokeWidth="2" />
        
        {/* Seat */}
        <rect x="10" y="5" width="20" height="20" rx="3" fill="#0f5132" stroke="#f5f5dc" strokeWidth="2" />
        
        {/* Steering Wheel */}
        <circle cx="20" cy="10" r="6" fill="none" stroke="#f5f5dc" strokeWidth="2" />
        
        {/* Front Wheels */}
        <circle cx="15" cy="50" r="8" fill="#0f5132" stroke="#f5f5dc" strokeWidth="2" />
        <circle cx="15" cy="50" r="4" fill="#f5f5dc" />
        
        {/* Back Wheels */}
        <circle cx="65" cy="50" r="12" fill="#0f5132" stroke="#f5f5dc" strokeWidth="2" />
        <circle cx="65" cy="50" r="6" fill="#f5f5dc" />
        
        {/* Mower Deck */}
        <rect x="35" y="35" width="35" height="15" rx="3" fill="#0f5132" stroke="#f5f5dc" strokeWidth="2" />
      </g>
      
      {/* LAWN SERVICES Text */}
      <text
        x="200"
        y="320"
        textAnchor="middle"
        fontSize="32"
        fontWeight="bold"
        fill="#0f5132"
        fontFamily="Arial, sans-serif"
        letterSpacing="2px"
      >
        LAWN SERVICES
      </text>
      
      {/* Texas Shape */}
      <g transform="translate(180, 340)">
        <path
          d="M20,0 L35,5 L40,15 L35,25 L30,30 L25,35 L15,40 L5,35 L0,25 L5,15 L10,10 L15,5 Z"
          fill="#0f5132"
        />
      </g>
    </svg>
  );
}
