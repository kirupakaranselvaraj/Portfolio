/**
 * KIRUPAKARAN S - Portfolio Interactive Features
 * - Dynamic Typewriter effect
 * - Project Database & Deep-Dive Modals
 * - Project Category Filter System
 * - Resume Viewer Modal & Print/Export
 * - Clipboard Copy with Toast Feedback
 * - Scrollspy & Dynamic Navbar
 * - Animated Stats Counter
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 0. LIGHT / DARK THEME TOGGLE CONTROLLER
  // =========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('kirupa-portfolio-theme') || 'dark';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('kirupa-portfolio-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('kirupa-portfolio-theme', 'dark');
    }
  }

  // Initialize theme on load
  applyTheme(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const nextTheme = isLight ? 'dark' : 'light';
      applyTheme(nextTheme);
      showToast(`Switched to ${nextTheme === 'light' ? '☀️ Light' : '🌙 Dark'} Theme`);
    });
  }

  // =========================================================================
  // 1. DYNAMIC TYPEWRITER EFFECT
  // =========================================================================
  const typedRoleElement = document.getElementById('typed-role');
  const roles = [
    'Frontend Developer',
    'Digital Marketing Enthusiast',
    'Computer Science Engineer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeRole() {
    if (!typedRoleElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 45;
    } else {
      typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 1800; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(typeRole, typeSpeed);
  }

  typeRole();

  // =========================================================================
  // 2. STICKY NAVBAR, SCROLLSPY & SCROLL PROGRESS
  // =========================================================================
  const navbar = document.querySelector('.navbar');
  const progressBar = document.getElementById('scroll-progress-bar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / docHeight) * 100;

    // Progress bar width
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    // Navbar background blur/darken
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scrollspy active link
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-active');
      const icon = mobileToggle.querySelector('i') || mobileToggle;
      if (navLinksContainer.classList.contains('mobile-active')) {
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      } else {
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('mobile-active');
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // =========================================================================
  // 3. PROJECT DATABASE & MODAL HANDLER
  // =========================================================================
  const projectDatabase = {
    'project-qr-assistant': {
      title: 'QR Code-Based Intelligent In-Store Shopping Assistant',
      timeline: '2025 – 2026',
      badge: 'Retail Tech',
      category: 'Full-Stack / Retail Tech',
      tech: ['React.js', 'Node.js', 'Supabase', 'QR Code API', 'HTML5', 'CSS3', 'REST API'],
      summary: 'Developing a comprehensive QR-based retail application to streamline in-store shopping workflows and assist customers in discovering products faster.',
      features: [
        'Instant QR Code camera scanning to inspect real-time product specs, pricing, and active discounts.',
        'Intelligent shelf location finder and aisle navigation guidance for large department stores.',
        'Real-time inventory and availability tracking powered by Supabase PostgreSQL backend.',
        'Responsive mobile-first interface optimized for fast in-store mobile browser usage.'
      ],
      github: 'https://github.com/kirupakaranselvaraj/Store-Shopping-Assistant',
      demo: 'https://kirupakaranportfolio.netlify.app/'
    },
    'project-url-shortener': {
      title: 'URL Shortener & Comprehensive Analytics',
      timeline: '2025',
      badge: 'Full-Stack Platform',
      category: 'Full-Stack / Analytics',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'HTML5', 'CSS3', 'Chart.js'],
      summary: 'A full-stack URL shortening service with JWT authentication, custom alias generation, and deep visitor click telemetry analytics.',
      features: [
        'Secure user registration and login with JSON Web Tokens (JWT) and encrypted password storage.',
        'Interactive analytics dashboard tracking click count, geolocation, browser type, device, and operating system details.',
        'Custom slug creation, link expiration settings, and QR code generation for shortened links.',
        'High-performance MongoDB indexing for sub-millisecond redirection lookups.'
      ],
      github: 'https://github.com/kirupakaranselvaraj/URL-shortener-Web',
      demo: 'https://kirupakaranportfolio.netlify.app/'
    },
    'project-ecommerce-hyperlocal': {
      title: 'Hyper-Local E-Commerce Platform',
      timeline: '2024 – 2025',
      badge: 'Marketplace App',
      category: 'Full-Stack / E-Commerce',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'HTML5', 'CSS3', 'REST APIs'],
      summary: 'An e-commerce marketplace platform connecting local neighborhood customers directly with nearby neighborhood vendors for accelerated delivery.',
      features: [
        'Dual-role authentication for local customers and vendor storefront managers.',
        'Dynamic product catalog with category filtering, search, and inventory management.',
        'Interactive shopping cart, order placement workflow, and order status tracking.',
        'Clean responsive UI optimized across desktop and mobile devices.'
      ],
      github: 'https://github.com/kirupakaranselvaraj/Hyper-Local-Ecommerce-Platform',
      demo: 'https://kirupakaranportfolio.netlify.app/'
    },
    'project-digital-notice': {
      title: 'Smart Campus Digital Notice Board',
      timeline: '2024 – 2025',
      badge: 'Institutional System',
      category: 'Web Application / PHP',
      tech: ['PHP', 'MySQL', 'Bootstrap 5', 'HTML5', 'CSS3', 'JavaScript'],
      summary: 'A centralized institutional web platform designed for publishing, categorizing, and archiving academic and campus announcements digitally.',
      features: [
        'Secure multi-tier administrator dashboard for authoring, editing, scheduling, and removing notices.',
        'Categorized feeds (Academic, Exams, Placements, Events, Urgent Alerts) with priority pin flags.',
        'Fully responsive UI ensuring clear readability across smartphones, tablets, and campus kiosk monitors.',
        'Relational MySQL schema for persistent storage of notices, attachments, and audit timestamps.'
      ],
      github: 'https://github.com/kirupakaranselvaraj/SmartCampus-Digital-notice-board',
      demo: 'https://kirupakaranportfolio.netlify.app/'
    },
    'project-car-rental': {
      title: 'Car Rental Management System',
      timeline: '2024',
      badge: 'Enterprise Web App',
      category: 'Web Application / PHP',
      tech: ['PHP', 'MySQL', 'Bootstrap', 'HTML5', 'CSS3', 'JavaScript'],
      summary: 'A web-based vehicle fleet and rental management system with customer self-service booking and comprehensive admin dispatch controls.',
      features: [
        'Customer registration, vehicle browsing with specs and daily rate calculators, and online reservation.',
        'Fleet inventory control, vehicle status monitoring (Available, Booked, Maintenance).',
        'Booking history logging, invoice calculation, and payment status tracking.',
        'Secure MySQL database design managing vehicle attributes, bookings, and customer profiles.'
      ],
      github: 'https://github.com/kirupakaranselvaraj/Car-Rental-System',
      demo: 'https://kirupakaranportfolio.netlify.app/'
    },
    'project-heart-disease': {
      title: 'Heart Disease Prediction System',
      timeline: '2024 – 2025',
      badge: 'Machine Learning',
      category: 'AI & Data Science',
      tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Decision Tree', 'Logistic Regression'],
      summary: 'A healthcare machine learning pipeline developed to assess and classify heart disease risk factors from clinical patient parameters.',
      features: [
        'Data preprocessing pipeline handling missing data, outlier detection, and standard feature scaling.',
        'Comprehensive Exploratory Data Analysis (EDA) using Matplotlib and Pandas correlation matrices.',
        'Implementation and comparative evaluation of Decision Tree and Logistic Regression models.',
        'Evaluation metrics analysis including precision, recall, ROC-AUC, and patient risk factor scoring.'
      ],
      github: 'https://github.com/kirupakaranselvaraj/kirupakaranselvaraj',
      demo: 'https://kirupakaranportfolio.netlify.app/'
    },
    'project-birthday-app': {
      title: 'Interactive Birthday Greeting Web Application',
      timeline: '2024',
      badge: 'Creative Frontend',
      category: 'Creative Frontend / Animations',
      tech: ['HTML5', 'CSS3 Animations', 'JavaScript ES6', 'Web Audio API', 'Responsive Design'],
      summary: 'An engaging, animated web application built to deliver personalized birthday celebrations with dynamic visual effects and multimedia synchronization.',
      features: [
        'Custom CSS keyframe animations, confetti physics simulation, and smooth transitions.',
        'Interactive DOM manipulation responding dynamically to user clicks, candle blowing, and card unwrap.',
        'Cross-browser audio and multimedia playback synchronization.',
        'Ultra-lightweight zero-dependency architecture for instantaneous page loads.'
      ],
      github: 'https://github.com/kirupakaranselvaraj/Birthday-Gift',
      demo: 'https://birthday-gift-o1o8.vercel.app'
    },
    'project-personal-portfolio': {
      title: 'Personal Portfolio Website (Monochrome Edition)',
      timeline: '2025 – 2026',
      badge: 'Portfolio & UI/UX',
      category: 'Frontend Engineering',
      tech: ['HTML5', 'CSS3 (Custom Properties)', 'Vanilla JS', 'Canvas 2D API', 'Responsive Layout'],
      summary: 'A minimalist, obsidian black-and-white portfolio website featuring high-performance canvas starfield animations and comprehensive project showcase.',
      features: [
        'Custom interactive 2D starfield engine with multi-layer depth, constellations, and shooting stars.',
        'Responsive luxury monochrome design system with glassmorphism and crisp typography.',
        'Dynamic project filter, modal inspection system, and integrated resume viewer.',
        '1-click contact copy buttons and responsive layout optimized for all screen sizes.'
      ],
      github: 'https://github.com/kirupakaranselvaraj/Portfolio',
      demo: 'https://kirupakaranportfolio.netlify.app/'
    }
  };

  const projectModalOverlay = document.getElementById('project-modal-overlay');
  const projectModalBody = document.getElementById('project-modal-body');
  const projectModalClose = document.getElementById('project-modal-close');

  function openProjectModal(projectId) {
    const data = projectDatabase[projectId];
    if (!data || !projectModalOverlay || !projectModalBody) return;

    const techChips = data.tech.map(t => `<span class="tech-chip">${t}</span>`).join('');
    const featuresList = data.features.map(f => `<li style="margin-bottom: 0.6rem; color: var(--text-secondary); line-height: 1.6;"><span style="color: var(--text-primary); margin-right: 0.5rem;">▹</span>${f}</li>`).join('');

    projectModalBody.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <span class="tag-badge" style="background: var(--text-primary); color: var(--bg-primary); font-weight: 700;">${data.badge}</span>
        <span style="font-family: var(--font-mono); font-size: 0.8125rem; color: var(--text-muted);">${data.timeline}</span>
      </div>
      <h2 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-primary);">${data.title}</h2>
      <p style="font-size: 0.875rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1.25rem;">${data.category}</p>
      
      <p style="font-size: 1.025rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 1.5rem; border-left: 2px solid var(--border-bright); padding-left: 1rem;">
        ${data.summary}
      </p>

      <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.85rem; color: var(--text-primary);">Key Technical Highlights</h3>
      <ul style="list-style: none; margin-bottom: 1.75rem;">
        ${featuresList}
      </ul>

      <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.85rem; color: var(--text-primary);">Technologies & Tools</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
        ${techChips}
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle);">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          GitHub Repository
        </a>
        <a href="${data.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          Live Preview
        </a>
      </div>
    `;

    projectModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (projectModalOverlay) {
      projectModalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Attach event listeners to project cards "View Details" buttons
  document.querySelectorAll('[data-project-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project-id');
      openProjectModal(id);
    });
  });

  if (projectModalClose) {
    projectModalClose.addEventListener('click', closeProjectModal);
  }

  if (projectModalOverlay) {
    projectModalOverlay.addEventListener('click', (e) => {
      if (e.target === projectModalOverlay) {
        closeProjectModal();
      }
    });
  }

  // =========================================================================
  // 4. PROJECT CATEGORY FILTER SYSTEM
  // =========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.5s ease-out both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 5. RESUME MODAL VIEWER
  // =========================================================================
  const resumeModalOverlay = document.getElementById('resume-modal-overlay');
  const resumeModalClose = document.getElementById('resume-modal-close');
  const openResumeButtons = document.querySelectorAll('.open-resume-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openResumeModal() {
    if (resumeModalOverlay) {
      resumeModalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModalOverlay) {
      resumeModalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openResumeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  if (resumeModalClose) {
    resumeModalClose.addEventListener('click', closeResumeModal);
  }

  if (resumeModalOverlay) {
    resumeModalOverlay.addEventListener('click', (e) => {
      if (e.target === resumeModalOverlay) {
        closeResumeModal();
      }
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Escape key closes open modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeResumeModal();
    }
  });

  // =========================================================================
  // 6. CLIPBOARD COPY WITH TOAST NOTIFICATION
  // =========================================================================
  const toast = document.getElementById('toast-notification');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.querySelector('.toast-message').textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // =========================================================================
  // 7. CONTACT FORM SUBMISSION (SILENT BACKGROUND AJAX DISPATCH - NO REDIRECT)
  // =========================================================================
  const contactForm = document.getElementById('portfolio-contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const submitBtnText = document.getElementById('submit-btn-text');
  const formEndpoint = 'https://formsubmit.co/ajax/c3d739d30c6e1e9add95accce26e7721';

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = (document.getElementById('contact-name')?.value || '').trim();
      const email = (document.getElementById('contact-email')?.value || '').trim();
      const subject = (document.getElementById('contact-subject')?.value || '').trim();
      const message = (document.getElementById('contact-message')?.value || '').trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields (Name, Email, Message).');
        return;
      }

      // Professional email heading: Msg from Portfolio: [Name] - [Subject]
      const formattedSubject = `Msg from Portfolio: ${name}${subject ? ' - ' + subject : ''}`;

      // Update button state while sending
      if (submitBtn) {
        submitBtn.disabled = true;
        if (submitBtnText) submitBtnText.textContent = 'Sending Message...';
      }

      try {
        const response = await fetch(formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: formattedSubject,
            _replyto: email,
            _template: 'table',
            _captcha: 'false',
            'Full Name': name,
            'Email Address': email,
            'Subject': subject || 'General Inquiry',
            'Direct Message': message
          })
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && (data.success === 'true' || data.success === true)) {
          showToast(`✓ Thank you ${name}! Your message has been sent to Kirupakaran's Gmail.`);
          if (submitBtnText) submitBtnText.textContent = '✓ Message Sent!';
          contactForm.reset();
        } else {
          const errorMsg = data.message || 'Could not send message. Please check back shortly or email directly.';
          showToast(`Notice: ${errorMsg}`);
          if (submitBtnText) submitBtnText.textContent = 'Send Message';
        }

      } catch (err) {
        console.warn('FormSubmit background response:', err);
        showToast(`Could not connect. Please email kirupakaran.s151205@gmail.com directly.`);
        if (submitBtnText) submitBtnText.textContent = 'Send Message';
      } finally {
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            if (submitBtnText) submitBtnText.textContent = 'Send Message';
          }
        }, 4000);
      }
    });
  }

  // =========================================================================
  // 8. STATS COUNTER ANIMATION
  // =========================================================================
  const statValues = document.querySelectorAll('.stat-value[data-target]');
  let statsCounted = false;

  function animateStats() {
    statValues.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const prefix = stat.getAttribute('data-prefix') || '';
      const suffix = stat.getAttribute('data-suffix') || '';
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = `${prefix}${current}${suffix}`;
      }, 35);
    });
  }

  const statsSection = document.querySelector('.hero-stats-grid');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
          statsCounted = true;
          animateStats();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
