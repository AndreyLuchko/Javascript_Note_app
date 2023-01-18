import {chooseArrOfCategory} from "./render";


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
    const arrOfCategory = chooseArrOfCategory(obj);

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

export {
    setImgFromCategory,
    saveToLS,
    forDate,
    changeCategoryOfTotalList,
    today,
    checkIdFromCategory,
    checkTotalListTasks
};