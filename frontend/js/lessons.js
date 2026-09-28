// js/lessons.js
import { module1Lessons } from './data/module1.js';
import { module2Lessons } from './data/module2.js';
import { module3Lessons } from './data/module3.js';
import { module4Lessons } from './data/module4.js';
import { module5Lessons } from './data/module5.js';
import { module6Lessons } from './data/module6.js';
import { module7Lessons } from './data/module7.js';
import { module8Lessons } from './data/module8.js';
import { module9Lessons } from './data/module9.js';
import { module10Lessons } from './data/module10.js';
import { module11Lessons } from './data/module11.js';
import { module12Lessons } from './data/module12.js';

// Склеиваем разделы в единый массив уроков
const lessons = [
    ...module1Lessons,
    ...module2Lessons,
    ...module3Lessons,
    ...module4Lessons,
    ...module5Lessons,
    ...module6Lessons,
    ...module7Lessons,
    ...module8Lessons,
    ...module9Lessons,
    ...module10Lessons,
    ...module11Lessons,
    ...module12Lessons,
];

// Экспортируем наружу, чтобы index.html мог его читать
export default lessons;

// Если твой старый код в index.html завязан на то, что lessons — глобальная переменная window.lessons,
// то временно (чтобы ничего не ломать на фронте) прокинь её в window:
window.lessons = lessons;