import { newObjFromModal, createTotalList, notes } from "./render";

import {
    saveToLS,
    checkIdFromCategory,
    changeCategoryOfTotalList,
    checkTotalListTasks
} from "./service";

import { chooseArrOfCategory } from "./render";

import { openModal, closeModal } from "./modal";



let id; // допоміжна змінна

function editNote(formSelector, modalSelector, prentNode) {
    const notesList = document.querySelector(prentNode),
        modalWindow = document.querySelector(modalSelector),
        form = document.querySelector(formSelector);
    // Редагування нотатки
    notesList.addEventListener('click', edit);

    // Ф-я дії із нотаткою після натискання кнопки "edit"
    function edit(e) {
        // Перевірка, що натискання було по кнопці "edit"
        if (e.target.dataset.action === 'edit') {

            const parentNode = e.target.closest('.card'),
                datesInput = form.querySelector('#dates'),
                forDates = form.querySelector('#forDates'),
                arrForm = form.querySelectorAll('[name]'), // псевдомасив із форми мод вікна по атрибуту [name]
                arrNote = parentNode.querySelectorAll('li'); // псевдомасив із батькивскої ноди елементів li

            // відображаєм input з датами, щоб показати чи там буули дані
            datesInput.removeAttribute('hidden');

            // призначаємо елементам форми дані із нотатки
            arrForm.forEach((item, i) => {
                item.value = arrNote[i].innerText;
            });

            // розділяємо строку на масив
            let arrDates = arrNote[4].innerText.split(', ');

            // призначаємо input з датою значення останього ел масиву.
            forDates.value = arrDates[arrDates.length - 1];

            // призначаємо допоміжної змінні відповідний id
            id = parentNode.id;

            // встановлюємо допоміжний атрибут на мод вікно, 
            // щоб потім визначити які дії робити по натисканню кнопки 'submit'
            modalWindow.setAttribute('data-forEdit', '');

            // відкриваєм мод вікно
            openModal(modalSelector);
        }
    }
}


// Ф-я редагування нотатки
function changeNote(e, modalSelector) {
    // Скасовуємо відправлення форми
    e.preventDefault();

    // Створюємо об'єкт із відповідним id
    const noteHTML = newObjFromModal(id.slice(2));

    const checkIdNext = checkIdFromCategory(noteHTML.category);
    const nextCategory = noteHTML.category;

    // масив по атрибуту [data-action] у елемента з відповідним id
    const arrNote = document.querySelectorAll(`#${id} [data-action]`);

    // змінюємо дані нотатки на дані із об'єкта noteHTML
    arrNote.forEach(item => {
        for (let key in noteHTML) {
            if (key === item.dataset.action) {
                item.innerText = noteHTML[key];
            }
        }
    });

    // знажодимо нотатку із відповідним id у загальному масиві
    let note = notes.find(note => note.id === id);
    const checkIdPrev = checkIdFromCategory(note.category);
    const prevCategory = note.category;

    if (prevCategory !== nextCategory) {

        // Видалення нотатки
        changeCategoryOfTotalList(note);
        const arrOfCategoryPrev = chooseArrOfCategory(note);
        // Запис у Total List
        document.querySelector(`#${checkIdPrev} .active-tasks`).innerText = arrOfCategoryPrev.length;

        // Додали нотатку
        changeCategoryOfTotalList(noteHTML);
        const arrOfCategoryNext = chooseArrOfCategory(noteHTML);
        // Запис у Total List
        // Якщо немає на сторінці такої категорії, додаємо
        // Якщо є, змінюємо
        if (document.querySelector(`#${checkIdNext}`)) {
            document.querySelector(`#${checkIdNext} .active-tasks`).innerText = arrOfCategoryNext.length;
        } else {
            createTotalList(noteHTML);
            document.querySelector(`#${checkIdNext} .active-tasks`).innerText = arrOfCategoryNext.length;
        }

    } else {
        const arrOfCategory = chooseArrOfCategory(noteHTML);
        const noteNew = arrOfCategory.find(note => note.id === id);
        Object.assign(noteNew, noteHTML);
        document.querySelector(`#${checkIdNext} .active-tasks`).innerText = arrOfCategory.length;
        saveToLS(arrOfCategory, nextCategory);
    }

    // призначаємо нотатці note нові значення із об'єкта noteHTML
    Object.assign(note, noteHTML);

    // зберігаємо у LocalStorage
    saveToLS(notes, 'notes');
    checkTotalListTasks();
    // закриваєм мод вікно
    closeModal(modalSelector);
}

export { changeNote, editNote };