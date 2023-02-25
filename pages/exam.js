const nextQuestionBtn = document.querySelector('.next_question');
const img = document.querySelector('.content__img');
const question = document.querySelector('.content__question');
const answerOptions = document.querySelectorAll('.answer__option');
const inputs = document.querySelectorAll('.answer__input');
const answers = document.querySelectorAll('.questions__item');
const inner = document.querySelector('.inner');
const randomArray = getRandomArray(386, 25);
const renderArray = getRenderArray();

let currentQuestion = 0;
let badAnswers = 0
const answerArray = [];

function getRandomArray(range, count) {
    let m = {};
    let randomArray = [];
    for (let i = 0; i < count; ++i) {
        let r = Math.floor(Math.random() * (range - i));
        randomArray.push(((r in m) ? m[r] : r) + 1);
        let l = range - i - 1;
        m[r] = (l in m) ? m[l] : l;
    }
    return randomArray
}

function getRenderArray() {
    let renderArray = [];
    for (let i = 0; i < randomArray.length; i++) {
        db.forEach(el => {
            if (el.id === randomArray[i]) {
                renderArray.push(el)
            }
        })
    }
    return renderArray;
}

function setStartHTML() {
    if (renderArray[currentQuestion] !== false) {
        img.src = `${renderArray[currentQuestion].imgUrl}`
    }
    question.textContent = `${renderArray[currentQuestion].question}`;

    answerOptions.forEach((el, index) => {
        el.textContent = `${renderArray[currentQuestion].answers[index].text}`;
    });
}

function savedAnswersArray() {
    inputs.forEach(el => {
        if (el.checked) {
            answerArray.push(renderArray[currentQuestion]);
            answerArray[currentQuestion].userAnswer = `${el.id}`;

        }
    })
}

function clearCheckedInput() {
    inputs.forEach(el => el.checked = false)
}

function setNextQuestion() {
    if (currentQuestion === 24) {
        nextQuestionBtn.style.display = 'none';
        finishExam();

    }
    savedAnswersArray();
    checkAnswer();
    currentQuestion = currentQuestion + 1;
    if (renderArray[currentQuestion] != false) {
        img.src = `${renderArray[currentQuestion].imgUrl}`;

    } else {
        img.src = ` `;
    }
    question.textContent = `${renderArray[currentQuestion].question}`;
    answerOptions.forEach((el, index) => {
        el.textContent = `${renderArray[currentQuestion].answers[index].text}`;
    });
    clearCheckedInput();
}

function checkAnswer() {
;
    if (answerArray[currentQuestion].correct !== answerArray[currentQuestion].userAnswer) {
        document.getElementById(`${currentQuestion + 1}`).style.backgroundColor = 'red';
        badAnswers = badAnswers + 1;
    } else if (answerArray[currentQuestion].correct === answerArray[currentQuestion].userAnswer) {
        document.getElementById(`${currentQuestion + 1}`).style.backgroundColor = 'green';
    }
}

function finishExam() {
    answers.forEach(el => {
        el.addEventListener('click', (e) => {
            if (answerArray[e.target.getAttribute('id').imgUrl] !== false) {
                img.src = `${answerArray[e.target.getAttribute('id') - 1].imgUrl}`;
            } else {
                img.src = ` `;
            }
            question.textContent = `${answerArray[e.target.getAttribute('id') - 1].question}`;
            answerOptions.forEach((el, index) => {
                el.closest('.answer').style.color = 'black';
                if (el.closest('.answer').querySelector('.answer__input').id === answerArray[e.target.getAttribute('id') - 1].correct) {
                    el.closest('.answer').style.color = 'green';
                }
                el.textContent = `${answerArray[e.target.getAttribute('id') - 1].answers[index].text}`;
            });
            inputs.forEach(el => el.disabled = 'true');
            inputs.forEach((el) => {
                if (el.id === answerArray[e.target.getAttribute('id') - 1].userAnswer) {
                    el.checked = true;
                }
            })
        })
    })
}

function showPopup () {
    inner.style.background = 'white';
    inner.style.fontSize = '60px'
    inner.style.textAlign = 'center';
    inner.style.fontWeight = 'bold';
    if(badAnswers >= 5) {
        inner.textContent = "ЭКЗАМЕН НЕ СДАН";
        inner.style.color = 'red';
    } else {
        inner.textContent = "ЭКЗАМЕН СДАН";
        inner.style.color = 'green';
    }

}
setStartHTML();

nextQuestionBtn.addEventListener('click', setNextQuestion);
