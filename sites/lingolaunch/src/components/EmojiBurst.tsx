"use client";

/*
 * Full-screen emoji celebration. Re-render with a new `burstKey` to fire.
 * Pure CSS animation — particles remove themselves when it ends.
 */
export default function EmojiBurst({
  burstKey,
  emojis = ["🎉", "⭐", "🌟", "✨", "🎊"],
}: {
  burstKey: number;
  emojis?: string[];
}) {
  if (burstKey === 0) return null;

  const particles = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    const distance = 120 + (i % 4) * 60;
    return {
      emoji: emojis[i % emojis.length],
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 40,
      delay: (i % 5) * 40,
    };
  });

  return (
    <div
      key={burstKey}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="animate-burst absolute text-4xl"
          style={
            {
              "--burst-x": `${p.x}px`,
              "--burst-y": `${p.y}px`,
              animationDelay: `${p.delay}ms`,
            } as React.CSSProperties
          }
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
