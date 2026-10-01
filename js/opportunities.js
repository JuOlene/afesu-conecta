/**
 * AFESU CONECTA — LÓGICA DA PÁGINA DE OPORTUNIDADES
 * Sistema de busca, filtros, favoritos, ordenação e modais dinâmicos
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Estado da Aplicação ---
  const state = {
    category: 'ALL',
    search: '',
    location: 'ALL',
    area: 'ALL',
    type: 'ALL',
    format: 'ALL',
    sortBy: 'recent',
    viewMode: 'sections', // 'sections' (padrão com separação maior) ou 'grid'
    favorites: new Set(),
    selectedOpp: null
  };

  // Carregar favoritos do localStorage se disponível
  try {
    const savedFavs = localStorage.getItem('afesu_favs');
    if (savedFavs) {
      state.favorites = new Set(JSON.parse(savedFavs));
    }
  } catch (e) {
    console.warn('LocalStorage indisponível');
  }

  // --- 2. Elementos do DOM ---
  const searchInput = document.getElementById('oppSearchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const categoryTabs = document.querySelectorAll('.catalog-menu-card, .category-tab-btn');
  const filterLocation = document.getElementById('filterLocation');
  const filterArea = document.getElementById('filterArea');
  const filterType = document.getElementById('filterType');
  const filterFormat = document.getElementById('filterFormat');
  const btnResetFilters = document.getElementById('btnResetFilters');
  const btnResetEmpty = document.getElementById('btnResetEmpty');
  const sortSelect = document.getElementById('sortSelect');
  const opportunitiesGrid = document.getElementById('opportunitiesGrid');
  const resultsCountText = document.getElementById('resultsCountText');
  const emptyState = document.getElementById('emptyResultsState');
  const mobileFiltersToggle = document.getElementById('mobileFiltersToggle');
  const filtersGrid = document.getElementById('filtersGrid');
  const btnViewSections = document.getElementById('btnViewSections');
  const btnViewGrid = document.getElementById('btnViewGrid');

  // Badges dos Cards do Menu Superior
  const badgeCountAll = document.getElementById('badgeCountAll');
  const badgeCountEmp = document.getElementById('badgeCountEmp');
  const badgeCountEst = document.getElementById('badgeCountEst');
  const badgeCountCur = document.getElementById('badgeCountCur');
  const badgeCountFav = document.getElementById('badgeCountFav');

  // Modal de Detalhes
  const oppDetailsModal = document.getElementById('oppDetailsModal');
  const oppDetailsCloseBtn = document.getElementById('oppDetailsCloseBtn');
  const detailsBadge = document.getElementById('detailsBadge');
  const detailsTitle = document.getElementById('detailsTitle');
  const detailsCompany = document.getElementById('detailsCompany');
  const detailsMetaLocation = document.getElementById('detailsMetaLocation');
  const detailsMetaFormat = document.getElementById('detailsMetaFormat');
  const detailsMetaArea = document.getElementById('detailsMetaArea');
  const detailsDesc = document.getElementById('detailsDesc');
  const detailsDynamicSection = document.getElementById('detailsDynamicSection');
  const btnInterest = document.getElementById('btnInterest');
  const interestNoticeBox = document.getElementById('interestNoticeBox');

  // --- 3. Função de Filtragem e Renderização (com suporte a vagas publicadas por patrocinadores) ---
  const getAllOpportunities = () => {
    let custom = [];
    try {
      const saved = localStorage.getItem('afesu_custom_opportunities');
      if (saved) {
        custom = JSON.parse(saved).filter(o => o.status !== 'Encerrada');
      }
    } catch (e) {}

    // Padronizar objetos customizados para serem compatíveis
    const normalizedCustom = custom.map(c => ({
      id: c.id,
      category: c.category === 'ESTAGIO' ? 'ESTÁGIO' : (c.category || (c.type === 'Curso' ? 'CURSO' : (c.type === 'Estágio' ? 'ESTÁGIO' : 'EMPREGO'))),
      type: c.type,
      title: c.title,
      company: c.company,
      location: c.location,
      format: c.format,
      area: c.area,
      shortDescription: c.shortDescription || c.description,
      fullDescription: c.description || c.shortDescription,
      requirements: Array.isArray(c.requirements) ? c.requirements : (c.requirements ? c.requirements.split(';') : []),
      activities: Array.isArray(c.activities) ? c.activities : (c.activities ? c.activities.split(';') : ['Atividades da função conforme escopo']),
      benefits: Array.isArray(c.benefits) ? c.benefits : (c.benefits ? c.benefits.split(';') : ['Benefícios da vaga']),
      duration: c.duration || (c.hours ? `${c.hours} horas` : '4 semanas'),
      targetAudience: 'Alunas e ex-alunas da AFESU',
      courseContent: Array.isArray(c.courseContent) ? c.courseContent : (c.courseContent ? c.courseContent.split(';') : ['Conteúdo programático prático']),
      publishedAt: c.publishedAt || '2026-09-23',
      isFavorite: false
    }));

    return [...normalizedCustom, ...OPPORTUNITIES_DATA];
  };

  const createCardHtml = (opp) => {
    const isFav = state.favorites.has(opp.id);
    
    let badgeClass = 'badge-emprego';
    let cardClass = 'cat-emprego';
    if (opp.category === 'ESTÁGIO') {
      badgeClass = 'badge-estagio';
      cardClass = 'cat-estagio';
    } else if (opp.category === 'CURSO') {
      badgeClass = 'badge-curso';
      cardClass = 'cat-curso';
    }

    // Formatar data relativa amigável
    const dateParts = opp.publishedAt.split('-');
    const formattedDate = `Publicado em ${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    return `
      <article class="opportunity-card ${cardClass}" data-id="${opp.id}">
        <div class="card-top-row">
          <span class="category-badge ${badgeClass}">${opp.category}</span>
          <button class="btn-favorite ${isFav ? 'active' : ''}" data-id="${opp.id}" aria-label="Favoritar oportunidade" title="Salvar vaga">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        <h3 class="card-title">${opp.title}</h3>
        <div class="card-company">
          <svg class="company-verified-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span>${opp.company}</span>
        </div>

        <div class="card-meta-list">
          <span class="meta-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${opp.location}
          </span>
          <span class="meta-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            ${opp.format}
          </span>
          <span class="meta-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
            ${opp.area}
          </span>
        </div>

        <p class="card-description">${opp.shortDescription}</p>

        <div class="card-footer-row">
          <span class="card-published-date">${formattedDate}</span>
          <button class="btn-view-opp" data-open-details="${opp.id}">
            <span>Ver oportunidade</span>
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </article>
    `;
  };

  const filterAndRender = () => {
    let list = getAllOpportunities();

    // 1. Filtro por Categoria (Todas, Empregos, Estágios, Cursos, Favoritos, Candidaturas)
    if (state.category === 'FAVORITOS') {
      list = list.filter(item => state.favorites.has(item.id));
    } else if (state.category === 'CANDIDATURAS') {
      let appIds = [];
      try {
        const savedApps = localStorage.getItem('afesu_applications');
        if (savedApps) appIds = JSON.parse(savedApps).map(a => a.id);
      } catch (e) {}
      list = list.filter(item => appIds.includes(item.id));
    } else if (state.category !== 'ALL') {
      list = list.filter(item => item.category === state.category);
    }

    // 2. Filtro por Busca Textual (Título, Empresa, Área, Descrição, Requisitos)
    if (state.search.trim() !== '') {
      const term = state.search.toLowerCase().trim();
      list = list.filter(item => 
        item.title.toLowerCase().includes(term) ||
        item.company.toLowerCase().includes(term) ||
        item.area.toLowerCase().includes(term) ||
        item.shortDescription.toLowerCase().includes(term)
      );
    }

    // 3. Filtro por Localização
    if (state.location !== 'ALL') {
      list = list.filter(item => item.location.toLowerCase().includes(state.location.toLowerCase()));
    }

    // 4. Filtro por Área
    if (state.area !== 'ALL') {
      list = list.filter(item => item.area.toLowerCase() === state.area.toLowerCase());
    }

    // 5. Filtro por Tipo de Oportunidade
    if (state.type !== 'ALL') {
      list = list.filter(item => item.type.toLowerCase() === state.type.toLowerCase());
    }

    // 6. Filtro por Formato (Presencial, Híbrido, Remoto)
    if (state.format !== 'ALL') {
      list = list.filter(item => item.format.toLowerCase() === state.format.toLowerCase());
    }

    // 7. Ordenação
    if (state.sortBy === 'recent') {
      list.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else if (state.sortBy === 'oldest') {
      list.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    } else if (state.sortBy === 'az') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Atualizar Contadores dos Menus Superiores
    const allOpps = getAllOpportunities();
    if (badgeCountAll) badgeCountAll.textContent = allOpps.length;
    if (badgeCountEmp) badgeCountEmp.textContent = allOpps.filter(o => o.category === 'EMPREGO').length;
    if (badgeCountEst) badgeCountEst.textContent = allOpps.filter(o => o.category === 'ESTÁGIO').length;
    if (badgeCountCur) badgeCountCur.textContent = allOpps.filter(o => o.category === 'CURSO').length;
    if (badgeCountFav) badgeCountFav.textContent = state.favorites.size;

    // 8. Atualizar Contador
    const count = list.length;
    resultsCountText.innerHTML = `<span>${count}</span> ${count === 1 ? 'oportunidade encontrada' : 'oportunidades encontradas'}`;

    // 9. Atualizar Estado Vazio vs Grid
    if (count === 0) {
      opportunitiesGrid.style.display = 'none';
      emptyState.classList.add('visible');
    } else {
      opportunitiesGrid.style.display = 'block';
      emptyState.classList.remove('visible');
      renderOpportunities(list);
    }
  };

  // --- 4. Renderização por Sessões Separadas vs Grade ---
  const renderOpportunities = (items) => {
    opportunitiesGrid.innerHTML = '';

    // Se a categoria for específica (ex: só Cursos, ou só Favoritos) ou o usuário escolheu o modo Grade
    if (state.category !== 'ALL' || state.viewMode === 'grid') {
      const singleGrid = document.createElement('div');
      singleGrid.className = 'opportunities-grid';
      singleGrid.style.marginBottom = '0';
      singleGrid.innerHTML = items.map(opp => createCardHtml(opp)).join('');
      opportunitiesGrid.appendChild(singleGrid);
    } else {
      // MODO SEÇÕES SEPARADAS (Cursos, Vagas de Emprego, Estágios)
      const jobs = items.filter(o => o.category === 'EMPREGO');
      const internships = items.filter(o => o.category === 'ESTÁGIO');
      const courses = items.filter(o => o.category === 'CURSO');

      const sectionsConfig = [
        {
          key: 'EMPREGO',
          title: 'Vagas de Emprego',
          subtitle: 'Oportunidades em regime CLT e contratos com plano de carreira em empresas parceiras',
          icon: '💼',
          themeClass: 'section-theme-emprego',
          iconClass: 'icon-theme-emprego',
          badgeClass: 'badge-count-emprego',
          data: jobs
        },
        {
          key: 'ESTÁGIO',
          title: 'Vagas de Estágio',
          subtitle: 'Programas de entrada no mercado de trabalho com mentoria e suporte acadêmico',
          icon: '🚀',
          themeClass: 'section-theme-estagio',
          iconClass: 'icon-theme-estagio',
          badgeClass: 'badge-count-estagio',
          data: internships
        },
        {
          key: 'CURSO',
          title: 'Cursos & Capacitações',
          subtitle: 'Bootcamps, workshops técnicos e qualificações com certificações reconhecidas',
          icon: '🎓',
          themeClass: 'section-theme-curso',
          iconClass: 'icon-theme-curso',
          badgeClass: 'badge-count-curso',
          data: courses
        }
      ];

      sectionsConfig.forEach(sec => {
        if (sec.data.length > 0) {
          const sectionBlock = document.createElement('section');
          sectionBlock.className = `opp-category-section-block ${sec.themeClass}`;
          sectionBlock.id = `section-${sec.key.toLowerCase().replace('á', 'a')}`;
          sectionBlock.setAttribute('aria-labelledby', `sec-title-${sec.key.toLowerCase()}`);

          sectionBlock.innerHTML = `
            <div class="opp-section-header">
              <div class="opp-section-header-left">
                <div class="opp-section-icon ${sec.iconClass}">
                  <span>${sec.icon}</span>
                </div>
                <div class="opp-section-title-group">
                  <h2 class="opp-section-title" id="sec-title-${sec.key.toLowerCase()}">
                    <span>${sec.title}</span>
                    <span class="opp-section-badge-count ${sec.badgeClass}">${sec.data.length} ${sec.data.length === 1 ? 'disponível' : 'disponíveis'}</span>
                  </h2>
                  <p class="opp-section-subtitle">${sec.subtitle}</p>
                </div>
              </div>

              <button type="button" class="opp-section-quick-filter" data-filter-to="${sec.key}">
                <span>Ver apenas ${sec.title}</span>
                <svg viewBox="0 0 20 20" fill="currentColor" style="width: 14px; height: 14px;">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <div class="opp-section-cards-grid">
              ${sec.data.map(opp => createCardHtml(opp)).join('')}
            </div>
          `;

          opportunitiesGrid.appendChild(sectionBlock);
        }
      });
    }

    // Eventos dos botões de filtro rápido das seções
    document.querySelectorAll('[data-filter-to]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-filter-to');
        selectCategory(cat);
      });
    });

    // Anexar eventos nos botões de favoritar
    document.querySelectorAll('.btn-favorite').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        if (state.favorites.has(id)) {
          state.favorites.delete(id);
          btn.classList.remove('active');
        } else {
          state.favorites.add(id);
          btn.classList.add('active');
        }
        try {
          localStorage.setItem('afesu_favs', JSON.stringify([...state.favorites]));
        } catch (err) {}
      });
    });

    // Anexar eventos para abrir modal de detalhes
    document.querySelectorAll('[data-open-details]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-open-details');
        openDetailsModal(id);
      });
    });
  };

  // Função central para selecionar categoria / menu
  const selectCategory = (categoryKey, shouldScroll = true) => {
    state.category = categoryKey;
    categoryTabs.forEach(tab => {
      if (tab.getAttribute('data-category') === categoryKey) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    filterAndRender();

    if (shouldScroll) {
      if (categoryKey === 'ALL') {
        window.scrollTo({ top: 350, behavior: 'smooth' });
      } else {
        const sectionId = `section-${categoryKey.toLowerCase().replace('á', 'a')}`;
        const targetEl = document.getElementById(sectionId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 350, behavior: 'smooth' });
        }
      }
    }
  };

  // Eventos do Menu Suspenso de Oportunidades no Header
  document.querySelectorAll('[data-nav-cat]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = item.getAttribute('data-nav-cat');
      selectCategory(cat, true);

      // Fechar dropdown móvel se estiver aberto
      const navMenu = document.getElementById('navMenu');
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    });
  });

  // --- 5. Modal de Detalhes Completo ---
  const openDetailsModal = (id) => {
    const opp = getAllOpportunities().find(item => item.id === id);
    if (!opp) return;

    state.selectedOpp = opp;

    // Badges & Cabeçalho do Modal
    detailsBadge.textContent = opp.category;
    detailsBadge.className = `category-badge ${
      opp.category === 'ESTÁGIO' ? 'badge-estagio' : opp.category === 'CURSO' ? 'badge-curso' : 'badge-emprego'
    }`;

    detailsTitle.textContent = opp.title;
    detailsCompany.textContent = opp.company;
    detailsMetaLocation.textContent = opp.location;
    detailsMetaFormat.textContent = opp.format;
    detailsMetaArea.textContent = opp.area;
    detailsDesc.textContent = opp.fullDescription;

    // Seções Dinâmicas (Requisitos / Benefícios / Conteúdo)
    let dynamicHtml = '';

    if (opp.category === 'CURSO') {
      dynamicHtml += `
        <h4 class="details-section-title">Informações do Curso</h4>
        <div class="details-list">
          <div class="details-list-item">
            <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" /></svg>
            <span><strong>Duração:</strong> ${opp.duration}</span>
          </div>
          <div class="details-list-item">
            <svg viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
            <span><strong>Público-Alvo:</strong> ${opp.targetAudience}</span>
          </div>
        </div>

        <h4 class="details-section-title">Conteúdo Programático</h4>
        <div class="details-list">
          ${opp.courseContent.map(item => `
            <div class="details-list-item">
              <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
              <span>${item}</span>
            </div>
          `).join('')}
        </div>

        <h4 class="details-section-title">Diferenciais & Benefícios</h4>
        <div class="details-list">
          ${opp.benefits.map(item => `
            <div class="details-list-item">
              <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
              <span>${item}</span>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      // Empregos e Estágios
      dynamicHtml += `
        <h4 class="details-section-title">Requisitos & Qualificações</h4>
        <div class="details-list">
          ${opp.requirements.map(item => `
            <div class="details-list-item">
              <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
              <span>${item}</span>
            </div>
          `).join('')}
        </div>

        <h4 class="details-section-title">Principais Atividades</h4>
        <div class="details-list">
          ${opp.activities.map(item => `
            <div class="details-list-item">
              <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
              <span>${item}</span>
            </div>
          `).join('')}
        </div>

        <h4 class="details-section-title">Benefícios Oferecidos</h4>
        <div class="details-list">
          ${opp.benefits.map(item => `
            <div class="details-list-item">
              <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
              <span>${item}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    detailsDynamicSection.innerHTML = dynamicHtml;

    // Resetar ou exibir status de candidatura
    let applications = [];
    try {
      const savedApps = localStorage.getItem('afesu_applications');
      if (savedApps) applications = JSON.parse(savedApps);
    } catch (e) {}

    const isAlreadyApplied = applications.some(a => a.id === opp.id);
    if (isAlreadyApplied) {
      interestNoticeBox.innerHTML = `
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <div>
          <strong>Candidatura enviada!</strong><br>
          Seu currículo digital já foi enviado para esta oportunidade. (Status: <em>Em análise pela empresa</em>).
        </div>
      `;
      interestNoticeBox.classList.add('visible');
      btnInterest.style.display = 'none';
    } else {
      interestNoticeBox.innerHTML = `
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <div>
          <strong>Interesse registrado com sucesso!</strong><br>
          Seu currículo digital foi anexado a esta oportunidade. Acompanhe em <em>Minhas Candidaturas</em>.
        </div>
      `;
      interestNoticeBox.classList.remove('visible');
      btnInterest.style.display = 'inline-flex';
    }

    // Abrir Modal
    oppDetailsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDetailsModal = () => {
    oppDetailsModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (oppDetailsCloseBtn) {
    oppDetailsCloseBtn.addEventListener('click', closeDetailsModal);
  }

  if (oppDetailsModal) {
    oppDetailsModal.addEventListener('click', (e) => {
      if (e.target === oppDetailsModal) {
        closeDetailsModal();
      }
    });
  }

  // Ação ao clicar em "Tenho interesse / Quero me candidatar"
  if (btnInterest) {
    btnInterest.addEventListener('click', () => {
      if (state.selectedOpp) {
        let apps = [];
        try {
          const saved = localStorage.getItem('afesu_applications');
          if (saved) apps = JSON.parse(saved);
        } catch (e) {}

        if (!apps.some(a => a.id === state.selectedOpp.id)) {
          apps.push({
            id: state.selectedOpp.id,
            title: state.selectedOpp.title,
            company: state.selectedOpp.company,
            type: state.selectedOpp.type,
            appliedAt: new Date().toISOString().split('T')[0],
            status: 'Em análise'
          });
          localStorage.setItem('afesu_applications', JSON.stringify(apps));
        }

        interestNoticeBox.classList.add('visible');
        btnInterest.style.display = 'none';
      }
    });
  }

  // --- 6. Event Listeners dos Controles de Busca & Filtros ---

  // Categorias (Tabs)
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.category = tab.getAttribute('data-category');
      filterAndRender();
    });
  });

  // Busca em Tempo Real
  searchInput.addEventListener('input', (e) => {
    state.search = e.target.value;
    if (state.search.length > 0) {
      searchClearBtn.classList.add('visible');
    } else {
      searchClearBtn.classList.remove('visible');
    }
    filterAndRender();
  });

  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    state.search = '';
    searchClearBtn.classList.remove('visible');
    filterAndRender();
    searchInput.focus();
  });

  // Filtros Dropdown
  filterLocation.addEventListener('change', (e) => {
    state.location = e.target.value;
    filterAndRender();
  });

  filterArea.addEventListener('change', (e) => {
    state.area = e.target.value;
    filterAndRender();
  });

  filterType.addEventListener('change', (e) => {
    state.type = e.target.value;
    filterAndRender();
  });

  filterFormat.addEventListener('change', (e) => {
    state.format = e.target.value;
    filterAndRender();
  });

  // Ordenação
  sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    filterAndRender();
  });

  // Limpar Todos os Filtros
  const resetAllFilters = () => {
    state.category = 'ALL';
    state.search = '';
    state.location = 'ALL';
    state.area = 'ALL';
    state.type = 'ALL';
    state.format = 'ALL';
    state.sortBy = 'recent';

    searchInput.value = '';
    searchClearBtn.classList.remove('visible');
    filterLocation.value = 'ALL';
    filterArea.value = 'ALL';
    filterType.value = 'ALL';
    filterFormat.value = 'ALL';
    sortSelect.value = 'recent';

    categoryTabs.forEach(tab => {
      if (tab.getAttribute('data-category') === 'ALL') {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    filterAndRender();
  };

  btnResetFilters.addEventListener('click', resetAllFilters);
  if (btnResetEmpty) {
    btnResetEmpty.addEventListener('click', resetAllFilters);
  }

  // Alternância de modo de visualização (Seções Separadas vs Grade Geral)
  if (btnViewSections && btnViewGrid) {
    btnViewSections.addEventListener('click', () => {
      state.viewMode = 'sections';
      btnViewSections.classList.add('active');
      btnViewGrid.classList.remove('active');
      filterAndRender();
    });

    btnViewGrid.addEventListener('click', () => {
      state.viewMode = 'grid';
      btnViewGrid.classList.add('active');
      btnViewSections.classList.remove('active');
      filterAndRender();
    });
  }

  // Toggle do Painel de Filtros no Celular
  if (mobileFiltersToggle && filtersGrid) {
    mobileFiltersToggle.addEventListener('click', () => {
      const isOpen = filtersGrid.classList.toggle('active');
      mobileFiltersToggle.classList.toggle('active');
      mobileFiltersToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Ler parâmetros de URL (ex: ?cat=CURSO, ?view=candidaturas ou ?cat=FAVORITOS)
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat') || urlParams.get('view');
  if (catParam) {
    const formatted = catParam.toUpperCase();
    if (['EMPREGO', 'ESTÁGIO', 'ESTAGIO', 'CURSO', 'FAVORITOS', 'CANDIDATURAS'].includes(formatted)) {
      state.category = formatted === 'ESTAGIO' ? 'ESTÁGIO' : formatted;
      categoryTabs.forEach(tab => {
        if (tab.getAttribute('data-category') === state.category) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
      setTimeout(() => {
        const secId = `section-${state.category.toLowerCase().replace('á', 'a')}`;
        const targetEl = document.getElementById(secId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    }
  }

  // Renderização Inicial
  filterAndRender();
});
