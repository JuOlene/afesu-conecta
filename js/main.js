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

  // Controle rigoroso de isolamento de papéis (Role-Based Access Control)
  const isSponsorPage = currentPath === 'patrocinador.html' || currentPath.includes('patrocinador');
  const isStudentPage = ['perfil.html', 'curriculo.html', 'criar-perfil.html'].includes(currentPath);

  // 1. Se um Patrocinador tentar acessar páginas exclusivas da Aluna
  if (authUser && authUser.role === 'sponsor' && isStudentPage) {
    alert('Acesso Restrito: Esta área é exclusiva para Alunas da AFESU. Redirecionando para o Painel da Empresa.');
    window.location.href = 'patrocinador.html';
    return;
  }

  // 2. Se uma Aluna tentar acessar a Área Corporativa do Patrocinador
  if (authUser && authUser.role !== 'sponsor' && isSponsorPage) {
    alert('Acesso Restrito: A Área da Empresa é exclusiva para Patrocinadores e Parceiros corporativos.');
    window.location.href = 'perfil.html';
    return;
  }

  // 3. Proteção de páginas privadas de Alunas para visitantes não autenticados
  const protectedPages = ['perfil.html', 'curriculo.html'];
  if (protectedPages.includes(currentPath) && !authUser) {
    window.location.href = `login.html?redirect=${encodeURIComponent(currentPath)}&access=required`;
    return;
  }

  // =========================================================================
  // 2. Construção Dinâmica da Barra de Navegação (Isolamento Total de Papéis)
  // =========================================================================
  const navMenu = document.getElementById('navMenu');
  const headerActions = document.querySelector('.header-actions');

  const renderNavigation = () => {
    if (!navMenu || !headerActions) return;

    const isCandidaturas = window.location.search.toLowerCase().includes('candidaturas');
    const isStudentLoggedIn = authUser && authUser.role !== 'sponsor';
    const isSponsorLoggedIn = (authUser && authUser.role === 'sponsor') || isSponsorPage;

    // --- CENÁRIO 1: ÁREA DA EMPRESA / PATROCINADOR (Isolada da Aluna) ---
    if (isSponsorLoggedIn) {
      const companyName = authUser && authUser.name ? authUser.name : 'Empresa Parceira';
      navMenu.setAttribute('aria-label', 'Navegação da Empresa');
      navMenu.innerHTML = `
        <a href="#geral" class="nav-link sponsor-tab-link active" data-tab="tabGeral">
          <span>📊</span>
          <span>Visão Geral</span>
        </a>
        <a href="#talentos" class="nav-link sponsor-tab-link" data-tab="tabTalentos">
          <span>👥</span>
          <span>Banco de Talentos</span>
        </a>

        <!-- Ações no Drawer Mobile -->
        <div class="mobile-menu-actions">
          <button type="button" class="btn btn-primary btn-sm" onclick="document.getElementById('btnOpenPubModal') && document.getElementById('btnOpenPubModal').click()" style="width: 100%; justify-content: center; margin-top: 0.5rem;">
            ✨ + Adicionar Vaga
          </button>
          <button type="button" class="btn btn-outline btn-sm btn-drawer-logout" style="width: 100%; justify-content: center; color: var(--color-pink-600); border-color: var(--color-pink-200); margin-top: 0.5rem;">🚪 Sair do Painel</button>
        </div>
      `;


      headerActions.innerHTML = `
        <div class="sponsor-session-chip nav-desktop-btn" style="background: var(--color-purple-50); border: 1px solid var(--color-purple-200); color: var(--color-purple-800); font-weight: 700; font-size: 0.8rem; padding: 0.4rem 0.8rem; border-radius: var(--radius-full); display: inline-flex; align-items: center; gap: 0.4rem;">
          <span style="width: 7px; height: 7px; border-radius: 50%; background: #10B981; display: inline-block;"></span>
          <span>${companyName}</span>
        </div>
        <button type="button" class="btn btn-primary btn-sm nav-desktop-btn" id="btnOpenPubModal" style="box-shadow: 0 4px 12px rgba(147, 51, 234, 0.25);">
          <span>+ Adicionar Vaga</span>
        </button>
        <button type="button" class="btn btn-outline btn-sm nav-desktop-btn" id="btnHeaderLogout" title="Encerrar sessão da empresa" style="color: var(--color-pink-600); border-color: var(--color-pink-200);">
          🚪 Sair
        </button>

        <!-- Botão Toggle de Modo Escuro -->
        <button type="button" class="btn-theme-toggle" id="btnThemeToggle" aria-label="Alternar modo escuro" title="Alternar tema claro/escuro">
          <span class="theme-icon-sun">☀️</span>
          <span class="theme-icon-moon">🌙</span>
        </button>

        <!-- Botão Hamburger Mobile -->
        <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu de navegação" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      `;
    }
    // --- CENÁRIO 2: ÁREA DA ALUNA (Isolada da Empresa) ---
    else if (isStudentLoggedIn) {
      const studentFirstName = authUser.name ? authUser.name.split(' ')[0] : 'Minha Conta';
      navMenu.setAttribute('aria-label', 'Navegação da Aluna');
      navMenu.innerHTML = `
        <a href="perfil.html" class="nav-link ${currentPath === 'perfil.html' ? 'active' : ''}">
          <span>👤</span>
          <span>Meu Perfil</span>
        </a>
        <a href="curriculo.html" class="nav-link ${currentPath === 'curriculo.html' ? 'active' : ''}">
          <span>📄</span>
          <span>Currículo Digital</span>
        </a>
        
        <!-- Menu Suspenso de Oportunidades -->
        <div class="nav-dropdown" id="oppNavDropdown">
          <button type="button" class="nav-link nav-dropdown-toggle ${currentPath === 'oportunidades.html' ? 'active' : ''}" id="btnOppDropdown" aria-expanded="false" aria-haspopup="true">
            <span>💼 Oportunidades</span>
            <svg class="nav-dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <div class="nav-dropdown-menu" id="oppDropdownMenu">
            <a href="oportunidades.html?cat=ALL" class="nav-dropdown-item" data-nav-cat="ALL">
              <div class="nav-dropdown-item-icon icon-bg-all">✨</div>
              <div class="nav-dropdown-item-info">
                <span class="nav-dropdown-item-title">Todas as Oportunidades</span>
                <span class="nav-dropdown-item-sub">Mural completo</span>
              </div>
            </a>
            <a href="oportunidades.html?cat=EMPREGO" class="nav-dropdown-item" data-nav-cat="EMPREGO">
              <div class="nav-dropdown-item-icon icon-bg-purple">💼</div>
              <div class="nav-dropdown-item-info">
                <span class="nav-dropdown-item-title">Vagas de Emprego</span>
                <span class="nav-dropdown-item-sub">CLT e contratos formais</span>
              </div>
              <span class="nav-dropdown-tag">Vagas</span>
            </a>
            <a href="oportunidades.html?cat=ESTÁGIO" class="nav-dropdown-item" data-nav-cat="ESTÁGIO">
              <div class="nav-dropdown-item-icon icon-bg-pink">🚀</div>
              <div class="nav-dropdown-item-info">
                <span class="nav-dropdown-item-title">Programas de Estágio</span>
                <span class="nav-dropdown-item-sub">Início de carreira & mentoria</span>
              </div>
              <span class="nav-dropdown-tag" style="background: var(--color-pink-100); color: var(--color-pink-800);">Estágios</span>
            </a>
            <a href="oportunidades.html?cat=CURSO" class="nav-dropdown-item" data-nav-cat="CURSO">
              <div class="nav-dropdown-item-icon icon-bg-orange">🎓</div>
              <div class="nav-dropdown-item-info">
                <span class="nav-dropdown-item-title">Cursos & Capacitações</span>
                <span class="nav-dropdown-item-sub">Workshops com certificado</span>
              </div>
              <span class="nav-dropdown-tag" style="background: var(--color-orange-100); color: var(--color-orange-800);">Cursos</span>
            </a>
          </div>
        </div>

        <a href="candidaturas.html" class="nav-link ${currentPath === 'candidaturas.html' ? 'active' : ''}">
          <span>📋</span>
          <span>Minhas Candidaturas</span>
        </a>

        <!-- Ações no Drawer Mobile -->
        <div class="mobile-menu-actions">
          <button type="button" class="btn btn-outline btn-sm btn-drawer-logout" style="width: 100%; justify-content: center; color: var(--color-pink-600); border-color: var(--color-pink-200); margin-top: 0.5rem;">🚪 Sair da Conta</button>
        </div>
      `;


      headerActions.innerHTML = `
        <a href="perfil.html" class="btn btn-secondary btn-sm nav-desktop-btn" title="Meu Perfil">
          👤 ${studentFirstName}
        </a>
        <button type="button" class="btn btn-outline btn-sm nav-desktop-btn" id="btnHeaderLogout" title="Encerrar sessão">
          🚪 Sair
        </button>

        <!-- Botão Toggle de Modo Escuro -->
        <button type="button" class="btn-theme-toggle" id="btnThemeToggle" aria-label="Alternar modo escuro" title="Alternar tema claro/escuro">
          <span class="theme-icon-sun">☀️</span>
          <span class="theme-icon-moon">🌙</span>
        </button>

        <!-- Botão Hamburger Mobile -->
        <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu de navegação" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      `;
    }
    // --- CENÁRIO 3: INÍCIO / INSTITUCIONAL (Antes do Cadastro ou Página Inicial) ---
    else {
      navMenu.setAttribute('aria-label', 'Navegação Principal');
      navMenu.innerHTML = `
        <a href="${currentPath === 'index.html' ? '#sobre' : 'index.html#sobre'}" class="nav-link">
          <span>ℹ️</span>
          <span>Sobre</span>
        </a>
        <a href="${currentPath === 'index.html' ? '#como-funciona' : 'index.html#como-funciona'}" class="nav-link">
          <span>⚙️</span>
          <span>Como funciona</span>
        </a>
        
        <!-- Menu Suspenso de Oportunidades -->
        <div class="nav-dropdown" id="oppNavDropdown">
          <button type="button" class="nav-link nav-dropdown-toggle ${currentPath === 'oportunidades.html' ? 'active' : ''}" id="btnOppDropdown" aria-expanded="false" aria-haspopup="true">
            <span>💼 Oportunidades</span>
            <svg class="nav-dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <div class="nav-dropdown-menu" id="oppDropdownMenu">
            <a href="oportunidades.html?cat=ALL" class="nav-dropdown-item" data-nav-cat="ALL">
              <div class="nav-dropdown-item-icon icon-bg-all">✨</div>
              <div class="nav-dropdown-item-info">
                <span class="nav-dropdown-item-title">Todas as Oportunidades</span>
                <span class="nav-dropdown-item-sub">Mural completo</span>
              </div>
            </a>
            <a href="oportunidades.html?cat=EMPREGO" class="nav-dropdown-item" data-nav-cat="EMPREGO">
              <div class="nav-dropdown-item-icon icon-bg-purple">💼</div>
              <div class="nav-dropdown-item-info">
                <span class="nav-dropdown-item-title">Vagas de Emprego</span>
                <span class="nav-dropdown-item-sub">CLT e contratos formais</span>
              </div>
              <span class="nav-dropdown-tag">Vagas</span>
            </a>
            <a href="oportunidades.html?cat=ESTÁGIO" class="nav-dropdown-item" data-nav-cat="ESTÁGIO">
              <div class="nav-dropdown-item-icon icon-bg-pink">🚀</div>
              <div class="nav-dropdown-item-info">
                <span class="nav-dropdown-item-title">Programas de Estágio</span>
                <span class="nav-dropdown-item-sub">Início de carreira & mentoria</span>
              </div>
              <span class="nav-dropdown-tag" style="background: var(--color-pink-100); color: var(--color-pink-800);">Estágios</span>
            </a>
            <a href="oportunidades.html?cat=CURSO" class="nav-dropdown-item" data-nav-cat="CURSO">
              <div class="nav-dropdown-item-icon icon-bg-orange">🎓</div>
              <div class="nav-dropdown-item-info">
                <span class="nav-dropdown-item-title">Cursos & Capacitações</span>
                <span class="nav-dropdown-item-sub">Workshops com certificado</span>
              </div>
              <span class="nav-dropdown-tag" style="background: var(--color-orange-100); color: var(--color-orange-800);">Cursos</span>
            </a>
          </div>
        </div>

        <a href="${currentPath === 'index.html' ? '#parceiros' : 'index.html#parceiros'}" class="nav-link">
          <span>🤝</span>
          <span>Conexões com parceiros</span>
        </a>

        <!-- Ações no Drawer Mobile -->
        <div class="mobile-menu-actions">
          ${isStudentLoggedIn ? `
            <a href="perfil.html" class="btn btn-secondary btn-sm" style="width: 100%; justify-content: center;">👤 Meu Perfil</a>
            <button type="button" class="btn btn-outline btn-sm btn-drawer-logout" style="width: 100%; justify-content: center; color: var(--color-pink-600); border-color: var(--color-pink-200);">🚪 Sair da Conta</button>
          ` : `
            <a href="criar-perfil.html" class="btn btn-primary btn-sm" style="width: 100%; justify-content: center;">✨ Cadastro de Alunas</a>
          `}
          <a href="patrocinador.html" class="nav-portal-empresa" style="width: 100%; justify-content: center;">🏢 Área da Empresa</a>
        </div>
      `;



      headerActions.innerHTML = `
        ${isStudentLoggedIn ? `
          <a href="perfil.html" class="btn btn-secondary btn-sm nav-desktop-btn" title="Meu Perfil">
            👤 ${authUser.name ? authUser.name.split(' ')[0] : 'Minha Conta'}
          </a>
          <button type="button" class="btn btn-outline btn-sm nav-desktop-btn" id="btnHeaderLogout" title="Encerrar sessão">
            🚪 Sair
          </button>
        ` : `
          <a href="criar-perfil.html" class="btn btn-primary btn-sm nav-desktop-btn" id="btnHeaderSignup">
            ✨ Cadastro de Alunas
          </a>
        `}
        <a href="patrocinador.html" class="nav-portal-empresa nav-desktop-btn" id="btnHeaderSponsor">
          🏢 Área da Empresa
        </a>

        <!-- Botão Toggle de Modo Escuro -->
        <button type="button" class="btn-theme-toggle" id="btnThemeToggle" aria-label="Alternar modo escuro" title="Alternar tema claro/escuro">
          <span class="theme-icon-sun">☀️</span>
          <span class="theme-icon-moon">🌙</span>
        </button>

        <!-- Botão Hamburger Mobile -->
        <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu de navegação" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      `;
    }

    // Vincular ação de logout
    const logoutBtns = document.querySelectorAll('#btnHeaderLogout, .btn-drawer-logout');
    logoutBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        logout();
      };
    });

    // Vincular ação de abrir modal de publicação se existir
    const btnPub = document.getElementById('btnOpenPubModal');
    if (btnPub) {
      btnPub.onclick = (e) => {
        e.preventDefault();
        const pubModal = document.getElementById('pubModal');
        if (pubModal) pubModal.classList.add('active');
      };
    }

    // Reinicializar eventos de tema
    initThemeToggle();
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

  // Event Delegation para todas as interações do Menu Mobile
  document.addEventListener('click', (e) => {
    const menuToggleBtn = e.target.closest('#menuToggle');
    const closeBtn = e.target.closest('.mobile-drawer-close');
    const dropdownToggle = e.target.closest('.nav-dropdown-toggle');
    const dropdownItem = e.target.closest('.nav-dropdown-item');
    
    // 1. Toggle do menu hambúrguer
    if (menuToggleBtn) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
      return;
    }

    // 2. Botão de fechar (X)
    if (closeBtn) {
      e.preventDefault();
      e.stopPropagation();
      closeMenu();
      return;
    }
    
    // 3. Toggle do submenu dentro do mobile drawer
    if (dropdownToggle && window.innerWidth <= 1080) {
      e.preventDefault();
      e.stopPropagation();
      const parentDropdown = dropdownToggle.closest('.nav-dropdown');
      if (parentDropdown) {
        parentDropdown.classList.toggle('active');
        const icon = dropdownToggle.querySelector('.nav-dropdown-icon');
        if (icon) {
          icon.style.transform = parentDropdown.classList.contains('active') ? 'rotate(180deg)' : 'none';
        }
      }
      return;
    }

    // 4. Clique em item do submenu mobile (fecha o drawer para navegar)
    if (dropdownItem && window.innerWidth <= 1080) {
      closeMenu();
      return;
    }

    // 5. Clique no backdrop escurecido
    if (e.target === navBackdrop) {
      closeMenu();
      return;
    }

    // 6. Links normais dentro do drawer mobile
    if (e.target.closest('.nav-link') && !dropdownToggle && window.innerWidth <= 1080) {
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
