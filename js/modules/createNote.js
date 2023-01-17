import {
    today,
    saveToLS,
    checkIdFromCategory,
    changeCategoryOfTotalList
} from "./service";

import { newObjFromModal, createTotalList, notes } from "./render";
import { openModal, closeModal } from "./modal";

function createNote(formSelector, modalSelector, createBtn) {
    const form = document.querySelector(formSelector),
        createNoteButton = document.querySelector(createBtn);

    // Створюю натискання на кнопку Create Note (додати нову нотатку)
    createNoteButton.addEventListener('click', () => {
        form.reset();
        const dateNow = form.querySelector('#date');
        const datesInput = form.querySelector('#dates');

        dateNow.value = today();
        datesInput.setAttribute('hidden', '');

        openModal(modalSelector);
    });
}

// Ф-я додавання нотатки у модальному вікні
function addNote(e, modalSelector) {
    // Скасовуємо відправлення форми
    e.preventDefault();

    // Формуємо розмітку для нової нотатки
    let noteHTML = newObjFromModal(Date.now());
    noteHTML.render();
    notes.push(noteHTML); // додаєм данні в загальний масив
    saveToLS(notes, 'notes'); // додаємо дані до сховища браузера

    const checkId = checkIdFromCategory(noteHTML.category);

    // Якщо немає у Total List такого об'єкта категорії, тоді додаємо, інакше змінюємо його
    if (document.querySelector(`#${checkId}`)) {

        changeCategoryOfTotalList(noteHTML);

        const arrOfCategory = notes.filter(note => note.category === noteHTML.category);

        document.querySelector(`#${checkId} .active-tasks`).innerText = arrOfCategory.length;

    } else {
        changeCategoryOfTotalList(noteHTML);
        createTotalList(noteHTML);
    }

    closeModal(modalSelector);
}

export { addNote, createNote };