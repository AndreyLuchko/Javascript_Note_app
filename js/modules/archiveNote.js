import {
    saveToLS,
    checkIdFromCategory
} from "./service";

import { chooseArrOfCategory, notes } from "./render";


function archiveNote(parentSelector) {
    const notesList = document.querySelector(parentSelector);
    // Зазначаємо нотатку архівною
    notesList.addEventListener('click', archiveTask);

    // Ф-я архівування нотатки
    function archiveTask(e) {
        // Перевірка, що натискання було по кнопці "archive"
        if (e.target.dataset.action === 'archive') {

            const parentNode = e.target.closest('.card');

            // Id нотатки
            const id = parentNode.id;

            // В загальному масиві знаходимо відповідний об'єкт по id
            const noteArchive = notes.find(note => note.id === id);

            // Змінюємо занчення на протилежне
            noteArchive.completed = !noteArchive.completed;

            // Додаєм класи для відображення
            parentNode.classList.toggle('archive');
            e.target.previousElementSibling.classList.toggle('pointer'); // заборона натискання
            e.target.nextElementSibling.classList.toggle('pointer'); // заборона натискання

            if (parentNode.classList.contains('archive')) {
                parentNode.setAttribute('hidden', '');
            }

            // Зберігаємо у LocalStorage
            saveToLS(notes, 'notes');

            // Обираємо відповідний масив
            const arrOfCategory = chooseArrOfCategory(noteArchive);

            // Змінюємо нотатку у обраному масиві
            const noteNew = arrOfCategory.find(note => note.id === id);
            Object.assign(noteNew, noteArchive);

            // Id відповідної категорії
            const checkId = checkIdFromCategory(noteArchive.category);

            // Зберігаємо у LocalStorage
            saveToLS(arrOfCategory, noteArchive.category);

            // Створення масиву всіх об'єкті з відповідною категорією
            const arrOfarchive = arrOfCategory.filter(note => note.completed === true);

            document.querySelector(`#${checkId} .archive-tasks`).innerText = arrOfarchive.length;

            // Відображення кнопки "Show archive" після натискання
            const btnShowArciveArr = document.querySelectorAll('.total-btn');

            btnShowArciveArr.forEach(item => {
                if (item.closest('.card').id === checkId) {
                    item.classList.remove('hide');
                }
            });
        }
    }
}

export default archiveNote;
