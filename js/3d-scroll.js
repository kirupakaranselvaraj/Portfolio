document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn("GSAP or ScrollTrigger not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const section = document.getElementById("apple-scroll-sequence");
  if (!section) return;

  // The main timeline that controls the sequence
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=800",  // Extremely tight scroll distance to eliminate "extra space"
      scrub: 1,      // Smooth scrubbing effect
      pin: true,     // Pin the section
      anticipatePin: 1
    }
  });

  // Set initial text position so they are perfectly centered
  gsap.set(".seq-text-item", { 
    xPercent: -50, 
    yPercent: -50, 
    y: 50, // Starts a bit lower for the slide-up effect
    opacity: 0 
  });

  // 1. Initial Orb Growth
  tl.to(".glow-orb", {
    scale: 4,
    opacity: 0.8,
    duration: 1
  }, 0);

  // 2. Text Sequence 1 ("Visionary")
  tl.to("#seq-text-1", { opacity: 1, y: 0, duration: 0.5 }, 0.2) // Fade in
    .to("#seq-text-1", { opacity: 0, y: -50, duration: 0.5 }, 1.5); // Fade out

  // 3. Orb color shift & scale for phase 2
  tl.to(".glow-orb", {
    background: "radial-gradient(circle, rgba(14,165,233,0.8) 0%, rgba(99,102,241,0.4) 40%, rgba(0,0,0,0) 70%)",
    scale: 6,
    duration: 1
  }, 1.5);

  // 4. Text Sequence 2 ("Performant")
  tl.to("#seq-text-2", { opacity: 1, y: 0, duration: 0.5 }, 1.8) // Fade in slightly earlier
    .to("#seq-text-2", { opacity: 0, y: -50, duration: 0.5 }, 3.1);

  // 5. Orb color shift & scale for phase 3 (Hero name)
  tl.to(".glow-orb", {
    background: "radial-gradient(circle, rgba(236,72,153,0.8) 0%, rgba(244,63,94,0.4) 40%, rgba(0,0,0,0) 70%)",
    scale: 8,
    duration: 1
  }, 3.1);

  // 6. Text Sequence 3 ("Kirupakaran S.")
  // We DO NOT fade this out, so it stays on screen as the section unpins and scrolls away naturally
  tl.to("#seq-text-3", { opacity: 1, y: 0, duration: 0.5 }, 3.4);
});
