import { useEffect, useState } from 'react';
import { Sparkles, Gift } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    }));
    setConfettiPieces(pieces);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-pink-400 via-purple-400 to-pink-500">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            background: ['#ff69b4', '#ffd700', '#ff1493', '#ff69b4', '#fff'][Math.floor(Math.random() * 5)],
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse-slow" />

      {[...Array(20)].map((_, i) => (
        <div
          key={`balloon-${i}`}
          className="absolute animate-float-up"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
            bottom: '-10%',
          }}
        >
          <div className="relative">
            <div
              className="w-12 h-16 rounded-full opacity-70"
              style={{
                background: ['#ff69b4', '#ffd700', '#ff1493', '#da70d6', '#fff'][i % 5],
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              }}
            />
            <div className="absolute left-1/2 top-full w-0.5 h-16 bg-gray-300 -ml-0.5" />
          </div>
        </div>
      ))}

      {[...Array(30)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </div>
      ))}

      <div className="relative z-10 text-center px-6 animate-fade-in">
        <div className="mb-8 animate-bounce-slow">
          <Gift className="w-24 h-24 text-white mx-auto drop-shadow-2xl" />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-scale-in drop-shadow-2xl">
          Happy Birthday Jaanuhhh ☺️🤗
        </h1>

        <div className="text-5xl md:text-7xl font-bold text-yellow-300 mb-12 animate-scale-in-delayed drop-shadow-2xl">
          U are the Best && Very Beautiful Soul! 💖 whom i have met in my Entire life till Now...🥰☺️😍
        </div>

        <button
          onClick={onStart}
          className="group relative px-12 py-6 text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 animate-bounce-in"
        >
          <span className="relative z-10 flex items-center gap-3">
            Click to Start the Surprise
            <Gift className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
          </span>
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping-slow" />
        </button>
      </div>
    </div>
  );
}