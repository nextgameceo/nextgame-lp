‘use client’;

import { useEffect, useRef } from ‘react’;

export default function HeroCanvas() {
const canvasRef = useRef<HTMLCanvasElement>(null);

useEffect(() => {
const canvas = canvasRef.current;
if (!canvas) return;
const ctx = canvas.getContext(‘2d’);
if (!ctx) return;

```
let raf: number;
let W: number;
let H: number;

const resize = () => {
  W = canvas.width  = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
};
resize();
window.addEventListener('resize', resize);

const N = 55;
const particles = Array.from({ length: N }, () => ({
  x:  Math.random() * 1000,
  y:  Math.random() * 1000,
  r:  Math.random() * 1.8 + 0.4,
  vx: (Math.random() - 0.5) * 0.35,
  vy: (Math.random() - 0.5) * 0.35,
  a:  Math.random(),
}));

const draw = () => {
  ctx.clearRect(0, 0, W, H);

  particles.forEach((p) => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x * (W / 1000), p.y * (H / 1000), p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,' + (p.a * 0.6) + ')';
    ctx.fill();
  });

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const a = particles[i];
      const b = particles[j];
      const dx = (a.x - b.x) * (W / 1000);
      const dy = (a.y - b.y) * (H / 1000);
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(a.x * (W / 1000), a.y * (H / 1000));
        ctx.lineTo(b.x * (W / 1000), b.y * (H / 1000));
        ctx.strokeStyle = 'rgba(255,255,255,' + ((1 - d / 110) * 0.15) + ')';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }

  raf = requestAnimationFrame(draw);
};

draw();

return () => {
  cancelAnimationFrame(raf);
  window.removeEventListener('resize', resize);
};
```

}, []);

return (
<canvas
ref={canvasRef}
aria-hidden=“true”
style={{
position:      ‘absolute’,
inset:         0,
width:         ‘100%’,
height:        ‘100%’,
display:       ‘block’,
opacity:       0.45,
pointerEvents: ‘none’,
zIndex:        1,
}}
/>
);
}