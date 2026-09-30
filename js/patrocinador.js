/**
 * AFESU CONECTA — ÁREA DOS PATROCINADORES / EMPRESAS (LÓGICA)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. OPORTUNIDADES INICIAIS DA EMPRESA PARCEIRA ---
  const defaultSponsorOpps = [
    {
      id: 'spon-1',
      title: 'Assistente Administrativo & Atendimento',
      company: 'Empresa Parceira AFESU',
      type: 'Emprego',
      category: 'EMPREGO',
      area: 'Administração',
      location: 'São Paulo, SP',
      format: 'Híbrido',
      description: 'Atuação com suporte a rotinas financeiras, arquivos digitais, atendimento a clientes e processos internos.',
      requirements: 'Ensino médio ou técnico AFESU; Pacote Office intermediário; Boa comunicação.',
      benefits: 'Vale Refeição (R$ 38/dia), Vale Transporte, Seguro de Vida, Plano de Saúde.',
      deadline: '2026-10-30',
      status: 'Ativa',
      candidatesCount: 6,
      publishedAt: '2026-09-18'
    },
    {
      id: 'spon-2',
      title: 'Estágio em Tecnologia & Suporte Web',
      company: 'Empresa Parceira AFESU',
      type: 'Estágio',
      category: 'ESTAGIO',
      area: 'Tecnologia',
      location: 'São Paulo, SP',
      format: 'Híbrido',
      description: 'Oportunidade para alunas de cursos técnicos de tecnologia apoiarem a manutenção de sistemas e testes de software.',
      requirements: 'Cursando Técnico em Programação/Informática na AFESU; Conhecimentos em HTML/CSS e lógica.',
      benefits: 'Bolsa-estágio compatível, Auxílio transporte, Mentoria técnica individual.',
      deadline: '2026-10-25',
      status: 'Ativa',
      candidatesCount: 9,
      publishedAt: '2026-09-20'
    },
    {
      id: 'spon-3',
      title: 'Capacitação em Excel Avançado & BI',
      company: 'Empresa Parceira AFESU',
      type: 'Curso',
      category: 'CURSO',
      area: 'Tecnologia',
      location: 'Online / Remoto',
      format: 'Remoto',
      description: 'Curso intensivo de Excel para o mercado de trabalho com criação de dashboards e visualização de dados.',
      duration: '4 semanas',
      hours: '40',
      courseFormat: 'Online com aulas ao vivo',
      courseContent: 'Fórmulas avançadas, PROCV/XLOOKUP, Tabelas Dinâmicas, Gráficos interativos e Power BI introdutório.',
      hasCert: 'Sim',
      requirements: 'Interesse em tecnologia e gestão; Disponibilidade aos sábados.',
      benefits: 'Acesso a licenças Microsoft, Certificado reconhecido e conexão com vagas.',
      deadline: '2026-10-15',
      status: 'Ativa',
      candidatesCount: 14,
      publishedAt: '2026-09-10'
    }
  ];

  // Carregar oportunidades salvas no localStorage
  let sponsorOpps = [];
  try {
    const saved = localStorage.getItem('afesu_custom_opportunities');
    if (saved) {
      sponsorOpps = JSON.parse(saved);
    } else {
      sponsorOpps = [...defaultSponsorOpps];
      localStorage.setItem('afesu_custom_opportunities', JSON.stringify(sponsorOpps));
    }
  } catch (e) {
    sponsorOpps = [...defaultSponsorOpps];
  }

  // --- 2. BANCO DE TALENTOS & CANDIDATURAS RECEBIDAS ---
  // Obter perfil real da aluna do localStorage se existir
  let userProfile = null;
  try {
    const savedProfile = localStorage.getItem('afesu_profile');
    if (savedProfile) {
      userProfile = JSON.parse(savedProfile);
    }
  } catch (e) {}

  const candidatesDatabase = [
    {
      id: 'cand-main',
      name: userProfile?.personal?.fullName || 'Mariana Silva de Oliveira',
      socialName: userProfile?.personal?.socialName || 'Mariana Silva',
      photo: userProfile?.photo || null,
      email: userProfile?.personal?.email || 'mariana.silva@exemplo.com',
      phone: userProfile?.personal?.phone || '(11) 98765-4321',
      city: userProfile?.personal?.city || 'São Paulo',
      state: userProfile?.personal?.state || 'SP',
      area: userProfile?.interests?.areas?.[0] || 'Administração',
      formation: userProfile?.formations?.[0]?.course || 'Ensino Técnico em Administração & Tecnologia',
      institution: userProfile?.formations?.[0]?.institution || 'AFESU Veleiros',
      skills: userProfile?.skills?.length ? userProfile.skills : ['Comunicação', 'Organização', 'Excel', 'Trabalho em equipe', 'HTML & CSS'],
      targetOpp: 'Assistente Administrativo & Atendimento',
      appliedAt: '2026-09-22',
      objective: userProfile?.personal?.bio || 'Buscando uma oportunidade para desenvolver minhas habilidades, adquirir experiência e contribuir com a equipe.',
      formations: userProfile?.formations || [
        { course: 'Ensino Técnico em Administração & Tecnologia', institution: 'AFESU Veleiros', level: 'Ensino técnico', status: 'Concluído', endYear: '2026' },
        { course: 'Ensino Médio Regular', institution: 'E.E. Professora Maria José', level: 'Ensino médio', status: 'Concluído', endYear: '2024' }
      ],
      experiences: userProfile?.experiences || [],
      noExperience: userProfile?.noExperience ?? true,
      courses: userProfile?.courses || [
        { name: 'Excel para o Mercado de Trabalho', institution: 'AFESU Conecta', hours: '40', year: '2026', hasCert: true },
        { name: 'Comunicação Assertiva e Pitch Pessoal', institution: 'AFESU Veleiros', hours: '24', year: '2025', hasCert: true }
      ],
      interests: userProfile?.interests || {
        areas: ['Administração', 'Tecnologia', 'Marketing'],
        opportunityTypes: ['Estágio', 'Emprego'],
        formats: ['Híbrido', 'Remoto']
      }
    },
    {
      id: 'cand-2',
      name: 'Beatriz Lima dos Santos',
      socialName: 'Beatriz Santos',
      photo: null,
      email: 'beatriz.santos@exemplo.com',
      phone: '(11) 97123-4567',
      city: 'São Paulo',
      state: 'SP',
      area: 'Tecnologia',
      formation: 'Técnico em Desenvolvimento Web & TI',
      institution: 'AFESU Morro Velho',
      skills: ['HTML & CSS', 'JavaScript', 'Git & GitHub', 'Lógica de Programação', 'Resolução de Problemas'],
      targetOpp: 'Estágio em Tecnologia & Suporte Web',
      appliedAt: '2026-09-21',
      objective: 'Dedicação ao desenvolvimento front-end e suporte técnico, com foco em criar interfaces acessíveis e soluções eficientes.',
      formations: [
        { course: 'Técnico em Desenvolvimento Web & TI', institution: 'AFESU Morro Velho', level: 'Ensino técnico', status: 'Concluído', endYear: '2026' },
        { course: 'Ensino Médio Completo', institution: 'Colégio Estadual Santos', level: 'Ensino médio', status: 'Concluído', endYear: '2025' }
      ],
      experiences: [
        { role: 'Monitora de Laboratório de Informática', company: 'AFESU', type: 'Projeto Acadêmico', startDate: '2025', endDate: '2026', isCurrent: false, desc: 'Auxílio a novas alunas no uso de ferramentas de código e desenvolvimento.' }
      ],
      noExperience: false,
      courses: [
        { name: 'JavaScript Moderno & APIs', institution: 'AFESU Tech', hours: '60', year: '2026', hasCert: true }
      ],
      interests: {
        areas: ['Tecnologia', 'Design'],
        opportunityTypes: ['Estágio', 'Emprego'],
        formats: ['Híbrido', 'Remoto', 'Presencial']
      }
    },
    {
      id: 'cand-3',
      name: 'Ana Carolina Mendes',
      socialName: 'Carolina Mendes',
      photo: null,
      email: 'carolina.mendes@exemplo.com',
      phone: '(11) 98234-5678',
      city: 'Osasco',
      state: 'SP',
      area: 'Marketing',
      formation: 'Técnico em Gestão & Comunicação Digital',
      institution: 'AFESU Veleiros',
      skills: ['Redes Sociais', 'Canva', 'Copywriting', 'Comunicação', 'Criatividade'],
      targetOpp: 'Assistente Administrativo & Atendimento',
      appliedAt: '2026-09-20',
      objective: 'Interesse em atuar na produção de conteúdos digitais, relacionamento com clientes e suporte de marketing.',
      formations: [
        { course: 'Técnico em Gestão & Comunicação Digital', institution: 'AFESU Veleiros', level: 'Ensino técnico', status: 'Concluído', endYear: '2026' }
      ],
      experiences: [],
      noExperience: true,
      courses: [
        { name: 'Marketing Digital na Prática', institution: 'AFESU Capacita', hours: '30', year: '2026', hasCert: true }
      ],
      interests: {
        areas: ['Marketing', 'Atendimento', 'Comunicação'],
        opportunityTypes: ['Emprego', 'Estágio'],
        formats: ['Híbrido', 'Presencial']
      }
    },
    {
      id: 'cand-4',
      name: 'Letícia Rocha Pereira',
      socialName: 'Letícia Rocha',
      photo: null,
      email: 'leticia.rocha@exemplo.com',
      phone: '(11) 99345-6789',
      city: 'São Paulo',
      state: 'SP',
      area: 'Tecnologia',
      formation: 'Ensino Médio com Ênfase em Ciência de Dados',
      institution: 'AFESU Morro Velho',
      skills: ['Excel', 'Power BI', 'Organização', 'Análise de Dados', 'Trabalho em equipe'],
      targetOpp: 'Capacitação em Excel Avançado & BI',
      appliedAt: '2026-09-19',
      objective: 'Evoluir em análise e inteligência de dados para gerar insights aplicados ao crescimento do negócio.',
      formations: [
        { course: 'Ensino Médio com Ênfase em Dados', institution: 'AFESU Morro Velho', level: 'Ensino médio', status: 'Concluído', endYear: '2026' }
      ],
      experiences: [],
      noExperience: true,
      courses: [
        { name: 'Estatística e Métricas para Negócios', institution: 'AFESU Conecta', hours: '20', year: '2025', hasCert: true }
      ],
      interests: {
        areas: ['Tecnologia', 'Administração'],
        opportunityTypes: ['Curso', 'Estágio'],
        formats: ['Remoto', 'Híbrido']
      }
    },
    {
      id: 'cand-5',
      name: 'Camila Fernandes Costa',
      socialName: 'Camila Costa',
      photo: null,
      email: 'camila.costa@exemplo.com',
      phone: '(11) 96456-7890',
      city: 'Santo André',
      state: 'SP',
      area: 'Administração',
      formation: 'Técnico em Secretariado & Rotinas de Escritório',
      institution: 'AFESU Veleiros',
      skills: ['Atendimento ao Cliente', 'Organização', 'Excel', 'Redação Empresarial'],
      targetOpp: 'Assistente Administrativo & Atendimento',
      appliedAt: '2026-09-18',
      objective: 'Atuar no suporte operacional, organização documental e excelência em recepção e atendimento.',
      formations: [
        { course: 'Técnico em Secretariado & Rotinas de Escritório', institution: 'AFESU Veleiros', level: 'Ensino técnico', status: 'Concluído', endYear: '2025' }
      ],
      experiences: [
        { role: 'Jovem Aprendiz Administrativo', company: 'Comércio Regional', type: 'Jovem Aprendiz', startDate: '2024', endDate: '2025', isCurrent: false, desc: 'Arquivo, triagem de notas e atendimento.' }
      ],
      noExperience: false,
      courses: [
        { name: 'Gestão de Tempo e Produtividade', institution: 'AFESU Veleiros', hours: '15', year: '2025', hasCert: true }
      ],
      interests: {
        areas: ['Administração', 'Atendimento'],
        opportunityTypes: ['Emprego'],
        formats: ['Presencial', 'Híbrido']
      }
    }
  ];

  // --- 3. ATUALIZAÇÃO DOS KPIS DO DASHBOARD ---
  const updateKpis = () => {
    const kpiOpps = document.getElementById('kpiOppsCount');
    const kpiCands = document.getElementById('kpiCandsCount');
    const kpiProfiles = document.getElementById('kpiProfilesCount');
    const kpiCourses = document.getElementById('kpiCoursesCount');

    const totalOpps = sponsorOpps.length;
    const totalCands = sponsorOpps.reduce((acc, curr) => acc + (curr.candidatesCount || 0), candidatesDatabase.length);
    const totalProfiles = candidatesDatabase.length + 18; // base + pool geral AFESU
    const totalCourses = sponsorOpps.filter(o => o.type === 'Curso').length;

    if (kpiOpps) kpiOpps.textContent = totalOpps;
    if (kpiCands) kpiCands.textContent = totalCands;
    if (kpiProfiles) kpiProfiles.textContent = totalProfiles;
    if (kpiCourses) kpiCourses.textContent = totalCourses;
  };

  // --- 4. RENDERIZAÇÃO DE "MINHAS OPORTUNIDADES" ---
  const sponsorOppsContainer = document.getElementById('sponsorOppsList');

  const renderSponsorOpps = () => {
    if (!sponsorOppsContainer) return;
    sponsorOppsContainer.innerHTML = '';

    if (sponsorOpps.length === 0) {
      sponsorOppsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; color: var(--color-text-muted); background: var(--color-bg-subtle); border-radius: var(--radius-lg);">
          <p style="font-size: 1.05rem; margin-bottom: 0.75rem;">Você ainda não possui nenhuma oportunidade cadastrada.</p>
          <button type="button" class="btn btn-primary" onclick="document.getElementById('btnOpenPubModal').click()">
            + Publicar Primeira Oportunidade
          </button>
        </div>
      `;
      return;
    }

    sponsorOpps.forEach((opp, index) => {
      const card = document.createElement('div');
      const isClosed = opp.status === 'Encerrada';
      card.className = `sponsor-opp-card ${isClosed ? 'status-encerrada' : ''}`;

      let badgeClass = 'badge-emprego';
      if (opp.type === 'Estágio') badgeClass = 'badge-estagio';
      if (opp.type === 'Curso') badgeClass = 'badge-curso';

      card.innerHTML = `
        <div>
          <div class="sponsor-opp-top">
            <span class="sponsor-opp-type-badge ${badgeClass}">${opp.type}</span>
            <span class="sponsor-status-pill ${isClosed ? 'status-closed-pill' : 'status-active-pill'}">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: ${isClosed ? '#94A3B8' : '#10B981'};"></span>
              ${opp.status}
            </span>
          </div>
          <h4 class="sponsor-opp-title">${opp.title}</h4>
          <div class="sponsor-opp-meta">
            <span>📍 ${opp.location} (${opp.format})</span>
            <span>📅 ${opp.publishedAt ? `Publicado em ${opp.publishedAt}` : 'Recente'}</span>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div class="sponsor-opp-cands-count">
            <span>👥 ${opp.candidatesCount || 0} candidaturas recebidas</span>
          </div>

          <div class="sponsor-opp-actions">
            <button type="button" class="btn-card-mini" onclick="window.viewOppDetail('${opp.id}')">
              👁️ Ver
            </button>
            <button type="button" class="btn-card-mini" onclick="window.editOpp('${opp.id}')">
              ✏️ Editar
            </button>
            <button type="button" class="btn-card-mini ${isClosed ? '' : 'btn-card-mini-danger'}" onclick="window.toggleOppStatus(${index})">
              ${isClosed ? '🔄 Reativar' : '⏹️ Encerrar'}
            </button>
          </div>
        </div>
      `;
      sponsorOppsContainer.appendChild(card);
    });

    updateKpis();
  };

  // Funções Globais de Ação em Vagas
  window.toggleOppStatus = (index) => {
    const opp = sponsorOpps[index];
    if (opp) {
      opp.status = opp.status === 'Ativa' ? 'Encerrada' : 'Ativa';
      localStorage.setItem('afesu_custom_opportunities', JSON.stringify(sponsorOpps));
      renderSponsorOpps();
    }
  };

  window.editOpp = (oppId) => {
    const opp = sponsorOpps.find(o => o.id === oppId);
    if (!opp) return;

    document.getElementById('pubModalTitle').textContent = 'Editar Oportunidade';
    document.getElementById('pubEditingId').value = opp.id;
    document.getElementById('inputOppTitle').value = opp.title;
    document.getElementById('inputOppCompany').value = opp.company;
    document.getElementById('inputOppType').value = opp.type;
    document.getElementById('inputOppArea').value = opp.area;
    document.getElementById('inputOppLocation').value = opp.location;
    document.getElementById('inputOppFormat').value = opp.format;
    document.getElementById('inputOppDesc').value = opp.description;
    document.getElementById('inputOppReqs').value = opp.requirements;
    document.getElementById('inputOppBenefits').value = opp.benefits;
    document.getElementById('inputOppDeadline').value = opp.deadline || '';

    // Campos de Curso
    if (opp.type === 'Curso') {
      document.getElementById('courseExtraFields').classList.add('active');
      document.getElementById('inputCourseDuration').value = opp.duration || '';
      document.getElementById('inputCourseHours').value = opp.hours || '';
      document.getElementById('inputCourseFormat').value = opp.courseFormat || '';
      document.getElementById('inputCourseContent').value = opp.courseContent || '';
      document.getElementById('inputCourseCert').value = opp.hasCert || 'Sim';
    } else {
      document.getElementById('courseExtraFields').classList.remove('active');
    }

    document.getElementById('pubModal').classList.add('active');
  };

  window.viewOppDetail = (oppId) => {
    const opp = sponsorOpps.find(o => o.id === oppId);
    if (!opp) return;

    alert(`🔍 Detalhes da Oportunidade:\n\nTítulo: ${opp.title}\nTipo: ${opp.type} (${opp.area})\nLocalização: ${opp.location} (${opp.format})\nStatus: ${opp.status}\nCandidaturas: ${opp.candidatesCount || 0}\n\nDescrição:\n${opp.description}`);
  };

  // --- 5. MODAL DE PUBLICAÇÃO / FORMULÁRIO ---
  const pubModal = document.getElementById('pubModal');
  const btnOpenPubModal = document.getElementById('btnOpenPubModal');
  const btnClosePubModal = document.getElementById('btnClosePubModal');
  const formPublishOpp = document.getElementById('formPublishOpp');
  const inputOppType = document.getElementById('inputOppType');
  const courseExtraFields = document.getElementById('courseExtraFields');

  if (btnOpenPubModal && pubModal) {
    btnOpenPubModal.addEventListener('click', () => {
      formPublishOpp.reset();
      document.getElementById('pubEditingId').value = '';
      document.getElementById('pubModalTitle').textContent = '+ Publicar Nova Oportunidade';
      courseExtraFields.classList.remove('active');
      pubModal.classList.add('active');
    });
  }

  if (btnClosePubModal && pubModal) {
    btnClosePubModal.addEventListener('click', () => {
      pubModal.classList.remove('active');
    });
  }

  if (inputOppType && courseExtraFields) {
    inputOppType.addEventListener('change', () => {
      if (inputOppType.value === 'Curso') {
        courseExtraFields.classList.add('active');
      } else {
        courseExtraFields.classList.remove('active');
      }
    });
  }

  if (formPublishOpp) {
    formPublishOpp.addEventListener('submit', (e) => {
      e.preventDefault();

      const editingId = document.getElementById('pubEditingId').value;
      const typeVal = document.getElementById('inputOppType').value;
      const isCourse = typeVal === 'Curso';

      const oppData = {
        id: editingId || `custom-${Date.now()}`,
        title: document.getElementById('inputOppTitle').value.trim(),
        company: document.getElementById('inputOppCompany').value.trim() || 'Empresa Parceira AFESU',
        type: typeVal,
        category: isCourse ? 'CURSO' : (typeVal === 'Estágio' ? 'ESTAGIO' : 'EMPREGO'),
        area: document.getElementById('inputOppArea').value,
        location: document.getElementById('inputOppLocation').value.trim() || 'São Paulo, SP',
        format: document.getElementById('inputOppFormat').value,
        description: document.getElementById('inputOppDesc').value.trim(),
        shortDescription: document.getElementById('inputOppDesc').value.trim().slice(0, 140) + '...',
        requirements: document.getElementById('inputOppReqs').value.trim(),
        benefits: document.getElementById('inputOppBenefits').value.trim(),
        deadline: document.getElementById('inputOppDeadline').value,
        status: 'Ativa',
        candidatesCount: editingId ? (sponsorOpps.find(o => o.id === editingId)?.candidatesCount || 0) : 0,
        publishedAt: new Date().toISOString().split('T')[0]
      };

      if (isCourse) {
        oppData.duration = document.getElementById('inputCourseDuration').value.trim();
        oppData.hours = document.getElementById('inputCourseHours').value.trim();
        oppData.courseFormat = document.getElementById('inputCourseFormat').value.trim();
        oppData.courseContent = document.getElementById('inputCourseContent').value.trim();
        oppData.hasCert = document.getElementById('inputCourseCert').value;
      }

      if (editingId) {
        const idx = sponsorOpps.findIndex(o => o.id === editingId);
        if (idx !== -1) sponsorOpps[idx] = oppData;
      } else {
        sponsorOpps.unshift(oppData);
      }

      localStorage.setItem('afesu_custom_opportunities', JSON.stringify(sponsorOpps));
      renderSponsorOpps();
      pubModal.classList.remove('active');

      alert('🎉 Oportunidade publicada com sucesso! Ela já está disponível no painel e na página de Oportunidades do AFESU Conecta.');
    });
  }

  // --- 6. RENDERIZAÇÃO & FILTRAGEM DE CANDIDATURAS ---
  const candidatesContainer = document.getElementById('candidatesList');
  const searchCandidateInput = document.getElementById('searchCandidateInput');
  const filterCandArea = document.getElementById('filterCandArea');
  const filterCandFormation = document.getElementById('filterCandFormation');
  const filterCandType = document.getElementById('filterCandType');
  const filterCandLocation = document.getElementById('filterCandLocation');
  const filterCandSkill = document.getElementById('filterCandSkill');
  const btnResetCandFilters = document.getElementById('btnResetCandFilters');

  const filterAndRenderCandidates = () => {
    if (!candidatesContainer) return;

    let filtered = [...candidatesDatabase];

    const searchTerm = searchCandidateInput?.value.toLowerCase().trim() || '';
    const selectedArea = filterCandArea?.value || 'ALL';
    const selectedFormation = filterCandFormation?.value || 'ALL';
    const selectedType = filterCandType?.value || 'ALL';
    const selectedLocation = filterCandLocation?.value || 'ALL';
    const selectedSkill = filterCandSkill?.value || 'ALL';

    // 1. Busca textual
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchTerm) ||
        c.socialName.toLowerCase().includes(searchTerm) ||
        c.skills.some(s => s.toLowerCase().includes(searchTerm)) ||
        c.formation.toLowerCase().includes(searchTerm) ||
        c.targetOpp.toLowerCase().includes(searchTerm)
      );
    }

    // 2. Filtro de Área
    if (selectedArea !== 'ALL') {
      filtered = filtered.filter(c => c.area.toLowerCase() === selectedArea.toLowerCase());
    }

    // 3. Filtro de Formação
    if (selectedFormation !== 'ALL') {
      filtered = filtered.filter(c => c.formation.toLowerCase().includes(selectedFormation.toLowerCase()));
    }

    // 4. Filtro de Tipo de Oportunidade
    if (selectedType !== 'ALL') {
      filtered = filtered.filter(c => {
        const types = c.interests?.opportunityTypes || [];
        return types.some(t => t.toLowerCase() === selectedType.toLowerCase()) || c.targetOpp.toLowerCase().includes(selectedType.toLowerCase());
      });
    }

    // 5. Filtro de Localização
    if (selectedLocation !== 'ALL') {
      filtered = filtered.filter(c => c.city.toLowerCase().includes(selectedLocation.toLowerCase()));
    }

    // 6. Filtro de Habilidade
    if (selectedSkill !== 'ALL') {
      filtered = filtered.filter(c => c.skills.some(s => s.toLowerCase().includes(selectedSkill.toLowerCase())));
    }

    // Renderizar Cards
    candidatesContainer.innerHTML = '';

    if (filtered.length === 0) {
      candidatesContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background: var(--color-bg-subtle); border-radius: var(--radius-xl);">
          <p style="font-size: 1.1rem; color: var(--color-text-secondary); margin-bottom: 0.5rem;">Nenhuma candidata encontrada com os filtros selecionados.</p>
          <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('btnResetCandFilters').click()">
            Limpar Filtros
          </button>
        </div>
      `;
      return;
    }

    const tagColors = ['cand-tag-purple', 'cand-tag-pink', 'cand-tag-orange', 'cand-tag-yellow'];

    filtered.forEach(cand => {
      const card = document.createElement('div');
      card.className = 'candidate-card';

      const initials = (cand.socialName || cand.name)
        .split(' ')
        .filter(Boolean)
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

      card.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          <div class="candidate-header-row">
            <div class="candidate-avatar">
              ${cand.photo ? `<img src="${cand.photo}" alt="${cand.name}">` : `<span>${initials}</span>`}
            </div>
            <div class="candidate-identity">
              <div class="candidate-name">${cand.socialName || cand.name}</div>
              <div class="candidate-location">📍 ${cand.city}, ${cand.state} • ${cand.area}</div>
              <span class="candidate-target-opp">Vaga de interesse: ${cand.targetOpp}</span>
            </div>
          </div>

          <div class="candidate-formation-box">
            🎓 <strong>${cand.formation}</strong><br>
            <span style="font-size: 0.8rem; color: var(--color-text-muted);">${cand.institution}</span>
          </div>

          <div class="candidate-skills-wrap">
            ${cand.skills.slice(0, 5).map((sk, idx) => `<span class="cand-skill-tag ${tagColors[idx % tagColors.length]}">${sk}</span>`).join('')}
          </div>
        </div>

        <div class="candidate-footer-row">
          <span>📅 Candidatou-se em ${cand.appliedAt}</span>
          <button type="button" class="btn btn-primary btn-sm" onclick="window.openCandidateResume('${cand.id}')">
            📄 Ver Currículo Completo
          </button>
        </div>
      `;
      candidatesContainer.appendChild(card);
    });
  };

  // Executar renderização imediata do banco de talentos
  filterAndRenderCandidates();

  // Eventos de Busca & Filtro
  [searchCandidateInput, filterCandArea, filterCandFormation, filterCandType, filterCandLocation, filterCandSkill].forEach(el => {
    if (el) el.addEventListener('input', filterAndRenderCandidates);
    if (el) el.addEventListener('change', filterAndRenderCandidates);
  });

  if (btnResetCandFilters) {
    btnResetCandFilters.addEventListener('click', () => {
      if (searchCandidateInput) searchCandidateInput.value = '';
      if (filterCandArea) filterCandArea.value = 'ALL';
      if (filterCandFormation) filterCandFormation.value = 'ALL';
      if (filterCandType) filterCandType.value = 'ALL';
      if (filterCandLocation) filterCandLocation.value = 'ALL';
      if (filterCandSkill) filterCandSkill.value = 'ALL';
      filterAndRenderCandidates();
    });
  }

  // --- 7. MODAL DE VISUALIZAÇÃO DO CURRÍCULO DA CANDIDATA ---
  const candResumeModal = document.getElementById('candResumeModal');
  const btnCloseCandResumeModal = document.getElementById('btnCloseCandResumeModal');
  const candResumeBody = document.getElementById('candResumeBody');
  const contactModal = document.getElementById('contactModal');
  const btnCloseContactModal = document.getElementById('btnCloseContactModal');

  window.openCandidateResume = (candId) => {
    const cand = candidatesDatabase.find(c => c.id === candId);
    if (!cand || !candResumeBody) return;

    const initials = (cand.socialName || cand.name).split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase();

    candResumeBody.innerHTML = `
      <div class="cv-digital-sheet" style="box-shadow: none; border: none;">
        <div class="cv-sheet-topbar"></div>

        <header class="cv-header-area" style="padding: 1.5rem 0;">
          <div class="cv-avatar-wrapper">
            <div class="cv-avatar-circle" style="width: 84px; height: 84px; font-size: 1.8rem;">
              ${cand.photo ? `<img src="${cand.photo}" alt="${cand.name}">` : `<span>${initials}</span>`}
            </div>
          </div>
          <div class="cv-identity-info">
            <div class="cv-brand-tag">
              <span class="cv-brand-tag-dot"></span>
              <span>Talento AFESU Conecta</span>
            </div>
            <h2 class="cv-candidate-name" style="font-size: 1.6rem;">${cand.name}</h2>
            <div class="cv-headline-text">${cand.formation} • ${cand.area}</div>
            <div class="cv-contact-items-row">
              <span>📍 ${cand.city}, ${cand.state}</span>
              <span>✉️ ${cand.email}</span>
              <span>📱 ${cand.phone}</span>
            </div>
          </div>
        </header>

        <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1.5rem;">
          
          <div class="cv-section-block">
            <h3 class="cv-section-title">Objetivo Profissional</h3>
            <div class="cv-objective-card">
              <span class="cv-objective-quote">"${cand.objective}"</span>
            </div>
          </div>

          <div class="cv-section-block">
            <h3 class="cv-section-title">Formação Acadêmica</h3>
            <div class="cv-timeline">
              ${cand.formations.map(f => `
                <div class="cv-timeline-node">
                  <div class="cv-timeline-role">${f.course}</div>
                  <div class="cv-timeline-meta">
                    <span>${f.institution} • ${f.level}</span>
                    <span class="cv-timeline-period-badge">${f.status} (${f.endYear})</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="cv-section-block">
            <h3 class="cv-section-title">Experiências</h3>
            ${cand.noExperience || cand.experiences.length === 0 ? `
              <div class="cv-first-opp-banner">
                <div class="cv-first-opp-icon">🌱</div>
                <div class="cv-first-opp-content">
                  <h4>Buscando Primeira Oportunidade Profissional</h4>
                  <p>Formada com alto nível de capacitação técnica, responsabilidade e inteligência emocional nos programas de excelência da AFESU.</p>
                </div>
              </div>
            ` : `
              <div class="cv-timeline">
                ${cand.experiences.map(e => `
                  <div class="cv-timeline-node">
                    <div class="cv-timeline-role">${e.role} — ${e.company}</div>
                    <div class="cv-timeline-meta">
                      <span>${e.type}</span>
                      <span class="cv-timeline-period-badge">${e.startDate} até ${e.isCurrent ? 'o momento' : e.endDate}</span>
                    </div>
                    ${e.desc ? `<p class="cv-timeline-desc">${e.desc}</p>` : ''}
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <div class="cv-section-block">
            <h3 class="cv-section-title">Cursos & Certificações</h3>
            <div class="cv-courses-grid">
              ${cand.courses.map(c => `
                <div class="cv-course-card">
                  <div>
                    <div class="cv-course-name">${c.name}</div>
                    <div class="cv-course-info">${c.institution} • ${c.hours}h • ${c.year}</div>
                  </div>
                  ${c.hasCert ? `<div class="cv-cert-tag">🏅 Certificado</div>` : ''}
                </div>
              `).join('')}
            </div>
          </div>

          <div class="cv-section-block">
            <h3 class="cv-section-title">Minhas Habilidades</h3>
            <div class="cv-skills-cloud">
              ${cand.skills.map((s, i) => `<span class="cv-skill-chip chip-purple">${s}</span>`).join('')}
            </div>
          </div>

          <div class="cv-section-block">
            <h3 class="cv-section-title">Preferências</h3>
            <div class="cv-pref-list">
              <div class="cv-pref-row">
                <span class="cv-pref-label">Áreas de Interesse</span>
                <span class="cv-pref-value">${cand.interests?.areas?.join(', ') || cand.area}</span>
              </div>
              <div class="cv-pref-row">
                <span class="cv-pref-label">Tipos de Oportunidade</span>
                <span class="cv-pref-value">${cand.interests?.opportunityTypes?.join(', ') || 'Estágio, Emprego'}</span>
              </div>
              <div class="cv-pref-row">
                <span class="cv-pref-label">Formatos</span>
                <span class="cv-pref-value">${cand.interests?.formats?.join(', ') || 'Híbrido, Presencial'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    if (candResumeModal) candResumeModal.classList.add('active');
  };

  if (btnCloseCandResumeModal && candResumeModal) {
    btnCloseCandResumeModal.addEventListener('click', () => {
      candResumeModal.classList.remove('active');
    });
  }

  // Ação de Contato
  const btnContactCandidate = document.getElementById('btnContactCandidate');
  if (btnContactCandidate && contactModal) {
    btnContactCandidate.addEventListener('click', () => {
      contactModal.classList.add('active');
    });
  }

  if (btnCloseContactModal && contactModal) {
    btnCloseContactModal.addEventListener('click', () => {
      contactModal.classList.remove('active');
    });
  }

  // Fechar modais ao clicar no overlay
  [pubModal, candResumeModal, contactModal].forEach(m => {
    if (m) {
      m.addEventListener('click', (e) => {
        if (e.target === m) m.classList.remove('active');
      });
    }
  });

  // --- 8. GERENCIAMENTO DE LOGIN & SESSÃO DO PARCEIRO ---
  const sponsorLoginSection = document.getElementById('sponsorLoginSection');
  const formSponsorLogin = document.getElementById('formSponsorLogin');
  const sponsorEmail = document.getElementById('sponsorEmail');
  const btnSubmitSponsorLogin = document.getElementById('btnSubmitSponsorLogin');
  const btnSponsorLogout = document.getElementById('btnSponsorLogout');
  const sponsorDashboardWrap = document.getElementById('sponsorDashboardWrap');
  const btnEnterSponsor = document.getElementById('btnEnterSponsor');
  const btnLearnSponsor = document.getElementById('btnLearnSponsor');
  const sponsorGreetingTitle = document.getElementById('sponsorGreetingTitle');

  const checkPartnerAuth = () => {
    try {
      const auth = localStorage.getItem('afesu_auth_user');
      if (auth) {
        const parsed = JSON.parse(auth);
        return parsed && parsed.role === 'sponsor' ? parsed : null;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const updatePartnerAuthState = (isInitial = false) => {
    const partnerUser = checkPartnerAuth();

    if (partnerUser) {
      // Parceiro autenticado
      if (sponsorLoginSection) sponsorLoginSection.style.display = 'none';
      if (sponsorDashboardWrap) sponsorDashboardWrap.style.display = 'flex';
      if (sponsorGreetingTitle) {
        sponsorGreetingTitle.textContent = `Olá, ${partnerUser.name || 'Empresa Parceira'}!`;
      }
      if (btnEnterSponsor) {
        btnEnterSponsor.innerHTML = `
          <span>Acessar Banco de Talentos</span>
          <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
        `;
      }
    } else {
      // Parceiro não autenticado - exibe sessão de login
      if (sponsorLoginSection) sponsorLoginSection.style.display = 'block';
      if (sponsorDashboardWrap) sponsorDashboardWrap.style.display = 'none';
      if (btnEnterSponsor) {
        btnEnterSponsor.innerHTML = `
          <span>Fazer Login como Parceiro</span>
          <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
        `;
      }
    }
  };

  // Submissão do Formulário de Login do Parceiro
  if (formSponsorLogin) {
    formSponsorLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      if (btnSubmitSponsorLogin) {
        btnSubmitSponsorLogin.innerHTML = '<span>Entrando...</span>';
        btnSubmitSponsorLogin.style.opacity = '0.8';
      }

      const emailVal = sponsorEmail ? sponsorEmail.value.trim() : 'contato@empresa-parceira.com.br';
      const userObj = {
        role: 'sponsor',
        name: 'Empresa Parceira AFESU',
        email: emailVal,
        loginTime: new Date().toISOString()
      };

      try {
        localStorage.setItem('afesu_auth_user', JSON.stringify(userObj));
      } catch (err) {
        console.error('Erro ao salvar sessão de parceiro:', err);
      }

      setTimeout(() => {
        if (btnSubmitSponsorLogin) {
          btnSubmitSponsorLogin.innerHTML = `
            <span>Acessar Banco de Talentos</span>
            <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
          `;
          btnSubmitSponsorLogin.style.opacity = '1';
        }
        updatePartnerAuthState();
        if (sponsorDashboardWrap) {
          sponsorDashboardWrap.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400);
    });
  }

  // Logout do Parceiro
  if (btnSponsorLogout) {
    btnSponsorLogout.addEventListener('click', () => {
      if (confirm('Deseja encerrar a sessão de empresa parceira?')) {
        localStorage.removeItem('afesu_auth_user');
        updatePartnerAuthState();
        if (sponsorLoginSection) {
          sponsorLoginSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // Botões de Entrada Hero
  if (btnEnterSponsor) {
    btnEnterSponsor.addEventListener('click', () => {
      const partnerUser = checkPartnerAuth();
      if (partnerUser) {
        if (sponsorDashboardWrap) {
          sponsorDashboardWrap.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        if (sponsorLoginSection) {
          sponsorLoginSection.scrollIntoView({ behavior: 'smooth' });
          if (sponsorEmail) sponsorEmail.focus();
        }
      }
    });
  }

  if (btnLearnSponsor) {
    btnLearnSponsor.addEventListener('click', () => {
      alert('🌟 A AFESU é uma organização sem fins lucrativos que há mais de 60 anos capacita e transforma a vida de mulheres jovens através de formação técnica e humana de excelência.');
    });
  }

  // --- 8. CONTROLE DE NAVEGAÇÃO POR ABAS EXCLUSIVAS (ISOLAMENTO TOTAL) ---
  window.switchSponsorTab = (targetTabId) => {
    // 1. Alternar painéis
    const tabPanes = document.querySelectorAll('.sponsor-tab-content-pane');
    tabPanes.forEach(pane => {
      if (pane.id === targetTabId) {
        pane.style.display = 'block';
        pane.classList.add('active');
      } else {
        pane.style.display = 'none';
        pane.classList.remove('active');
      }
    });

    // 2. Atualizar links do cabeçalho
    document.querySelectorAll('.sponsor-tab-link, [data-tab]').forEach(link => {
      if (link.getAttribute('data-tab') === targetTabId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // Delegação global de cliques para garantir funcionamento de qualquer aba
  document.addEventListener('click', (e) => {
    const tabLink = e.target.closest('.sponsor-tab-link, [data-tab]');
    if (tabLink) {
      e.preventDefault();
      const target = tabLink.getAttribute('data-tab');
      if (target) {
        window.switchSponsorTab(target);
        if (sponsorDashboardWrap) {
          sponsorDashboardWrap.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  });

  // Vincular botão de abrir modal de publicação
  document.addEventListener('click', (e) => {
    const btnPub = e.target.closest('#btnOpenPubModal, [data-action="open-pub-modal"]');
    if (btnPub) {
      e.preventDefault();
      if (formPublishOpp) formPublishOpp.reset();
      const editingId = document.getElementById('pubEditingId');
      if (editingId) editingId.value = '';
      const pubTitle = document.getElementById('pubModalTitle');
      if (pubTitle) pubTitle.textContent = '+ Publicar Nova Oportunidade';
      if (courseExtraFields) courseExtraFields.classList.remove('active');
      if (pubModal) pubModal.classList.add('active');
    }
  });

  // Inicialização
  updatePartnerAuthState(true);
  window.switchSponsorTab('tabGeral');
  filterAndRenderCandidates();
});
