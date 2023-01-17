import {
    saveToLS,
    checkIdFromCategory,
    changeCategoryOfTotalList,
    checkTotalListTasks
} from "./service";

import { chooseArrOfCategory, notes } from "./render";


function deleteNote(parentSelector) {
    const notesList = document.querySelector(parentSelector);

    // Видалення нотатки
    notesList.addEventListener('click', deleteTask);

    // Ф-я видалення нотатки
    function deleteTask(e) {

        // Перевірка, що натискання було по кнопці "delete"
        if (e.target.dataset.action === 'delete') {

            const parentNode = e.target.closest('.card');

            // Id нотатки
            const id = parentNode.id;

            // Знаходимо індекс нотатки в масиві
            const index = notes.findIndex(note => note.id === id);

            // Id  по назві категорії
            const checkId = checkIdFromCategory(notes[index].category);

            // Обираємо відповідний масив
            const arrOfCategory = chooseArrOfCategory(notes[index]);

            // Видалення із масиву відповідної категорії
            changeCategoryOfTotalList(notes[index]);

            // Додаємо на сторинку його довжину
            document.querySelector(`#${checkId} .active-tasks`).innerText = arrOfCategory.length;

            // Видаляємо цей ел із загального масиву
            notes.splice(index, 1);
            saveToLS(notes, 'notes');
            // Видаляємо зі сторинки
            parentNode.remove();
            // перевіряємо у Total List чи є пусті масиви з нотатками
            checkTotalListTasks();
        }
    }
}

export default deleteNote;
