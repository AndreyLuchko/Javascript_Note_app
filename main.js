import {table} from './Constant/constant.js';



const createNoteButton = document.querySelector(".notes_create-btn");
const modalWindow = document.querySelector(".modal");
const closeModal = modalWindow.querySelector(".modal_close");
const cancel = modalWindow.querySelector(".modal_footer-btnCancel");

function hideModal() {
    modalWindow.style.display = "none";
}

createNoteButton.addEventListener('click', () => {
    modalWindow.style.display = "block";
});

closeModal.addEventListener('click', () => {
    hideModal();
});

cancel.addEventListener('click', () => {
    hideModal();
});

window.onclick = function(event) {
    if(event.target.classList.contains("modal")) {
        hideModal();
    }
};


class Note {
    render() {
        let notesBlockHtml = '';

        table.forEach(item => {
            notesBlockHtml += 
            `
            <div class="notes__card card">
                    <div class="card-editable">
                        <span class="material-icons">
                            ${item.img}
                            </span>
                        <!-- <span><i class="fa-solid fa-cart-shopping"></i></span> -->
                        <ul class="card-list">
                            <li>${item.name}</li>
                            <li>${item.date}</li>
                            <li>${item.category}</li>
                            <li>${item.content}</li>
                            <li>${item.dates}</li>
                        </ul>
                    </div>
                    <div class="card-icons">
                        <span><i class="fa-solid fa-pen"></i></span>
                        <span><i class="fa-solid fa-box-archive"></i></span>
                        <span><i class="fa-solid fa-trash"></i></span>
                    </div>
                </div>
            `;


            document.querySelector('.notes-list').innerHTML = notesBlockHtml;
        });
    }
}

const newNote = new Note();

newNote.render();