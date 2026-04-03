/* ============================================================
   EduNexus — Site Plan JavaScript
   WDD131 W05 Project
   ============================================================ */

// ── Year Auto-Update ──────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Smooth Section Reveal on Scroll ──────────────────────────
const sections = document.querySelectorAll('.sp-section');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach((section) => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(24px)';
  section.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  revealObserver.observe(section);
});

// ── Active Section Highlight in Header ───────────────────────
const sectionIds = ['site-name', 'site-purpose', 'scenarios', 'colors', 'typography', 'wireframes'];

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const tag = document.querySelector(`[data-nav="${entry.target.id}"]`);
        if (tag) {
          document.querySelectorAll('[data-nav]').forEach(t => t.classList.remove('active-nav'));
          tag.classList.add('active-nav');
        }
      }
    });
  },
  { rootMargin: '-40% 0px -40% 0px' }
);

sectionIds.forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});