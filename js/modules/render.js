import {setImgFromCategory, saveToLS, forDate} from "./service";


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
        setImgFromCategory(form.category.value),
        form.name.value,
        form.date.value,
        form.category.value,
        form.content.value,
        forDate()
    );
}


export {chooseArrOfCategory, createTotalList, newObjFromModal, notes};

export default renderFromLS;