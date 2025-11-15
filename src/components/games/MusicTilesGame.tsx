import { playSound } from "@/lib/sounds";

const tiles = [
  { note: "C", color: "hsl(0, 60%, 75%)", label: "Red" },
  { note: "D", color: "hsl(35, 60%, 75%)", label: "Orange" },
  { note: "E", color: "hsl(60, 60%, 75%)", label: "Yellow" },
  { note: "F", color: "hsl(145, 50%, 70%)", label: "Green" },
  { note: "G", color: "hsl(210, 70%, 75%)", label: "Blue" },
  { note: "A", color: "hsl(270, 40%, 75%)", label: "Purple" },
];

export const MusicTilesGame = () => {
  const playNote = (note: string, color: string) => {
    playSound("note");
    
    const utterance = new SpeechSynthesisUtterance(color);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-accent mb-2">🎵 Music Tiles</h2>
      <p className="text-muted-foreground mb-8">Tap the tiles to make music!</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {tiles.map((tile) => (
          <button
            key={tile.note}
            onClick={() => playNote(tile.note, tile.label)}
            className="game-button h-32 text-2xl font-bold shadow-lg transition-all"
            style={{
              backgroundColor: tile.color,
              color: "hsl(213, 100%, 8%)",
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl">♪</div>
              <div>{tile.label}</div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-muted-foreground mt-8 text-sm">
        Each tile plays a different note and teaches a color!
      </p>
    </div>
  );
};
