import { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function MessageSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const message = "You're one of the most amazing people in my life — kind, strong, and full of light. Today is your day, and I hope it's filled with all the happiness you bring to others && Be strong and courageous, for you are deeply loved and cherished. Happy Birthday!. Remember, no matter where life takes us, you'll always have a special place in me. Wishing you a day as wonderful as you are!";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setShowHeart(true), 1500);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('message-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="message-section"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500 px-6 py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        ))}
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative inline-block mb-8">
            <Heart className={`w-24 h-24 text-white mx-auto transition-all duration-1000 ${showHeart ? 'scale-100 fill-white' : 'scale-0'}`} />
            {showHeart && (
              <>
                <div className="absolute inset-0 animate-ping-slow">
                  <Heart className="w-24 h-24 text-white opacity-50" />
                </div>
                <div className="absolute inset-0 animate-pulse">
                  <Heart className="w-24 h-24 text-yellow-300 opacity-30" />
                </div>
              </>
            )}
          </div>
        </div>

        <div
          className={`bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 md:p-16 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="space-y-6">
            {message.split('. ').map((sentence, index) => (
              <p
                key={index}
                className={`text-2xl md:text-3xl leading-relaxed text-gray-800 transition-all duration-1000`}
                style={{
                  transitionDelay: `${(index + 1) * 500}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                }}
              >
                {sentence.trim()}{index < message.split('. ').length - 1 ? '.' : ''}
              </p>
            ))}
          </div>

          <div className={`mt-12 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-heartbeat" />
              You are loved
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-heartbeat" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
