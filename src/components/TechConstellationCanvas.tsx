import React, { useEffect, useRef } from 'react';

interface TechConstellationCanvasProps {
  className?: string;
}

export const TechConstellationCanvas: React.FC<TechConstellationCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let animationFrameId: number;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      let width = 0;
      let height = 0;

      const resize = () => {
        try {
          if (!canvas) return;
          width = window.innerWidth || 1200;
          height = window.innerHeight || 800;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);
        } catch (e) {
          console.warn('Canvas resize skipped:', e);
        }
      };

      resize();

    interface StarNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseRadius: number;
      pulseSpeed: number;
      pulseOffset: number;
      hue: number;
      alpha: number;
      isHeroNode?: boolean;
    }

    interface DataPulse {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
    }

    const nodeCount = Math.min(Math.max(Math.floor((width * height) / 10000), 40), 75);
    const nodes: StarNode[] = [];
    const pulses: DataPulse[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const isHero = i % 6 === 0;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isHero ? 0.3 : 0.5),
        vy: (Math.random() - 0.5) * (isHero ? 0.3 : 0.5),
        baseRadius: isHero ? Math.random() * 2 + 2.6 : Math.random() * 1.5 + 1.2,
        pulseSpeed: Math.random() * 0.025 + 0.015,
        pulseOffset: Math.random() * Math.PI * 2,
        hue: isHero ? 210 : (Math.random() > 0.5 ? 195 : 240),
        alpha: Math.random() * 0.45 + 0.35,
        isHeroNode: isHero,
      });
    }

    let mouseX = -2000;
    let mouseY = -2000;
    let mouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    };

    const handleMouseLeave = () => {
      mouseX = -2000;
      mouseY = -2000;
      mouseActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('resize', resize, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const maxConnectDist = 135;
      const maxConnectDistSq = maxConnectDist * maxConnectDist;
      const mouseRadius = 180;
      const mouseRadiusSq = mouseRadius * mouseRadius;

      // Draw interactive cursor gravitational aura
      if (mouseActive && mouseX > 0 && mouseY > 0) {
        const auraGradient = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, mouseRadius
        );
        if (isDark) {
          auraGradient.addColorStop(0, 'rgba(56, 189, 248, 0.12)');
          auraGradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.05)');
          auraGradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
        } else {
          auraGradient.addColorStop(0, 'rgba(26, 115, 232, 0.08)');
          auraGradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.03)');
          auraGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }
        ctx.fillStyle = auraGradient;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, mouseRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw constellation connections
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDistSq) {
            const dist = Math.sqrt(distSq);
            const ratio = 1 - dist / maxConnectDist;
            const alpha = ratio * (isDark ? 0.28 : 0.18);

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = isDark 
              ? `rgba(96, 165, 250, ${alpha})` 
              : `rgba(26, 115, 232, ${alpha})`;
            ctx.lineWidth = ratio * (n1.isHeroNode || n2.isHeroNode ? 1.4 : 0.9);
            ctx.stroke();
          }
        }

        // Check interaction with mouse
        if (mouseActive) {
          const mdx = n1.x - mouseX;
          const mdy = n1.y - mouseY;
          const mDistSq = mdx * mdx + mdy * mdy;

          if (mDistSq < mouseRadiusSq) {
            const mDist = Math.sqrt(mDistSq);
            const mRatio = 1 - mDist / mouseRadius;
            const mAlpha = mRatio * (isDark ? 0.45 : 0.35);

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = isDark 
              ? `rgba(56, 189, 248, ${mAlpha})` 
              : `rgba(14, 165, 233, ${mAlpha})`;
            ctx.lineWidth = mRatio * 1.5;
            ctx.stroke();

            // Magnetic gentle attraction
            n1.vx += (mouseX - n1.x) * 0.00035;
            n1.vy += (mouseY - n1.y) * 0.00035;
          }
        }

        // Position update
        n1.x += n1.vx;
        n1.y += n1.vy;

        // Boundary bounce with smooth dampening
        if (n1.x < 0) {
          n1.x = 0;
          n1.vx = Math.abs(n1.vx);
        } else if (n1.x > width) {
          n1.x = width;
          n1.vx = -Math.abs(n1.vx);
        }

        if (n1.y < 0) {
          n1.y = 0;
          n1.vy = Math.abs(n1.vy);
        } else if (n1.y > height) {
          n1.y = height;
          n1.vy = -Math.abs(n1.vy);
        }

        // Slight velocity limits
        const speed = Math.sqrt(n1.vx * n1.vx + n1.vy * n1.vy);
        if (speed > 1.2) {
          n1.vx = (n1.vx / speed) * 1.2;
          n1.vy = (n1.vy / speed) * 1.2;
        }

        // Pulsing glow radius & opacity
        const pulse = Math.sin(time * 3 * n1.pulseSpeed + n1.pulseOffset);
        const currentRadius = n1.baseRadius + pulse * 0.6;
        const currentAlpha = Math.max(0.2, Math.min(0.9, n1.alpha + pulse * 0.2));

        // Draw star node
        ctx.save();
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, currentRadius, 0, Math.PI * 2);

        if (isDark) {
          ctx.fillStyle = n1.isHeroNode ? '#38bdf8' : (n1.hue === 195 ? '#00f0ff' : '#818cf8');
          ctx.shadowColor = n1.isHeroNode ? '#0284c7' : '#38bdf8';
          ctx.shadowBlur = n1.isHeroNode ? 12 : 6;
        } else {
          ctx.fillStyle = n1.isHeroNode ? '#1a73e8' : (n1.hue === 195 ? '#0284c7' : '#4f46e5');
          ctx.shadowColor = '#1a73e8';
          ctx.shadowBlur = n1.isHeroNode ? 6 : 3;
        }

        ctx.globalAlpha = currentAlpha;
        ctx.fill();
        ctx.restore();
      }

      // Periodically spawn packet pulses along close nodes
      if (pulses.length < 10 && Math.random() < 0.15 && nodes.length > 2) {
        const i1 = Math.floor(Math.random() * nodes.length);
        const n1 = nodes[i1];
        // find a neighbor within maxConnectDist
        for (let j = 0; j < nodes.length; j++) {
          if (j === i1) continue;
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          if (dx * dx + dy * dy < maxConnectDistSq) {
            pulses.push({
              fromIndex: i1,
              toIndex: j,
              progress: 0,
              speed: Math.random() * 0.015 + 0.012
            });
            break;
          }
        }
      }

      // Update and draw packet pulses
      for (let pIdx = pulses.length - 1; pIdx >= 0; pIdx--) {
        const p = pulses[pIdx];
        p.progress += p.speed;
        if (p.progress >= 1) {
          pulses.splice(pIdx, 1);
          continue;
        }

        const nStart = nodes[p.fromIndex];
        const nEnd = nodes[p.toIndex];
        if (!nStart || !nEnd) {
          pulses.splice(pIdx, 1);
          continue;
        }

        const px = nStart.x + (nEnd.x - nStart.x) * p.progress;
        const py = nStart.y + (nEnd.y - nStart.y) * p.progress;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#38bdf8' : '#1a73e8';
        ctx.shadowColor = isDark ? '#00f0ff' : '#0284c7';
        ctx.shadowBlur = 8;
        ctx.globalAlpha = Math.sin(p.progress * Math.PI) * 0.9;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
    };
  } catch (err) {
    console.warn('Constellation canvas disabled:', err);
  }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default TechConstellationCanvas;
