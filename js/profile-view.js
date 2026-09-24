/**
 * AFESU CONECTA — PÁGINA DE PERFIL & CURRÍCULO DIGITAL (LÓGICA)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Dados de Exemplo Padrão (caso a usuária ainda não tenha preenchido)
  const defaultSampleProfile = {
    photo: null,
    personal: {
      fullName: 'Mariana Silva de Oliveira',
      socialName: 'Mariana Silva',
      email: 'mariana.silva@exemplo.com',
      phone: '(11) 98765-4321',
      city: 'São Paulo',
      state: 'SP',
      birthDate: '2004-05-14',
      bio: 'Estudante dedicada da AFESU com forte interesse em tecnologia, desenvolvimento web e rotinas administrativas. Busco minha primeira oportunidade como estagiária ou jovem profissional para aplicar meus conhecimentos práticos e crescer junto à empresa.'
    },
    formations: [
      {
        institution: 'AFESU Veleiros',
        course: 'Técnico em Tecnologia & Programação Web',
        level: 'Ensino técnico',
        status: 'Concluído',
        endYear: '2026'
      },
      {
        institution: 'E.E. Professora Maria José',
        course: 'Ensino Médio Regular',
        level: 'Ensino médio',
        status: 'Concluído',
        endYear: '2024'
      }
    ],
    experiences: [],
    noExperience: true,
    courses: [
      {
        name: 'Excel para o Mercado de Trabalho',
        institution: 'AFESU Conecta Capacitações',
        hours: '40',
        year: '2026',
        hasCert: true
      },
      {
        name: 'Comunicação Assertiva e Pitch Pessoal',
        institution: 'AFESU Veleiros',
        hours: '24',
        year: '2025',
        hasCert: true
      }
    ],
    skills: ['HTML & CSS', 'JavaScript', 'Comunicação', 'Organização', 'Trabalho em equipe', 'Excel', 'Atendimento ao cliente'],
    interests: {
      areas: ['Tecnologia', 'Administração', 'Design'],
      opportunityTypes: ['Estágio', 'Emprego'],
      formats: ['Híbrido', 'Remoto', 'Presencial'],
      cities: ['São Paulo', 'Osasco', 'Santo André']
    },
    completeness: 100
  };

  // Carregar dados salvos do localStorage
  let userProfile = defaultSampleProfile;
  let isCustom = false;

  try {
    const saved = localStorage.getItem('afesu_profile');
    if (saved) {
      userProfile = JSON.parse(saved);
      isCustom = true;
    }
  } catch (e) {
    console.warn('Erro ao ler perfil do localStorage', e);
  }

  // --- 1. Renderizar Cabeçalho do Perfil ---
  const viewAvatarEl = document.getElementById('viewProfileAvatar');
  const viewFullNameEl = document.getElementById('viewFullName');
  const viewHeadlineEl = document.getElementById('viewHeadline');
  const viewLocationEl = document.getElementById('viewLocation');
  const viewEmailEl = document.getElementById('viewEmail');
  const viewPhoneEl = document.getElementById('viewPhone');
  const completenessPercentEl = document.getElementById('completenessPercent');
  const completenessBarEl = document.getElementById('completenessBar');

  if (viewAvatarEl) {
    if (userProfile.photo) {
      viewAvatarEl.innerHTML = `<img src="${userProfile.photo}" alt="Foto de ${userProfile.personal.fullName}">`;
    } else {
      const initials = (userProfile.personal.fullName || 'AF')
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
      viewAvatarEl.innerHTML = `<span>${initials}</span>`;
    }
  }

  if (viewFullNameEl) {
    viewFullNameEl.textContent = userProfile.personal.socialName || userProfile.personal.fullName;
  }

  if (viewHeadlineEl) {
    const primaryFormation = userProfile.formations[0] ? userProfile.formations[0].course : 'Talento AFESU';
    viewHeadlineEl.textContent = `${primaryFormation} • Aluna Verificada AFESU`;
  }

  if (viewLocationEl) {
    viewLocationEl.textContent = `${userProfile.personal.city}, ${userProfile.personal.state}`;
  }

  if (viewEmailEl) viewEmailEl.textContent = userProfile.personal.email;
  if (viewPhoneEl) viewPhoneEl.textContent = userProfile.personal.phone || 'Telefone não informado';

  const percent = userProfile.completeness || 100;
  if (completenessPercentEl) completenessPercentEl.textContent = `${percent}%`;
  if (completenessBarEl) completenessBarEl.style.width = `${percent}%`;

  // --- 2. Renderizar "Sobre Mim" ---
  const viewBioEl = document.getElementById('viewBio');
  if (viewBioEl) {
    viewBioEl.textContent = userProfile.personal.bio || 'Aluna e profissional capacitada pelos programas de excelência da AFESU.';
  }

  // --- 3. Renderizar Formações ---
  const viewFormationsList = document.getElementById('viewFormationsList');
  if (viewFormationsList) {
    if (userProfile.formations && userProfile.formations.length > 0) {
      viewFormationsList.innerHTML = userProfile.formations.map(f => `
        <div class="timeline-item">
          <div class="timeline-role">${f.course}</div>
          <div class="timeline-company">${f.institution} • ${f.level}</div>
          <div class="timeline-period">${f.status === 'Concluído' ? `Concluído em ${f.endYear}` : `Previsão: ${f.endYear}`}</div>
        </div>
      `).join('');
    } else {
      viewFormationsList.innerHTML = '<p style="color: var(--color-text-muted);">Nenhuma formação cadastrada.</p>';
    }
  }

  // --- 4. Renderizar Experiências (ou banner de primeira oportunidade) ---
  const viewExperiencesContainer = document.getElementById('viewExperiencesContainer');
  if (viewExperiencesContainer) {
    if (userProfile.noExperience || (!userProfile.experiences || userProfile.experiences.length === 0)) {
      viewExperiencesContainer.innerHTML = `
        <div class="first-opportunity-badge-box">
          <div class="first-opp-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div class="first-opp-text">
            <h4>Buscando Minha Primeira Oportunidade Profissional</h4>
            <p>Pronta para aplicar conhecimentos técnicos, dedicação e ética profissional desenvolvidos na AFESU em vagas de estágio ou júnior.</p>
          </div>
        </div>
      `;
    } else {
      viewExperiencesContainer.innerHTML = `
        <div class="timeline-list">
          ${userProfile.experiences.map(exp => `
            <div class="timeline-item">
              <div class="timeline-role">${exp.role}</div>
              <div class="timeline-company">${exp.company} • ${exp.type}</div>
              <div class="timeline-period">${exp.startDate} até ${exp.isCurrent ? 'o momento (atual)' : exp.endDate}</div>
              <div class="timeline-desc">${exp.desc || ''}</div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  // --- 5. Renderizar Cursos & Certificações ---
  const viewCoursesList = document.getElementById('viewCoursesList');
  if (viewCoursesList) {
    if (userProfile.courses && userProfile.courses.length > 0) {
      viewCoursesList.innerHTML = userProfile.courses.map(c => `
        <div class="course-item-box">
          <div class="course-name">${c.name}</div>
          <div class="course-inst">${c.institution} • ${c.hours}h • Concluído em ${c.year} ${c.hasCert ? '• Selo de Certificado' : ''}</div>
        </div>
      `).join('');
    } else {
      viewCoursesList.innerHTML = '<p style="color: var(--color-text-muted);">Nenhum curso complementar informado.</p>';
    }
  }

  // --- 6. Renderizar Habilidades (Nuvem de Chips) ---
  const viewSkillsList = document.getElementById('viewSkillsList');
  if (viewSkillsList) {
    if (userProfile.skills && userProfile.skills.length > 0) {
      viewSkillsList.innerHTML = userProfile.skills.map((s, idx) => {
        const classes = ['chip-purple', 'chip-pink', 'chip-orange', 'chip-yellow'];
        const chosen = classes[idx % classes.length];
        return `<span class="chip ${chosen}">${s}</span>`;
      }).join('');
    } else {
      viewSkillsList.innerHTML = '<p style="color: var(--color-text-muted);">Nenhuma habilidade selecionada.</p>';
    }
  }

  // --- 7. Renderizar Preferências ---
  const viewInterestsAreas = document.getElementById('viewInterestsAreas');
  const viewInterestsTypes = document.getElementById('viewInterestsTypes');
  const viewInterestsFormats = document.getElementById('viewInterestsFormats');
  const viewInterestsCities = document.getElementById('viewInterestsCities');

  if (viewInterestsAreas) {
    viewInterestsAreas.textContent = (userProfile.interests && userProfile.interests.areas.length > 0)
      ? userProfile.interests.areas.join(', ')
      : 'Todas as áreas';
  }

  if (viewInterestsTypes) {
    viewInterestsTypes.textContent = (userProfile.interests && userProfile.interests.opportunityTypes.length > 0)
      ? userProfile.interests.opportunityTypes.join(', ')
      : 'Estágio e Emprego';
  }

  if (viewInterestsFormats) {
    viewInterestsFormats.textContent = (userProfile.interests && userProfile.interests.formats.length > 0)
      ? userProfile.interests.formats.join(', ')
      : 'Híbrido e Remoto';
  }

  if (viewInterestsCities) {
    viewInterestsCities.textContent = (userProfile.interests && userProfile.interests.cities.length > 0)
      ? userProfile.interests.cities.join(', ')
      : 'São Paulo e Região Metropolitana';
  }

  // --- 8. Modal de Visualização do Currículo Digital ---
  const cvModal = document.getElementById('cvModal');
  const btnOpenCvModal = document.getElementById('btnOpenCvModal');
  const btnCloseCvModal = document.getElementById('btnCloseCvModal');
  const cvPaperContainer = document.getElementById('cvPaperContainer');

  const generateCvLayout = () => {
    if (!cvPaperContainer) return;

    cvPaperContainer.innerHTML = `
      <div class="cv-paper">
        <div class="cv-header-block">
          <h2 class="cv-name">${userProfile.personal.fullName}</h2>
          <div class="cv-contact-row">
            <span>📍 ${userProfile.personal.city}, ${userProfile.personal.state}</span>
            <span>✉️ ${userProfile.personal.email}</span>
            <span>📱 ${userProfile.personal.phone || '(11) 98765-4321'}</span>
          </div>
        </div>

        <div class="cv-section">
          <h3 class="cv-section-title">Objetivo Profissional</h3>
          <p class="cv-item-desc">${userProfile.personal.bio || 'Atuar com dedicação, aplicando conhecimentos adquiridos na AFESU para gerar valor e desenvolvimento mútuo.'}</p>
        </div>

        <div class="cv-section">
          <h3 class="cv-section-title">Formação Acadêmica</h3>
          ${userProfile.formations.map(f => `
            <div class="cv-item">
              <div class="cv-item-title">${f.course} — ${f.level}</div>
              <div class="cv-item-sub">${f.institution} • ${f.status} (${f.endYear})</div>
            </div>
          `).join('')}
        </div>

        <div class="cv-section">
          <h3 class="cv-section-title">Experiências</h3>
          ${userProfile.noExperience || userProfile.experiences.length === 0 ? `
            <div class="cv-item">
              <div class="cv-item-title">Buscando Primeira Experiência Profissional</div>
              <div class="cv-item-desc">Formada e qualificada pelos programas de capacitação técnica e desenvolvimento socioemocional da AFESU.</div>
            </div>
          ` : userProfile.experiences.map(e => `
            <div class="cv-item">
              <div class="cv-item-title">${e.role} — ${e.company} (${e.type})</div>
              <div class="cv-item-sub">${e.startDate} até ${e.isCurrent ? 'o momento' : e.endDate}</div>
              <div class="cv-item-desc">${e.desc || ''}</div>
            </div>
          `).join('')}
        </div>

        ${userProfile.courses && userProfile.courses.length > 0 ? `
          <div class="cv-section">
            <h3 class="cv-section-title">Cursos & Certificações</h3>
            ${userProfile.courses.map(c => `
              <div class="cv-item">
                <div class="cv-item-title">${c.name} (${c.hours}h)</div>
                <div class="cv-item-sub">${c.institution} • Concluído em ${c.year}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div class="cv-section">
          <h3 class="cv-section-title">Principais Habilidades</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.4rem;">
            ${userProfile.skills.map(s => `<span class="chip chip-purple" style="font-size: 0.8rem;">${s}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  };

  if (btnOpenCvModal && cvModal) {
    btnOpenCvModal.addEventListener('click', () => {
      generateCvLayout();
      cvModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (btnCloseCvModal && cvModal) {
    btnCloseCvModal.addEventListener('click', () => {
      cvModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) {
        cvModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
