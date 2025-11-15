import { useState } from "react";
import { playSound } from "@/lib/sounds";

interface Character {
  emoji: string;
  name: string;
  action: string;
  sound: string;
}

const characters: Character[] = [
  { emoji: "🦉", name: "Owl", action: "hoots", sound: "Hoo hoo!" },
  { emoji: "🐰", name: "Rabbit", action: "hops", sound: "Hop hop!" },
  { emoji: "⭐", name: "Star", action: "twinkles", sound: "Sparkle!" },
  { emoji: "🍂", name: "Leaf", action: "falls", sound: "Swish!" },
  { emoji: "🌙", name: "Moon", action: "glows", sound: "Shine!" },
];

export const StoryTapGame = () => {
  const [activeCharacter, setActiveCharacter] = useState<number | null>(null);
  const [story, setStory] = useState<string[]>([]);

  const handleCharacterTap = (index: number) => {
    playSound("click");
    setActiveCharacter(index);

    const char = characters[index];
    const sentence = `The ${char.name} ${char.action}...`;
    setStory((prev) => [...prev, sentence]);

    const utterance = new SpeechSynthesisUtterance(char.sound);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);

    setTimeout(() => {
      const actionUtterance = new SpeechSynthesisUtterance(sentence);
      actionUtterance.rate = 0.9;
      window.speechSynthesis.speak(actionUtterance);
    }, 500);

    setTimeout(() => setActiveCharacter(null), 1000);
  };

  const resetStory = () => {
    setStory([]);
    setActiveCharacter(null);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-accent mb-2">📚 Story Tap</h2>
      <p className="text-muted-foreground mb-6">Tap characters to create a story!</p>

      <div className="grid grid-cols-5 gap-4 max-w-2xl mx-auto mb-8">
        {characters.map((char, index) => (
          <button
            key={index}
            onClick={() => handleCharacterTap(index)}
            className={`game-button aspect-square text-5xl transition-all ${
              activeCharacter === index ? "scale-110 bg-primary" : "bg-card"
            }`}
          >
            {char.emoji}
          </button>
        ))}
      </div>

      <div className="bg-muted rounded-3xl p-6 min-h-[200px] max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold text-primary mb-4">Your Story:</h3>
        {story.length === 0 ? (
          <p className="text-muted-foreground italic">
            Start tapping characters to create your bedtime story...
          </p>
        ) : (
          <div className="space-y-2">
            {story.map((sentence, index) => (
              <p
                key={index}
                className="text-lg text-foreground animate-fade-in"
              >
                {sentence}
              </p>
            ))}
          </div>
        )}
      </div>

      {story.length > 0 && (
        <button
          onClick={resetStory}
          className="game-button mt-6 px-8 py-3 bg-secondary text-secondary-foreground"
        >
          New Story
        </button>
      )}
    </div>
  );
};
