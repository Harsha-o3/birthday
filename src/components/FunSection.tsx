import { useState } from 'react';
import { Cake, PartyPopper, Gift, Sparkles } from 'lucide-react';

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  popped: boolean;
}

export default function FunSection() {
  const [balloons, setBalloons] = useState<Balloon[]>(
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: (i % 5) * 20 + 10,
      y: Math.floor(i / 5) * 25 + 15,
      color: ['#ff69b4', '#ffd700', '#ff1493', '#da70d6', '#87ceeb'][i % 5],
      popped: false,
    }))
  );

  const [floatingEmojis] = useState([
    { emoji: '🎂', x: 10, delay: 0 },
    { emoji: '🎈', x: 25, delay: 1 },
    { emoji: '🎁', x: 40, delay: 2 },
    { emoji: '✨', x: 55, delay: 3 },
    { emoji: '💖', x: 70, delay: 4 },
    { emoji: '🎉', x: 85, delay: 5 },
  ]);

  const popBalloon = (id: number) => {
    setBalloons((prev) =>
      prev.map((balloon) =>
        balloon.id === id ? { ...balloon, popped: true } : balloon
      )
    );

    setTimeout(() => {
      setBalloons((prev) =>
        prev.map((balloon) =>
          balloon.id === id
            ? {
                ...balloon,
                popped: false,
                x: Math.random() * 80 + 10,
                y: Math.random() * 70 + 10,
              }
            : balloon
        )
      );
    }, 500);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 px-6 py-20 relative overflow-hidden">
      {floatingEmojis.map((item, index) => (
        <div
          key={index}
          className="absolute text-6xl animate-float-bounce"
          style={{
            left: `${item.x}%`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.emoji}
        </div>
      ))}

      <div className="max-w-6xl w-full relative z-10">
        <div className="text-center mb-16">
          <PartyPopper className="w-20 h-20 text-pink-500 mx-auto mb-6 animate-bounce-slow" />
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
            Time to Celebrate!
          </h2>
          <p className="text-2xl text-gray-700">Pop the balloons for a surprise!</p>
        </div>

        <div className="relative h-96 bg-gradient-to-br from-pink-200/50 to-purple-200/50 rounded-3xl shadow-2xl overflow-hidden">
          {balloons.map((balloon) => (
            <button
              key={balloon.id}
              onClick={() => popBalloon(balloon.id)}
              className={`absolute transition-all duration-500 hover:scale-110 ${
                balloon.popped ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
              }`}
              style={{
                left: `${balloon.x}%`,
                top: `${balloon.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative animate-float-gentle">
                <div
                  className="w-16 h-20 rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                  style={{
                    background: balloon.color,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  }}
                />
                <div className="absolute left-1/2 top-full w-0.5 h-8 bg-gray-400 -ml-0.5" />
              </div>
            </button>
          ))}

          {balloons.filter((b) => b.popped).map((balloon) => (
            <div
              key={`pop-${balloon.id}`}
              className="absolute animate-pop-explosion pointer-events-none"
              style={{
                left: `${balloon.x}%`,
                top: `${balloon.y}%`,
              }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:scale-105 transition-transform duration-300">
            <Cake className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-bounce-slow" />
            <p className="text-xl font-bold text-gray-800">Make a Wish!</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:scale-105 transition-transform duration-300">
            <Gift className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-bounce-slow" />
            <p className="text-xl font-bold text-gray-800">Enjoy Your Day!</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce-slow" />
            <p className="text-xl font-bold text-gray-800">Shine Bright!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
