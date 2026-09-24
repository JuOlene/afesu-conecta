/**
 * AFESU CONECTA — BASE DE DADOS FICTÍCIA DE OPORTUNIDADES
 * Estrutura preparada para integração com API / Banco de Dados
 */

const OPPORTUNITIES_DATA = [
  // --- 1. EMPREGOS (4) ---
  {
    id: 'emp-1',
    category: 'EMPREGO',
    type: 'Emprego',
    title: 'Assistente Administrativo',
    company: 'Empresa Parceira AFESU',
    location: 'São Paulo, SP',
    format: 'Híbrido',
    area: 'Administração',
    shortDescription: 'Estamos buscando uma pessoa organizada e interessada em desenvolver suas habilidades na área administrativa e rotinas de escritório.',
    fullDescription: 'A Empresa Parceira AFESU busca uma profissional para atuar como Assistente Administrativo em sua sede em São Paulo. Você integrará um time acolhedor com foco em processos internos, atendimento telefônico e digital, organização de arquivos e apoio direto às lideranças.',
    requirements: [
      'Formação ou cursando curso na AFESU (Administração, Gestão ou correlatos)',
      'Conhecimento intermediário em Pacote Office / Google Workspace',
      'Boa comunicação verbal e escrita',
      'Organização, pontualidade e proatividade'
    ],
    activities: [
      'Emissão e controle de planilhas e relatórios administrativos',
      'Atendimento e recepção de fornecedores e clientes',
      'Apoio na organização de documentos fiscais e cadastros',
      'Auxílio no controle de suprimentos e comunicação interna'
    ],
    benefits: [
      'Vale Refeição / Alimentação (R$ 38,00/dia)',
      'Vale Transporte ou Auxílio Mobilidade',
      'Plano de Saúde e Odontológico',
      'Programa de Mentoria e Desenvolvimento Contínuo'
    ],
    publishedAt: '2026-09-18',
    isFavorite: false
  },
  {
    id: 'emp-2',
    category: 'EMPREGO',
    type: 'Emprego',
    title: 'Assistente de Atendimento',
    company: 'Conecta Serviços',
    location: 'Osasco, SP',
    format: 'Presencial',
    area: 'Atendimento',
    shortDescription: 'Oportunidade para atuar no suporte e relacionamento com clientes com excelência e empatia.',
    fullDescription: 'A Conecta Serviços está expandindo seu time de atendimento em Osasco. O papel é essencial para garantir uma experiência acolhedora e eficiente aos clientes, resolvendo solicitações via chat, telefone e e-mail.',
    requirements: [
      'Ensino médio completo ou formação técnica na AFESU',
      'Gosto por relacionamento interpessoal e resolução de problemas',
      'Facilidade com digitação e ferramentas de atendimento',
      'Residir em Osasco ou regiões de fácil acesso'
    ],
    activities: [
      'Atendimento multicanal (voz, e-mail e mensagens instantâneas)',
      'Registro de chamados e encaminhamento para áreas técnicas',
      'Acompanhamento de solicitações até a resolução final',
      'Feedback contínuo para melhorias nos processos'
    ],
    benefits: [
      'Salário compatível com o mercado',
      'Vale Transporte e Vale Refeição',
      'Auxílio Creche',
      'Convênio com Academias e Plataforma de Cursos'
    ],
    publishedAt: '2026-09-15',
    isFavorite: false
  },
  {
    id: 'emp-3',
    category: 'EMPREGO',
    type: 'Emprego',
    title: 'Auxiliar de Marketing',
    company: 'Nova Ideia Comunicação',
    location: 'São Paulo, SP',
    format: 'Híbrido',
    area: 'Marketing',
    shortDescription: 'Apoio na criação de conteúdos digitais, gestão de redes sociais e métricas de campanhas.',
    fullDescription: 'A Nova Ideia Comunicação convida talentos da AFESU para compor seu time criativo. Você participará do planejamento e execução de campanhas digitais, geração de relatórios de engajamento e relacionamento com a comunidade online.',
    requirements: [
      'Formação ou estudos em Marketing, Publicidade ou Comunicação',
      'Familiaridade com redes sociais (Instagram, TikTok, LinkedIn)',
      'Conhecimento básico em Canva ou ferramentas de design (Figma/Photoshop é um plus)',
      'Criatividade e boa redação publicitária'
    ],
    activities: [
      'Auxílio no agendamento e publicação de postagens',
      'Pesquisa de tendências e referências para campanhas',
      'Extração de métricas de redes sociais e preparação de apresentações',
      'Interação com seguidores e moderação de comentários'
    ],
    benefits: [
      'Regime Híbrido (2 dias presenciais / 3 dias home office)',
      'Vale Refeição e Seguro de Vida',
      'Bolsa incentivo para cursos de especialização',
      'Ambiente descontraído e colaborativo'
    ],
    publishedAt: '2026-09-19',
    isFavorite: false
  },
  {
    id: 'emp-4',
    category: 'EMPREGO',
    type: 'Emprego',
    title: 'Assistente de Recursos Humanos',
    company: 'Grupo Futuro',
    location: 'Guarulhos, SP',
    format: 'Presencial',
    area: 'Recursos Humanos',
    shortDescription: 'Atuação em processos de recrutamento e seleção, onboarding de colaboradoras e rotinas de departamento pessoal.',
    fullDescription: 'O Grupo Futuro valoriza a formação humana da AFESU e busca uma Assistente de RH para apoiar no ciclo de vida das colaboradoras, desde o agendamento de entrevistas até o acolhimento nos primeiros dias de trabalho.',
    requirements: [
      'Formação técnica ou superior em Gestão de RH, Psicologia ou Administração',
      'Habilidade para lidar com pessoas com discrição e empatia',
      'Conhecimento básico em legislação trabalhista e rotinas de admissão',
      'Facilidade de aprendizado em sistemas de RH'
    ],
    activities: [
      'Triagem de currículos e agendamento de entrevistas',
      'Apoio na integração de novos contratados (Onboarding)',
      'Organização de prontuários e conferência de ponto eletrônico',
      'Auxílio nas ações internas de clima organizacional e datas comemorativas'
    ],
    benefits: [
      'Vale Alimentação e Vale Transporte',
      'Assistência Médica e Odontológica',
      'Plano de Carreira estruturado',
      'Descontos em farmácias e faculdades parceiras'
    ],
    publishedAt: '2026-09-12',
    isFavorite: false
  },

  // --- 2. ESTÁGIOS (4) ---
  {
    id: 'est-1',
    category: 'ESTÁGIO',
    type: 'Estágio',
    title: 'Estágio em Administração',
    company: 'Empresa Parceira AFESU',
    location: 'São Paulo, SP',
    format: 'Híbrido',
    area: 'Administração',
    shortDescription: 'Desenvolva suas habilidades práticas em rotinas financeiras, compras e suporte à gestão.',
    fullDescription: 'Programa de estágio estruturado para alunas da AFESU que desejam vivenciar o dia a dia corporativo em um ambiente que prioriza o aprendizado prático e a mentoria individual.',
    requirements: [
      'Estar cursando formação técnica ou superior na área de Administração/Gestão',
      'Disponibilidade para 6 horas diárias (manhã ou tarde)',
      'Vontade de aprender e espírito de equipe',
      'Conhecimento básico de Excel'
    ],
    activities: [
      'Apoio no controle de contas a pagar e a receber',
      'Lançamento de notas fiscais em sistema ERP',
      'Elaboração de relatórios semanais de acompanhamento',
      'Participação em reuniões de alinhamento com tutoria'
    ],
    benefits: [
      'Bolsa-auxílio de R$ 1.500,00',
      'Vale Refeição (R$ 30,00/dia) + Vale Transporte',
      'Mentoria exclusiva com profissionais experientes',
      'Possibilidade de efetivação após 12 meses'
    ],
    publishedAt: '2026-09-20',
    isFavorite: false
  },
  {
    id: 'est-2',
    category: 'ESTÁGIO',
    type: 'Estágio',
    title: 'Estágio em Comunicação',
    company: 'Conecta Comunicação',
    location: 'São Paulo, SP',
    format: 'Presencial',
    area: 'Comunicação',
    shortDescription: 'Vivência em assessoria de imprensa, redação de comunicados internos e cobertura de eventos institucionais.',
    fullDescription: 'Oportunidade para estudantes de Comunicação e Jornalismo desenvolverem textos dinâmicos, newsletters internas e participarem de projetos audiovisuais com suporte de mentoras especializadas.',
    requirements: [
      'Cursando Comunicação Social, Jornalismo, Relações Públicas ou Letras',
      'Excelente redação e domínio da língua portuguesa',
      'Interesse por narrativa institucional e mídias sociais',
      'Disponibilidade para 30h semanais'
    ],
    activities: [
      'Redação de matérias para o portal interno e boletins informativos',
      'Apoio na cobertura de eventos e workshops corporativos',
      'Entrevistas com lideranças e colaboradoras para matérias especiais',
      'Revisão de textos e diagramação de comunicados'
    ],
    benefits: [
      'Bolsa-auxílio de R$ 1.400,00',
      'Vale Transporte e Vale Lanche',
      'Recesso remunerado proporcional',
      'Treinamentos mensais de técnicas de escrita e oratória'
    ],
    publishedAt: '2026-09-17',
    isFavorite: false
  },
  {
    id: 'est-3',
    category: 'ESTÁGIO',
    type: 'Estágio',
    title: 'Estágio em Tecnologia',
    company: 'TechStart',
    location: 'São Paulo, SP',
    format: 'Híbrido',
    area: 'Tecnologia',
    shortDescription: 'Inicie sua jornada na área de desenvolvimento de software, suporte web e testes de sistemas com time ágil.',
    fullDescription: 'A TechStart é parceira da AFESU no incentivo à presença de mulheres na tecnologia. O estágio oferece imersão prática em HTML, CSS, JavaScript, versionamento com Git e metodologias ágeis (Scrum/Kanban).',
    requirements: [
      'Estudante de cursos técnicos ou superiores em TI, Sistemas, Programação ou Análise de Dados',
      'Conhecimentos iniciais em HTML, CSS e lógica de programação',
      'Curiosidade técnica e vontade de construir soluções digitais',
      'Disponibilidade para modelo híbrido (2x semana presencial)'
    ],
    activities: [
      'Apoio no desenvolvimento e manutenção de páginas web',
      'Realização de testes funcionais e registro de melhorias',
      'Participação nas cerimônias ágeis (Dailies, Plannings e Retrospectivas)',
      'Pair programming com pessoas desenvolvedoras seniores'
    ],
    benefits: [
      'Bolsa-auxílio de R$ 1.800,00',
      'Auxílio Home Office e Vale Refeição',
      'Assinatura de plataformas de cursos de tecnologia',
      'Trilha de aceleração para vaga Júnior'
    ],
    publishedAt: '2026-09-21',
    isFavorite: false
  },
  {
    id: 'est-4',
    category: 'ESTÁGIO',
    type: 'Estágio',
    title: 'Estágio em Recursos Humanos',
    company: 'Grupo Futuro',
    location: 'Osasco, SP',
    format: 'Presencial',
    area: 'Recursos Humanos',
    shortDescription: 'Aprenda sobre atração de talentos, dinâmicas de grupo e programas de bem-estar corporativo.',
    fullDescription: 'O Grupo Futuro abre vagas de estágio voltadas para alunas da AFESU que desejam se especializar em Gestão de Pessoas, oferecendo contato direto com os principais subsistemas de RH.',
    requirements: [
      'Cursando RH, Psicologia ou Administração',
      'Gosto por ouvir pessoas e postura acolhedora',
      'Organização e boa comunicação interpessoal',
      'Disponibilidade para 6h diárias'
    ],
    activities: [
      'Convocação de candidatas e apoio na logística de processos seletivos',
      'Auxílio no preparo de kits de boas-vindas e materiais de treinamento',
      'Atualização do banco de talentos e métricas de contratação',
      'Apoio em projetos de desenvolvimento e diversidade'
    ],
    benefits: [
      'Bolsa-auxílio de R$ 1.350,00',
      'Vale Transporte e Alimentação no local',
      'Seguro de Acidentes Pessoais',
      'Acompanhamento psicopedagógico e plano de estágio'
    ],
    publishedAt: '2026-09-14',
    isFavorite: false
  },

  // --- 3. CURSOS (4) ---
  {
    id: 'cur-1',
    category: 'CURSO',
    type: 'Curso',
    title: 'Curso de Excel para o Mercado de Trabalho',
    company: 'Instituição Parceira AFESU',
    location: 'Remoto',
    format: 'Remoto',
    area: 'Administração',
    shortDescription: 'Aprenda desde fórmulas fundamentais, formatação condicional até tabelas dinâmicas e dashboards para se destacar.',
    fullDescription: 'Capacitação prática 100% online pensada para preparar alunas e ex-alunas para os testes práticos de processos seletivos e demandas cotidianas de escritórios modernos.',
    duration: '40 horas (4 semanas)',
    targetAudience: 'Alunas e ex-alunas da AFESU que desejam dominar planilhas para áreas administrativas, financeiras e de atendimento.',
    courseContent: [
      'Módulo 1: Fundamentos, atalhos essenciais e formatação inteligente',
      'Módulo 2: Fórmulas essenciais (SOMA, MÉDIA, SE, PROCV, PROCX)',
      'Módulo 3: Tabelas Dinâmicas, segmentação de dados e gráficos',
      'Módulo 4: Criação de um Mini Dashboard corporativo e Projeto Final'
    ],
    benefits: [
      'Certificado de Conclusão emitido por parceiro institucional',
      'Aulas gravadas com encontros síncronos semanais para tirar dúvidas',
      'Exercícios práticos com correção individualizada',
      '100% gratuito para alunas AFESU'
    ],
    publishedAt: '2026-09-19',
    isFavorite: false
  },
  {
    id: 'cur-2',
    category: 'CURSO',
    type: 'Curso',
    title: 'Curso de Comunicação Profissional',
    company: 'Instituição Parceira AFESU',
    location: 'Remoto',
    format: 'Remoto',
    area: 'Comunicação',
    shortDescription: 'Desenvolva sua oratória, redação de e-mails corporativos, postura profissional e técnicas de apresentação.',
    fullDescription: 'Comunicação assertiva é uma das habilidades mais valorizadas pelo mercado de trabalho. Neste curso interativo, você perderá o medo de falar em público e aprenderá a expressar suas ideias com clareza e autoridade.',
    duration: '24 horas (3 semanas)',
    targetAudience: 'Estudantes e profissionais em início de carreira que desejam aumentar sua autoconfiança em entrevistas e reuniões.',
    courseContent: [
      'Módulo 1: Fundamentos da comunicação assertiva e linguagem corporal',
      'Módulo 2: Redação corporativa impecável (e-mails, mensagens e relatórios)',
      'Módulo 3: Técnicas de oratória, controle de ansiedade e pitch pessoal',
      'Módulo 4: Simulação de apresentações e feedback construtivo'
    ],
    benefits: [
      'Mentoria em pequenos grupos para treino prático de fala',
      'Material complementar em PDF e modelos prontos de e-mail',
      'Certificado de conclusão com selo AFESU',
      'Acesso a rede de contatos com profissionais da área'
    ],
    publishedAt: '2026-09-16',
    isFavorite: false
  },
  {
    id: 'cur-3',
    category: 'CURSO',
    type: 'Curso',
    title: 'Curso de Introdução à Tecnologia',
    company: 'Instituição Parceira AFESU',
    location: 'São Paulo, SP',
    format: 'Híbrido',
    area: 'Tecnologia',
    shortDescription: 'Conheça o universo da programação, desenvolvimento web, lógica e as principais carreiras em tecnologia.',
    fullDescription: 'Capacitação introdutória e imersiva para mulheres que têm curiosidade sobre o mercado de tecnologia. Aprenda os conceitos iniciais de lógica de programação, crie sua primeira página web e conheça os caminhos de carreira em tech.',
    duration: '60 horas (6 semanas)',
    targetAudience: 'Jovens que desejam dar os primeiros passos na área de tecnologia sem necessidade de conhecimento prévio.',
    courseContent: [
      'Módulo 1: O mercado de tecnologia e suas diversas áreas de atuação',
      'Módulo 2: Lógica de programação com exemplos visuais e interativos',
      'Módulo 3: HTML5 e CSS3 — construindo sua primeira página na web',
      'Módulo 4: Introdução ao JavaScript e publicação do seu projeto online'
    ],
    benefits: [
      'Laboratórios presenciais equipados nas unidades da AFESU',
      'Acompanhamento com monitoras da área técnica',
      'Certificado reconhecido por empresas parceiras do setor de tecnologia',
      'Acesso prioritário a processos seletivos de estágio na área'
    ],
    publishedAt: '2026-09-20',
    isFavorite: false
  },
  {
    id: 'cur-4',
    category: 'CURSO',
    type: 'Curso',
    title: 'Curso de Preparação para Entrevistas',
    company: 'Instituição Parceira AFESU',
    location: 'Remoto',
    format: 'Remoto',
    area: 'Comunicação',
    shortDescription: 'Domine técnicas para entrevistas, dinâmicas de grupo, estruturação de currículo e perfil no LinkedIn.',
    fullDescription: 'Um workshop intensivo focado 100% na sua empregabilidade. Descubra o que recrutadores buscam, aprenda a responder perguntas difíceis com segurança e destaque toda a excelência da sua formação na AFESU.',
    duration: '16 horas (2 semanas)',
    targetAudience: 'Alunas e formandas da AFESU em busca do primeiro emprego, estágio ou recolocação profissional.',
    courseContent: [
      'Módulo 1: Construção de currículo estratégico e perfil atraente no LinkedIn',
      'Módulo 2: Como se comportar em dinâmicas de grupo presenciais e online',
      'Módulo 3: Respondendo às principais perguntas de entrevistas (Método STAR)',
      'Módulo 4: Simulação de entrevista com recrutadores parceiros e feedback real'
    ],
    benefits: [
      'Revisão individualizada do seu currículo por especialistas de RH',
      'Simulação prática de entrevista com feedback detalhado',
      'Certificado de Capacitação em Empregabilidade',
      'Acesso à lista prioritária de vagas das empresas parceiras'
    ],
    publishedAt: '2026-09-18',
    isFavorite: false
  }
];
