import { useState } from "react";
import { playSound } from "@/lib/sounds";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

const colors = [
  "hsl(210, 70%, 75%)",
  "hsl(35, 60%, 75%)",
  "hsl(270, 40%, 75%)",
  "hsl(145, 50%, 70%)",
  "hsl(0, 60%, 75%)",
];

export const SensoryPlayGame = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const handleCanvasInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    playSound("note");

    const newSparkle: Sparkle = {
      id: Date.now() + Math.random(),
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 30 + 20,
    };

    setSparkles((prev) => [...prev, newSparkle]);

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 1000);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-secondary mb-2">✨ Sensory Play</h2>
      <p className="text-muted-foreground mb-6">Tap anywhere to create sparkles!</p>

      <div
        onClick={handleCanvasInteraction}
        className="relative w-full h-96 bg-gradient-to-br from-background to-muted rounded-3xl overflow-hidden cursor-pointer"
      >
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute animate-fade-in"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              fontSize: `${sparkle.size}px`,
              color: sparkle.color,
              transform: "translate(-50%, -50%)",
              animation: "sparkle 1s ease-out forwards",
            }}
          >
            ✨
          </div>
        ))}

        {sparkles.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-lg">
            Tap to create magic! ✨
          </div>
        )}
      </div>

      <style>{`
        @keyframes sparkle {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
