import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const memories = [
  {
    image: '/images/memory-1.png',
    caption: 'Unforgettable moments...',
    color: 'from-pink-400 to-rose-400',
  },
  {
    image: '/images/memory-2.png',
    caption: "Laughs we'll never forget",
    color: 'from-purple-400 to-pink-400',
  },
  {
    image: '/images/memory-3.png',
    caption: 'Adventures together',
    color: 'from-blue-400 to-purple-400',
  },
  {
    image: '/images/memory-4.png',
    caption: 'Pure joy and friendship',
    color: 'from-yellow-400 to-pink-400',
  },
];

export default function MemoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % memories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-white px-6 py-20">
      <div
        className={`max-w-5xl w-full transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-12">
          <Camera className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-bounce-slow" />
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
            Cherished Memories
          </h2>
          <p className="text-xl text-gray-600">
            A journey through our beautiful moments together
          </p>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
            {memories.map((memory, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentIndex
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95'
                }`}
              >
                <div
                  className={`w-full h-full bg-gradient-to-br ${memory.color} flex items-center justify-center`}
                >
                  <img
                    src={memory.image}
                    alt={memory.caption}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.target.src ='https://via.placeholder.com/800x600?text=Image+Not+Found')
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-pink-500" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
          >
            <ChevronRight className="w-6 h-6 text-pink-500" />
          </button>

          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl">
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              {memories[currentIndex].caption}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-20">
          {memories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-12 h-3 bg-gradient-to-r from-pink-500 to-purple-600'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
