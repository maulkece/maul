'use client';

import { useEffect, useRef } from 'react';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawBackground = () => {
      animationTimeRef.current += 0.3;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#8B5E7E');
      gradient.addColorStop(0.25, '#D68A95');
      gradient.addColorStop(0.5, '#E8B4C8');
      gradient.addColorStop(0.75, '#B8E0C8');
      gradient.addColorStop(1, '#90D5B0');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      const gridSize = 60;
      ctx.strokeStyle = 'rgba(150, 100, 140, 0.12)';
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.strokeRect(x, y, gridSize, gridSize);
        }
      }

      // Draw wavy lines
      for (let y = 0; y < canvas.height; y += 80) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.22 - (y / canvas.height) * 0.12})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        for (let x = 0; x < canvas.width; x += 3) {
          const wave = Math.sin((x * 0.005) + (animationTimeRef.current * 0.02) + (y * 0.003)) * 30;
          const distortion = Math.cos((y * 0.005) + (animationTimeRef.current * 0.015)) * 20;
          const posY = y + wave + distortion;

          if (x === 0) {
            ctx.moveTo(x, posY);
          } else {
            ctx.lineTo(x, posY);
          }
        }
        ctx.stroke();
      }

      requestAnimationFrame(drawBackground);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawBackground();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-50"
      id="topoCanvas"
    />
  );
}
