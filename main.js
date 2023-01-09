import { table } from './Constant/constant.js';


const form = document.querySelector('#form'),
    createNoteButton = document.querySelector(".notes_create-btn"),
    modalWindow = document.querySelector(".modal"),
    closeModalBtn = modalWindow.querySelector(".modal_footer-btnCancel"),
    modalClose = modalWindow.querySelector('[data-close]'),
    notesList = document.querySelector('.notes-list');

let notes = [], // загальний масив для роботи з LocalStorage
    id; // допоміжна змінна

// Клас, який створює однотипни об'єкти
class Note {
    constructor(id, img, name, date, category, content, dates, completed = false) {
        this.id = id;
        this.img = img;
        this.name = name;
        this.date = date;
        this.category = category;
        this.content = content;
        this.dates = dates;
        this.completed = completed;
        this.cssClass = this.completed ? 'card archive' : 'card'; // Создание CSS класса ???
    }

    render() {
        const noteHTML = `
            <div class="${this.cssClass}" id="${this.id}">
                <div class="card-editable">
                    <span class="material-icons" data-action="img">${this.img}</span>
                    <ul class="card-list">
                        <li data-action="name">${this.name}</li>
                        <li data-action="date">${this.date}</li>
                        <li data-action="category">${this.category}</li>
                        <li data-action="content">${this.content}</li>
                        <li data-action="dates">${this.dates}</li>
                    </ul>
                </div>
                <div class="card-icons">
                    <span class="material-icons" data-action="edit">edit</span>
                    <span class="material-icons" data-action="archive">archive</span>
                    <span class="material-icons" data-action="delete">delete</span>
                </div>
            </div>
        `;
        notesList.insertAdjacentHTML('beforeend', noteHTML);
    }
}

// Функція повертає новий об'єкт із вмісту модального вікна
function newObjFromModal(idNum) {
    const data = new FormData(form);
    let imgNote;

    // Формування іконки відповідно до категорії нотатки
    switch (data.get('category')) {
        case "Task":
            imgNote = 'shopping_cart';
            break;
        case "Random Thought":
            imgNote = 'psychology';
            break;
        case "Idea":
            imgNote = 'lightbulb_outline';
            break;
        case "Quote":
            imgNote = 'format_quote';
            break;
        default:
            break;
    }

    return new Note(
        `id${idNum}`,
        imgNote,
        data.get('name'),
        data.get('date'),
        data.get('category'),
        data.get('content'),
        data.get('dates')
    );
}

// Ф-я показу на сторінці даних з LocalStorage
function renderFromLS() {
    if (localStorage.getItem('notes')) {
        notes = JSON.parse(localStorage.getItem('notes'));

        notes.forEach(note => {
            const noteHTML = new Note(note.id,
                note.img,
                note.name,
                note.date,
                note.category,
                note.content,
                note.dates,
                note.completed
            );
            noteHTML.render();
        });
    }
}
renderFromLS();

// Ф-я відкриває мод вікно
function openModal() {
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}

// Ф-я закриває мод вікно
function closeModal() {
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
    modalWindow.removeAttribute('data-forEdit');
}

modalClose.addEventListener('click', closeModal); // закриває мод вікно після натискання на хрестик
closeModalBtn.addEventListener('click', closeModal); // закриває мод вікно за кнопкою cancel

// Закриває мод вікно по натисканню в НЕ модальне вікно
modalWindow.addEventListener('click', (e) => {
    if (e.target === modalWindow) {
        closeModal();
    }
});

// Закриває мод вікно за кнопкою Esc
document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
        closeModal();
    }
});

// Створюю натискання на кнопку Create Note (додати нову нотатку)
createNoteButton.addEventListener('click', () => {
    form.reset();
    openModal();
});

// Дії із завданням по натисканню 'submit' у мод вікні
form.addEventListener('submit', (e) => {
    if (modalWindow.hasAttribute('data-forEdit')) {
        changeNote(e);
    } else {
        addNote(e);
    }
});

// Видалення нотатки
notesList.addEventListener('click', deleteNote);

// Зазначаємо нотатку архівною
notesList.addEventListener('click', archiveTask);

// Редагування нотатки
notesList.addEventListener('click', editNote);

// Ф-я додавання нотатки у модальному вікні
function addNote(e) {
    // Скасовуємо відправлення форми
    e.preventDefault();

    // Формуємо розмітку для нової нотатки
    let noteHTML = newObjFromModal(Date.now());
    noteHTML.render();
    notes.push(noteHTML); // додаєм данні в загальний масив
    saveToLS(); // додаємо дані до сховища браузера
    closeModal();
}

// Ф-я видалення нотатки
function deleteNote(e) {

    // Перевірка, що натискання було по кнопці "delete"
    if (e.target.dataset.action === 'delete') {

        const parenNode = e.target.closest('.card');

        // Id нотатки
        const id = parenNode.id;

        // Знаходимо індекс нотатки в масиві
        const index = notes.findIndex(note => note.id === id);

        // Видаляємо цей ел із масиву
        notes.splice(index, 1);
        saveToLS();
        parenNode.remove();
    }
}

// Ф-я архівування нотатки
function archiveTask(e) {
    // Перевірка, що натискання було по кнопці "archive"
    if (e.target.dataset.action === 'archive') {

        const parenNode = e.target.closest('.card');

        // Id нотатки
        const id = parenNode.id;

        // В загальному масиві знаходимо відповідний об'єкт по id
        const note = notes.find(note => note.id === id);

        // змінюємо занчення на протилежне
        note.completed = !note.completed;

        // зберігаємо в LocalStorage
        saveToLS();

        // додаєм класи для відображення
        parenNode.classList.toggle('archive');
        e.target.previousElementSibling.classList.toggle('pointer'); // заборона натискання
        e.target.nextElementSibling.classList.toggle('pointer'); // заборона натискання
    }
}

// Ф-я дії із нотаткою після натискання кнопки "edit"
function editNote(e) {
    // Перевірка, що натискання було по кнопці "edit"
    if (e.target.dataset.action === 'edit') {

        const parenNode = e.target.closest('.card');

        // відкриваєм мод вікно
        openModal();

        // псевдомасив із форми мод вікна по атрибуту [name]
        const arrForm = form.querySelectorAll('[name]');

        // псевдомасив із батькивскої ноди елементів li
        const arrNote = parenNode.querySelectorAll('li');

        // призначаємо елементам форми данні із нотатки
        arrForm.forEach((item, i) => {
            item.value = arrNote[i].innerText;
        });

        // призначаємо допоміжної змінні відповідний id
        id = parenNode.id;

        // встановлюємо допоміжний атрибут на мод вікно, 
        // щоб потім визначити які дії робити по натисканню кнопки 'submit'
        modalWindow.setAttribute('data-forEdit', '');
    }
}

// Ф-я редагування нотатки
function changeNote(e) {
    // Скасовуємо відправлення форми
    e.preventDefault();

    // Створюємо об'єкт із відповідним id
    const noteHTML = newObjFromModal(id.slice(2));

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

    // призначаємо нотатці note нові значення із об'єкта noteHTML
    Object.assign(note, noteHTML);

    // зберігаємо у LocalStorage
    saveToLS();

    // закриваєм мод вікно
    closeModal();
}

// Ф-я збереження даних у LocalStorage
function saveToLS() {
    localStorage.setItem('notes', JSON.stringify(notes));
}




