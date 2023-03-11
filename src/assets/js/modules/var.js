import {getRandomArray, getRenderArray} from "./functions";
import {db} from "../DB";

export const img = document.querySelector('.adr__img');
export const question = document.querySelector('.adr__question');
export const answerOptions = document.querySelectorAll('.answers__text');
export const inputs = document.querySelectorAll('.answers__input');
export let currentQuestion = 0;
export const randomArr = getRandomArray(386, 25);
export const renderArr = getRenderArray(db, randomArr);