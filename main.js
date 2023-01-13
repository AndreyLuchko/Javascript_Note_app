// import { table } from './Constant/constant.js';


const form = document.querySelector('#form'),
    createNoteButton = document.querySelector(".notes_create-btn"),
    showNoteButton = document.querySelector(".notes_show_archive-btn"),
    modalWindow = document.querySelector(".modal"),
    closeModalBtn = modalWindow.querySelector(".modal_footer-btnCancel"),
    modalClose = modalWindow.querySelector('[data-close]'),
    notesList = document.querySelector('.notes-list'),
    totalList = document.querySelector('.total-list');

 

let notes = [], // загальний масив для роботи з LocalStorage
    id; // допоміжна змінна

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
                    <span class="${this.classPointer}" data-action="edit">edit</span>
                    <span class="material-icons" data-action="archive">archive</span>
                    <span class="${this.classPointer}" data-action="delete">delete</span>
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
            <div class="card" id="${this.id}">
                <div class="card-editable total-list-editable">
                    <span class="material-icons">
                        ${this.img}
                    </span>
                    <ul class="card-list total-list-card">
                        <li>${this.category}</li>
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

function setImgFromCategory(category) {
    let imgNote;

    // Формування іконки відповідно до категорії нотатки
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

// function forTotalRender(obj) {
   
//     new Total(obj.img, obj.category, obj.totalCount, obj.archiveCount).render();
   
// }

// forTotalRender(total(idea, 'Idea'));
// forTotalRender(total(tasks, 'Task'));
// forTotalRender(total(randomThought, 'Random Thought'));
// forTotalRender(total(quote, 'Quote'));


function createTotalList(category) {
    // array = JSON.parse(localStorage.getItem(category));

    // створення масиву всіх об'єкті з відповідною категорією
    // const arrOfCategory = notes.filter(note => note.category === category);

 let array;
    if (category === 'Task') {
       array = tasks;
    } 
    if (category === 'Random Thought') {
        array = randomThought;
    } 
    if (category === 'Idea') {
        array = idea;
    }
    if (category === 'Quote') {
        array = quote;
    }
    const arrOfArchive = array.filter(note => note.completed === true);

    console.log(array);
    console.log(arrOfArchive);

    // notes.forEach(note => {

    //     // перевірка чи є у масиві array об'єкт с таким id
    //     if(array.some(item => item.id === note.id)) {
    //         return;
    //     } 
    //     // перевірка чи заархивован об'єкт
    //     else if (note.completed === true && note.category === category) {
    //         array.push(note);
    //     }
        
    // });

    new Total(setImgFromCategory(category),
              category, 
              array.length, 
              arrOfArchive.length).render();

    // return {
    //     arr: array,
    //     category: category,
    //     img: setImgFromCategory(category),
    //     totalCount: array.length,
    //     archiveCount: arrOfarchive.length
    // };
}

// console.log(total(idea, 'Idea'));
// console.log(total(tasks, 'Task'));
// console.log(total(randomThought, 'Random Thought'));
// console.log(total(quote, 'Quote'));

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

    let form = document.forms.modal;

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

        // знайти в масиві notes всі об'єкти з уникальной категориєй,
        // для каждої категорії запустити
        // createTotalList(category)

        // const categories = ['Task', 'Random Thought', 'Idea', 'Quote'];

        notes.forEach(item => {
            if (item.category === 'Task') {
                tasks.push(item);
            } else if (item.category === 'Random Thought') {
                randomThought.push(item);
            } else if (item.category === 'Idea') {
                idea.push(item);
            } else if (item.category === 'Quote') {
                quote.push(item);
            }
        });

        if (tasks.length > 0) {
            createTotalList('Task');
        }
        if (randomThought.length > 0) {
            createTotalList('Random Thought');
        }
        if (idea.length > 0) {
            createTotalList('Idea');
        }
        if (quote.length > 0) {
            createTotalList('Quote');
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

// Відображення архивованих нотаток по натисканню на кнопку "Show archive note"
showNoteButton.addEventListener('click', showArchive);

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

    // створюємо масив з об'єктими відповідно категорії  та записуэмо його у LS
    // const arrayOfCategory = categoryOfTotalList(noteHTML);

    const checkId = noteHTML.category.split(' ').length === 1 ? noteHTML.category : noteHTML.category.split(' ').join("");

    if (document.querySelector(`#${checkId}`)) {
        
        console.log("делаем что-то");

        categoryOfTotalList(noteHTML);

        const arrOfCategory = notes.filter(note => note.category === noteHTML.category);

        document.querySelector(`#${checkId} .active-tasks`).innerText = arrOfCategory.length;
       
        
        // тут надо придумать как поменять сначала числа в DOM, 
        // рендер из LS
        //а потом добавление в массив объектов(это работает, просто рендер из LS не настроен)
       
        
    } else {
        categoryOfTotalList(noteHTML);
        createTotalList(noteHTML.category);
        console.log("Нет его");
    }
    

    // forTotalRender(ObjRenderArrOfCategory);

    // forTotalRender(createTotalList(tasks, 'Task'));
    // forTotalRender(createTotalList(randomThought, 'Random Thought'));
    // forTotalRender(createTotalList(quote, 'Quote'));

    closeModal();
}

function categoryOfTotalList(obj) {

    // Вибір мвсива відповідно до категорії нотатки
    switch (obj.category) {
        case "Task":
            tasks.push(obj);
            saveToLS(tasks, obj.category);
            break;
        case "Random Thought":
            randomThought.push(obj);
            saveToLS(randomThought, obj.category);
            break;
        case "Idea":
            idea.push(obj);
            saveToLS(idea, obj.category);
            break;
        case "Quote":
            quote.push(obj);
            saveToLS(quote, obj.category);
            break;
        default:
            break;
    }
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
        const newNote = notes.find(note => note.id === id);

        // змінюємо занчення на протилежне
        newNote.completed = !newNote.completed;

        // додаєм класи для відображення
        parenNode.classList.toggle('archive');
        e.target.previousElementSibling.classList.toggle('pointer'); // заборона натискання
        e.target.nextElementSibling.classList.toggle('pointer'); // заборона натискання

        if (parenNode.classList.contains('archive')) {
            parenNode.setAttribute('hidden', '');
        }

        // зберігаємо в LocalStorage
        saveToLS(notes, 'notes');

        // const array = JSON.parse(localStorage.getItem(note.category));

        const checkId = newNote.category.split(' ').length === 1 ? newNote.category : newNote.category.split(' ').join("");


        // створення масиву всіх об'єкті з відповідною категорією
        const arrOfarchive = notes.filter(note => note.completed === true && newNote.category === note.category);

        document.querySelector(`#${checkId} .archive-tasks`).innerText = arrOfarchive.length;

    }
}

// Ф-я відображення архивованих нотаток
function showArchive() {
    const arrNotes = notes.filter(note => note.completed === true);

    arrNotes.forEach(note => {
        const checkAtr = notesList.querySelector(`#${note.id}`);
        checkAtr.removeAttribute('hidden');
    });
}

// Ф-я дії із нотаткою після натискання кнопки "edit"
function editNote(e) {
    // Перевірка, що натискання було по кнопці "edit"
    if (e.target.dataset.action === 'edit') {

        const parenNode = e.target.closest('.card'),
              datesInput = form.querySelector('#dates'),
              forDates = form.querySelector('#forDates'),
              arrForm = form.querySelectorAll('[name]'), // псевдомасив із форми мод вікна по атрибуту [name]
              arrNote = parenNode.querySelectorAll('li'); // псевдомасив із батькивскої ноди елементів li

        datesInput.removeAttribute('hidden');
        
        // призначаємо елементам форми данні із нотатки
        arrForm.forEach((item, i) => {
            item.value = arrNote[i].innerText;
        });

        let arrDates = arrNote[4].innerText.split(', ');

        forDates.value = arrDates[arrDates.length - 1];

        // призначаємо допоміжної змінні відповідний id
        id = parenNode.id;

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





