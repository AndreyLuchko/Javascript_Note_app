/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/archiveNote.js":
/*!***********************************!*\
  !*** ./js/modules/archiveNote.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ "./js/modules/service.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./js/modules/render.js");





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
            const noteArchive = _render__WEBPACK_IMPORTED_MODULE_1__.notes.find(note => note.id === id);

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
            (0,_service__WEBPACK_IMPORTED_MODULE_0__.saveToLS)(_render__WEBPACK_IMPORTED_MODULE_1__.notes, 'notes');

            // Обираємо відповідний масив
            const arrOfCategory = (0,_render__WEBPACK_IMPORTED_MODULE_1__.chooseArrOfCategory)(noteArchive);

            // Змінюємо нотатку у обраному масиві
            const noteNew = arrOfCategory.find(note => note.id === id);
            Object.assign(noteNew, noteArchive);

            // Id відповідної категорії
            const checkId = (0,_service__WEBPACK_IMPORTED_MODULE_0__.checkIdFromCategory)(noteArchive.category);

            // Зберігаємо у LocalStorage
            (0,_service__WEBPACK_IMPORTED_MODULE_0__.saveToLS)(arrOfCategory, noteArchive.category);

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (archiveNote);


/***/ }),

/***/ "./js/modules/createNote.js":
/*!**********************************!*\
  !*** ./js/modules/createNote.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addNote": () => (/* binding */ addNote),
/* harmony export */   "createNote": () => (/* binding */ createNote)
/* harmony export */ });
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ "./js/modules/service.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./js/modules/render.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");





function createNote(formSelector, modalSelector, createBtn) {
    const form = document.querySelector(formSelector),
        createNoteButton = document.querySelector(createBtn);

    // Створюю натискання на кнопку Create Note (додати нову нотатку)
    createNoteButton.addEventListener('click', () => {
        form.reset();
        const dateNow = form.querySelector('#date');
        const datesInput = form.querySelector('#dates');

        dateNow.value = (0,_service__WEBPACK_IMPORTED_MODULE_0__.today)();
        datesInput.setAttribute('hidden', '');

        (0,_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)(modalSelector);
    });
}

// Ф-я додавання нотатки у модальному вікні
function addNote(e, modalSelector) {
    // Скасовуємо відправлення форми
    e.preventDefault();

    // Формуємо розмітку для нової нотатки
    let noteHTML = (0,_render__WEBPACK_IMPORTED_MODULE_1__.newObjFromModal)(Date.now());
    noteHTML.render();
    _render__WEBPACK_IMPORTED_MODULE_1__.notes.push(noteHTML); // додаєм данні в загальний масив
    (0,_service__WEBPACK_IMPORTED_MODULE_0__.saveToLS)(_render__WEBPACK_IMPORTED_MODULE_1__.notes, 'notes'); // додаємо дані до сховища браузера

    const checkId = (0,_service__WEBPACK_IMPORTED_MODULE_0__.checkIdFromCategory)(noteHTML.category);

    // Якщо немає у Total List такого об'єкта категорії, тоді додаємо, інакше змінюємо його
    if (document.querySelector(`#${checkId}`)) {

        (0,_service__WEBPACK_IMPORTED_MODULE_0__.changeCategoryOfTotalList)(noteHTML);

        const arrOfCategory = _render__WEBPACK_IMPORTED_MODULE_1__.notes.filter(note => note.category === noteHTML.category);

        document.querySelector(`#${checkId} .active-tasks`).innerText = arrOfCategory.length;

    } else {
        (0,_service__WEBPACK_IMPORTED_MODULE_0__.changeCategoryOfTotalList)(noteHTML);
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.createTotalList)(noteHTML);
    }

    (0,_modal__WEBPACK_IMPORTED_MODULE_2__.closeModal)(modalSelector);
}



/***/ }),

/***/ "./js/modules/deleteNote.js":
/*!**********************************!*\
  !*** ./js/modules/deleteNote.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ "./js/modules/service.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./js/modules/render.js");





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
            const index = _render__WEBPACK_IMPORTED_MODULE_1__.notes.findIndex(note => note.id === id);

            // Id  по назві категорії
            const checkId = (0,_service__WEBPACK_IMPORTED_MODULE_0__.checkIdFromCategory)(_render__WEBPACK_IMPORTED_MODULE_1__.notes[index].category);

            // Обираємо відповідний масив
            const arrOfCategory = (0,_render__WEBPACK_IMPORTED_MODULE_1__.chooseArrOfCategory)(_render__WEBPACK_IMPORTED_MODULE_1__.notes[index]);

            // Видалення із масиву відповідної категорії
            (0,_service__WEBPACK_IMPORTED_MODULE_0__.changeCategoryOfTotalList)(_render__WEBPACK_IMPORTED_MODULE_1__.notes[index]);

            // Додаємо на сторинку його довжину
            document.querySelector(`#${checkId} .active-tasks`).innerText = arrOfCategory.length;

            // Видаляємо цей ел із загального масиву
            _render__WEBPACK_IMPORTED_MODULE_1__.notes.splice(index, 1);
            (0,_service__WEBPACK_IMPORTED_MODULE_0__.saveToLS)(_render__WEBPACK_IMPORTED_MODULE_1__.notes, 'notes');
            // Видаляємо зі сторинки
            parentNode.remove();
            // перевіряємо у Total List чи є пусті масиви з нотатками
            (0,_service__WEBPACK_IMPORTED_MODULE_0__.checkTotalListTasks)();
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deleteNote);


/***/ }),

/***/ "./js/modules/editNote.js":
/*!********************************!*\
  !*** ./js/modules/editNote.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeNote": () => (/* binding */ changeNote),
/* harmony export */   "editNote": () => (/* binding */ editNote)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./js/modules/render.js");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service */ "./js/modules/service.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");










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
            (0,_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)(modalSelector);
        }
    }
}


// Ф-я редагування нотатки
function changeNote(e, modalSelector) {
    // Скасовуємо відправлення форми
    e.preventDefault();

    // Створюємо об'єкт із відповідним id
    const noteHTML = (0,_render__WEBPACK_IMPORTED_MODULE_0__.newObjFromModal)(id.slice(2));

    const checkIdNext = (0,_service__WEBPACK_IMPORTED_MODULE_1__.checkIdFromCategory)(noteHTML.category);
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
    let note = _render__WEBPACK_IMPORTED_MODULE_0__.notes.find(note => note.id === id);
    const checkIdPrev = (0,_service__WEBPACK_IMPORTED_MODULE_1__.checkIdFromCategory)(note.category);
    const prevCategory = note.category;

    if (prevCategory !== nextCategory) {

        // Видалення нотатки
        (0,_service__WEBPACK_IMPORTED_MODULE_1__.changeCategoryOfTotalList)(note);
        const arrOfCategoryPrev = (0,_render__WEBPACK_IMPORTED_MODULE_0__.chooseArrOfCategory)(note);
        // Запис у Total List
        document.querySelector(`#${checkIdPrev} .active-tasks`).innerText = arrOfCategoryPrev.length;

        // Додали нотатку
        (0,_service__WEBPACK_IMPORTED_MODULE_1__.changeCategoryOfTotalList)(noteHTML);
        const arrOfCategoryNext = (0,_render__WEBPACK_IMPORTED_MODULE_0__.chooseArrOfCategory)(noteHTML);
        // Запис у Total List
        // Якщо немає на сторінці такої категорії, додаємо
        // Якщо є, змінюємо
        if (document.querySelector(`#${checkIdNext}`)) {
            document.querySelector(`#${checkIdNext} .active-tasks`).innerText = arrOfCategoryNext.length;
        } else {
            (0,_render__WEBPACK_IMPORTED_MODULE_0__.createTotalList)(noteHTML);
            document.querySelector(`#${checkIdNext} .active-tasks`).innerText = arrOfCategoryNext.length;
        }

    } else {
        const arrOfCategory = (0,_render__WEBPACK_IMPORTED_MODULE_0__.chooseArrOfCategory)(noteHTML);
        const noteNew = arrOfCategory.find(note => note.id === id);
        Object.assign(noteNew, noteHTML);
        document.querySelector(`#${checkIdNext} .active-tasks`).innerText = arrOfCategory.length;
        (0,_service__WEBPACK_IMPORTED_MODULE_1__.saveToLS)(arrOfCategory, nextCategory);
    }

    // призначаємо нотатці note нові значення із об'єкта noteHTML
    Object.assign(note, noteHTML);

    // зберігаємо у LocalStorage
    (0,_service__WEBPACK_IMPORTED_MODULE_1__.saveToLS)(_render__WEBPACK_IMPORTED_MODULE_0__.notes, 'notes');
    (0,_service__WEBPACK_IMPORTED_MODULE_1__.checkTotalListTasks)();
    // закриваєм мод вікно
    (0,_modal__WEBPACK_IMPORTED_MODULE_2__.closeModal)(modalSelector);
}



/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "modal": () => (/* binding */ modal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
/* harmony import */ var _editNote__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editNote */ "./js/modules/editNote.js");
/* harmony import */ var _createNote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createNote */ "./js/modules/createNote.js");




// Ф-я відкриває мод вікно
function openModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}

// Ф-я закриває мод вікно
function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
    modalWindow.removeAttribute('data-forEdit');
}

function modal(formSelector, modalSelector, closeBtn, closeSelector) {
    const form = document.querySelector(formSelector),
        modalWindow = document.querySelector(modalSelector),
        closeModalBtn = modalWindow.querySelector(closeBtn),
        modalClose = modalWindow.querySelector(closeSelector);


    // Дії із завданням по натисканню 'submit' у мод вікні
    form.addEventListener('submit', (e) => {
        if (modalWindow.hasAttribute('data-forEdit')) {
            (0,_editNote__WEBPACK_IMPORTED_MODULE_0__.changeNote)(e, modalSelector);
        } else {
            (0,_createNote__WEBPACK_IMPORTED_MODULE_1__.addNote)(e, modalSelector);
        }
    });

    // закриває мод вікно після натискання на хрестик
    modalClose.addEventListener('click', () => closeModal(modalSelector));

    // закриває мод вікно за кнопкою cancel
    closeModalBtn.addEventListener('click', () => closeModal(modalSelector)); 

    // Закриває мод вікно по натисканню в НЕ модальне вікно
    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
            closeModal(modalSelector);
        }
    });

    // Закриває мод вікно за кнопкою Esc
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
}




/***/ }),

/***/ "./js/modules/render.js":
/*!******************************!*\
  !*** ./js/modules/render.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "chooseArrOfCategory": () => (/* binding */ chooseArrOfCategory),
/* harmony export */   "createTotalList": () => (/* binding */ createTotalList),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "newObjFromModal": () => (/* binding */ newObjFromModal),
/* harmony export */   "notes": () => (/* binding */ notes)
/* harmony export */ });
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ "./js/modules/service.js");



const notesList = document.querySelector('.notes-list'),
      totalList = document.querySelector('.total-list');

let notes = []; // загальний масив для роботи з LocalStorage

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
            (0,_service__WEBPACK_IMPORTED_MODULE_0__.saveToLS)(arrOfCategory, item.category);
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

// Ф-я створення та відображення масиву категорії у Total List відповідно масиву
function createTotalListFromArr(arr) {
    // Масив заархивованих об'єктів
    const arrOfArchive = arr.filter(note => note.completed === true);

    // створюємо новий об'єкт класу категорії
    new Total((0,_service__WEBPACK_IMPORTED_MODULE_0__.setImgFromCategory)(arr[0].category),
        arr[0].category,
        arr.length,
        arrOfArchive.length).render();
}

// Ф-я створення та відображення масиву категорії у Total List відповідно об'єкта
function createTotalList(obj) {

    const arrOfCategory = chooseArrOfCategory(obj);
    // Масив заархивованих об'єктів
    const arrOfArchive = arrOfCategory.filter(note => note.completed === true);

    // створюємо новий об'єкт класу категорії
    new Total((0,_service__WEBPACK_IMPORTED_MODULE_0__.setImgFromCategory)(obj.category),
        obj.category,
        arrOfCategory.length,
        arrOfArchive.length).render();
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

// Функція повертає новий об'єкт із вмісту модального вікна
function newObjFromModal(idNum) {

    // Змінна для отримання даних з форми модального вікна
    const form = document.forms.modal;

    return new Note(
        `id${idNum}`,
        (0,_service__WEBPACK_IMPORTED_MODULE_0__.setImgFromCategory)(form.category.value),
        form.name.value,
        form.date.value,
        form.category.value,
        form.content.value,
        (0,_service__WEBPACK_IMPORTED_MODULE_0__.forDate)()
    );
}




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderFromLS);

/***/ }),

/***/ "./js/modules/service.js":
/*!*******************************!*\
  !*** ./js/modules/service.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeCategoryOfTotalList": () => (/* binding */ changeCategoryOfTotalList),
/* harmony export */   "checkIdFromCategory": () => (/* binding */ checkIdFromCategory),
/* harmony export */   "checkTotalListTasks": () => (/* binding */ checkTotalListTasks),
/* harmony export */   "forDate": () => (/* binding */ forDate),
/* harmony export */   "saveToLS": () => (/* binding */ saveToLS),
/* harmony export */   "setImgFromCategory": () => (/* binding */ setImgFromCategory),
/* harmony export */   "today": () => (/* binding */ today)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./js/modules/render.js");



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

// Ф-я збереження даних у LocalStorage
function saveToLS(arr, name) {
    localStorage.setItem(name, JSON.stringify(arr));
}

// Ф-я для відображення дати виконання у нотатці
function forDate() {
    const form = document.querySelector('#form');
    let temp;

    const forDates = form.querySelector('#forDates');
    const dates = form.querySelector('[name="dates"]');
    let arrDates = dates.value.split(', ');

    if (dates.value === '') {
        temp = forDates.value;
    }else if (forDates.value === arrDates[arrDates.length - 1]) {
        temp = dates.value;
    } 
    else {
        temp = `${dates.value}, ${forDates.value}`;
    }
    return temp;
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
    const arrOfCategory = (0,_render__WEBPACK_IMPORTED_MODULE_0__.chooseArrOfCategory)(obj);

    checkArr(arrOfCategory, obj);
    saveToLS(arrOfCategory, obj.category);
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

function checkIdFromCategory(category) {
    return category.split(' ').length === 1 ? category : category.split(' ').join("");
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



/***/ }),

/***/ "./js/modules/showArchive.js":
/*!***********************************!*\
  !*** ./js/modules/showArchive.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./js/modules/render.js");


function showArchive(parentNoteSelector, parentTotalSelector) {
    const notesList = document.querySelector(parentNoteSelector),
        totalList = document.querySelector(parentTotalSelector);

    // Відображення архивованих нотаток по натисканню на кнопку "Show archive"
    totalList.addEventListener('click', showArciveByCategory);

    // Ф-я дії по натисканню на кнопку "Show archive"
    function showArciveByCategory(e) {
        if (e.target.classList.contains('total-btn')) {
            const categoryName = e.target.closest('.card').dataset.category;
            showArch(categoryName);
            e.target.classList.add('hide');
        }
    }
    // Ф-я відображення архивованих нотаток відповідно категорії
    function showArch(category) {
        const arrNotes = _render__WEBPACK_IMPORTED_MODULE_0__.notes.filter(note => note.completed === true && note.category === category);

        arrNotes.forEach(note => {
            const checkAtr = notesList.querySelector(`#${note.id}`);
            checkAtr.removeAttribute('hidden');
        });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showArchive);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/render */ "./js/modules/render.js");
/* harmony import */ var _modules_showArchive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/showArchive */ "./js/modules/showArchive.js");
/* harmony import */ var _modules_createNote__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/createNote */ "./js/modules/createNote.js");
/* harmony import */ var _modules_editNote__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/editNote */ "./js/modules/editNote.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_deleteNote__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/deleteNote */ "./js/modules/deleteNote.js");
/* harmony import */ var _modules_archiveNote__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/archiveNote */ "./js/modules/archiveNote.js");











(0,_modules_render__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_modules_showArchive__WEBPACK_IMPORTED_MODULE_1__["default"])('.notes-list', '.total-list');
(0,_modules_createNote__WEBPACK_IMPORTED_MODULE_2__.createNote)('#form', ".modal", ".notes_create-btn");
(0,_modules_editNote__WEBPACK_IMPORTED_MODULE_3__.editNote)('#form', ".modal", '.notes-list');
(0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.modal)('#form', ".modal", ".modal_footer-btnCancel", '[data-close]');
(0,_modules_deleteNote__WEBPACK_IMPORTED_MODULE_5__["default"])('.notes-list');
(0,_modules_archiveNote__WEBPACK_IMPORTED_MODULE_6__["default"])('.notes-list');

















})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map