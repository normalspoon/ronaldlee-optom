/* ============================================
   Ronald Lee Optometrist — Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll Reveal ---
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // --- Navbar scroll effect ---
  const nav = document.querySelector('.nav');
  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile nav toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // --- Contact form ---
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');

  if (form && statusEl) {
    const submitBtn = form.querySelector('.form-submit');
    const params = new URLSearchParams(window.location.search);

    if (params.get('contact') === 'success') {
      statusEl.className = 'form-status success';
      statusEl.textContent = 'Thank you for your message. Ronald will be in touch shortly.';
    }

    form.addEventListener('submit', () => {
      statusEl.className = 'form-status';
      statusEl.textContent = '';
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }
    });
  }

  // --- Copy email buttons ---
  document.querySelectorAll('[data-copy-email]').forEach(button => {
    button.addEventListener('click', async () => {
      const email = button.getAttribute('data-copy-email');
      if (!email) return;

      const copyWithFallback = () => {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        tempInput.remove();
      };

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          copyWithFallback();
        }

        const originalAriaLabel = button.getAttribute('aria-label') || 'Copy email address';
        const originalTitle = button.getAttribute('title') || 'Copy email address';
        button.classList.add('copied');
        button.setAttribute('aria-label', 'Email copied');
        button.setAttribute('title', 'Copied');

        window.setTimeout(() => {
          button.classList.remove('copied');
          button.setAttribute('aria-label', originalAriaLabel);
          button.setAttribute('title', originalTitle);
        }, 1600);
      } catch (error) {
        copyWithFallback();
      }
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
