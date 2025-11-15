import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BubblePopGame } from "@/components/games/BubblePopGame";
import { AnimalSoundGame } from "@/components/games/AnimalSoundGame";
import { MusicTilesGame } from "@/components/games/MusicTilesGame";
import { ShapeMatchGame } from "@/components/games/ShapeMatchGame";
import { SortingGame } from "@/components/games/SortingGame";
import { MiniCarGame } from "@/components/games/MiniCarGame";
import { CountStarsGame } from "@/components/games/CountStarsGame";
import { MemoryFlipGame } from "@/components/games/MemoryFlipGame";
import { SensoryPlayGame } from "@/components/games/SensoryPlayGame";
import { StoryTapGame } from "@/components/games/StoryTapGame";
import { Sparkles, Music, Circle, Shapes, Apple, Car, Star, Grid3x3, Hand, BookOpen } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("bubble");

  const games = [
    { id: "bubble", icon: Sparkles, label: "Bubbles", component: BubblePopGame },
    { id: "animals", icon: Apple, label: "Animals", component: AnimalSoundGame },
    { id: "music", icon: Music, label: "Music", component: MusicTilesGame },
    { id: "shapes", icon: Circle, label: "Shapes", component: ShapeMatchGame },
    { id: "sorting", icon: Shapes, label: "Sort", component: SortingGame },
    { id: "car", icon: Car, label: "Drive", component: MiniCarGame },
    { id: "stars", icon: Star, label: "Stars", component: CountStarsGame },
    { id: "memory", icon: Grid3x3, label: "Memory", component: MemoryFlipGame },
    { id: "sensory", icon: Hand, label: "Sensory", component: SensoryPlayGame },
    { id: "story", icon: BookOpen, label: "Story", component: StoryTapGame },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
            🌈 Learning Games
          </h1>
          <p className="text-muted-foreground text-lg">
            Fun and gentle learning for little ones
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 md:grid-cols-10 gap-2 h-auto bg-transparent mb-6">
            {games.map((game) => {
              const Icon = game.icon;
              return (
                <TabsTrigger
                  key={game.id}
                  value={game.id}
                  className="game-button flex flex-col items-center gap-1 p-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card text-card-foreground"
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{game.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {games.map((game) => {
            const GameComponent = game.component;
            return (
              <TabsContent key={game.id} value={game.id} className="animate-fade-in">
                <div className="game-card">
                  <GameComponent />
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
