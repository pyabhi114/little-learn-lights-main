import { useState } from "react";
import { playSound } from "@/lib/sounds";

const animals = [
  { name: "Cow", emoji: "🐮", sound: "Moo!" },
  { name: "Cat", emoji: "🐱", sound: "Meow!" },
  { name: "Dog", emoji: "🐕", sound: "Woof!" },
  { name: "Sheep", emoji: "🐑", sound: "Baa!" },
  { name: "Duck", emoji: "🦆", sound: "Quack!" },
  { name: "Pig", emoji: "🐷", sound: "Oink!" },
];

export const AnimalSoundGame = () => {
  const [currentAnimal, setCurrentAnimal] = useState(animals[0]);
  const [tapCount, setTapCount] = useState(0);

  const handleAnimalTap = () => {
    playSound("click");
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    // Speak the sound
    const utterance = new SpeechSynthesisUtterance(currentAnimal.sound);
    utterance.rate = 0.9;
    utterance.pitch = 1.3;
    window.speechSynthesis.speak(utterance);

    // After 3 taps, say the name and switch animal
    if (newTapCount >= 3) {
      setTimeout(() => {
        const nameUtterance = new SpeechSynthesisUtterance(currentAnimal.name);
        nameUtterance.rate = 0.8;
        window.speechSynthesis.speak(nameUtterance);
      }, 800);

      setTimeout(() => {
        const nextIndex = (animals.indexOf(currentAnimal) + 1) % animals.length;
        setCurrentAnimal(animals[nextIndex]);
        setTapCount(0);
      }, 2000);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-secondary mb-2">🐾 Animal Sounds</h2>
      <p className="text-muted-foreground mb-8">Tap the animal to hear its sound!</p>

      <button
        onClick={handleAnimalTap}
        className="game-button w-64 h-64 mx-auto bg-card flex flex-col items-center justify-center text-9xl shadow-xl"
      >
        <span className="animate-fade-in">{currentAnimal.emoji}</span>
      </button>

      <div className="mt-6">
        <p className="text-xl text-accent font-semibold">{currentAnimal.sound}</p>
        <p className="text-sm text-muted-foreground mt-2">
          Tap {3 - tapCount} more times to learn the name
        </p>
      </div>

      <div className="flex justify-center gap-3 mt-8">
        {animals.map((animal) => (
          <button
            key={animal.name}
            onClick={() => {
              setCurrentAnimal(animal);
              setTapCount(0);
            }}
            className={`game-button w-16 h-16 text-3xl ${
              currentAnimal.name === animal.name ? "bg-primary" : "bg-muted"
            }`}
          >
            {animal.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};
