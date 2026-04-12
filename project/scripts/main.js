/**
 * EduNexus — Main JavaScript
 * WDD131 W06 Project | Author: Cardeal Felisberto
 * Maputo, Mozambique
 */

'use strict';

/* ════════════════════════════════════════
   DATA
════════════════════════════════════════ */

const institutions = [
  {
    id: 'byu',
    name: 'BYU-Pathway Worldwide',
    description: 'Affordable, online, accredited university education. Enroll in PathwayConnect or degree programmes from anywhere in the world.',
    category: 'University',
    portalUrl: 'https://www.byupathway.org/',
    enrollUrl: 'https://www.byupathway.org/pathwayconnect',
    img: 'images/byu-logo.png',
    featured: true
  },
  {
    id: 'coursera',
    name: 'Coursera',
    description: 'Online courses and degrees from top universities and companies worldwide.',
    category: 'MOOC',
    portalUrl: 'https://www.coursera.org/',
    enrollUrl: 'https://www.coursera.org/',
    img: 'images/coursera-logo.png',
    featured: false
  },
  {
    id: 'edx',
    name: 'edX',
    description: 'Access thousands of courses from leading institutions. MicroMasters and Professional Certificates available.',
    category: 'MOOC',
    portalUrl: 'https://www.edx.org/',
    enrollUrl: 'https://www.edx.org/',
    img: 'images/edx-logo.jpg',
    featured: false
  },
  {
    id: 'khan',
    name: 'Khan Academy',
    description: 'Free, world-class education for anyone, anywhere. Covers math, science, computing, and more.',
    category: 'Free Learning',
    portalUrl: 'https://www.khanacademy.org/',
    enrollUrl: 'https://www.khanacademy.org/',
    img: 'images/khan-logo.png',
    featured: false
  },
  {
    id: 'mit',
    name: 'MIT OpenCourseWare',
    description: 'Free access to MIT course materials. Over 2,400 courses from one of the world\'s leading universities.',
    category: 'Free Learning',
    portalUrl: 'https://ocw.mit.edu/',
    enrollUrl: 'https://ocw.mit.edu/',
    img: 'images/mit-logo.png',
    featured: false
  },
  {
    id: 'udemy',
    name: 'Udemy',
    description: 'Learn practical skills with courses on programming, design, business, and more from expert instructors.',
    category: 'Skills',
    portalUrl: 'https://www.udemy.com/',
    enrollUrl: 'https://www.udemy.com/',
    img: 'images/udemy-logo.png',
    featured: false
  }
];

const tools = [
  { icon: '📅', name: 'Google Calendar',  desc: 'Manage your study schedule and deadlines.',                              tag: 'free', url: 'https://calendar.google.com' },
  { icon: '📝', name: 'Microsoft 365',    desc: 'Word, Excel, PowerPoint, Teams — full productivity suite.',             tag: 'paid', url: 'https://www.microsoft365.com' },
  { icon: '🗒️', name: 'Notion',           desc: 'All-in-one workspace for notes, tasks, and knowledge management.',      tag: 'free', url: 'https://www.notion.so' },
  { icon: '🔗', name: 'GitHub',           desc: 'Host and version control your code projects.',                          tag: 'free', url: 'https://github.com' },
  { icon: '🌐', name: 'DeepL Translator', desc: 'High-quality translation — great for Portuguese/English content.',      tag: 'free', url: 'https://www.deepl.com' },
  { icon: '🎥', name: 'Zoom',             desc: 'Video conferencing for online classes and group study sessions.',        tag: 'free', url: 'https://zoom.us' },
  { icon: '📖', name: 'Zotero',           desc: 'Reference manager for academic research and citations.',                 tag: 'free', url: 'https://www.zotero.org' },
  { icon: '🧠', name: 'Anki',             desc: 'Spaced repetition flashcards to memorize anything faster.',             tag: 'free', url: 'https://apps.ankiweb.net' },
  { icon: '💬', name: 'Grammarly',        desc: 'Writing assistant to improve grammar, clarity, and style in English.',  tag: 'paid', url: 'https://www.grammarly.com' },
  { icon: '☁️', name: 'Google Drive',     desc: '15 GB free cloud storage for all your documents and files.',            tag: 'free', url: 'https://drive.google.com' }
];

/* ════════════════════════════════════════
   STATE (localStorage)
════════════════════════════════════════ */
let suggestions = JSON.parse(localStorage.getItem('en_suggestions') || '[]');

/* ════════════════════════════════════════
   FUNCTIONS
════════════════════════════════════════ */

/** Show a brief toast notification */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/** Toggle mobile sidebar open/closed */
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

/** Render institution cards into #institutions-grid */
function renderInstitutions(list) {
  const container = document.getElementById('institutions-grid');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `<p style="color:var(--muted);font-family:var(--font-mono);font-size:.85rem;grid-column:1/-1;">No results found.</p>`;
    return;
  }

  container.innerHTML = list.map(inst => `
    <div class="card" data-id="${inst.id}">
      <img
        class="card__img"
        src="${inst.img}"
        alt="${inst.name} logo"
        width="200" height="120"
        loading="lazy"
        onerror="this.style.display='none'"
      >
      <span class="card__badge${inst.featured ? '' : ' free'}">${inst.category}</span>
      <h3>${inst.name}</h3>
      <p>${inst.description}</p>
      <div class="card__footer">
        <a class="card__link" href="${inst.portalUrl}" target="_blank" rel="noopener noreferrer">Visit Site →</a>
        ${inst.featured ? `<a class="btn btn-primary" href="${inst.enrollUrl}" target="_blank" rel="noopener noreferrer">Enroll →</a>` : ''}
      </div>
    </div>
  `).join('');
}

/** Filter institution cards by category */
function filterInstitutions(category) {
  const filtered = category === 'all'
    ? institutions
    : institutions.filter(i => i.category === category);

  renderInstitutions(filtered);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
  });
}

/** Render tools list into #tools-list */
function renderTools() {
  const container = document.getElementById('tools-list');
  if (!container) return;
  container.innerHTML = tools.map(tool => `
    <div class="tool-item">
      <span class="tool-icon" aria-hidden="true">${tool.icon}</span>
      <div class="tool-info">
        <h4>${tool.name}</h4>
        <p>${tool.desc}</p>
      </div>
      <span class="tool-tag ${tool.tag}">${tool.tag}</span>
      <a class="btn btn-outline" href="${tool.url}" target="_blank" rel="noopener noreferrer">Open →</a>
    </div>
  `).join('');
}

/** Handle suggestion form submission */
function handleSuggestionForm(e) {
  e.preventDefault();
  const form    = e.target;
  const nameEl  = form.querySelector('#suggest-name');
  const emailEl = form.querySelector('#suggest-email');
  const typeEl  = form.querySelector('#suggest-type');
  const urlEl   = form.querySelector('#suggest-url');
  const noteEl  = form.querySelector('#suggest-note');
  const msgEl   = form.querySelector('.form-msg');

  /* Conditional branching — validate required fields */
  if (!nameEl.value.trim() || !emailEl.value.trim() || !urlEl.value.trim()) {
    msgEl.className = 'form-msg error';
    msgEl.textContent = '❌ Please fill in all required fields.';
    return;
  }

  const suggestion = {
    id:        Date.now(),
    name:      nameEl.value.trim(),
    email:     emailEl.value.trim(),
    type:      typeEl.value,
    url:       urlEl.value.trim(),
    note:      noteEl.value.trim(),
    submitted: new Date().toISOString()
  };

  suggestions.push(suggestion);
  localStorage.setItem('en_suggestions', JSON.stringify(suggestions));

  msgEl.className = 'form-msg success';
  msgEl.textContent = `✅ Thank you, ${suggestion.name}! Your suggestion has been saved.`;

  form.reset();
  showToast('Suggestion submitted! 🎉');
  updateSuggestionCount();
}

/** Update the nav badge showing how many suggestions are saved */
function updateSuggestionCount() {
  const badge = document.getElementById('suggestion-count');
  if (!badge) return;
  if (suggestions.length > 0) {
    badge.textContent = suggestions.length;
    badge.style.display = 'inline-flex';
  } else {
    badge.style.display = 'none';
  }
}

/** Highlight the current page's nav link */
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(link => {
    const href = link.getAttribute('href') || '';
    const isActive = href === page || (page === 'index.html' && href === 'index.html') || (page === '' && href === 'index.html');
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

/** Live-search filter for institution cards */
function handleSearch(query) {
  if (!query.trim()) {
    renderInstitutions(institutions);
    return;
  }
  const q = query.toLowerCase();
  const results = institutions.filter(i =>
    i.name.toLowerCase().includes(q) ||
    i.description.toLowerCase().includes(q) ||
    i.category.toLowerCase().includes(q)
  );
  renderInstitutions(results);
}

/** Inject current year into #year elements */
function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
  
  const lastEdit = document.getElementById('last-edit');
  if (lastEdit) {
    const now = new Date();
    lastEdit.textContent = now.toLocaleString('en-GB', {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
}

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  setYear();
  setActiveNav();
  updateSuggestionCount();

  /* Mobile menu toggle */
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) menuToggle.addEventListener('click', toggleSidebar);

  /* Close sidebar on outside click */
  document.addEventListener('click', e => {
    const sidebar = document.querySelector('.sidebar');
    const toggle  = document.querySelector('.menu-toggle');
    if (sidebar && sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) && e.target !== toggle) {
      sidebar.classList.remove('open');
    }
  });

  /* Institutions page */
  if (document.getElementById('institutions-grid')) {
    renderInstitutions(institutions);
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => filterInstitutions(btn.getAttribute('data-filter')));
    });
  }

  /* Tools page */
  if (document.getElementById('tools-list')) renderTools();

  /* Suggestion form */
  const suggestForm = document.getElementById('suggestion-form');
  if (suggestForm) suggestForm.addEventListener('submit', handleSuggestionForm);

  /* Search input */
  const searchInput = document.querySelector('.topbar__search input');
  if (searchInput) {
    searchInput.addEventListener('input', e => handleSearch(e.target.value));
  }
});