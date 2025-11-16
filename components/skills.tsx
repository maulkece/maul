'use client';

import { useState, useEffect } from 'react';

interface Language {
  id: string;
  name: string;
  icon_url: string;
}

interface SkillsProps {
  languages: Language[];
}

export default function Skills({ languages }: SkillsProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    // Initialize random positions
    const newPositions: Record<string, { x: number; y: number }> = {};
    languages.forEach((lang, idx) => {
      const angle = (idx / languages.length) * Math.PI * 2;
      const radius = 150;
      newPositions[lang.id] = {
        x: 150 + Math.cos(angle) * radius,
        y: 150 + Math.sin(angle) * radius,
      };
    });
    setPositions(newPositions);
  }, [languages]);

  const handleMouseDown = (id: string) => {
    setDraggedId(id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPositions(prev => ({
      ...prev,
      [draggedId]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }));
  };

  const handleMouseUp = () => {
    setDraggedId(null);
  };

  return (
    <section id="skills" className="py-32 relative z-10 bg-transparent">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-900 font-space-grotesk relative pb-6 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gradient-to-r after:from-pink-300 after:to-pink-500 after:rounded">
          Tech Stack & Tools
        </h2>

        <div
          className="relative w-full min-h-96 bg-transparent"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Center logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-40 h-40 bg-gradient-to-r from-pink-300 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
              <span className="text-5xl font-bold text-white font-space-grotesk">A</span>
            </div>
          </div>

          {/* Orbiting skills */}
          {languages.map((lang, idx) => (
            <div
              key={lang.id}
              className="absolute w-28 h-28 cursor-grab active:cursor-grabbing transition-all"
              style={{
                left: `${positions[lang.id]?.x || 150}px`,
                top: `${positions[lang.id]?.y || 150}px`,
                transform: 'translate(-50%, -50%)',
                animation: draggedId !== lang.id ? `float ${5 + idx}s ease-in-out infinite` : 'none',
                animationDelay: `${idx * 0.2}s`
              }}
              onMouseDown={() => handleMouseDown(lang.id)}
            >
              <div className="w-full h-full bg-gradient-to-r from-pink-300/80 to-pink-500/80 rounded-2xl border-2 border-white/60 flex items-center justify-center shadow-lg hover:scale-125 transition-all hover:shadow-2xl">
                <img
                  src={lang.icon_url || "/placeholder.svg"}
                  alt={lang.name}
                  className="w-20 h-20 object-contain brightness-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-20px); }
        }
      `}</style>
    </section>
  );
}
