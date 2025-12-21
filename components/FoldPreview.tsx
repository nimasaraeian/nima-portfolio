import { getApiBase } from '@/src/lib/apiBase';

type Props = {
  src: string;
  title: string;
  height?: number;
};

// Helper to convert relative URLs to absolute
const toAbsolute = (u: string | undefined): string => {
  if (!u) return "";
  if (u.startsWith("http") || u.startsWith("data:")) return u;
  
  const base = getApiBase();
  if (!base) {
    // If no base URL, assume relative path works
    return u.startsWith('/') ? u : `/${u}`;
  }
  
  return `${base}${u}`;
};

export default function FoldPreview({ src, title, height = 720 }: Props) {
  const imageSrc = toAbsolute(src);
  
  if (!imageSrc) {
    return null;
  }
  
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden shadow-lg">
      <div className="px-4 py-3 text-sm border-b border-white/10 flex justify-between">
        <span>{title}</span>
        <span className="text-xs opacity-60">Above the fold</span>
      </div>

      {/* Container with fixed height - only shows above-the-fold portion */}
      <div 
        style={{ 
          height: `${height}px`,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#111827',
          width: '100%'
        }} 
        className="w-full"
      >
        <img
          src={imageSrc}
          alt={title}
          style={{ 
            width: '100%',
            height: 'auto',
            display: 'block',
            maxHeight: `${height}px`,
            objectFit: 'none',
            objectPosition: 'top left'
          }}
          onError={(e) => {
            console.error("❌ Image failed to load:", title);
          }}
        />
      </div>
    </div>
  );
}

