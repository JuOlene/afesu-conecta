/**
 * AFESU CONECTA — CONTROLE PRINCIPAL, SESSÃO & NAVEGAÇÃO DINÂMICA
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 0. Gerenciador Global de Tema (Modo Claro / Modo Escuro)
  // =========================================================================
  const currentTheme = localStorage.getItem('afesu_theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);

  const initThemeToggle = () => {
    const themeToggleBtns = document.querySelectorAll('.btn-theme-toggle, #btnThemeToggle');
    themeToggleBtns.forEach(btn => {
      btn.onclick = () => {
        const active = document.documentElement.getAttribute('data-theme');
        const nextTheme = active === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('afesu_theme', nextTheme);
      };
    });
  };

  initThemeToggle();

  // =========================================================================
  // 1. Controle de Sessão e Autenticação
  // =========================================================================
  const getAuthUser = () => {
    try {
      const data = localStorage.getItem('afesu_auth_user');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('afesu_auth_user');
    window.location.href = 'index.html';
  };

  const authUser = getAuthUser();
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  // Proteção de rotas internas para visitantes
  const protectedPages = ['oportunidades.html', 'perfil.html', 'curriculo.html', 'patrocinador.html'];
  if (protectedPages.includes(currentPath) && !authUser) {
    // Redireciona com parâmetro de retorno amigável
    window.location.href = `login.html?redirect=${encodeURIComponent(currentPath)}&access=required`;
    return;
  }

  // =========================================================================
  // 2. Construção Dinâmica da Barra de Navegação (Visitante vs Logado)
  // =========================================================================
  const navMenu = document.getElementById('navMenu');
  const headerActions = document.querySelector('.header-actions');

  const renderNavigation = () => {
    if (!navMenu || !headerActions) return;

    // --- CENÁRIO A: VISITANTE (NÃO LOGADO) ---
    if (!authUser) {
      navMenu.setAttribute('aria-label', 'Navegação Institucional');
      navMenu.innerHTML = `
        <a href="index.html#inicio" class="nav-link active">Início</a>
        <a href="index.html#quem-somos" class="nav-link">Quem Somos / Sobre</a>
        <a href="index.html#como-funciona" class="nav-link">Como Funciona</a>
        <a href="index.html#parceiros" class="nav-link">Parcerias</a>

        <div class="mobile-menu-actions">
          <a href="criar-perfil.html" class="btn btn-primary btn-sm">✨ Criar Perfil</a>
          <a href="login.html" class="btn btn-outline btn-sm">🔐 Entrar / Login</a>
        </div>
      `;

      headerActions.innerHTML = `
        <a href="criar-perfil.html" class="btn btn-primary btn-sm nav-desktop-btn" id="btnHeaderSignup">
          Criar Perfil
        </a>
        <a href="login.html" class="btn btn-outline btn-sm nav-desktop-btn" id="btnHeaderLogin">
          Entrar
        </a>

        <!-- Botão Toggle de Modo Escuro (Atrás do Criar Perfil e Entrar) -->
        <button type="button" class="btn-theme-toggle" id="btnThemeToggle" aria-label="Alternar modo escuro" title="Alternar tema claro/escuro">
          <span class="theme-icon-sun">☀️</span>
          <span class="theme-icon-moon">🌙</span>
        </button>

        <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu de navegação" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      `;
    }
    // --- CENÁRIO B: ALUNA LOGADA ---
    else if (authUser.role === 'student') {
      const initials = (authUser.name || 'Aluna').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
      const firstName = (authUser.name || 'Aluna').split(' ')[0];

      navMenu.setAttribute('aria-label', 'Navegação da Aluna');
      navMenu.innerHTML = `
        <a href="index.html" class="nav-link">Início</a>
        <a href="oportunidades.html" class="nav-link">Oportunidades</a>
        <a href="oportunidades.html?cat=CURSO" class="nav-link">Cursos</a>
        <a href="perfil.html" class="nav-link">Meu Perfil</a>
        <a href="curriculo.html" class="nav-link">Meu Currículo</a>
        <a href="oportunidades.html?view=candidaturas" class="nav-link">Minhas Candidaturas</a>
        <a href="patrocinador.html" class="nav-link">Área Patrocinador</a>

        <div class="mobile-menu-actions">
          <a href="perfil.html" class="btn btn-primary btn-sm">👤 Ver Meu Perfil</a>
          <a href="curriculo.html" class="btn btn-secondary btn-sm">📄 Ver Meu Currículo</a>
          <a href="patrocinador.html" class="btn btn-outline btn-sm">🏢 Área Patrocinador</a>
          <button type="button" class="btn btn-outline btn-sm" id="btnMobileLogout">🚪 Sair da Conta</button>
        </div>
      `;

      headerActions.innerHTML = `
        <a href="perfil.html" class="user-session-badge nav-desktop-btn" title="Acessar meu perfil">
          <span class="user-session-avatar">${initials}</span>
          <span>${firstName}</span>
        </a>

        <button type="button" class="btn btn-outline btn-sm nav-desktop-btn" id="btnHeaderLogout" title="Sair da conta">
          Sair
        </button>

        <!-- Botão Toggle de Modo Escuro -->
        <button type="button" class="btn-theme-toggle" id="btnThemeToggle" aria-label="Alternar modo escuro" title="Alternar tema claro/escuro">
          <span class="theme-icon-sun">☀️</span>
          <span class="theme-icon-moon">🌙</span>
        </button>

        <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu de navegação" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      `;
    }
    // --- CENÁRIO C: PATROCINADOR / EMPRESA LOGADA ---
    else if (authUser.role === 'sponsor') {
      navMenu.setAttribute('aria-label', 'Navegação do Patrocinador');
      navMenu.innerHTML = `
        <a href="patrocinador.html#sponsorDashboardWrap" class="nav-link active">Dashboard</a>
        <a href="patrocinador.html#minhasOportunidadesSection" class="nav-link">Minhas Oportunidades</a>
        <a href="patrocinador.html#candidaturasSection" class="nav-link">Candidaturas e Talentos</a>
        <a href="javascript:void(0)" class="nav-link" id="navPubOppTrigger">+ Publicar Vaga</a>
        <a href="index.html" class="nav-link">Portal Aluna</a>

        <div class="mobile-menu-actions">
          <button type="button" class="btn btn-primary btn-sm" id="btnMobilePubOpp">✨ + Publicar Oportunidade</button>
          <a href="index.html" class="btn btn-outline btn-sm">🏛️ Portal Aluna / Institucional</a>
          <button type="button" class="btn btn-outline btn-sm" id="btnMobileLogout">🚪 Sair da Conta</button>
        </div>
      `;

      headerActions.innerHTML = `
        <button type="button" class="btn btn-primary btn-sm nav-desktop-btn" id="btnDesktopPubOpp">
          + Publicar Vaga
        </button>

        <button type="button" class="btn btn-outline btn-sm nav-desktop-btn" id="btnHeaderLogout" title="Sair da conta">
          Sair
        </button>

        <!-- Botão Toggle de Modo Escuro -->
        <button type="button" class="btn-theme-toggle" id="btnThemeToggle" aria-label="Alternar modo escuro" title="Alternar tema claro/escuro">
          <span class="theme-icon-sun">☀️</span>
          <span class="theme-icon-moon">🌙</span>
        </button>

        <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu de navegação" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      `;
    }

    // Reinicializar eventos de tema e logout
    initThemeToggle();

    document.querySelectorAll('#btnHeaderLogout, #btnMobileLogout').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
      });
    });

    // Gatilho de publicação de vaga no patrocinador
    document.querySelectorAll('#navPubOppTrigger, #btnDesktopPubOpp, #btnMobilePubOpp').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalBtn = document.getElementById('btnOpenPubModal');
        if (modalBtn) modalBtn.click();
      });
    });
  };

  renderNavigation();

  // =========================================================================
  // 3. Menu Drawer Mobile & Backdrop Overlay
  // =========================================================================
  let navBackdrop = document.querySelector('.nav-backdrop');
  if (!navBackdrop) {
    navBackdrop = document.createElement('div');
    navBackdrop.className = 'nav-backdrop';
    navBackdrop.setAttribute('aria-hidden', 'true');
    document.body.appendChild(navBackdrop);
  }

  // Inserir cabeçalho no drawer mobile
  if (navMenu && !navMenu.querySelector('.mobile-drawer-header')) {
    const drawerHeader = document.createElement('div');
    drawerHeader.className = 'mobile-drawer-header';
    drawerHeader.innerHTML = `
      <a href="index.html" class="mobile-drawer-brand">
        <img src="assets/images/logo.png" alt="AFESU Logo" style="width: 32px; height: 32px; object-fit: contain;">
        <div class="brand-logo-text">
          <span class="brand-name" style="font-size: 1.05rem;">AFESU</span>
          <span class="brand-tagline" style="font-size: 0.7rem;">CONECTA</span>
        </div>
      </a>
      <button type="button" class="mobile-drawer-close" aria-label="Fechar menu" title="Fechar menu">✕</button>
    `;
    navMenu.insertBefore(drawerHeader, navMenu.firstChild);
  }

  const closeMenu = () => {
    const menuToggle = document.getElementById('menuToggle');
    if (navMenu) navMenu.classList.remove('active');
    if (menuToggle) {
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    const menuToggle = document.getElementById('menuToggle');
    if (navMenu) navMenu.classList.add('active');
    if (menuToggle) {
      menuToggle.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
    }
    if (navBackdrop) navBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const toggleMenu = () => {
    if (navMenu && navMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  document.addEventListener('click', (e) => {
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle && (e.target === menuToggle || menuToggle.contains(e.target))) {
      e.stopPropagation();
      toggleMenu();
    } else if (e.target === navBackdrop) {
      closeMenu();
    } else if (e.target.closest('.mobile-drawer-close')) {
      closeMenu();
    } else if (e.target.classList.contains('nav-link') && window.innerWidth <= 1080) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080 && navMenu && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // =========================================================================
  // 4. Destaque Automático do Link Ativo (URLs e Scroll Spy em Âncoras)
  // =========================================================================
  const highlightCurrentLinks = () => {
    const currentSearch = window.location.search;
    const fullCurrent = currentPath + currentSearch;
    const allLinks = document.querySelectorAll('.nav-link');

    let matched = false;

    allLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('javascript')) return;

      if (href === fullCurrent || (currentPath === 'index.html' && href.startsWith('#inicio'))) {
        allLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        matched = true;
      }
    });

    if (!matched) {
      allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('javascript')) return;
        const linkPath = href.split('?')[0].split('/').pop();
        if (linkPath === currentPath) {
          allLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }
  };

  highlightCurrentLinks();

  // Scroll spy exclusivo para páginas com navegação por âncoras na mesma página
  const hashNavLinks = document.querySelectorAll('.nav-link[href^="#"], .nav-link[href*="#"]');
  if (hashNavLinks.length > 0) {
    const handleHashScroll = () => {
      const scrollY = window.pageYOffset;
      hashNavLinks.forEach(link => {
        const hash = link.getAttribute('href').split('#')[1];
        if (!hash) return;
        const targetSection = document.getElementById(hash);
        if (targetSection) {
          const sectionTop = targetSection.offsetTop - 120;
          const sectionHeight = targetSection.offsetHeight;
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            hashNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    };

    window.addEventListener('scroll', handleHashScroll, { passive: true });
  }

  // =========================================================================
  // 5. Controle de Modais Institucionais (Auth Modal)
  // =========================================================================
  const authModal = document.getElementById('authModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const tabStudent = document.getElementById('tabStudent');
  const tabPartner = document.getElementById('tabPartner');
  const authForm = document.getElementById('authForm');
  const formSubmitBtn = document.getElementById('formSubmitBtn');

  let currentAuthMode = 'signup';

  const openAuthModal = (mode = 'signup') => {
    currentAuthMode = mode;
    if (mode === 'signup') {
      if (modalTitle) modalTitle.textContent = 'Crie seu perfil no AFESU Conecta';
      if (modalSubtitle) modalSubtitle.textContent = 'Dê o próximo passo rumo ao seu crescimento profissional.';
      if (formSubmitBtn) formSubmitBtn.textContent = 'Criar meu perfil';
    } else {
      if (modalTitle) modalTitle.textContent = 'Acessar sua conta';
      if (modalSubtitle) modalSubtitle.textContent = 'Bem-vinda de volta à sua plataforma de oportunidades.';
      if (formSubmitBtn) formSubmitBtn.textContent = 'Entrar na plataforma';
    }

    if (authModal) {
      authModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeAuthModal = () => {
    if (authModal) {
      authModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('[data-open-modal="signup"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openAuthModal('signup');
    });
  });

  document.querySelectorAll('[data-open-modal="login"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openAuthModal('login');
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeAuthModal);
  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) closeAuthModal();
    });
  }

  if (tabStudent && tabPartner) {
    tabStudent.addEventListener('click', () => {
      tabStudent.classList.add('active');
      tabPartner.classList.remove('active');
    });

    tabPartner.addEventListener('click', () => {
      tabPartner.classList.add('active');
      tabStudent.classList.remove('active');
    });
  }

  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputName = document.getElementById('inputName');
      const inputEmail = document.getElementById('inputEmail');
      const isPartner = tabPartner && tabPartner.classList.contains('active');

      const userRole = isPartner ? 'sponsor' : 'student';
      const userName = inputName ? inputName.value.trim() : (isPartner ? 'Empresa Parceira' : 'Mariana Silva');
      const userEmail = inputEmail ? inputEmail.value.trim() : 'contato@afesu.org.br';

      localStorage.setItem('afesu_auth_user', JSON.stringify({
        role: userRole,
        name: userName,
        email: userEmail,
        loginTime: new Date().toISOString()
      }));

      if (formSubmitBtn) {
        formSubmitBtn.textContent = 'Preparando seu acesso...';
        formSubmitBtn.style.opacity = '0.8';
      }

      setTimeout(() => {
        closeAuthModal();
        if (isPartner) {
          window.location.href = 'patrocinador.html';
        } else {
          window.location.href = 'perfil.html';
        }
      }, 500);
    });
  }
});
