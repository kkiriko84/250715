// 문제 데이터 (예시 문제.txt 기반)
const quizData = [
  {
    question: '1. 다음 단어의 뜻을 구별해 주는 요소로 알맞지 않은 것은?',
    choices: [
      '곰, 솜 - 자음',
      '종, 공 - 자음',
      '돌, 돈 - 모음',
      '산, 선 - 모음',
      '밥, 법 - 모음'
    ],
    answer: 3
  },
  {
    question: '2. 국어의 음운에 대한 설명으로 적절하지 않은 것은?',
    choices: [
      '음운의 종류에는 자음과 모음이 있다.',
      '말의 뜻을 구별해 주는 소리의 단위이다.',
      '모음은 공기가 그대로 흘러나오는 소리이다.',
      '자음은 모음 없이 홀로 소리 낼 수 있는 음운이다.',
      '음운에 따라 소리 낼 때의 느낌이 달라질 수 있다.'
    ],
    answer: 4
  },
  {
    question: '3. 말의 뜻을 구별해 주는 소리의 가장 작은 단위는?',
    choices: [
      '음운',
      '음절',
      '단어',
      '문장',
      '형태소'
    ],
    answer: 1
  },
  {
    question: "4. '돌'의 음운 중 하나를 골라 다른 음운으로 바꾼 단어가 아닌 것은?",
    choices: [
      '솔',
      '달',
      '덕',
      '돈',
      '독'
    ],
    answer: 3
  },
  {
    question: '5. 음운에 대한 설명으로 알맞지 않은 것은?',
    choices: [
      '단어의 음운을 바꾸어 쓰면 의미가 달라진다.',
      '우리말의 음운은 자음과 모음으로 이루어진다.',
      '자음은 공기가 방해를 받으며 나오는 소리이다.',
      '말의 뜻을 구별해 주는 소리의 가장 작은 단위이다.',
      '모음은 홀로 소리 낼 수 없어 자음을 만나야만 소리를 낼 수 있다.'
    ],
    answer: 5
  },
  {
    question: '6. 단어에 사용된 음운의 개수가 잘못 연결된 것은?',
    choices: [
      '누나 - 4개',
      '까꿍 - 6개',
      '동생 - 6개',
      '외삼촌 - 7개',
      '할머니 - 7개'
    ],
    answer: 2
  },
  {
    question: '7. 다음 중 국어의 자음에 대한 설명으로 적절하지 않은 것은?',
    choices: [
      '자음의 개수는 모두 19개이다.',
      '모음을 만나야 소리 낼 수 있다.',
      '공기가 방해를 받으며 나오는 소리이다.',
      '입안의 공명 현상을 거쳐서 나온다는 특징이 있다.',
      '말의 뜻을 구별해 주는 소리의 가장 작은 단위에 속한다.'
    ],
    answer: 4
  }
];

let currentQuiz = 0;
let score = 0;
let selected = null;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('next-btn');
const resultBox = document.getElementById('result-box');
const quizBox = document.getElementById('quiz-box');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');
let endBtn;

function loadQuiz() {
  selected = null;
  const quiz = quizData[currentQuiz];
  questionEl.textContent = quiz.question;
  choicesEl.innerHTML = '';
  const circledNums = ['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩'];
  quiz.choices.forEach((choice, idx) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = `${circledNums[idx] || idx + 1} ${choice}`;
    btn.onclick = () => selectChoice(idx + 1, btn);
    li.appendChild(btn);
    choicesEl.appendChild(li);
  });
  nextBtn.disabled = true;
}

function selectChoice(choiceNum, btn) {
  if (selected) return;
  selected = choiceNum;
  const quiz = quizData[currentQuiz];
  const buttons = choicesEl.querySelectorAll('button');
  buttons.forEach((b, idx) => {
    b.classList.remove('selected', 'correct', 'incorrect');
    if (idx + 1 === quiz.answer) {
      b.classList.add('correct');
    }
    if (idx + 1 === choiceNum) {
      b.classList.add(choiceNum === quiz.answer ? 'correct' : 'incorrect');
    }
    b.disabled = true;
  });
  if (choiceNum === quiz.answer) score++;
  nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
});

function showResult() {

  quizBox.style.display = 'none';
  resultBox.style.display = 'block';
  scoreEl.textContent = `총 ${quizData.length}문제 중 ${score}문제 정답!`;

  // '퀴즈 끝내기' 버튼이 없으면 생성
  if (!document.getElementById('end-btn')) {
    endBtn = document.createElement('button');
    endBtn.id = 'end-btn';
    endBtn.textContent = '퀴즈 끝내기';
    endBtn.style.marginLeft = '12px';
    endBtn.onclick = () => {
      // 결과만 남기고 버튼 숨김
      restartBtn.style.display = 'none';
      endBtn.style.display = 'none';
      scoreEl.textContent += ' (종료됨)';
    };
    restartBtn.parentNode.appendChild(endBtn);
  }
  // 항상 두 버튼 모두 보이게
  if (endBtn) endBtn.style.display = '';
  restartBtn.style.display = '';
}


restartBtn.addEventListener('click', () => {
  currentQuiz = 0;
  score = 0;
  quizBox.style.display = 'block';
  resultBox.style.display = 'none';
  if (endBtn) endBtn.style.display = 'none';
  restartBtn.style.display = '';
  loadQuiz();
});

// 첫 문제 로드
window.onload = loadQuiz;
