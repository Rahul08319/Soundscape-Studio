import { useEffect, useRef } from "react";

interface SoundscapeVisualizerProps {
  isPlaying: boolean;
  bpm: number;
  currentStep: number;
  isAudioEnabled: boolean;
  activeTracksCount?: number;
}

export const SoundscapeVisualizer = ({
  isPlaying,
  bpm,
  currentStep,
  isAudioEnabled,
  activeTracksCount = 0,
}: SoundscapeVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phaseRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; radius: number; alpha: number; color: string }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    window.addEventListener("resize", handleResize);

    // Initialize ambient particles
    if (particlesRef.current.length === 0) {
      const colors = ["#a855f7", "#38bdf8", "#ec4899", "#f59e0b"];
      particlesRef.current = Array.from({ length: 24 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Phase progression based on BPM
      const speed = isPlaying ? (bpm / 120) * 0.048 : 0.012;
      phaseRef.current += speed;
      const phase = phaseRef.current;

      // Pulse multiplier on beat step
      const stepPulse = isPlaying ? Math.sin((currentStep / 16) * Math.PI * 2) * 0.25 : 0;
      const energyMultiplier = isAudioEnabled ? (activeTracksCount > 0 ? 1.25 : 1.0) : 0.2;

      // Draw Apple fluid harmonic waves
      const waves = [
        {
          color: "rgba(168, 85, 247, 0.85)", // System Purple
          glow: "rgba(168, 85, 247, 0.35)",
          amplitude: (isPlaying ? height * 0.34 : height * 0.09) * energyMultiplier,
          frequency: 0.014,
          phaseOffset: 0,
        },
        {
          color: "rgba(56, 189, 248, 0.8)", // System Teal/Cyan
          glow: "rgba(56, 189, 248, 0.3)",
          amplitude: (isPlaying ? height * 0.28 : height * 0.07) * energyMultiplier,
          frequency: 0.02,
          phaseOffset: 1.6,
        },
        {
          color: "rgba(244, 114, 182, 0.75)", // System Pink
          glow: "rgba(244, 114, 182, 0.25)",
          amplitude: (isPlaying ? height * 0.22 : height * 0.05) * energyMultiplier,
          frequency: 0.026,
          phaseOffset: 3.1,
        },
        {
          color: "rgba(251, 191, 36, 0.65)", // System Amber (subtle harmonic)
          glow: "rgba(251, 191, 36, 0.2)",
          amplitude: (isPlaying ? height * 0.16 : height * 0.04) * energyMultiplier,
          frequency: 0.032,
          phaseOffset: 4.5,
        },
      ];

      waves.forEach(({ color, amplitude, frequency, phaseOffset, glow }) => {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 2 * window.devicePixelRatio;
        ctx.strokeStyle = color;
        ctx.shadowColor = glow;
        ctx.shadowBlur = 10 * window.devicePixelRatio;

        for (let x = 0; x < width; x += 3) {
          const normalX = x / width;
          // Apple continuous envelope dampening at edges
          const envelope = Math.sin(normalX * Math.PI);
          const y =
            height / 2 +
            Math.sin(x * frequency + phase + phaseOffset) *
              amplitude *
              envelope *
              (1 + stepPulse);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.restore();
      });

      // Ambient Apple Floating Light Sparks
      particlesRef.current.forEach((p) => {
        p.x += p.vx * (isPlaying ? 1.5 : 0.6);
        p.y += p.vy * (isPlaying ? 1.5 : 0.6);

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (isPlaying ? 0.9 : 0.4);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8 * window.devicePixelRatio;
        ctx.fill();
        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, bpm, currentStep, isAudioEnabled, activeTracksCount]);

  return (
    <div className="apple-visualizer-wrap" aria-hidden="true">
      <canvas ref={canvasRef} className="apple-visualizer-canvas" />
    </div>
  );
};
