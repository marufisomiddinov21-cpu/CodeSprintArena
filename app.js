// ===== NearOne — Main Application Controller =====

let currentPage = 'landing';
let currentChat = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderLanding();
    setupNavigation();
    startAIBehavior();
});

// ===== THEME =====
function initTheme() {
    const saved = localStorage.getItem('nearone-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
}
function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('nearone-theme', next);
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = next === 'dark' ? '🌙' : '☀️';
}

// ===== NAVIGATION =====
function setupNavigation() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-page]');
        if (link) {
            e.preventDefault();
            navigateTo(link.dataset.page);
        }
        if (e.target.closest('#theme-toggle')) toggleTheme();
        if (e.target.closest('.modal-overlay')) {
            if (e.target.classList.contains('modal-overlay')) closeModal();
        }
    });
}

function navigateTo(page) {
    currentPage = page;
    if (page === 'landing') { renderLanding(); return; }
    renderApp(page);
    document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.page === page));
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.toggle('active', l.dataset.page === page));
    window.scrollTo(0, 0);
}

// ===== TOAST =====
function showToast(msg, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) { container = document.createElement('div'); container.className = 'toast-container'; document.body.appendChild(container); }
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    container.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(30px)'; setTimeout(() => t.remove(), 300); }, 3000);
}

// ===== RENDER LANDING =====
function renderLanding() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    document.getElementById('app').innerHTML = `
    <nav class="navbar">
      <div class="nav-logo">
        <svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="16" stroke="url(#g1)" stroke-width="2.5"/><circle cx="18" cy="18" r="8" fill="url(#g1)" opacity="0.3"/><circle cx="18" cy="18" r="4" fill="url(#g1)"/><defs><linearGradient id="g1" x1="0" y1="0" x2="36" y2="36"><stop stop-color="#7C3AED"/><stop offset="1" stop-color="#06B6D4"/></linearGradient></defs></svg>
        <span>NearOne</span>
      </div>
      <div class="nav-right">
        <div class="theme-toggle" id="theme-toggle"><span id="theme-icon">${theme === 'dark' ? '🌙' : '☀️'}</span></div>
        <button class="btn btn-secondary btn-sm" onclick="openModal('login')">Войти</button>
        <button class="btn btn-primary btn-sm" onclick="openModal('register')">Регистрация</button>
      </div>
    </nav>
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1>Найди людей для <span>реальной жизни</span></h1>
        <p>Друзья, игры, прогулки, спорт, общение, события и новые знакомства в твоём городе. Будь собой. Найди своих людей.</p>
        <div class="hero-buttons">
          <button class="btn btn-primary" data-page="feed">🚀 Начать</button>
          <button class="btn btn-secondary" data-page="people">👥 Смотреть людей рядом</button>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><div class="num">12,847</div><div class="label">Пользователей</div></div>
          <div class="hero-stat"><div class="num">3,200+</div><div class="label">Встреч прошло</div></div>
          <div class="hero-stat"><div class="num">24</div><div class="label">Категории</div></div>
        </div>
      </div>
    </section>
    <section class="section">
      <h2 class="section-title">Найди своих людей</h2>
      <p class="section-sub">Выбери категорию и начни знакомиться</p>
      <div class="categories-grid">${CATEGORIES.map(c => `<div class="category-card" data-page="feed"><div class="icon">${c.icon}</div><div class="name">${c.name}</div></div>`).join('')}</div>
    </section>
    <section class="section" style="max-width:900px">
      <h2 class="section-title" style="text-align:center">Реальные люди уже здесь</h2>
      <p class="section-sub" style="text-align:center">Познакомься с ними сегодня</p>
      <div class="people-grid">${AI_USERS.map(u => `
        <div class="card person-card">
          <img src="${u.avatar}" alt="${u.name}">
          <div class="p-name">${u.name}</div>
          <div class="p-city">📍 ${u.city}, ${u.age} лет</div>
          <div class="p-interests">${u.interests.slice(0, 3).map(i => `<span class="tag">${i}</span>`).join('')}</div>
          <div class="person-card-actions"><button class="btn btn-primary btn-sm" data-page="feed">Написать</button></div>
        </div>`).join('')}</div>
    </section>
    <section class="cta-section">
      <h2 style="font-size:2rem;margin-bottom:16px">Готов найти <span style="background:linear-gradient(135deg,#7C3AED,#06B6D4);-webkit-background-clip:text;-webkit-text-fill-color:transparent">своих людей</span>?</h2>
      <p style="color:var(--text-secondary);margin-bottom:32px">Присоединяйся к тысячам реальных людей уже сегодня</p>
      <button class="btn btn-primary" data-page="feed">Присоединиться бесплатно</button>
    </section>
    <footer class="footer">© 2026 NearOne. Все права защищены. Сделано для настоящих людей 💜</footer>
  `;
}

// ===== RENDER APP SHELL =====
function renderApp(page) {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    const u = CURRENT_USER;
    document.getElementById('app').innerHTML = `
    <nav class="navbar">
      <div class="nav-logo" style="cursor:pointer" data-page="landing">
        <svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="16" stroke="url(#g1)" stroke-width="2.5"/><circle cx="18" cy="18" r="8" fill="url(#g1)" opacity="0.3"/><circle cx="18" cy="18" r="4" fill="url(#g1)"/><defs><linearGradient id="g1" x1="0" y1="0" x2="36" y2="36"><stop stop-color="#7C3AED"/><stop offset="1" stop-color="#06B6D4"/></linearGradient></defs></svg>
        <span>NearOne</span>
      </div>
      <div class="nav-links">
        <a class="nav-link ${page === 'feed' ? 'active' : ''}" data-page="feed">📰 Лента</a>
        <a class="nav-link ${page === 'people' ? 'active' : ''}" data-page="people">👥 Люди</a>
        <a class="nav-link ${page === 'events' ? 'active' : ''}" data-page="events">📅 События</a>
        <a class="nav-link ${page === 'messages' ? 'active' : ''}" data-page="messages" style="position:relative">💬 Чат<span class="badge-dot"></span></a>
        <a class="nav-link ${page === 'find' ? 'active' : ''}" data-page="find">🔍 Найти</a>
      </div>
      <div class="nav-right">
        <div class="theme-toggle" id="theme-toggle"><span id="theme-icon">${theme === 'dark' ? '🌙' : '☀️'}</span></div>
        <img class="nav-avatar" src="${u.avatar}" alt="${u.name}" data-page="profile" style="cursor:pointer">
      </div>
    </nav>
    <div class="app-container">
      <aside class="sidebar">
        <div class="sidebar-link ${page === 'feed' ? 'active' : ''}" data-page="feed">📰 Лента</div>
        <div class="sidebar-link ${page === 'people' ? 'active' : ''}" data-page="people">👥 Люди рядом</div>
        <div class="sidebar-link ${page === 'messages' ? 'active' : ''}" data-page="messages">💬 Сообщения</div>
        <div class="sidebar-link ${page === 'events' ? 'active' : ''}" data-page="events">📅 События</div>
        <div class="sidebar-link ${page === 'find' ? 'active' : ''}" data-page="find">🔍 Найти компанию</div>
        <div class="sidebar-link ${page === 'categories' ? 'active' : ''}" data-page="categories">📂 Категории</div>
        <div class="sidebar-section">Личное</div>
        <div class="sidebar-link ${page === 'profile' ? 'active' : ''}" data-page="profile">👤 Мой профиль</div>
        <div class="sidebar-link ${page === 'support' ? 'active' : ''}" data-page="support">❤️ Поддержка</div>
        <div class="sidebar-link ${page === 'settings' ? 'active' : ''}" data-page="settings">⚙️ Настройки</div>
        <div class="sidebar-link ${page === 'premium' ? 'active' : ''}" data-page="premium">⭐ Premium</div>
      </aside>
      <main class="main-content" id="page-content"></main>
    </div>
  `;
    const pages = { feed: renderFeed, profile: renderProfile, messages: renderMessages, events: renderEvents, people: renderPeople, find: renderFind, support: renderSupport, categories: renderCategories, settings: renderSettings, premium: renderPremium };
    if (pages[page]) pages[page]();
}

// ===== FEED =====
function renderFeed() {
    const c = document.getElementById('page-content');
    const u = CURRENT_USER;
    c.innerHTML = `<div class="feed-container">
    <div class="stories-bar">
      <div class="story-item" onclick="showToast('Добавьте свою историю!','info')">
        <div class="story-ring" style="background:var(--bg-card);border:2px dashed var(--accent)"><div style="width:100%;height:100%;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;background:var(--bg-primary)">+</div></div>
        <div class="name">Добавить</div>
      </div>
      ${AI_USERS.filter(u => u.status === 'online').map(u => `<div class="story-item" onclick="showToast('История ${u.name}','info')"><div class="story-ring"><img src="${u.avatar}" alt="${u.name}"></div><div class="name">${u.name.split(' ')[0]}</div></div>`).join('')}
    </div>
    <div class="create-post card">
      <div class="create-post-inner">
        <img src="${u.avatar}" alt="You">
        <input class="create-post-input" placeholder="Что нового, ${u.name.split(' ')[0]}?" id="new-post-input">
      </div>
      <div class="create-post-actions">
        <span class="post-action-btn" onclick="showToast('Фото прикреплено','success')">📷 Фото</span>
        <span class="post-action-btn" onclick="showToast('Видео прикреплено','success')">🎥 Видео</span>
        <span class="post-action-btn" onclick="navigateTo('events')">📅 Событие</span>
        <button class="btn btn-primary btn-sm" onclick="createPost()" style="margin-left:auto">Опубликовать</button>
      </div>
    </div>
    <div id="posts-list">${renderPosts()}</div>
  </div>`;
}

function renderPosts() {
    return POSTS.map(p => {
        const user = getUserById(p.userId);
        return `<div class="card post-card" id="post-${p.id}">
      <div class="post-header">
        <img class="post-avatar" src="${user.avatar}" alt="${user.name}" onclick="viewProfile('${user.id}')">
        <div class="post-user-info">
          <div class="post-username" onclick="viewProfile('${user.id}')">${user.name}</div>
          <div class="post-meta"><span>${user.city}</span><span class="dot"></span><span>${p.time}</span></div>
        </div>
        <button class="btn-icon" onclick="showToast('Меню поста','info')">⋯</button>
      </div>
      <div class="post-body">${p.text}</div>
      ${p.image ? `<img class="post-image" src="${p.image}" alt="post">` : ''}
      <div class="post-actions-bar">
        <button class="post-act" onclick="likePost('${p.id}',this)" id="like-${p.id}">❤️ <span>${p.likes}</span></button>
        <button class="post-act" onclick="toggleComments('${p.id}')">💬 <span>${p.comments.length}</span></button>
        <button class="post-act" onclick="showToast('Пост отправлен!','success')">↗️ <span>Поделиться</span></button>
        <button class="post-act" style="margin-left:auto" onclick="showToast('Сохранено!','success')">🔖</button>
      </div>
      <div class="post-comments" id="comments-${p.id}" style="display:none">
        ${p.comments.map(cm => { const cu = getUserById(cm.userId); return `<div class="comment"><img src="${cu.avatar}" alt="${cu.name}"><div class="comment-body"><span class="cname">${cu.name}</span><div class="ctext">${cm.text}</div></div></div>`; }).join('')}
      </div>
      <div class="comment-input-row">
        <img src="${CURRENT_USER.avatar}" alt="me">
        <input placeholder="Написать комментарий..." onkeydown="if(event.key==='Enter')addComment('${p.id}',this)">
      </div>
    </div>`;
    }).join('');
}

function createPost() {
    const input = document.getElementById('new-post-input');
    if (!input || !input.value.trim()) { showToast('Напишите что-нибудь!', 'error'); return; }
    POSTS.unshift({ id: 'p' + Date.now(), userId: 'me', text: input.value, image: null, time: 'Только что', likes: 0, comments: [] });
    input.value = '';
    document.getElementById('posts-list').innerHTML = renderPosts();
    showToast('Пост опубликован! 🎉', 'success');
}

function likePost(id, btn) {
    const post = POSTS.find(p => p.id === id);
    if (!post) return;
    if (btn.classList.contains('liked')) { post.likes--; btn.classList.remove('liked'); }
    else { post.likes++; btn.classList.add('liked'); }
    btn.querySelector('span').textContent = post.likes;
}

function toggleComments(id) {
    const el = document.getElementById('comments-' + id);
    if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function addComment(postId, input) {
    if (!input.value.trim()) return;
    const post = POSTS.find(p => p.id === postId);
    if (!post) return;
    post.comments.push({ userId: 'me', text: input.value });
    input.value = '';
    document.getElementById('posts-list').innerHTML = renderPosts();
    showToast('Комментарий добавлен', 'success');
}

// ===== PROFILE =====
function renderProfile(userId) {
    const u = userId ? getUserById(userId) : CURRENT_USER;
    const c = document.getElementById('page-content');
    const isMe = u.id === 'me';
    c.innerHTML = `
    <div class="feed-container">
      <div class="profile-header">
        <img class="profile-avatar-lg" src="${u.avatar}" alt="${u.name}">
        <div class="profile-name">${u.name}</div>
        <div class="profile-status">${u.bio}</div>
        <div class="online-indicator"><span class="online-dot"></span> ${u.status === 'online' ? 'Онлайн' : 'Оффлайн'}</div>
        <div class="profile-tags">
          ${u.titles.map(t => `<span class="tag">${t}</span>`).join('')}
          <span class="tag cyan">${u.levelName}</span>
        </div>
        <div class="profile-stats-row">
          <div class="stat"><div class="val">${u.reputation.friendly + u.reputation.fun}</div><div class="lbl">Друзья</div></div>
          <div class="stat"><div class="val">${u.xp}</div><div class="lbl">XP</div></div>
          <div class="stat"><div class="val">${u.level}</div><div class="lbl">Уровень</div></div>
        </div>
        <div class="level-bar">
          <div class="level-bar-header"><span>Уровень ${u.level}: ${u.levelName}</span><span>${u.xp}/${u.xpMax} XP</span></div>
          <div class="level-bar-track"><div class="level-bar-fill" style="width:${(u.xp / u.xpMax) * 100}%"></div></div>
        </div>
        ${!isMe ? `<div style="margin-top:20px;display:flex;gap:10px;justify-content:center"><button class="btn btn-primary btn-sm" onclick="openChatWith('${u.id}')">💬 Написать</button><button class="btn btn-secondary btn-sm" onclick="showToast('Запрос отправлен!','success')">🤝 Добавить</button></div>` : ''}
      </div>
      <div class="card" style="padding:20px;margin-bottom:16px">
        <h3 style="margin-bottom:12px">📍 Информация</h3>
        <p style="color:var(--text-secondary);font-size:0.9rem">🏙 ${u.city}, ${u.country} · 🎂 ${u.age} лет · ${u.gender}</p>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-top:8px">Интересы: ${u.interests.join(', ')}</p>
        <div class="rep-badges">${u.repBadges.map(b => `<span class="rep-badge positive">✓ ${b}</span>`).join('')}</div>
      </div>
      <div class="card" style="padding:20px;margin-bottom:16px">
        <h3 style="margin-bottom:4px">🏆 Достижения</h3>
        <div class="achievements-grid">${u.achievements.map(a => `<div class="achievement"><div class="ach-icon">${a.icon}</div><div><div class="ach-name">${a.name}</div><div class="ach-desc">${a.desc}</div></div></div>`).join('')}</div>
      </div>
    </div>`;
}

function viewProfile(userId) {
    if (userId === 'me') { navigateTo('profile'); return; }
    renderApp('profile');
    renderProfile(userId);
}

// ===== MESSAGES =====
function renderMessages() {
    const c = document.getElementById('page-content');
    c.innerHTML = `<div class="messages-container">
    <div class="chats-list">
      <div class="chats-search"><input placeholder="🔍 Поиск чатов..."></div>
      ${AI_USERS.map(u => {
        const msgs = MESSAGES_DATA[u.id] || [];
        const last = msgs[msgs.length - 1];
        return `<div class="chat-item ${currentChat === u.id ? 'active' : ''}" onclick="openChat('${u.id}')">
          <img src="${u.avatar}" alt="${u.name}">
          <div class="chat-item-info">
            <div class="chat-item-name">${u.name}</div>
            <div class="chat-item-last">${last ? last.text.substring(0, 35) + '...' : ''}</div>
          </div>
          <div style="text-align:right">
            <div class="chat-item-time">${last ? last.time : ''}</div>
            ${u.status === 'online' ? '<div class="chat-item-unread">●</div>' : ''}
          </div>
        </div>`;
    }).join('')}
    </div>
    <div class="chat-view" id="chat-view">
      <div style="flex:1;display:flex;align-items:center;justify-content:center;color:var(--text-secondary)">
        <div style="text-align:center"><div style="font-size:3rem;margin-bottom:16px">💬</div><div>Выберите чат для начала общения</div></div>
      </div>
    </div>
  </div>`;
    if (currentChat) openChat(currentChat);
}

function openChat(userId) {
    currentChat = userId;
    const u = getUserById(userId);
    const msgs = MESSAGES_DATA[userId] || [];
    const chatView = document.getElementById('chat-view');
    chatView.innerHTML = `
    <div class="chat-header-bar">
      <img src="${u.avatar}" alt="${u.name}">
      <div><div class="ch-name">${u.name}</div><div class="ch-status">${u.status === 'online' ? '● онлайн' : 'оффлайн'}</div></div>
      <div style="margin-left:auto;display:flex;gap:8px">
        <button class="btn-icon" onclick="showToast('Звонки скоро!','info')">📞</button>
        <button class="btn-icon" onclick="showToast('Видеозвонки скоро!','info')">📹</button>
      </div>
    </div>
    <div class="chat-messages" id="chat-msgs">
      ${msgs.map(m => `<div class="msg ${m.from === 'me' ? 'sent' : 'received'}"><div>${m.text}</div><div class="msg-time">${m.time}</div></div>`).join('')}
    </div>
    <div class="chat-input-bar">
      <button class="btn-icon" onclick="showToast('Стикеры скоро!','info')">😊</button>
      <button class="btn-icon" onclick="showToast('Фото отправлено!','success')">📷</button>
      <input placeholder="Написать сообщение..." id="chat-input" onkeydown="if(event.key==='Enter')sendMessage('${userId}')">
      <button class="btn-icon" onclick="showToast('Голосовое сообщение','info')">🎤</button>
      <button class="chat-send-btn" onclick="sendMessage('${userId}')">➤</button>
    </div>`;
    document.querySelectorAll('.chat-item').forEach(ci => ci.classList.toggle('active', ci.onclick.toString().includes(userId)));
    const msgsEl = document.getElementById('chat-msgs');
    if (msgsEl) msgsEl.scrollTop = msgsEl.scrollHeight;
}

function openChatWith(userId) {
    currentChat = userId;
    navigateTo('messages');
}

function sendMessage(userId) {
    const input = document.getElementById('chat-input');
    if (!input || !input.value.trim()) return;
    const text = input.value;
    if (!MESSAGES_DATA[userId]) MESSAGES_DATA[userId] = [];
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    MESSAGES_DATA[userId].push({ from: 'me', text, time });
    input.value = '';
    openChat(userId);
    // AI reply
    setTimeout(() => {
        const replies = [
            'Отлично! 😊', 'Согласен!', 'Давай! Когда?', 'Круто! 🔥', 'Хорошо, напишу позже', 'Буду ждать!', 'Это классно!', 'Прив! 👋', 'Окей! 👍', 'Интересно!'
        ];
        MESSAGES_DATA[userId].push({ from: userId, text: replies[Math.floor(Math.random() * replies.length)], time });
        if (currentChat === userId) openChat(userId);
        showToast(`${getUserById(userId).name} ответил(а)`, 'info');
    }, 1500 + Math.random() * 2000);
}

// ===== EVENTS =====
function renderEvents() {
    const c = document.getElementById('page-content');
    c.innerHTML = `<div style="max-width:900px;margin:0 auto">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
      <h2>📅 События</h2>
      <button class="btn btn-primary btn-sm" onclick="openModal('create-event')">+ Создать событие</button>
    </div>
    <div class="events-grid">${EVENTS.map(e => {
        const org = getUserById(e.organizer);
        return `<div class="card event-card">
        ${e.image ? `<img src="${e.image}" alt="${e.title}">` : `<div style="height:180px;background:linear-gradient(135deg,rgba(124,58,237,0.3),rgba(6,182,212,0.2));display:flex;align-items:center;justify-content:center;font-size:3rem">📅</div>`}
        <div class="event-card-body">
          <div class="event-card-title">${e.title}</div>
          <div class="event-card-meta">
            <span>📅 ${e.date}</span><span>📍 ${e.location}</span><span>👥 ${e.spots - e.spotsLeft}/${e.spots}</span>
          </div>
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px">${e.description}</p>
          <div class="event-participants">${e.participants.map(pid => { const pu = getUserById(pid); return `<img src="${pu.avatar}" alt="${pu.name}" title="${pu.name}">`; }).join('')}</div>
          <div class="event-join"><button class="btn btn-primary btn-sm" style="width:100%" onclick="joinEvent('${e.id}')">Присоединиться (${e.spotsLeft} мест)</button></div>
        </div>
      </div>`;
    }).join('')}</div>
  </div>`;
}

function joinEvent(id) {
    const e = EVENTS.find(ev => ev.id === id);
    if (e && e.spotsLeft > 0) {
        if (!e.participants.includes('me')) { e.participants.push('me'); e.spotsLeft--; }
        showToast('Вы присоединились к событию! 🎉', 'success');
        renderEvents();
    }
}

// ===== PEOPLE NEARBY =====
function renderPeople() {
    const c = document.getElementById('page-content');
    c.innerHTML = `<div style="max-width:1000px;margin:0 auto">
    <h2 style="margin-bottom:8px">👥 Люди рядом</h2>
    <p style="color:var(--text-secondary);margin-bottom:24px">Найди интересных людей в своём городе</p>
    <div style="display:flex;gap:10px;margin-bottom:24px;flex-wrap:wrap">
      <input placeholder="🔍 Поиск по имени, городу, интересам..." style="flex:1;min-width:200px;padding:12px 20px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-full);color:var(--text);font-size:0.9rem">
      <select style="padding:12px 16px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text)"><option>Все города</option><option>Москва</option><option>СПб</option><option>Ташкент</option><option>Казань</option></select>
      <select style="padding:12px 16px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text)"><option>Все возрасты</option><option>18-21</option><option>22-25</option><option>26-30</option></select>
    </div>
    <div class="people-grid">${AI_USERS.map(u => `
      <div class="card person-card">
        <div style="position:relative;display:inline-block">
          <img src="${u.avatar}" alt="${u.name}">
          ${u.status === 'online' ? '<div style="position:absolute;bottom:4px;right:calc(50% - 46px);width:14px;height:14px;border-radius:50%;background:var(--success);border:3px solid var(--bg-card)"></div>' : ''}
        </div>
        <div class="p-name">${u.name}</div>
        <div class="p-city">📍 ${u.city} · ${u.age} лет</div>
        <div style="font-size:0.8rem;color:var(--accent);margin-top:4px">Уровень: ${u.levelName}</div>
        <div class="p-interests">${u.interests.slice(0, 4).map(i => `<span class="tag">${i}</span>`).join('')}</div>
        <div class="person-card-actions">
          <button class="btn btn-primary btn-sm" onclick="openChatWith('${u.id}')">💬 Написать</button>
          <button class="btn btn-secondary btn-sm" onclick="viewProfile('${u.id}')">Профиль</button>
        </div>
      </div>`).join('')}</div>
  </div>`;
}

// ===== FIND COMPANY =====
function renderFind() {
    const c = document.getElementById('page-content');
    c.innerHTML = `<div style="max-width:700px;margin:0 auto">
    <h2 style="margin-bottom:8px">🔍 Найти компанию</h2>
    <p style="color:var(--text-secondary);margin-bottom:24px">Напиши, что хочешь делать, и найди подходящих людей</p>
    <div class="card" style="padding:20px;margin-bottom:24px">
      <input style="width:100%;padding:14px 20px;background:var(--bg-primary);border:1px solid var(--border);border-radius:var(--radius-full);color:var(--text);font-size:1rem" placeholder="Например: Хочу поиграть футбол..." id="find-input">
      <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
        ${['Футбол', 'Зал', 'Кино', 'Прогулки', 'Python', 'Roblox'].map(t => `<span class="interest-chip" onclick="document.getElementById('find-input').value='Хочу ${t.toLowerCase()}';">${t}</span>`).join('')}
      </div>
      <button class="btn btn-primary btn-sm" style="margin-top:12px" onclick="showToast('Поиск запущен!','success')">Найти людей</button>
    </div>
    ${FIND_COMPANY.map(fc => {
        const u = getUserById(fc.userId); return `
      <div class="card find-company-card">
        <div class="fc-header">
          <img src="${u.avatar}" alt="${u.name}">
          <div><div style="font-weight:600">${u.name}</div><div style="font-size:0.8rem;color:var(--text-secondary)">${u.city}</div></div>
          <span class="tag" style="margin-left:auto">${fc.category}</span>
        </div>
        <div class="fc-text">${fc.text}</div>
        <div class="fc-details">${fc.details}</div>
        <div style="margin-top:12px;display:flex;gap:8px">
          <button class="btn btn-primary btn-sm" onclick="openChatWith('${u.id}')">Откликнуться</button>
          <button class="btn btn-secondary btn-sm" onclick="showToast('Детали открыты','info')">Подробнее</button>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

// ===== SUPPORT =====
function renderSupport() {
    const c = document.getElementById('page-content');
    c.innerHTML = `<div style="max-width:700px;margin:0 auto">
    <h2 style="margin-bottom:8px">❤️ Поддержка</h2>
    <p style="color:var(--text-secondary);margin-bottom:24px">Место где можно поделиться и получить поддержку</p>
    <div class="card" style="padding:20px;margin-bottom:24px">
      <textarea style="width:100%;padding:14px;background:var(--bg-primary);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text);font-size:0.95rem;min-height:80px;resize:vertical" placeholder="Поделитесь своими мыслями..." id="support-input"></textarea>
      <button class="btn btn-primary btn-sm" style="margin-top:12px" onclick="createSupportPost()">Опубликовать</button>
    </div>
    <div id="support-list">${renderSupportPosts()}</div>
  </div>`;
}

function renderSupportPosts() {
    return SUPPORT_POSTS.map((sp, i) => {
        const u = getUserById(sp.userId); return `
    <div class="card support-post">
      <div class="sp-header"><img src="${u.avatar}" alt="${u.name}"><div><div style="font-weight:600">${u.name}</div><div style="font-size:0.8rem;color:var(--text-secondary)">${u.city}</div></div></div>
      <div class="sp-text">${sp.text}</div>
      <div class="sp-reactions">
        <span class="sp-react-btn" onclick="this.style.borderColor='var(--accent)';this.style.color='var(--accent)'">🤗 Обнять (${sp.hugs})</span>
        <span class="sp-react-btn" onclick="this.style.borderColor='var(--accent)';this.style.color='var(--accent)'">💬 Ответить (${sp.replies})</span>
        <span class="sp-react-btn" onclick="showToast('Спасибо за поддержку!','success')">❤️ Поддержать</span>
      </div>
    </div>`;
    }).join('');
}

function createSupportPost() {
    const input = document.getElementById('support-input');
    if (!input || !input.value.trim()) { showToast('Напишите что-нибудь', 'error'); return; }
    SUPPORT_POSTS.unshift({ userId: 'me', text: input.value, replies: 0, hugs: 0 });
    input.value = '';
    document.getElementById('support-list').innerHTML = renderSupportPosts();
    showToast('Пост опубликован. Мы с тобой 💜', 'success');
}

// ===== CATEGORIES =====
function renderCategories() {
    const c = document.getElementById('page-content');
    c.innerHTML = `<div style="max-width:900px;margin:0 auto">
    <h2 style="margin-bottom:8px">📂 Категории</h2>
    <p style="color:var(--text-secondary);margin-bottom:24px">Выбери интерес и найди единомышленников</p>
    <div class="categories-grid">${CATEGORIES.map(cat => `<div class="category-card" onclick="showToast('Категория: ${cat.name}','info')"><div class="icon">${cat.icon}</div><div class="name">${cat.name}</div></div>`).join('')}</div>
  </div>`;
}

// ===== SETTINGS =====
function renderSettings() {
    const c = document.getElementById('page-content');
    c.innerHTML = `<div style="max-width:600px;margin:0 auto">
    <h2 style="margin-bottom:24px">⚙️ Настройки</h2>
    <div class="card settings-section">
      <h3 style="margin-bottom:16px">Аккаунт</h3>
      <div class="settings-row"><div><div class="sr-label">Имя</div><div class="sr-desc">${CURRENT_USER.name}</div></div><button class="btn btn-secondary btn-sm" onclick="showToast('Редактирование','info')">Изменить</button></div>
      <div class="settings-row"><div><div class="sr-label">Город</div><div class="sr-desc">${CURRENT_USER.city}</div></div><button class="btn btn-secondary btn-sm" onclick="showToast('Редактирование','info')">Изменить</button></div>
      <div class="settings-row"><div><div class="sr-label">Телефон</div><div class="sr-desc">+998 ** *** ** **</div></div><button class="btn btn-secondary btn-sm" onclick="showToast('Редактирование','info')">Изменить</button></div>
    </div>
    <div class="card settings-section">
      <h3 style="margin-bottom:16px">Уведомления</h3>
      <div class="settings-row"><div><div class="sr-label">Push-уведомления</div><div class="sr-desc">Сообщения, лайки, события</div></div><div class="toggle-switch on" onclick="this.classList.toggle('on')"></div></div>
      <div class="settings-row"><div><div class="sr-label">Звук уведомлений</div><div class="sr-desc">Звуковые оповещения</div></div><div class="toggle-switch on" onclick="this.classList.toggle('on')"></div></div>
      <div class="settings-row"><div><div class="sr-label">Email рассылка</div><div class="sr-desc">Новости и обновления</div></div><div class="toggle-switch" onclick="this.classList.toggle('on')"></div></div>
    </div>
    <div class="card settings-section">
      <h3 style="margin-bottom:16px">Приватность</h3>
      <div class="settings-row"><div><div class="sr-label">Показывать онлайн</div><div class="sr-desc">Другие видят ваш статус</div></div><div class="toggle-switch on" onclick="this.classList.toggle('on')"></div></div>
      <div class="settings-row"><div><div class="sr-label">Показывать на карте</div><div class="sr-desc">Примерная зона вашего местоположения</div></div><div class="toggle-switch" onclick="this.classList.toggle('on')"></div></div>
    </div>
    <div class="card settings-section">
      <h3 style="margin-bottom:16px">Тема</h3>
      <div class="settings-row"><div><div class="sr-label">Тёмная тема</div><div class="sr-desc">Переключить внешний вид</div></div><div class="toggle-switch ${document.documentElement.getAttribute('data-theme') === 'dark' ? 'on' : ''}" onclick="toggleTheme();this.classList.toggle('on')"></div></div>
    </div>
    <div class="card settings-section">
      <h3 style="margin-bottom:16px;color:var(--error)">Опасная зона</h3>
      <div class="settings-row"><div><div class="sr-label">Выйти из аккаунта</div></div><button class="btn btn-secondary btn-sm" style="border-color:var(--error);color:var(--error)" onclick="navigateTo('landing');showToast('Вы вышли из аккаунта','info')">Выйти</button></div>
      <div class="settings-row"><div><div class="sr-label">Удалить аккаунт</div></div><button class="btn btn-secondary btn-sm" style="border-color:var(--error);color:var(--error)" onclick="showToast('Аккаунт не может быть удалён в демо-версии','error')">Удалить</button></div>
    </div>
  </div>`;
}

// ===== PREMIUM =====
function renderPremium() {
    const c = document.getElementById('page-content');
    c.innerHTML = `<div style="max-width:800px;margin:0 auto">
    <div class="premium-hero">
      <div style="font-size:2.5rem;margin-bottom:12px">⭐</div>
      <h2><span>NearOne</span> Premium</h2>
      <p style="color:var(--text-secondary);margin-top:8px">Улучши свой профиль и получи больше возможностей</p>
      <button class="btn btn-primary" style="margin-top:24px" onclick="showToast('Premium активирован! 🎉','success')">Попробовать бесплатно — 7 дней</button>
    </div>
    <div class="premium-features">
      ${[
            { icon: '✨', title: 'Красивый профиль', desc: 'Glow эффекты, анимации и кастомный фон' },
            { icon: '🎨', title: 'Уникальные титулы', desc: 'Эксклюзивные титулы и значки' },
            { icon: '📸', title: 'Больше историй', desc: 'До 50 историй в день вместо 10' },
            { icon: '🔝', title: 'Приоритет в поиске', desc: 'Ваш профиль выше в результатах' },
            { icon: '💜', title: 'Фиолетовая галочка', desc: 'Подтверждённый premium аккаунт' },
            { icon: '🚀', title: 'Без ограничений', desc: 'Безлимитные сообщения и лайки' }
        ].map(f => `<div class="card premium-feature"><div class="pf-icon">${f.icon}</div><div><div class="pf-title">${f.title}</div><div class="pf-desc">${f.desc}</div></div></div>`).join('')}
    </div>
  </div>`;
}

// ===== MODALS =====
function openModal(type) {
    let html = '';
    if (type === 'login') {
        html = `<div class="modal-header"><h3>Вход в NearOne</h3><div class="modal-close" onclick="closeModal()">✕</div></div>
      <div class="modal-body">
        <div class="form-group"><label>Телефон или email</label><input type="text" placeholder="+7 999 123 45 67"></div>
        <div class="form-group"><label>Пароль</label><input type="password" placeholder="Введите пароль"></div>
        <button class="btn btn-primary" style="width:100%" onclick="closeModal();navigateTo('feed');showToast('Добро пожаловать, ${CURRENT_USER.name}! 👋','success')">Войти</button>
        <p style="text-align:center;margin-top:16px;color:var(--text-secondary);font-size:0.85rem">Нет аккаунта? <span style="color:var(--accent);cursor:pointer" onclick="closeModal();openModal('register')">Зарегистрироваться</span></p>
      </div>`;
    } else if (type === 'register') {
        html = `<div class="modal-header"><h3>Регистрация</h3><div class="modal-close" onclick="closeModal()">✕</div></div>
      <div class="modal-body">
        <div class="step-indicator"><div class="step-dot active"></div><div class="step-dot"></div><div class="step-dot"></div></div>
        <div class="form-group"><label>Имя</label><input placeholder="Ваше имя"></div>
        <div class="form-group"><label>Возраст</label><input type="number" placeholder="18+" min="16" max="99"></div>
        <div class="form-group"><label>Пол</label><select><option>Мужской</option><option>Женский</option></select></div>
        <div class="form-group"><label>Страна</label><input placeholder="Россия, Узбекистан..."></div>
        <div class="form-group"><label>Город</label><input placeholder="Москва, Ташкент..."></div>
        <div class="form-group"><label>Телефон</label><input placeholder="+7 999 123 45 67"></div>
        <div class="form-group"><label>О себе</label><textarea placeholder="Расскажите коротко о себе..."></textarea></div>
        <div class="form-group"><label>Интересы</label><div class="interests-select">${CATEGORIES.slice(0, 12).map(c => `<span class="interest-chip" onclick="this.classList.toggle('selected')">${c.icon} ${c.name}</span>`).join('')}</div></div>
        <div class="form-group"><label>Что ищете?</label><select><option>Друзей</option><option>Компанию для активности</option><option>Единомышленников</option><option>Общение</option></select></div>
        <button class="btn btn-primary" style="width:100%" onclick="closeModal();navigateTo('feed');showToast('Аккаунт создан! Добро пожаловать! 🎉','success')">Создать аккаунт</button>
      </div>`;
    } else if (type === 'create-event') {
        html = `<div class="modal-header"><h3>Создать событие</h3><div class="modal-close" onclick="closeModal()">✕</div></div>
      <div class="modal-body">
        <div class="form-group"><label>Название</label><input placeholder="Футбольный матч, прогулка..." id="ev-title"></div>
        <div class="form-group"><label>Дата и время</label><input type="text" placeholder="20 мая, 18:00" id="ev-date"></div>
        <div class="form-group"><label>Место</label><input placeholder="Парк, кафе, стадион..." id="ev-loc"></div>
        <div class="form-group"><label>Количество мест</label><input type="number" placeholder="10" id="ev-spots" min="2" max="100"></div>
        <div class="form-group"><label>Описание</label><textarea placeholder="Расскажите о событии..." id="ev-desc"></textarea></div>
        <button class="btn btn-primary" style="width:100%" onclick="createEvent()">Создать событие</button>
      </div>`;
    }
    let overlay = document.querySelector('.modal-overlay');
    if (!overlay) { overlay = document.createElement('div'); overlay.className = 'modal-overlay'; document.body.appendChild(overlay); }
    overlay.innerHTML = `<div class="modal">${html}</div>`;
    overlay.classList.add('show');
}

function closeModal() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) overlay.classList.remove('show');
}

function createEvent() {
    const title = document.getElementById('ev-title')?.value;
    if (!title) { showToast('Введите название!', 'error'); return; }
    const spots = parseInt(document.getElementById('ev-spots')?.value) || 10;
    EVENTS.unshift({
        id: 'e' + Date.now(), title,
        image: null, organizer: 'me',
        date: document.getElementById('ev-date')?.value || 'Скоро',
        location: document.getElementById('ev-loc')?.value || 'Не указано',
        spots, spotsLeft: spots - 1,
        description: document.getElementById('ev-desc')?.value || '',
        participants: ['me']
    });
    closeModal();
    renderEvents();
    showToast('Событие создано! 🎉', 'success');
}

// ===== AI AUTO-BEHAVIOR =====
function startAIBehavior() {
    // AI creates posts periodically
    setInterval(() => {
        const aiTexts = [
            { userId: 'ai_alex', text: 'Только что забил гол с центра поля! Кто ещё хочет поиграть? ⚽🔥' },
            { userId: 'ai_maria', text: 'Посмотрели "Начало" Нолана. 10/10! Кто хочет на следующий фильм? 🍿' },
            { userId: 'ai_daniel', text: 'Новый рекорд в зале — 120кг жим! Спорт — это жизнь 💪🏋️' },
            { userId: 'ai_sofia', text: 'Выучила новую песню на гитаре! Кому сыграть? 🎸✨' },
            { userId: 'ai_alex', text: 'Кто-нибудь играет в Valorant? Ищу команду на вечер 🎮' },
            { userId: 'ai_maria', text: 'Вечерняя прогулка по питерским мостам — лучшее лекарство от стресса 🌉' },
            { userId: 'ai_sofia', text: 'Сегодня волонтёрили в приюте. Столько добрых эмоций! ❤️🐕' },
            { userId: 'ai_daniel', text: 'Кто хочет обсудить стартап-идеи за кофе? ☕🚀' }
        ];
        const rnd = aiTexts[Math.floor(Math.random() * aiTexts.length)];
        POSTS.unshift({ id: 'p' + Date.now(), userId: rnd.userId, text: rnd.text, image: null, time: 'Только что', likes: Math.floor(Math.random() * 20), comments: [] });
        if (currentPage === 'feed') {
            const list = document.getElementById('posts-list');
            if (list) { list.innerHTML = renderPosts(); showToast(`${getUserById(rnd.userId).name} опубликовал(а) пост`, 'info'); }
        }
    }, 30000 + Math.random() * 30000);
}
