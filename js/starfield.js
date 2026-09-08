/**
 * Interactive HTML5 Canvas Starfield Engine (Cosmic Vibrant Edition)
 * Featuring:
 * - Multi-depth celestial stars with vibrant colors (cyan, violet, gold, blue, white)
 * - Dynamic shooting stars (meteors) with electric neon trails
 * - Interactive cursor constellation connection web with cyan/violet lines
 * - Subtle parallax tilt & scroll reaction
 * - High-DPI support & power-saving visibility check
 */

(function () {
  'use strict';

  const canvas = document.getElementById('starfield-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;

  // Star parameters
  let stars = [];
  const STAR_COUNT = Math.min(260, Math.floor((window.innerWidth * window.innerHeight) / 5500));
  const CONSTELLATION_DISTANCE = 120;

  // Pure monochrome star palette for sleek black & white starry theme
  const STAR_COLORS = [
    { base: '255, 255, 255', glow: '#ffffff' },       // Crisp Pure White
    { base: '245, 245, 250', glow: '#f5f5fa' },       // Diamond Silver
    { base: '225, 230, 240', glow: '#e1e6f0' },       // Subtle Silver
    { base: '200, 205, 220', glow: '#c8cddc' }        // Distant White
  ];

  // Mouse interaction state
  const mouse = {
    x: null,
    y: null,
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0
  };

  // Shooting stars array
  let shootingStars = [];
  let lastShootingStarTime = Date.now();

  class Star {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -10;
      this.z = Math.random() * 0.8 + 0.2; // depth layer (0.2 - 1.0)
      this.baseRadius = (Math.random() * 1.5 + 0.35) * this.z;
      this.radius = this.baseRadius;
      this.baseAlpha = Math.random() * 0.6 + 0.25;
      this.alpha = this.baseAlpha;
      this.twinkleSpeed = Math.random() * 0.03 + 0.008;
      this.twinkleOffset = Math.random() * Math.PI * 2;
      this.speedY = (Math.random() * 0.15 + 0.05) * this.z;
      this.speedX = (Math.random() * 0.08 - 0.04) * this.z;
      
      // Assign star color
      this.colorObj = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    }

    update(time) {
      // Gentle drift
      this.y += this.speedY;
      this.x += this.speedX;

      // Wrap around bounds
      if (this.y > height + 10) this.y = -10;
      if (this.y < -10) this.y = height + 10;
      if (this.x > width + 10) this.x = -10;
      if (this.x < -10) this.x = width + 10;

      // Twinkle calculation
      const pulse = Math.sin(time * this.twinkleSpeed + this.twinkleOffset);
      this.alpha = Math.max(0.12, this.baseAlpha + pulse * 0.4);
    }

    draw() {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      // Apply mouse parallax offset based on depth (z)
      const px = this.x + mouse.currentX * (this.z * 20);
      const py = this.y + mouse.currentY * (this.z * 20);

      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, this.radius, 0, Math.PI * 2);
      
      if (isLight) {
        ctx.fillStyle = `rgba(100, 116, 139, ${this.alpha * 0.4})`;
      } else {
        ctx.fillStyle = `rgba(${this.colorObj.base}, ${this.alpha})`;
        // Star core glow for prominent stars in dark mode
        if (this.z > 0.65) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#ffffff';
        }
      }
      
      ctx.fill();
      ctx.restore();
    }
  }

  class ShootingStar {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * (width * 0.8) + width * 0.1;
      this.y = Math.random() * (height * 0.4);
      this.length = Math.random() * 95 + 45;
      this.speed = Math.random() * 9 + 8;
      this.angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1); // ~45 deg downward
      this.opacity = 0;
      this.active = false;
      this.size = Math.random() * 1.5 + 1;
    }

    trigger() {
      this.x = Math.random() * (width * 0.7) + width * 0.15;
      this.y = Math.random() * (height * 0.35);
      this.length = Math.random() * 100 + 50;
      this.speed = Math.random() * 8 + 7;
      this.opacity = 1;
      this.active = true;
    }

    update() {
      if (!this.active) return;

      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.opacity -= 0.015;

      if (this.opacity <= 0 || this.x > width + 50 || this.y > height + 50) {
        this.active = false;
      }
    }

    draw() {
      if (!this.active || this.opacity <= 0) return;

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const tailX = this.x - Math.cos(this.angle) * this.length;
      const tailY = this.y - Math.sin(this.angle) * this.length;

      const gradient = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
      if (isLight) {
        gradient.addColorStop(0, 'rgba(100, 116, 139, 0)');
        gradient.addColorStop(0.7, `rgba(71, 85, 105, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(15, 23, 42, ${this.opacity})`);
      } else {
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.7, `rgba(240, 240, 250, ${this.opacity * 0.7})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${this.opacity})`);
      }

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.6;
      if (!isLight) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffffff';
      }
      ctx.stroke();

      // Bright head point
      ctx.beginPath();
      ctx.arc(this.x, this.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? `rgba(15, 23, 42, ${this.opacity})` : `rgba(255, 255, 255, ${this.opacity})`;
      if (!isLight) {
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#ffffff';
      }
      ctx.fill();
      ctx.restore();
    }
  }

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);

    // Re-initialize stars if count changed significantly
    if (stars.length === 0) {
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new Star());
      }
    }
  }

  function drawConstellations() {
    if (mouse.x === null || mouse.y === null) return;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      const px = star.x + mouse.currentX * (star.z * 20);
      const py = star.y + mouse.currentY * (star.z * 20);

      const dx = mouse.x - px;
      const dy = mouse.y - py;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONSTELLATION_DISTANCE) {
        const lineAlpha = (1 - dist / CONSTELLATION_DISTANCE) * (isLight ? 0.2 : 0.35);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = isLight ? `rgba(100, 116, 139, ${lineAlpha})` : `rgba(255, 255, 255, ${lineAlpha})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();

        // Connect neighboring stars near mouse
        for (let j = i + 1; j < stars.length; j++) {
          const other = stars[j];
          const opx = other.x + mouse.currentX * (other.z * 20);
          const opy = other.y + mouse.currentY * (other.z * 20);
          const sDist = Math.sqrt((px - opx) ** 2 + (py - opy) ** 2);

          if (sDist < 75) {
            const neighborAlpha = (1 - sDist / 75) * (1 - dist / CONSTELLATION_DISTANCE) * (isLight ? 0.15 : 0.25);
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(opx, opy);
            ctx.strokeStyle = isLight ? `rgba(100, 116, 139, ${neighborAlpha})` : `rgba(220, 225, 240, ${neighborAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }
  }

  let animationFrameId = null;
  let isRunning = true;

  function render(timestamp) {
    if (!isRunning) return;

    ctx.clearRect(0, 0, width, height);

    // Smooth mouse parallax lerp
    mouse.currentX += (mouse.targetX - mouse.currentX) * 0.05;
    mouse.currentY += (mouse.targetY - mouse.currentY) * 0.05;

    // Draw & update stars
    for (let i = 0; i < stars.length; i++) {
      stars[i].update(timestamp);
      stars[i].draw();
    }

    // Draw constellation lines
    drawConstellations();

    // Spawn shooting stars every 3-6 seconds randomly
    const now = Date.now();
    if (now - lastShootingStarTime > Math.random() * 3500 + 2500) {
      shootingStars.push(new ShootingStar());
      lastShootingStarTime = now;
    }

    // Update and draw shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      s.update();
      s.draw();
      if (!s.active) {
        shootingStars.splice(i, 1);
      }
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // Event Listeners
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.targetX = (e.clientX / width - 0.5) * 2; // -1 to 1
    mouse.targetY = (e.clientY / height - 0.5) * 2;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
    mouse.targetX = 0;
    mouse.targetY = 0;
  });

  // Touch support for mobile devices
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.targetX = (mouse.x / width - 0.5) * 2;
      mouse.targetY = (mouse.y / height - 0.5) * 2;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Power save when user switches tab
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    } else {
      isRunning = true;
      lastShootingStarTime = Date.now();
      animationFrameId = requestAnimationFrame(render);
    }
  });

  // Initialize
  resize();
  animationFrameId = requestAnimationFrame(render);
})();
