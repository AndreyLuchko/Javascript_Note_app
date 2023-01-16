// import { table } from './Constant/constant.js';


const form = document.querySelector('#form'),
    createNoteButton = document.querySelector(".notes_create-btn"),
    modalWindow = document.querySelector(".modal"),
    closeModalBtn = modalWindow.querySelector(".modal_footer-btnCancel"),
    modalClose = modalWindow.querySelector('[data-close]'),
    notesList = document.querySelector('.notes-list'),
    totalList = document.querySelector('.total-list');

let notes = [], // загальний масив для роботи з LocalStorage
    id; // допоміжна змінна

// Масиви по категоріям для Total List
let tasks = [],
    randomThought = [],
    idea = [],
    quote = [];

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
        this.cssClass = this.completed ? 'card archive' : 'card'; // Створення CSS класа
        this.atribute = this.completed ? 'hidden' : ''; // відображення архивної нотатки
        this.classPointer = this.completed ? 'material-icons pointer' : 'material-icons';
    }

    render() {
        const noteHTML = `
            <div class="${this.cssClass}" id="${this.id}" ${this.atribute}>
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
                    <span class="${this.classPointer} tooltip" data-action="edit">edit
                        <span class="tooltiptext">EDIT</span>
                    </span>
                    <span class="material-icons tooltip" data-action="archive">archive
                        <span class="tooltiptext">ARCHIVE</span>
                    </span>
                    <span class="${this.classPointer} tooltip" data-action="delete">delete
                        <span class="tooltiptext">DELETE</span>
                    </span>
                </div>
            </div>
        `;
        notesList.insertAdjacentHTML('beforeend', noteHTML);
    }
}

class Total {
    constructor(img, category, active, archived) {
        this.img = img;
        this.category = category;
        this.active = active;
        this.archived = archived;
        this.id = this.category.split(' ').length === 1 ? this.category : this.category.split(' ').join("");
    }

    render() {
        const totalHTML = `
            <div class="card" data-category="${this.category}" id="${this.id}">
                <div class="card-editable total-list-editable">
                    <span class="material-icons">
                        ${this.img}
                    </span>
                    <ul class="card-list total-list-card">
                        <li class="category-name">${this.category}</li>
                        <li class="active-tasks">${this.active}</li>
                        <li class="archive-tasks">${this.archived}</li>
                    </ul>
                <button class="total-btn">Show archive</button>
                </div>
            </div>
        `;
        totalList.insertAdjacentHTML('beforeend', totalHTML);
    }
}
// Формування іконки відповідно до категорії нотатки
function setImgFromCategory(category) {
    let imgNote;
 
    switch (category) {
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
    return imgNote;
}

// Обераємо масив відповідно категорії об'єкта
function chooseArrOfCategory(obj) {
    let array;
    switch (obj.category) {
        case "Task":
            array = tasks;
            break;
        case "Random Thought":
            array = randomThought;
            break;
        case "Idea":
            array = idea;
            break;
        case "Quote":
            array = quote;
            break;
        default:
            break;
    }
    return array;
}

// Ф-я додає в масив об'єкт, якщо його немає, і видаляє, якщо він є
function checkArr(arr, obj) {
    if (arr.find(note => note.id === obj.id)) {
        const index = arr.findIndex(note => note.id === obj.id);
        arr.splice(index, 1);
    } else {
        arr.push(obj);
    }
}

// Ф-я зміни мвсивів категорії у Total List
function changeCategoryOfTotalList(obj) {

    // обирає масив відповідно до категорії об'єкта
    const arrOfCategory = chooseArrOfCategory(obj);
    
    checkArr(arrOfCategory, obj);
    saveToLS(arrOfCategory, obj.category);
}

// Ф-я створення та відображення масиву категорії у Total List відповідно об'єкта
function createTotalList(obj) {

    const arrOfCategory = chooseArrOfCategory(obj);
    // Масив заархивованих об'єктів
    const arrOfArchive = arrOfCategory.filter(note => note.completed === true);

    // створюємо новий об'єкт класу категорії
    new Total(setImgFromCategory(obj.category),
        obj.category,
        arrOfCategory.length,
        arrOfArchive.length).render();
}

// Ф-я створення та відображення масиву категорії у Total List відповідно масиву
function createTotalListFromArr(arr) {
    // Масив заархивованих об'єктів
    const arrOfArchive = arr.filter(note => note.completed === true);

    // створюємо новий об'єкт класу категорії
    new Total(setImgFromCategory(arr[0].category),
        arr[0].category,
        arr.length,
        arrOfArchive.length).render();
}

// Ф-я для відображення дати виконання у нотатці
function forDate() {

    let temp;
    const forDates = form.querySelector('#forDates');
    const dates = form.querySelector('[name="dates"]');

    if (dates.value === '') {
        temp = forDates.value;
    } else {
        temp = `${dates.value}, ${forDates.value}`;
    }

    return temp;
}

// Функція повертає новий об'єкт із вмісту модального вікна
function newObjFromModal(idNum) {

    // Змінна для отримання даних з форми модального вікна
    const form = document.forms.modal;

    return new Note(
        `id${idNum}`,
        setImgFromCategory(form.category.value),
        form.name.value,
        form.date.value,
        form.category.value,
        form.content.value,
        forDate()
    );
}

// Ф-я показу на сторінці даних з LocalStorage
function renderFromLS() {
    if (localStorage.getItem('notes')) {
        notes = JSON.parse(localStorage.getItem('notes'));

        // Для списку нотаток:
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

        // Для списку Total List:
        // Знайти в масиві notes всі об'єкти з уникальной категориєй,
        // створити окреми масиви по категоріям, та записати іх у LS,
        notes.forEach(item => {
            const arrOfCategory = chooseArrOfCategory(item);
            arrOfCategory.push(item);
            saveToLS(arrOfCategory, item.category);
        });

        // для кожної категорії запустити createTotalListFromArr(arr)
        if (tasks.length > 0) {
            createTotalListFromArr(tasks);
        }
        if (randomThought.length > 0) {
            createTotalListFromArr(randomThought);
        }
        if (idea.length > 0) {
            createTotalListFromArr(idea);
        }
        if (quote.length > 0) {
            createTotalListFromArr(quote);
        }
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
    const dateNow = form.querySelector('#date');
    const datesInput = form.querySelector('#dates');

    dateNow.value = today();
    datesInput.setAttribute('hidden', '');

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

    closeModal();
}

// Ф-я видалення нотатки
function deleteNote(e) {

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

// Ф-я відображення архивованих нотаток відповідно категорії
function showArchive(category) {
    const arrNotes = notes.filter(note => note.completed === true && note.category === category);

    arrNotes.forEach(note => {
        const checkAtr = notesList.querySelector(`#${note.id}`);
        checkAtr.removeAttribute('hidden');
    });
}
// Відображення архивованих нотаток по натисканню на кнопку "Show archive"
totalList.addEventListener('click', showArciveByCategory);

// Ф-я дії по натисканню на кнопку "Show archive"
function showArciveByCategory(e) {
    if (e.target.classList.contains('total-btn')) {
        const categoryName = e.target.closest('.card').dataset.category;
        showArchive(categoryName);
        e.target.classList.add('hide');
    }
}

// Ф-я дії із нотаткою після натискання кнопки "edit"
function editNote(e) {
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
        openModal();
    }
}

// Ф-я редагування нотатки
function changeNote(e) {
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
    closeModal();
}

function checkIdFromCategory(category) {
    return category.split(' ').length === 1 ? category : category.split(' ').join("");
}

// Ф-я збереження даних у LocalStorage
function saveToLS(arr, name) {
    localStorage.setItem(name, JSON.stringify(arr));
}

// Ф-я створення дати
function today() {
    const today = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const now = today.toLocaleString('en-US', options);
    return now;
}

// Ф-я перевірки у Total List чи є пусті масиви з нотатками
function checkTotalListTasks() {
    const activeTasks = document.querySelectorAll('.active-tasks');
    activeTasks.forEach(item => {
        if (item.innerText === '0') {
            item.closest('.card').remove();
        }
    });
}


console.log(tasks);
console.log(idea);
console.log(quote);
console.log(randomThought);




