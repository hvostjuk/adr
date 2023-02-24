const nextQuestionBtn = document.querySelector('.next_question');
const checkAnswerBtn = document.querySelector('.answer__btn');
const img = document.querySelector('.content__img');
const question = document.querySelector('.content__question');
const answerOptions = document.querySelectorAll('.answer__option');
const inputs = document.querySelectorAll('.answer__input');

const randomArray = getRandomArray(386, 25);
const renderArray = getRenderArray();

let currentQuestion = 0;

function setStartHTML() {
    if(renderArray[currentQuestion] !== false ){
        img.src = `${renderArray[currentQuestion].imgUrl}`
    }
    question.textContent = `${renderArray[currentQuestion].question}`;

    answerOptions.forEach((el,index)=> {
        el.textContent = `${renderArray[currentQuestion].answers[index].text}`;
    });
    nextQuestionBtn.disabled = true;
}
setStartHTML();
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
            if(el.id === randomArray[i]) {
                renderArray.push(el)
            }
        })
    }
    return renderArray;
}
function checkAnswer() {
    inputs.forEach(el => {
        if(el.checked && el.id === db[currentQuestion].correct) {
            nextQuestionBtn.disabled = false;
        } else if(el.checked && el.id !== db[currentQuestion].correct) {
            nextQuestionBtn.disabled = true;
        }
    })
}
function clearCheckedInput() {
    inputs.forEach(el => el.checked = false)
}
function setNextQuestion() {
    currentQuestion = currentQuestion + 1;
    if(db[currentQuestion] != false) {
        img.src = `${db[currentQuestion].imgUrl}`;

    } else {
        img.src = ` `;
    }
    question.textContent = `${db[currentQuestion].question}`;
    answerOptions.forEach((el,index)=> {
        el.textContent = `${db[currentQuestion].answers[index].text}`;
    });
    nextQuestionBtn.disabled = true;
    clearCheckedInput();
}
nextQuestionBtn.addEventListener('click', setNextQuestion);
checkAnswerBtn.addEventListener('click', checkAnswer);
