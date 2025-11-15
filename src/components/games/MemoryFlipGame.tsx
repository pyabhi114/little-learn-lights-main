import { useState, useEffect } from "react";
import { playSound } from "@/lib/sounds";

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const emojis = ["🍎", "🌟", "❤️", "🎈"];

export const MemoryFlipGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameEmojis = [...emojis, ...emojis];
    const shuffled = gameEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMatches(0);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (cards[id].isMatched || cards[id].isFlipped) return;

    playSound("click");
    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        playSound("success");
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[first].isMatched = true;
          updatedCards[second].isMatched = true;
          setCards(updatedCards);
          setFlippedCards([]);
          setMatches(matches + 1);

          const utterance = new SpeechSynthesisUtterance("You matched!");
          utterance.rate = 0.9;
          window.speechSynthesis.speak(utterance);
        }, 500);
      } else {
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[first].isFlipped = false;
          updatedCards[second].isFlipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-accent mb-2">🍭 Memory Match</h2>
      <p className="text-muted-foreground mb-4">Find the matching pairs!</p>
      <p className="text-xl text-success font-semibold mb-6">Matches: {matches} / 4</p>

      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`game-button aspect-square text-5xl transition-all duration-300 ${
              card.isFlipped || card.isMatched
                ? "bg-primary"
                : "bg-muted"
            }`}
          >
            {card.isFlipped || card.isMatched ? card.emoji : "?"}
          </button>
        ))}
      </div>

      {matches === 4 && (
        <div className="mt-8 animate-fade-in">
          <p className="text-3xl text-success font-bold mb-4">🎉 You Won!</p>
          <button
            onClick={initializeGame}
            className="game-button px-8 py-3 bg-secondary text-secondary-foreground"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};
