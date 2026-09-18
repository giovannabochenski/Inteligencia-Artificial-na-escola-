// 🌸 Banco de perguntas - Vestibular / Ciências
const quizData = [
  {
    question: "Qual é o principal gás responsável pelo efeito estufa emitido pela queima de combustíveis fósseis?",
    options: [
      "Oxigênio (O₂)",
      "Gás carbônico (CO₂)",
      "Nitrogênio (N₂)",
      "Hélio (He)"
    ],
    answer: 1
  },
  {
    question: "Na cadeia alimentar, as plantas ocupam qual nível trófico?",
    options: [
      "Consumidores primários",
      "Produtores",
      "Consumidores secundários",
      "Decompositores"
    ],
    answer: 1
  },
  {
    question: "Qual organela celular é responsável pela respiração celular e produção de ATP?",
    options: [
      "Ribossomo",
      "Mitocôndria",
      "Lisossomo",
      "Complexo de Golgi"
    ],
    answer: 1
  },
  {
    question: "A Lei de Newton que afirma 'toda ação gera uma reação de igual intensidade e sentido oposto' é a:",
    options: [
      "Primeira Lei",
      "Segunda Lei",
      "Terceira Lei",
      "Lei da Gravitação Universal"
    ],
    answer: 2
  },
  {
    question: "Qual é o pH de uma solução neutra?",
    options: [
      "0",
      "7",
      "14",
      "1"
    ],
    answer: 1
  },
  {
    question: "Qual é o maior planeta do Sistema Solar?",
    options: [
      "Saturno",
      "Terra",
      "Júpiter",
      "Netuno"
    ],
    answer: 2
  },
  {
    question: "Em genética, o que são alelos?",
    options: [
      "Formas alternativas de um mesmo gene",
      "Cromossomos sexuais",
      "Proteínas do DNA",
      "Células reprodutivas"
    ],
    answer: 0
  },
  {
    question: "Qual fenômeno explica a separação de cores da luz branca ao passar por um prisma?",
    options: [
      "Reflexão",
      "Refração",
      "Dispersão",
      "Difração"
    ],
    answer: 2
  },
  {
    question: "A função do ribossomo na célula é:",
    options: [
      "Produzir energia",
      "Sintetizar proteínas",
      "Armazenar DNA",
      "Digerir moléculas"
    ],
    answer: 1
  },
  {
    question: "Qual é a unidade de medida de força no Sistema Internacional (SI)?",
    options: [
      "Joule (J)",
      "Watt (W)",
      "Newton (N)",
      "Pascal (Pa)"
    ],
    answer: 2
  }
];

// Variáveis de controle
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// Elementos do DOM
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const feedbackMessage = document.getElementById('feedbackMessage');
const nextButton = document.getElementById('nextButton');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const quizArea = document.getElementById('quizArea');
const resultScreen = document.getElementById('resultScreen');
const scoreText = document.getElementById('scoreText');
const resultMessage = document.getElementById('resultMessage');
const restartButton = document.getElementById('restartButton');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// ============ FUNÇÕES DO QUIZ ============

function updateProgress() {
  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${currentQuestionIndex + 1}/${quizData.length}`;
}

function loadQuestion() {
  answered = false;
  nextButton.disabled = true;
  feedbackMessage.textContent = '';
  feedbackMessage.style.background = '';

  const currentQuestion = quizData[currentQuestionIndex];
  questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  optionsContainer.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.classList.add('option');
    button.setAttribute('data-index', index);
    
    button.innerHTML = `
      <span class="option-letter">${letters[index]}</span>
      <span>${option}</span>
    `;

    button.addEventListener('click', () => selectOption(index, button));
    optionsContainer.appendChild(button);
  });

  // Atualizar texto do botão na última pergunta
  if (currentQuestionIndex === quizData.length - 1) {
    nextButton.textContent = 'Ver resultado 🌸';
  } else {
    nextButton.textContent = 'Próxima pergunta →';
  }

  updateProgress();
}

function selectOption(selectedIndex, selectedButton) {
  if (answered) return;

  answered = true;
  const currentQuestion = quizData[currentQuestionIndex];
  const isCorrect = selectedIndex === currentQuestion.answer;

  const allOptions = document.querySelectorAll('.option');
  allOptions.forEach(btn => {
    btn.classList.add('disabled');
    btn.disabled = true;
  });

  if (isCorrect) {
    selectedButton.classList.add('correct');
    score++;
    feedbackMessage.textContent = '🌸 Resposta correta! Você arrasou!';
  } else {
    selectedButton.classList.add('wrong');
    feedbackMessage.textContent = `💔 Resposta incorreta. A certa é: ${currentQuestion.options[currentQuestion.answer]}`;
    allOptions[currentQuestion.answer].classList.add('correct');
  }

  nextButton.disabled = false;
}

function nextQuestion() {
  if (!answered) return;

  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizArea.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  
  const totalQuestions = quizData.length;
  const percentage = (score / totalQuestions) * 100;
  
  scoreText.textContent = `Você acertou ${score} de ${totalQuestions} perguntas!`;

  // Mensagem personalizada baseada no desempenho
  let message = '';
  if (percentage === 100) {
    message = '🌟 Perfeito! Você está mais que pronto para o vestibular!';
  } else if (percentage >= 70) {
    message = '💖 Muito bem! Continue estudando, você está no caminho certo!';
  } else if (percentage >= 50) {
    message = '🌸 Bom trabalho! Revise os conteúdos e tente novamente!';
  } else {
    message = '💪 Não desanime! Estude mais um pouco e você vai conseguir!';
  }
  resultMessage.textContent = message;

  progressBar.style.width = '100%';
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answered = false;

  resultScreen.classList.add('hidden');
  quizArea.classList.remove('hidden');

  progressBar.style.width = '0%';
  loadQuestion();
}

// ============ FUNÇÕES DE TEMA ============

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  
  try {
    localStorage.setItem('quizVestibular-theme', isDark ? 'dark' : 'light');
  } catch (e) {
    // localStorage indisponível
  }
}

function loadSavedTheme() {
  try {
    const savedTheme = localStorage.getItem('quizVestibular-theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      themeIcon.textContent = '☀️';
    }
  } catch (e) {
    // Ignora erros de localStorage
  }
}

// ============ EVENT LISTENERS ============

nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);
themeToggle.addEventListener('click', toggleTheme);

// ============ INICIALIZAÇÃO ============

loadSavedTheme();
loadQuestion();