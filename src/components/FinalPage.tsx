import { useEffect, useState } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

export default function FinalPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [fireworks, setFireworks] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setShowFireworks(true), 500);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('final-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (showFireworks) {
      const interval = setInterval(() => {
        const newFirework = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
        };
        setFireworks((prev) => [...prev, newFirework]);

        setTimeout(() => {
          setFireworks((prev) => prev.filter((fw) => fw.id !== newFirework.id));
        }, 2000);
      }, 600);

      return () => clearInterval(interval);
    }
  }, [showFireworks]);

  return (
    <section
      id="final-section"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-700 to-rose-600 px-6 py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <Star className="w-2 h-2 text-yellow-200 fill-yellow-200" />
          </div>
        ))}
      </div>

      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="absolute animate-firework-burst"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
          }}
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-particle-burst"
              style={{
                background: ['#ff69b4', '#ffd700', '#ff1493', '#87ceeb', '#fff'][i % 5],
                transform: `rotate(${i * 30}deg) translateY(-50px)`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      ))}

      <div className="max-w-5xl w-full relative z-10">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-12 relative">
            <div className="relative inline-block">
              <Heart className="w-32 h-32 text-white mx-auto fill-white animate-heartbeat-slow" />
              <div className="absolute inset-0 animate-ping-slow">
                <Heart className="w-32 h-32 text-pink-300 opacity-50" />
              </div>
            </div>

            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-orbit-slow"
                style={{
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </div>
            ))}
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight animate-scale-in">
            Wishing you endless
            <br />
            <span className="text-yellow-300 text-5xl md:text-7xl">
              happiness and love
            </span>
          </h2>

          <div className="flex items-center justify-center gap-4 mb-12 animate-fade-in-delayed">
            <Heart className="w-10 h-10 text-pink-300 fill-pink-300 animate-heartbeat" />
            <Heart className="w-12 h-12 text-pink-200 fill-pink-200 animate-heartbeat" style={{ animationDelay: '0.2s' }} />
            <Heart className="w-10 h-10 text-pink-300 fill-pink-300 animate-heartbeat" style={{ animationDelay: '0.4s' }} />
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-2xl mx-auto animate-scale-in-delayed">
            <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 mb-6">
              Greetings From Your Friend Harsha...🤗
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              May this year bring you all the Happiness, joy, love, and success you deserve.
              Keep shining bright and never forget how amazing you truly are...!😍
            </p>
          </div>

          <div className="mt-16 animate-bounce-slow">
            <div className="inline-flex items-center gap-3 text-white text-2xl font-bold">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              Happy Birthday Again!
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
