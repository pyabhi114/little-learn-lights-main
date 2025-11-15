import { useState } from "react";
import { playSound } from "@/lib/sounds";

const items = [
  { name: "Apple", emoji: "🍎", category: "fruit" },
  { name: "Banana", emoji: "🍌", category: "fruit" },
  { name: "Orange", emoji: "🍊", category: "fruit" },
  { name: "Carrot", emoji: "🥕", category: "vegetable" },
  { name: "Broccoli", emoji: "🥦", category: "vegetable" },
];

export const SortingGame = () => {
  const [currentItem, setCurrentItem] = useState(items[0]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSort = (category: string) => {
    if (currentItem.category === category) {
      playSound("success");
      setFeedback("🎉 Yay! You did it!");
      setScore(score + 1);
      
      const utterance = new SpeechSynthesisUtterance(`Great! ${currentItem.name} is a ${category}!`);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);

      setTimeout(() => {
        const nextIndex = (items.indexOf(currentItem) + 1) % items.length;
        setCurrentItem(items[nextIndex]);
        setFeedback("");
      }, 2000);
    } else {
      playSound("pop");
      setFeedback("Try again!");
      setTimeout(() => setFeedback(""), 1000);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-secondary mb-2">🍎 Sorting Game</h2>
      <p className="text-muted-foreground mb-4">Sort the items into the right basket!</p>
      <p className="text-xl text-success font-semibold mb-8">Score: {score}</p>

      {/* Current Item */}
      <div className="mb-12">
        <div className="w-32 h-32 mx-auto bg-card rounded-3xl flex items-center justify-center text-7xl shadow-lg animate-fade-in">
          {currentItem.emoji}
        </div>
        <p className="text-xl text-primary font-semibold mt-4">{currentItem.name}</p>
      </div>

      {/* Baskets */}
      <div className="flex justify-center gap-8">
        <button
          onClick={() => handleSort("fruit")}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleSort("fruit")}
          className="game-button w-48 h-48 bg-accent flex flex-col items-center justify-center shadow-xl"
        >
          <span className="text-5xl mb-2">🧺</span>
          <span className="text-xl font-bold text-accent-foreground">Fruits</span>
        </button>

        <button
          onClick={() => handleSort("vegetable")}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleSort("vegetable")}
          className="game-button w-48 h-48 bg-success flex flex-col items-center justify-center shadow-xl"
        >
          <span className="text-5xl mb-2">🧺</span>
          <span className="text-xl font-bold text-success-foreground">Vegetables</span>
        </button>
      </div>

      {feedback && (
        <p className="text-2xl font-bold mt-8 animate-fade-in">
          {feedback}
        </p>
      )}
    </div>
  );
};
