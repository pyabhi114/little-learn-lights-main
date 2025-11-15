import { useState } from "react";
import { playSound } from "@/lib/sounds";

const shapes = [
  { name: "Circle", emoji: "⚫", path: "M 50 50 m -40 0 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0" },
  { name: "Square", emoji: "⬛", path: "M 20 20 L 80 20 L 80 80 L 20 80 Z" },
  { name: "Triangle", emoji: "🔺", path: "M 50 20 L 80 80 L 20 80 Z" },
  { name: "Star", emoji: "⭐", path: "M 50 15 L 58 40 L 85 40 L 63 57 L 72 82 L 50 65 L 28 82 L 37 57 L 15 40 L 42 40 Z" },
  { name: "Heart", emoji: "❤️", path: "M 50 80 C 20 60 10 40 25 25 C 35 15 50 20 50 35 C 50 20 65 15 75 25 C 90 40 80 60 50 80 Z" },
];

export const ShapeMatchGame = () => {
  const [currentShape, setCurrentShape] = useState(shapes[0]);
  const [draggedShape, setDraggedShape] = useState<string | null>(null);
  const [matched, setMatched] = useState(false);

  const handleDrop = (shapeName: string) => {
    if (draggedShape === shapeName) {
      playSound("success");
      setMatched(true);
      
      const utterance = new SpeechSynthesisUtterance(`Great job! You matched the ${shapeName}!`);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);

      setTimeout(() => {
        const nextIndex = (shapes.indexOf(currentShape) + 1) % shapes.length;
        setCurrentShape(shapes[nextIndex]);
        setMatched(false);
      }, 2000);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-success mb-2">🧩 Shape Match</h2>
      <p className="text-muted-foreground mb-8">Drag the shape to match!</p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 my-12">
        {/* Target Shape */}
        <div
          className={`w-48 h-48 bg-muted rounded-3xl flex items-center justify-center border-4 transition-all ${
            matched ? "border-success animate-pulse" : "border-dashed border-border"
          }`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(currentShape.name)}
        >
          <svg width="120" height="120" viewBox="0 0 100 100">
            <path
              d={currentShape.path}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>
        </div>

        {/* Draggable Shape */}
        <div
          draggable
          onDragStart={() => setDraggedShape(currentShape.name)}
          className="w-48 h-48 bg-primary rounded-3xl flex items-center justify-center cursor-move hover:scale-105 transition-all shadow-lg"
        >
          <span className="text-8xl">{currentShape.emoji}</span>
        </div>
      </div>

      {matched && (
        <p className="text-2xl text-success font-bold animate-fade-in">
          🎉 Perfect Match!
        </p>
      )}

      <div className="flex justify-center gap-3 mt-8">
        {shapes.map((shape) => (
          <button
            key={shape.name}
            onClick={() => {
              setCurrentShape(shape);
              setMatched(false);
            }}
            className={`game-button w-16 h-16 text-3xl ${
              currentShape.name === shape.name ? "bg-primary" : "bg-muted"
            }`}
          >
            {shape.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};
