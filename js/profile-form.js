/**
 * AFESU CONECTA — ONBOARDING & FORMULÁRIO MULTIETAPAS DE PERFIL
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Estado do Perfil ---
  let currentStep = 1;
  const totalSteps = 7;

  const profileData = {
    photo: null,
    personal: {
      fullName: '',
      socialName: '',
      email: '',
      phone: '',
      city: 'São Paulo',
      state: 'SP',
      birthDate: '',
      bio: ''
    },
    formations: [],
    experiences: [],
    noExperience: false,
    courses: [],
    skills: [],
    interests: {
      areas: [],
      opportunityTypes: [],
      formats: [],
      cities: []
    }
  };

  // Carregar dados salvos se existirem
  try {
    const saved = localStorage.getItem('afesu_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(profileData, parsed);
    }
  } catch (e) {
    console.warn('Erro ao carregar dados salvos', e);
  }

  // --- 2. Elementos de Navegação e Progresso ---
  const stepCards = document.querySelectorAll('.form-step-card');
  const stepNavItems = document.querySelectorAll('.step-nav-item');
  const progressBarFill = document.getElementById('progressBarFill');
  const currentStepNum = document.getElementById('currentStepNum');
  const progressPercentText = document.getElementById('progressPercentText');

  const btnPrevStep = document.getElementById('btnPrevStep');
  const btnNextStep = document.getElementById('btnNextStep');
  const btnSubmitProfile = document.getElementById('btnSubmitProfile');

  // --- 3. Controle de Foto de Perfil ---
  const photoFileInput = document.getElementById('photoFileInput');
  const btnSelectPhoto = document.getElementById('btnSelectPhoto');
  const btnRemovePhoto = document.getElementById('btnRemovePhoto');
  const photoPreviewCircle = document.getElementById('photoPreviewCircle');

  const updateAvatarPreview = () => {
    if (profileData.photo) {
      photoPreviewCircle.innerHTML = `<img src="${profileData.photo}" alt="Foto de Perfil">`;
      btnRemovePhoto.style.display = 'inline-flex';
    } else {
      const initials = profileData.personal.fullName
        ? profileData.personal.fullName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
        : 'AF';
      photoPreviewCircle.innerHTML = `<span>${initials}</span>`;
      btnRemovePhoto.style.display = 'none';
    }
  };

  if (btnSelectPhoto && photoFileInput) {
    btnSelectPhoto.addEventListener('click', () => photoFileInput.click());

    photoFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          profileData.photo = event.target.result;
          updateAvatarPreview();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (btnRemovePhoto) {
    btnRemovePhoto.addEventListener('click', () => {
      profileData.photo = null;
      if (photoFileInput) photoFileInput.value = '';
      updateAvatarPreview();
    });
  }

  // --- 4. Atualização Visual do Progresso e Etapa Ativa ---
  const goToStep = (stepNumber) => {
    if (stepNumber < 1 || stepNumber > totalSteps) return;

    currentStep = stepNumber;

    // Alternar visibilidade dos cards de etapa
    stepCards.forEach(card => {
      const step = parseInt(card.getAttribute('data-step'), 10);
      if (step === currentStep) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // Atualizar marcadores na barra superior
    stepNavItems.forEach(item => {
      const step = parseInt(item.getAttribute('data-step-target'), 10);
      item.classList.remove('active', 'completed');
      if (step === currentStep) {
        item.classList.add('active');
      } else if (step < currentStep) {
        item.classList.add('completed');
      }
    });

    // Atualizar barra de porcentagem da etapa
    const stepPercent = Math.round((currentStep / totalSteps) * 100);
    if (progressBarFill) progressBarFill.style.width = `${stepPercent}%`;
    if (currentStepNum) currentStepNum.textContent = currentStep;
    if (progressPercentText) progressPercentText.textContent = `${stepPercent}%`;

    // Botões Inferiores
    if (btnPrevStep) {
      btnPrevStep.style.display = currentStep === 1 ? 'none' : 'inline-flex';
    }

    if (currentStep === totalSteps) {
      if (btnNextStep) btnNextStep.style.display = 'none';
      if (btnSubmitProfile) btnSubmitProfile.style.display = 'inline-flex';
      renderReviewSummary();
    } else {
      if (btnNextStep) btnNextStep.style.display = 'inline-flex';
      if (btnSubmitProfile) btnSubmitProfile.style.display = 'none';
    }

    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Permitir clicar nos números de etapas anteriores
  stepNavItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = parseInt(item.getAttribute('data-step-target'), 10);
      if (target < currentStep) {
        goToStep(target);
      }
    });
  });

  // --- 5. Validação de Etapas ---
  const validateCurrentStep = () => {
    let isValid = true;

    // Etapa 1: Pessoais
    if (currentStep === 1) {
      const nameInput = document.getElementById('inputFullName');
      const emailInput = document.getElementById('inputEmail');
      const cityInput = document.getElementById('inputCity');
      const stateInput = document.getElementById('inputState');

      // Nome
      if (!nameInput.value.trim()) {
        showInputError(nameInput, 'Informe seu nome completo.');
        isValid = false;
      } else {
        clearInputError(nameInput);
      }

      // E-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showInputError(emailInput, 'Digite um e-mail válido.');
        isValid = false;
      } else {
        clearInputError(emailInput);
      }

      // Cidade
      if (!cityInput.value.trim()) {
        showInputError(cityInput, 'Informe sua cidade.');
        isValid = false;
      } else {
        clearInputError(cityInput);
      }

      // Estado
      if (!stateInput.value.trim()) {
        showInputError(stateInput, 'Informe seu estado.');
        isValid = false;
      } else {
        clearInputError(stateInput);
      }

      if (isValid) {
        profileData.personal.fullName = nameInput.value.trim();
        profileData.personal.socialName = document.getElementById('inputSocialName').value.trim();
        profileData.personal.email = emailInput.value.trim();
        profileData.personal.phone = document.getElementById('inputPhone').value.trim();
        profileData.personal.city = cityInput.value.trim();
        profileData.personal.state = stateInput.value.trim();
        profileData.personal.birthDate = document.getElementById('inputBirthDate').value;
        profileData.personal.bio = document.getElementById('inputBio').value.trim();
        updateAvatarPreview();
      }
    }

    // Etapa 2: Formação
    if (currentStep === 2) {
      if (profileData.formations.length === 0) {
        alert('Por favor, adicione pelo menos uma formação acadêmica ou técnica.');
        isValid = false;
      }
    }

    return isValid;
  };

  const showInputError = (input, msg) => {
    input.classList.add('has-error');
    const group = input.closest('.form-group');
    if (group) {
      let errEl = group.querySelector('.form-error-msg');
      if (!errEl) {
        errEl = document.createElement('div');
        errEl.className = 'form-error-msg visible';
        group.appendChild(errEl);
      }
      errEl.textContent = msg;
      errEl.classList.add('visible');
    }
  };

  const clearInputError = (input) => {
    input.classList.remove('has-error');
    const group = input.closest('.form-group');
    if (group) {
      const errEl = group.querySelector('.form-error-msg');
      if (errEl) errEl.classList.remove('visible');
    }
  };

  // Botões Próximo / Voltar
  if (btnNextStep) {
    btnNextStep.addEventListener('click', () => {
      if (validateCurrentStep()) {
        goToStep(currentStep + 1);
      }
    });
  }

  if (btnPrevStep) {
    btnPrevStep.addEventListener('click', () => {
      goToStep(currentStep - 1);
    });
  }

  // --- 6. Gerenciamento Dinâmico: FORMAÇÕES (Etapa 2) ---
  const formationsListEl = document.getElementById('formationsList');
  const btnAddFormation = document.getElementById('btnAddFormation');
  const formationModal = document.getElementById('formationModal');
  const formFormation = document.getElementById('formFormation');
  const modalFormationClose = document.getElementById('modalFormationClose');

  const renderFormations = () => {
    if (!formationsListEl) return;
    formationsListEl.innerHTML = '';

    if (profileData.formations.length === 0) {
      formationsListEl.innerHTML = `
        <div style="text-align: center; padding: 1.5rem; color: var(--color-text-muted); font-size: 0.9rem; background: var(--color-bg-subtle); border-radius: var(--radius-md);">
          Nenhuma formação adicionada ainda. Clique no botão abaixo para adicionar.
        </div>
      `;
      return;
    }

    profileData.formations.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'dynamic-item-card';
      card.innerHTML = `
        <div>
          <div class="item-card-title">${item.course}</div>
          <div class="item-card-subtitle">${item.institution} • ${item.level}</div>
          <div class="item-card-meta">${item.status === 'Concluído' ? `Concluído em ${item.endYear}` : `Previsão: ${item.endYear}`}</div>
        </div>
        <div class="item-card-actions">
          <button type="button" class="btn-card-action" onclick="window.removeFormation(${index})" title="Excluir formação">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      `;
      formationsListEl.appendChild(card);
    });
  };

  window.removeFormation = (index) => {
    profileData.formations.splice(index, 1);
    renderFormations();
  };

  if (btnAddFormation && formationModal) {
    btnAddFormation.addEventListener('click', () => {
      formFormation.reset();
      formationModal.classList.add('active');
    });

    modalFormationClose.addEventListener('click', () => {
      formationModal.classList.remove('active');
    });

    formFormation.addEventListener('submit', (e) => {
      e.preventDefault();
      const newFormation = {
        institution: document.getElementById('eduInst').value.trim(),
        course: document.getElementById('eduCourse').value.trim(),
        level: document.getElementById('eduLevel').value,
        status: document.getElementById('eduStatus').value,
        endYear: document.getElementById('eduYear').value.trim()
      };

      profileData.formations.push(newFormation);
      renderFormations();
      formationModal.classList.remove('active');
    });
  }

  // --- 7. Gerenciamento Dinâmico: EXPERIÊNCIAS (Etapa 3) ---
  const experiencesListEl = document.getElementById('experiencesList');
  const btnAddExperience = document.getElementById('btnAddExperience');
  const experienceModal = document.getElementById('experienceModal');
  const formExperience = document.getElementById('formExperience');
  const modalExperienceClose = document.getElementById('modalExperienceClose');
  const noExperienceCheckbox = document.getElementById('noExperienceCheckbox');
  const noExpEncouragement = document.getElementById('noExpEncouragement');
  const expSectionContent = document.getElementById('expSectionContent');

  if (noExperienceCheckbox) {
    noExperienceCheckbox.addEventListener('change', (e) => {
      profileData.noExperience = e.target.checked;
      if (profileData.noExperience) {
        noExpEncouragement.classList.add('visible');
        if (expSectionContent) expSectionContent.style.opacity = '0.4';
      } else {
        noExpEncouragement.classList.remove('visible');
        if (expSectionContent) expSectionContent.style.opacity = '1';
      }
    });
  }

  const renderExperiences = () => {
    if (!experiencesListEl) return;
    experiencesListEl.innerHTML = '';

    if (profileData.experiences.length === 0) {
      experiencesListEl.innerHTML = `
        <div style="text-align: center; padding: 1.5rem; color: var(--color-text-muted); font-size: 0.9rem; background: var(--color-bg-subtle); border-radius: var(--radius-md);">
          Nenhuma experiência adicionada.
        </div>
      `;
      return;
    }

    profileData.experiences.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'dynamic-item-card';
      card.innerHTML = `
        <div>
          <div class="item-card-title">${item.role}</div>
          <div class="item-card-subtitle">${item.company} • ${item.type}</div>
          <div class="item-card-meta">${item.startDate} até ${item.isCurrent ? 'o momento (atual)' : item.endDate}</div>
          <div class="item-card-desc" style="font-size: 0.85rem; color: var(--color-text-secondary); margin-top: 0.25rem;">${item.desc}</div>
        </div>
        <div class="item-card-actions">
          <button type="button" class="btn-card-action" onclick="window.removeExperience(${index})" title="Excluir experiência">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      `;
      experiencesListEl.appendChild(card);
    });
  };

  window.removeExperience = (index) => {
    profileData.experiences.splice(index, 1);
    renderExperiences();
  };

  if (btnAddExperience && experienceModal) {
    btnAddExperience.addEventListener('click', () => {
      formExperience.reset();
      experienceModal.classList.add('active');
    });

    modalExperienceClose.addEventListener('click', () => {
      experienceModal.classList.remove('active');
    });

    formExperience.addEventListener('submit', (e) => {
      e.preventDefault();
      const isCurrent = document.getElementById('expCurrent').checked;
      const newExp = {
        company: document.getElementById('expCompany').value.trim(),
        role: document.getElementById('expRole').value.trim(),
        type: document.getElementById('expType').value,
        startDate: document.getElementById('expStart').value,
        endDate: isCurrent ? '' : document.getElementById('expEnd').value,
        isCurrent: isCurrent,
        desc: document.getElementById('expDesc').value.trim()
      };

      profileData.experiences.push(newExp);
      profileData.noExperience = false;
      if (noExperienceCheckbox) noExperienceCheckbox.checked = false;
      if (noExpEncouragement) noExpEncouragement.classList.remove('visible');
      if (expSectionContent) expSectionContent.style.opacity = '1';

      renderExperiences();
      experienceModal.classList.remove('active');
    });
  }

  // --- 8. Gerenciamento Dinâmico: CURSOS (Etapa 4) ---
  const coursesListEl = document.getElementById('coursesList');
  const btnAddCourse = document.getElementById('btnAddCourse');
  const courseModal = document.getElementById('courseModal');
  const formCourse = document.getElementById('formCourse');
  const modalCourseClose = document.getElementById('modalCourseClose');

  const renderCourses = () => {
    if (!coursesListEl) return;
    coursesListEl.innerHTML = '';

    if (profileData.courses.length === 0) {
      coursesListEl.innerHTML = `
        <div style="text-align: center; padding: 1.5rem; color: var(--color-text-muted); font-size: 0.9rem; background: var(--color-bg-subtle); border-radius: var(--radius-md);">
          Nenhum curso extracurricular adicionado.
        </div>
      `;
      return;
    }

    profileData.courses.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'dynamic-item-card';
      card.innerHTML = `
        <div>
          <div class="item-card-title">${item.name}</div>
          <div class="item-card-subtitle">${item.institution} • ${item.hours}h</div>
          <div class="item-card-meta">Concluído em ${item.year} ${item.hasCert ? '• Possui Certificado' : ''}</div>
        </div>
        <div class="item-card-actions">
          <button type="button" class="btn-card-action" onclick="window.removeCourse(${index})" title="Excluir curso">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      `;
      coursesListEl.appendChild(card);
    });
  };

  window.removeCourse = (index) => {
    profileData.courses.splice(index, 1);
    renderCourses();
  };

  if (btnAddCourse && courseModal) {
    btnAddCourse.addEventListener('click', () => {
      formCourse.reset();
      courseModal.classList.add('active');
    });

    modalCourseClose.addEventListener('click', () => {
      courseModal.classList.remove('active');
    });

    formCourse.addEventListener('submit', (e) => {
      e.preventDefault();
      const newCourse = {
        name: document.getElementById('curName').value.trim(),
        institution: document.getElementById('curInst').value.trim(),
        hours: document.getElementById('curHours').value.trim(),
        year: document.getElementById('curYear').value.trim(),
        hasCert: document.getElementById('curCert').value === 'sim'
      };

      profileData.courses.push(newCourse);
      renderCourses();
      courseModal.classList.remove('active');
    });
  }

  // --- 9. Habilidades (Etapa 5) ---
  const skillChipBtns = document.querySelectorAll('.skill-chip-btn');
  const inputCustomSkill = document.getElementById('inputCustomSkill');
  const btnAddCustomSkill = document.getElementById('btnAddCustomSkill');
  const activeSkillsListEl = document.getElementById('activeSkillsList');

  const renderActiveSkills = () => {
    if (!activeSkillsListEl) return;
    activeSkillsListEl.innerHTML = '';

    profileData.skills.forEach(skill => {
      const tag = document.createElement('span');
      tag.className = 'active-skill-tag';
      tag.innerHTML = `
        <span>${skill}</span>
        <button type="button" class="btn-remove-skill" onclick="window.removeSkill('${skill}')" aria-label="Remover habilidade">✕</button>
      `;
      activeSkillsListEl.appendChild(tag);
    });

    // Sincronizar botões pré-definidos
    skillChipBtns.forEach(btn => {
      const skillName = btn.getAttribute('data-skill');
      if (profileData.skills.includes(skillName)) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });
  };

  skillChipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const skill = btn.getAttribute('data-skill');
      if (profileData.skills.includes(skill)) {
        profileData.skills = profileData.skills.filter(s => s !== skill);
      } else {
        profileData.skills.push(skill);
      }
      renderActiveSkills();
    });
  });

  if (btnAddCustomSkill && inputCustomSkill) {
    const addCustom = () => {
      const val = inputCustomSkill.value.trim();
      if (val && !profileData.skills.includes(val)) {
        profileData.skills.push(val);
        inputCustomSkill.value = '';
        renderActiveSkills();
      }
    };

    btnAddCustomSkill.addEventListener('click', addCustom);
    inputCustomSkill.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addCustom();
      }
    });
  }

  window.removeSkill = (skill) => {
    profileData.skills = profileData.skills.filter(s => s !== skill);
    renderActiveSkills();
  };

  // --- 10. Interesses e Preferências (Etapa 6) ---
  const areaCheckboxes = document.querySelectorAll('input[name="interestArea"]');
  const typeCheckboxes = document.querySelectorAll('input[name="interestType"]');
  const formatCheckboxes = document.querySelectorAll('input[name="interestFormat"]');
  const inputInterestCities = document.getElementById('inputInterestCities');

  const syncInterestsState = () => {
    profileData.interests.areas = Array.from(areaCheckboxes).filter(c => c.checked).map(c => c.value);
    profileData.interests.opportunityTypes = Array.from(typeCheckboxes).filter(c => c.checked).map(c => c.value);
    profileData.interests.formats = Array.from(formatCheckboxes).filter(c => c.checked).map(c => c.value);
    if (inputInterestCities) {
      profileData.interests.cities = inputInterestCities.value.split(',').map(c => c.trim()).filter(Boolean);
    }
  };

  areaCheckboxes.forEach(c => c.addEventListener('change', () => {
    c.closest('.interest-checkbox-card').classList.toggle('selected', c.checked);
    syncInterestsState();
  }));

  typeCheckboxes.forEach(c => c.addEventListener('change', () => {
    c.closest('.interest-checkbox-card').classList.toggle('selected', c.checked);
    syncInterestsState();
  }));

  formatCheckboxes.forEach(c => c.addEventListener('change', () => {
    c.closest('.interest-checkbox-card').classList.toggle('selected', c.checked);
    syncInterestsState();
  }));

  if (inputInterestCities) {
    inputInterestCities.addEventListener('input', syncInterestsState);
  }

  // --- 11. Cálculo Real de Completude & Resumo de Revisão (Etapa 7) ---
  const calculateCompleteness = () => {
    let score = 0;

    // Pessoais (30 pontos)
    if (profileData.personal.fullName && profileData.personal.email && profileData.personal.city && profileData.personal.state) {
      score += 25;
      if (profileData.photo) score += 5;
    }

    // Formação (25 pontos)
    if (profileData.formations.length > 0) {
      score += 25;
    }

    // Experiências (15 pontos)
    if (profileData.experiences.length > 0 || profileData.noExperience) {
      score += 15;
    }

    // Cursos (10 pontos)
    if (profileData.courses.length > 0) {
      score += 10;
    }

    // Habilidades (10 pontos)
    if (profileData.skills.length >= 3) {
      score += 10;
    } else if (profileData.skills.length > 0) {
      score += 5;
    }

    // Interesses (10 pontos)
    if (profileData.interests.areas.length > 0 && profileData.interests.opportunityTypes.length > 0) {
      score += 10;
    }

    return Math.min(100, Math.max(0, score));
  };

  const renderReviewSummary = () => {
    syncInterestsState();
    const percent = calculateCompleteness();

    const gaugeVal = document.getElementById('reviewGaugeValue');
    const gaugeMsg = document.getElementById('reviewGaugeMsg');
    if (gaugeVal) gaugeVal.textContent = `${percent}%`;
    if (gaugeMsg) {
      gaugeMsg.textContent = percent === 100 
        ? 'Excelente! Seu perfil está 100% completo e pronto para encontrar novas oportunidades!' 
        : 'Seu perfil já está ótimo! Complete os detalhes adicionais para aumentar suas chances com recrutadores.';
    }

    // Pessoais
    const reviewPersonal = document.getElementById('reviewPersonal');
    if (reviewPersonal) {
      reviewPersonal.innerHTML = `
        <div class="review-data-grid">
          <div class="review-data-item"><strong>Nome:</strong> ${profileData.personal.fullName || '—'}</div>
          <div class="review-data-item"><strong>E-mail:</strong> ${profileData.personal.email || '—'}</div>
          <div class="review-data-item"><strong>Cidade/UF:</strong> ${profileData.personal.city || '—'} - ${profileData.personal.state || '—'}</div>
          <div class="review-data-item"><strong>Telefone:</strong> ${profileData.personal.phone || 'Não informado'}</div>
        </div>
      `;
    }

    // Formação
    const reviewFormations = document.getElementById('reviewFormations');
    if (reviewFormations) {
      reviewFormations.innerHTML = profileData.formations.map(f => `
        <div style="margin-bottom: 0.5rem;">
          <strong>${f.course}</strong> — ${f.institution} (${f.level}) • ${f.status} (${f.endYear})
        </div>
      `).join('') || '<span style="color: var(--color-text-muted);">Nenhuma formação adicionada.</span>';
    }

    // Experiências
    const reviewExperiences = document.getElementById('reviewExperiences');
    if (reviewExperiences) {
      if (profileData.noExperience) {
        reviewExperiences.innerHTML = `
          <div style="color: var(--color-yellow-800); font-weight: 600;">
            🌱 Buscando a primeira oportunidade profissional.
          </div>
        `;
      } else if (profileData.experiences.length > 0) {
        reviewExperiences.innerHTML = profileData.experiences.map(e => `
          <div style="margin-bottom: 0.5rem;">
            <strong>${e.role}</strong> na ${e.company} (${e.type}) • ${e.startDate} até ${e.isCurrent ? 'o momento' : e.endDate}
          </div>
        `).join('');
      } else {
        reviewExperiences.innerHTML = '<span style="color: var(--color-text-muted);">Nenhuma experiência informada.</span>';
      }
    }

    // Cursos
    const reviewCourses = document.getElementById('reviewCourses');
    if (reviewCourses) {
      reviewCourses.innerHTML = profileData.courses.map(c => `
        <div style="margin-bottom: 0.35rem;">
          <strong>${c.name}</strong> (${c.institution} • ${c.hours}h • ${c.year})
        </div>
      `).join('') || '<span style="color: var(--color-text-muted);">Nenhum curso adicional informado.</span>';
    }

    // Habilidades
    const reviewSkills = document.getElementById('reviewSkills');
    if (reviewSkills) {
      reviewSkills.innerHTML = profileData.skills.length > 0
        ? `<div class="active-skills-list">${profileData.skills.map(s => `<span class="active-skill-tag">${s}</span>`).join('')}</div>`
        : '<span style="color: var(--color-text-muted);">Nenhuma habilidade selecionada.</span>';
    }

    // Interesses
    const reviewInterests = document.getElementById('reviewInterests');
    if (reviewInterests) {
      reviewInterests.innerHTML = `
        <div class="review-data-grid">
          <div class="review-data-item"><strong>Áreas de Interesse:</strong> ${profileData.interests.areas.join(', ') || 'Todas'}</div>
          <div class="review-data-item"><strong>Tipos de Oportunidade:</strong> ${profileData.interests.opportunityTypes.join(', ') || 'Todos'}</div>
          <div class="review-data-item"><strong>Formatos:</strong> ${profileData.interests.formats.join(', ') || 'Sem preferência'}</div>
          <div class="review-data-item"><strong>Cidades:</strong> ${profileData.interests.cities.join(', ') || 'São Paulo e Região'}</div>
        </div>
      `;
    }
  };

  // Botões de editar direto no resumo
  document.querySelectorAll('[data-edit-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseInt(btn.getAttribute('data-edit-step'), 10);
      goToStep(step);
    });
  });

  // --- 12. Finalização & Gravação do Perfil ---
  const successModal = document.getElementById('successModal');

  if (btnSubmitProfile) {
    btnSubmitProfile.addEventListener('click', () => {
      if (!validateCurrentStep()) return;

      syncInterestsState();
      profileData.completeness = calculateCompleteness();
      profileData.updatedAt = new Date().toISOString();

      // Salvar no localStorage
      try {
        localStorage.setItem('afesu_profile', JSON.stringify(profileData));
        localStorage.setItem('afesu_auth_user', JSON.stringify({
          role: 'student',
          name: profileData.personal.fullName || 'Mariana Silva',
          email: profileData.personal.email || 'mariana.silva@exemplo.com',
          loginTime: new Date().toISOString()
        }));
      } catch (e) {
        console.error('Erro ao gravar no localStorage', e);
      }

      // Exibir Modal de Sucesso
      if (successModal) {
        successModal.classList.add('active');
      } else {
        window.location.href = 'perfil.html';
      }
    });
  }

  // Preencher inputs existentes para permitir edição fluida
  const populateFormInputs = () => {
    if (profileData.personal) {
      const p = profileData.personal;
      const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el && val !== undefined && val !== null) el.value = val;
      };
      setVal('inputFullName', p.fullName);
      setVal('inputSocialName', p.socialName);
      setVal('inputEmail', p.email);
      setVal('inputPhone', p.phone);
      setVal('inputCity', p.city || 'São Paulo');
      setVal('inputState', p.state || 'SP');
      setVal('inputBirthDate', p.birthDate);
      setVal('inputBio', p.bio);
    }

    if (profileData.interests) {
      const areas = profileData.interests.areas || [];
      areaCheckboxes.forEach(c => {
        c.checked = areas.includes(c.value);
        c.closest('.interest-checkbox-card')?.classList.toggle('selected', c.checked);
      });

      const types = profileData.interests.opportunityTypes || [];
      typeCheckboxes.forEach(c => {
        c.checked = types.includes(c.value);
        c.closest('.interest-checkbox-card')?.classList.toggle('selected', c.checked);
      });

      const formats = profileData.interests.formats || [];
      formatCheckboxes.forEach(c => {
        c.checked = formats.includes(c.value);
        c.closest('.interest-checkbox-card')?.classList.toggle('selected', c.checked);
      });

      if (inputInterestCities && profileData.interests.cities) {
        inputInterestCities.value = profileData.interests.cities.join(', ');
      }
    }

    if (profileData.noExperience && noExperienceCheckbox) {
      noExperienceCheckbox.checked = true;
      if (noExpEncouragement) noExpEncouragement.classList.add('visible');
      if (expSectionContent) expSectionContent.style.opacity = '0.4';
    }
  };

  // Inicialização
  populateFormInputs();
  updateAvatarPreview();
  renderFormations();
  renderExperiences();
  renderCourses();
  renderActiveSkills();
  goToStep(1);
});
