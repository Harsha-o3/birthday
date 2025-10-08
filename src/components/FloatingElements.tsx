import { Sparkles } from 'lucide-react';

export default function FloatingElements() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={`confetti-${i}`}
            className="absolute w-2 h-2 animate-confetti-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
              background: ['#ff69b4', '#ffd700', '#ff1493', '#da70d6', '#fff'][i % 5],
              borderRadius: Math.random() > 0.5 ? '50%' : '0',
              top: '-20px',
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={`sparkle-float-${i}`}
            className="absolute animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400 opacity-40" />
          </div>
        ))}
      </div>
    </>
  );
}
