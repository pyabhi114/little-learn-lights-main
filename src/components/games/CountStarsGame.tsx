import { useState, useEffect } from "react";
import { playSound } from "@/lib/sounds";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export const CountStarsGame = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [count, setCount] = useState(0);
  const [level, setLevel] = useState(5);

  useEffect(() => {
    generateStars();
  }, [level]);

  const generateStars = () => {
    const newStars = Array.from({ length: level }, (_, i) => ({
      id: i,
      x: Math.random() * 85 + 5,
      y: Math.random() * 80 + 10,
      size: Math.random() * 20 + 30,
      opacity: Math.random() * 0.4 + 0.6,
    }));
    setStars(newStars);
    setCount(0);
  };

  const handleStarClick = (starId: number) => {
    playSound("note");
    const newCount = count + 1;
    setCount(newCount);
    
    const utterance = new SpeechSynthesisUtterance(String(newCount));
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);

    setStars((prev) => prev.filter((s) => s.id !== starId));

    if (newCount === level) {
      setTimeout(() => {
        playSound("success");
        const completeUtterance = new SpeechSynthesisUtterance(
          `Amazing! You counted all ${level} stars!`
        );
        completeUtterance.rate = 0.9;
        window.speechSynthesis.speak(completeUtterance);
      }, 300);

      setTimeout(() => {
        setLevel((prev) => Math.min(prev + 1, 10));
      }, 2500);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-accent mb-2">🔢 Count the Stars</h2>
      <p className="text-muted-foreground mb-4">Tap each star to count!</p>
      <p className="text-3xl text-primary font-bold mb-6">Count: {count} / {level}</p>

      <div className="relative w-full h-96 bg-gradient-to-b from-background to-muted rounded-3xl overflow-hidden">
        {stars.map((star) => (
          <button
            key={star.id}
            onClick={() => handleStarClick(star.id)}
            className="absolute transition-all duration-300 hover:scale-125"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              fontSize: `${star.size}px`,
              opacity: star.opacity,
            }}
          >
            ⭐
          </button>
        ))}

        {stars.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center animate-fade-in">
              <p className="text-4xl mb-4">🎉</p>
              <p className="text-2xl text-success font-bold">Perfect!</p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={generateStars}
        className="game-button mt-6 px-8 py-3 bg-secondary text-secondary-foreground"
      >
        New Stars
      </button>
    </div>
  );
};
