/**
 * AFESU CONECTA — CURRÍCULO DIGITAL (LÓGICA & DADOS DINÂMICOS)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Dados de Exemplo Padrão (utilizados caso a usuária ainda não tenha salvo no localStorage)
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
        course: 'Ensino Técnico em Administração & Tecnologia',
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
    skills: ['Comunicação', 'Organização', 'Trabalho em equipe', 'Excel', 'Criatividade', 'Atendimento ao cliente', 'HTML & CSS'],
    interests: {
      areas: ['Administração', 'Tecnologia', 'Marketing'],
      opportunityTypes: ['Estágio', 'Emprego', 'Capacitação'],
      formats: ['Híbrido', 'Remoto', 'Presencial'],
      cities: ['São Paulo', 'Osasco', 'Santo André']
    },
    completeness: 100
  };

  // Carregar perfil real do localStorage ou fallback
  let profile = defaultSampleProfile;
  try {
    const saved = localStorage.getItem('afesu_profile');
    if (saved) {
      profile = JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Erro ao ler perfil para o currículo:', e);
  }

  // Garantir integridade de estruturas internas
  profile.personal = profile.personal || {};
  profile.formations = profile.formations || [];
  profile.experiences = profile.experiences || [];
  profile.courses = profile.courses || [];
  profile.skills = profile.skills || [];
  profile.interests = profile.interests || { areas: [], opportunityTypes: [], formats: [], cities: [] };

  // --- 1. Renderizar Cabeçalho do Currículo ---
  const cvAvatar = document.getElementById('cvAvatar');
  const cvFullName = document.getElementById('cvFullName');
  const cvHeadline = document.getElementById('cvHeadline');
  const cvLocation = document.getElementById('cvLocation');
  const cvEmail = document.getElementById('cvEmail');
  const cvPhone = document.getElementById('cvPhone');
  const cvCompletenessVal = document.getElementById('cvCompletenessVal');
  const cvProgressBar = document.getElementById('cvProgressBar');

  // Foto / Avatar
  if (cvAvatar) {
    if (profile.photo) {
      cvAvatar.innerHTML = `<img src="${profile.photo}" alt="Foto de ${profile.personal.fullName || 'Aluna'}">`;
    } else {
      const nameForInitials = profile.personal.socialName || profile.personal.fullName || 'AF';
      const initials = nameForInitials
        .split(' ')
        .filter(Boolean)
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
      cvAvatar.innerHTML = `<span>${initials || 'AF'}</span>`;
    }
  }

  // Nome Completo / Social
  if (cvFullName) {
    cvFullName.textContent = profile.personal.socialName || profile.personal.fullName || 'Aluna AFESU';
  }

  // Headline (Áreas de Interesse / Curso Principal)
  if (cvHeadline) {
    if (profile.interests.areas && profile.interests.areas.length > 0) {
      cvHeadline.textContent = profile.interests.areas.join(' • ');
    } else if (profile.formations.length > 0) {
      cvHeadline.textContent = `${profile.formations[0].course} • Talento AFESU`;
    } else {
      cvHeadline.textContent = 'Desenvolvimento Profissional • AFESU';
    }
  }

  // Localização
  if (cvLocation) {
    const city = profile.personal.city || 'São Paulo';
    const state = profile.personal.state || 'SP';
    cvLocation.textContent = `${city}, ${state}`;
  }

  // Contatos
  if (cvEmail) {
    cvEmail.textContent = profile.personal.email || 'contato@afesu.org.br';
  }

  if (cvPhone) {
    cvPhone.textContent = profile.personal.phone || '(11) 98765-4321';
  }

  // Cálculo e Exibição da Completude Real
  let completeness = profile.completeness;
  if (typeof completeness !== 'number') {
    let score = 0;
    if (profile.personal.fullName && profile.personal.email && profile.personal.city) score += 30;
    if (profile.formations.length > 0) score += 25;
    if (profile.experiences.length > 0 || profile.noExperience) score += 15;
    if (profile.courses.length > 0) score += 10;
    if (profile.skills.length > 0) score += 10;
    if (profile.interests.areas && profile.interests.areas.length > 0) score += 10;
    completeness = Math.min(100, Math.max(10, score));
  }

  if (cvCompletenessVal) {
    cvCompletenessVal.textContent = `${completeness}%`;
  }
  if (cvProgressBar) {
    cvProgressBar.style.width = `${completeness}%`;
  }

  // --- 2. Objetivo Profissional ---
  const cvObjectiveText = document.getElementById('cvObjectiveText');
  if (cvObjectiveText) {
    if (profile.personal.bio && profile.personal.bio.trim().length > 0) {
      cvObjectiveText.textContent = `"${profile.personal.bio.trim()}"`;
    } else if (profile.noExperience || profile.experiences.length === 0) {
      cvObjectiveText.textContent = '"Busco minha primeira oportunidade profissional para colocar em prática meus conhecimentos, desenvolver novas habilidades e crescer profissionalmente com dedicação e ética."';
    } else {
      cvObjectiveText.textContent = '"Buscando uma oportunidade para desenvolver minhas habilidades, adquirir experiência e contribuir positivamente com a equipe e os resultados da organização."';
    }
  }

  // --- 3. Seção "Sobre Mim" ---
  const cvAboutContainer = document.getElementById('cvAboutContainer');
  if (cvAboutContainer) {
    if (profile.personal.bio && profile.personal.bio.trim().length > 0) {
      cvAboutContainer.innerHTML = `<p class="cv-about-text">${profile.personal.bio.trim()}</p>`;
    } else {
      cvAboutContainer.innerHTML = `
        <p class="cv-about-text">
          Sou uma estudante dedicada e focada em desenvolver minhas habilidades profissionais, aprender continuamente e conquistar novas oportunidades no mercado de trabalho com o apoio da formação integral da AFESU.
        </p>
      `;
    }
  }

  // --- 4. Seção "Formação Acadêmica" ---
  const cvFormationsList = document.getElementById('cvFormationsList');
  if (cvFormationsList) {
    if (profile.formations.length > 0) {
      // Ordenar cronologicamente decrescente por ano
      const sortedFormations = [...profile.formations].sort((a, b) => {
        const yearA = parseInt(a.endYear, 10) || 0;
        const yearB = parseInt(b.endYear, 10) || 0;
        return yearB - yearA;
      });

      cvFormationsList.innerHTML = sortedFormations.map(f => `
        <div class="cv-timeline-node">
          <div class="cv-timeline-role">${f.course}</div>
          <div class="cv-timeline-meta">
            <span>${f.institution}</span>
            <span>•</span>
            <span>${f.level || 'Ensino Técnico'}</span>
            <span class="cv-timeline-period-badge">${f.status === 'Concluído' ? `Concluído em ${f.endYear}` : `Previsão: ${f.endYear}`}</span>
          </div>
        </div>
      `).join('');
    } else {
      cvFormationsList.innerHTML = `
        <div class="cv-empty-hint">Nenhuma formação acadêmica cadastrada ainda.</div>
      `;
    }
  }

  // --- 5. Seção "Experiência" ---
  const cvExperiencesContainer = document.getElementById('cvExperiencesContainer');
  if (cvExperiencesContainer) {
    if (profile.noExperience || (!profile.experiences || profile.experiences.length === 0)) {
      cvExperiencesContainer.innerHTML = `
        <div class="cv-first-opp-banner">
          <div class="cv-first-opp-icon">🌱</div>
          <div class="cv-first-opp-content">
            <h4>Buscando Minha Primeira Oportunidade Profissional</h4>
            <p>Preparada através dos programas de formação cidadã, técnica e socioemocional da AFESU. Pronta para aprender com rapidez, assumir responsabilidades e gerar impacto positivo.</p>
          </div>
        </div>
      `;
    } else {
      cvExperiencesContainer.innerHTML = `
        <div class="cv-timeline">
          ${profile.experiences.map(e => `
            <div class="cv-timeline-node">
              <div class="cv-timeline-role">${e.role}</div>
              <div class="cv-timeline-meta">
                <span>${e.company}</span>
                <span>•</span>
                <span>${e.type || 'Profissional'}</span>
                <span class="cv-timeline-period-badge">${e.startDate} até ${e.isCurrent ? 'o momento (atual)' : e.endDate}</span>
              </div>
              ${e.desc ? `<p class="cv-timeline-desc">${e.desc}</p>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  // --- 6. Seção "Cursos & Certificações" ---
  const cvCoursesContainer = document.getElementById('cvCoursesContainer');
  if (cvCoursesContainer) {
    if (profile.courses && profile.courses.length > 0) {
      cvCoursesContainer.innerHTML = `
        <div class="cv-courses-grid">
          ${profile.courses.map(c => `
            <div class="cv-course-card">
              <div>
                <div class="cv-course-name">${c.name}</div>
                <div class="cv-course-info">${c.institution} • ${c.hours ? `${c.hours}h` : ''} • Ano ${c.year}</div>
              </div>
              ${c.hasCert ? `
                <div class="cv-cert-tag">
                  <span>🏅</span> Certificado
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `;
    } else {
      cvCoursesContainer.innerHTML = `
        <div class="cv-empty-hint">Nenhum curso complementar ou certificação adicionada ainda.</div>
      `;
    }
  }

  // --- 7. Seção "Minhas Habilidades" ---
  const cvSkillsContainer = document.getElementById('cvSkillsContainer');
  if (cvSkillsContainer) {
    if (profile.skills && profile.skills.length > 0) {
      const chipClasses = ['chip-purple', 'chip-pink', 'chip-orange', 'chip-yellow'];
      cvSkillsContainer.innerHTML = `
        <div class="cv-skills-cloud">
          ${profile.skills.map((skill, idx) => {
            const colorClass = chipClasses[idx % chipClasses.length];
            return `<span class="cv-skill-chip ${colorClass}">${skill}</span>`;
          }).join('')}
        </div>
      `;
    } else {
      cvSkillsContainer.innerHTML = `
        <div class="cv-empty-hint">Adicione suas principais habilidades no seu perfil.</div>
      `;
    }
  }

  // --- 8. Seção "Áreas de Interesse" ---
  const cvInterestsContainer = document.getElementById('cvInterestsContainer');
  if (cvInterestsContainer) {
    const areas = profile.interests.areas || [];
    if (areas.length > 0) {
      cvInterestsContainer.innerHTML = `
        <div class="cv-interest-badges">
          ${areas.map(area => `<span class="cv-interest-pill">${area}</span>`).join('')}
        </div>
      `;
    } else {
      cvInterestsContainer.innerHTML = `
        <div class="cv-empty-hint">Nenhuma área selecionada.</div>
      `;
    }
  }

  // --- 9. Seção "Preferências Profissionais" ---
  const cvPrefTypes = document.getElementById('cvPrefTypes');
  const cvPrefFormats = document.getElementById('cvPrefFormats');
  const cvPrefCities = document.getElementById('cvPrefCities');

  if (cvPrefTypes) {
    const types = profile.interests.opportunityTypes || [];
    cvPrefTypes.textContent = types.length > 0 ? types.join(', ') : 'Estágio, Emprego, Capacitação';
  }

  if (cvPrefFormats) {
    const formats = profile.interests.formats || [];
    cvPrefFormats.textContent = formats.length > 0 ? formats.join(', ') : 'Presencial, Híbrido, Remoto';
  }

  if (cvPrefCities) {
    const cities = profile.interests.cities || [];
    cvPrefCities.textContent = cities.length > 0 ? cities.join(', ') : 'São Paulo e Região Metropolitana';
  }

  // --- 10. Ações da Barra de Ferramentas ---

  // Botão Imprimir / Salvar PDF
  const btnPrintCv = document.getElementById('btnPrintCv');
  if (btnPrintCv) {
    btnPrintCv.addEventListener('click', () => {
      window.print();
    });
  }

  // Botão Modo de Visualização Limpa
  const btnToggleCleanView = document.getElementById('btnToggleCleanView');
  const btnExitCleanView = document.getElementById('btnExitCleanView');

  if (btnToggleCleanView) {
    btnToggleCleanView.addEventListener('click', () => {
      document.body.classList.add('clean-view-active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (btnExitCleanView) {
    btnExitCleanView.addEventListener('click', () => {
      document.body.classList.remove('clean-view-active');
    });
  }

  // Modais de Candidatura e Compartilhamento
  const applyModal = document.getElementById('applyModal');
  const shareModal = document.getElementById('shareModal');
  const btnApplyCv = document.getElementById('btnApplyCv');
  const btnShareCv = document.getElementById('btnShareCv');
  const btnCloseApplyModal = document.getElementById('btnCloseApplyModal');
  const btnCloseShareModal = document.getElementById('btnCloseShareModal');

  if (btnApplyCv && applyModal) {
    btnApplyCv.addEventListener('click', () => {
      applyModal.classList.add('active');
    });
  }

  if (btnShareCv && shareModal) {
    btnShareCv.addEventListener('click', () => {
      shareModal.classList.add('active');
    });
  }

  if (btnCloseApplyModal && applyModal) {
    btnCloseApplyModal.addEventListener('click', () => {
      applyModal.classList.remove('active');
    });
  }

  if (btnCloseShareModal && shareModal) {
    btnCloseShareModal.addEventListener('click', () => {
      shareModal.classList.remove('active');
    });
  }

  // Fechar modais ao clicar no overlay
  [applyModal, shareModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  });
});
