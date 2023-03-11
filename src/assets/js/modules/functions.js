import {currentQuestion, img, renderArr} from "./var";

export function cleanCheckBox(arr) {
    arr.forEach(el => el.checked = false);
}

export function changeBackgroundColor(el, color) {
    el.style.backgroundColor = `${color}`;
}

export function getRandomArray(range, count) {
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

export function getRenderArray(db, randomArr) {
    let renderArray = [];
    for (let i = 0; i < randomArr.length; i++) {
        db.forEach(el => {
            if (el.id === randomArr[i]) {
                renderArray.push(el)
            }
        })
    }
    return renderArray;
}

export function renderQuestion () {
    img.src = `${renderArr[currentQuestion].imgUrl}`
}
