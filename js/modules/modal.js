import { changeNote } from "./editNote";
import { addNote } from "./createNote";


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
            changeNote(e, modalSelector);
        } else {
            addNote(e, modalSelector);
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


export { openModal, closeModal, modal };