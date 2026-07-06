// js/lessons.js
import { module1Lessons } from './data/module1.js';
import { module2Lessons } from './data/module2.js';
import { module3Lessons } from './data/module3.js';
import { module4Lessons } from './data/module4.js';
import { module5Lessons } from './data/module5.js';
// import { module6Lessons } from './data/module6.js';

// Склеиваем разделы в единый массив уроков
const lessons = [
    ...module1Lessons,
    ...module2Lessons,
    ...module3Lessons,
    ...module4Lessons,
    ...module5Lessons,
    // ...module6Lessons,
];

// Экспортируем наружу, чтобы index.html мог его читать
export default lessons;

// Если твой старый код в index.html завязан на то, что lessons — глобальная переменная window.lessons,
// то временно (чтобы ничего не ломать на фронте) прокинь её в window:
window.lessons = lessons;