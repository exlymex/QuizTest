/* All answer options */
const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');

/* All our options */
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'),
    numberOfQuestion = document.getElementById('number-of-question'),
    numberOfAllQuestion = document.getElementById('number-of-all-questions');

let indexOfQuestions,
    indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0; // Finally score

const correctAnswer = document.getElementById('correct-answer'),
    numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
    btnTryAgain = document.getElementById('btn-try-again')

const questions = [
    {
        question: 'Як в Js вичислити процент від числа',
        options: [
            'Так в Js не можна робити',
            'Помножити на кількість процентів і поділити на 100',
            'Оператор : %',
            'Викликати метод findPrecent()',
        ],
        rightAnswer: 1
    },
    {
        question: 'Яка столиця Італії',
        options: [
            'Мілан',
            'Генуя',
            'Неаполь',
            'Рим',
        ],
        rightAnswer: 3
    },
    {
        question: 'Яка буде відповіди при додаванні "20" + 13',
        options: [
            '33',
            '2013',
            'undefined',
            'null',
        ],
        rightAnswer: 2
    },
    {
        question: 'Хто найкращий кері в доті',
        options: [
            'Течес',
            'Пудж',
            'Варлок',
            'ІО',
        ],
        rightAnswer: 0
    },
];

numberOfAllQuestion.innerHTML = questions.length // кількість питань

const load = () => {
    question.innerHTML = questions[indexOfQuestions].question // саме питання


    option1.innerHTML = questions[indexOfQuestions].options[0]
    option2.innerHTML = questions[indexOfQuestions].options[1]
    option3.innerHTML = questions[indexOfQuestions].options[2]
    option4.innerHTML = questions[indexOfQuestions].options[3]

    numberOfQuestion.innerHTML = indexOfPage + 1; //показування номеру теперішньої сторінки
    indexOfPage++; // Збільшуємо індекс сторінки
};
let completedAnswers = []
const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length)
    console.log(randomNumber)
    let hitDuplicate = false;

    if (indexOfPage == questions.length) {
        quizOver()
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDuplicate = true
                }
            })
            if(hitDuplicate) {
                randomQuestion()
            } else {
                indexOfQuestions = randomNumber;
                load();
            }
        };
        if(completedAnswers == 0) {
            indexOfQuestions = randomNumber;
            load()
        }
    };
    completedAnswers.push(indexOfQuestions);
}

const checkAnswer = el => { // перевіряє відповідь
    if (el.target.dataset.id == questions[indexOfQuestions].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct')
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong')
    }
    disabledOptions()
}

const disabledOptions = () => { // не дозволяє кілька разів нажимати відповідь
    optionElements.forEach(item => {
        item.classList.add('disabled')
        if(item.dataset.id == questions[indexOfQuestions].rightAnswer) {
            item.classList.add('correct')
        }
    })
}
const enableIptions = () => { // при переході на наступну сторінку забирає класи
    optionElements.forEach(item =>{
        item.classList.remove('disabled', 'correct', 'wrong')
    })
};


const answerTracker = () => { // добавляє шаріки для замальовування
    questions.forEach(() => {
        const div = document.createElement('div')
        answersTracker.appendChild(div)
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`)
}

const validate = () =>{ // перевірка чи введене значення
    if(!optionElements[0].classList.contains('disabled')){
        alert('Виберіть один із варіантів')
    }else{
        randomQuestion()
        enableIptions()
    }
}
btnNext.addEventListener('click', validate)

for (option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}
const quizOver = () => {
   document.querySelector('.quiz-over-modal').classList.add('active')
   correctAnswer.innerHTML = score;
   numberOfAllQuestions2.innerHTML = questions.length
}

const tryAgain = () =>{ 
    window.location.reload()
}

btnTryAgain.addEventListener('click',tryAgain)

window.addEventListener('load', () => {
    randomQuestion()
    answerTracker()
})

