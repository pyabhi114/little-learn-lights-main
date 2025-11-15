import { useState } from "react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { playSound } from "@/lib/sounds";

export const MiniCarGame = () => {
  const [carPosition, setCarPosition] = useState({ x: 50, y: 50 });

  const moveCar = (direction: string) => {
    playSound("click");
    
    const utterance = new SpeechSynthesisUtterance(direction);
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);

    setCarPosition((prev) => {
      const newPos = { ...prev };
      const step = 10;

      switch (direction) {
        case "up":
          newPos.y = Math.max(5, prev.y - step);
          break;
        case "down":
          newPos.y = Math.min(85, prev.y + step);
          break;
        case "left":
          newPos.x = Math.max(5, prev.x - step);
          break;
        case "right":
          newPos.x = Math.min(85, prev.x + step);
          break;
      }
      return newPos;
    });
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-primary mb-2">🛣️ Mini Car Drive</h2>
      <p className="text-muted-foreground mb-6">Use arrows to drive the car!</p>

      {/* Road */}
      <div className="relative w-full h-96 bg-muted rounded-3xl overflow-hidden mb-6">
        <div
          className="absolute w-16 h-16 transition-all duration-300 ease-out"
          style={{
            left: `${carPosition.x}%`,
            top: `${carPosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="text-6xl">🚗</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => moveCar("up")}
          className="game-button w-20 h-20 bg-primary"
        >
          <ArrowUp className="w-8 h-8 mx-auto" />
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => moveCar("left")}
            className="game-button w-20 h-20 bg-primary"
          >
            <ArrowLeft className="w-8 h-8 mx-auto" />
          </button>
          <button
            onClick={() => moveCar("down")}
            className="game-button w-20 h-20 bg-primary"
          >
            <ArrowDown className="w-8 h-8 mx-auto" />
          </button>
          <button
            onClick={() => moveCar("right")}
            className="game-button w-20 h-20 bg-primary"
          >
            <ArrowRight className="w-8 h-8 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};
