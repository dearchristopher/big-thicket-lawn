interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  src?: string;
  alt?: string;
}

export default function Logo({ 
  className = "", 
  width = 300, 
  height = 300,
  src = "/images/big-thicket-logo.png", // Default path
  alt = "Big Thicket Lawn Services Logo"
}: LogoProps) {
  return (
    <img 
      src={src}
      alt={alt}
      className={`${className} object-contain`}
      width={width}
      height={height}
      style={{ 
        maxWidth: '100%', 
        height: 'auto' 
      }}
    />
  );
}
