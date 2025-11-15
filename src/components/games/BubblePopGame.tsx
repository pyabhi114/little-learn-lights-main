import { useState, useEffect } from "react";
import { playSound } from "@/lib/sounds";

interface Bubble {
  id: number;
  x: number;
  y: number;
  content: string;
  type: "number" | "letter" | "shape";
  color: string;
}

const shapes = ["⭐", "❤️", "⚫", "🔶", "🔷"];
const colors = ["hsl(210, 70%, 75%)", "hsl(35, 60%, 75%)", "hsl(270, 40%, 75%)", "hsl(145, 50%, 70%)"];

export const BubblePopGame = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);

  const createBubble = () => {
    const types = ["number", "letter", "shape"] as const;
    const type = types[Math.floor(Math.random() * types.length)];
    let content = "";

    if (type === "number") {
      content = String(Math.floor(Math.random() * 10) + 1);
    } else if (type === "letter") {
      content = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    } else {
      content = shapes[Math.floor(Math.random() * shapes.length)];
    }

    return {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 5,
      y: Math.random() * 70 + 10,
      content,
      type,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  };

  useEffect(() => {
    const initialBubbles = Array.from({ length: 6 }, createBubble);
    setBubbles(initialBubbles);
  }, []);

  const handleBubblePop = (bubble: Bubble) => {
    playSound("pop");
    speakContent(bubble.content, bubble.type);
    
    setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
    setScore((prev) => prev + 1);

    setTimeout(() => {
      setBubbles((prev) => [...prev, createBubble()]);
    }, 500);
  };

  const speakContent = (content: string, type: string) => {
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative h-[500px] overflow-hidden rounded-2xl">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-primary mb-2">🫧 Bubble Pop Learning</h2>
        <p className="text-muted-foreground">Tap the bubbles to learn!</p>
        <div className="text-xl font-semibold text-success mt-2">Score: {score}</div>
      </div>

      <div className="relative h-full">
        {bubbles.map((bubble) => (
          <button
            key={bubble.id}
            onClick={() => handleBubblePop(bubble)}
            className="absolute w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg animate-fade-in"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              backgroundColor: bubble.color,
              color: "hsl(213, 100%, 8%)",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            {bubble.content}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};
