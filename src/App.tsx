import { useState, useEffect } from 'react';
import { Sparkles, Heart, Gift, Music, Volume2, VolumeX } from 'lucide-react';
import LandingPage from './components/LandingPage';
import MemoriesSection from './components/MemoriesSection';
import MessageSection from './components/MessageSection';
import FunSection from './components/FunSection';
import FinalPage from './components/FinalPage';
import FloatingElements from './components/FloatingElements';

function App() {
  const [started, setStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    if (started) {
      const audio = document.getElementById('bgMusic') as HTMLAudioElement;
      if (audio && musicPlaying) {
        audio.play().catch(() => {});
      }
    }
  }, [started, musicPlaying]);

  const handleStart = () => {
    setStarted(true);
    setMusicPlaying(true);
  };

  const toggleMusic = () => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement;
    if (audio) {
      if (musicPlaying) {
        audio.pause();
      } else {
        audio.play().catch(() => {});
      }
      setMusicPlaying(!musicPlaying);
    }
  };

  if (!started) {
    return <LandingPage onStart={handleStart} />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <audio id="bgMusic" loop>
        <source src="https://www.bensound.com/bensound-music/bensound-happyrock.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Toggle music"
      >
        {musicPlaying ? (
          <Volume2 className="w-6 h-6 text-pink-500" />
        ) : (
          <VolumeX className="w-6 h-6 text-gray-500" />
        )}
      </button>

      <FloatingElements />

      <div className="relative z-10">
        <MemoriesSection />
        <MessageSection />
        <FunSection />
        <FinalPage />
      </div>
    </div>
  );
}

export default App;
