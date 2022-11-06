import { table } from './Constant/constant.js';


document.addEventListener('DOMContentLoaded', () => {
    const createNoteButton = document.querySelector(".notes_create-btn"),
        modalWindow = document.querySelector(".modal"),
        closeModal = modalWindow.querySelector(".modal_close"),
        cancelModal = modalWindow.querySelector(".modal_footer-btnCancel"),
        okModal = modalWindow.querySelector(".modal_footer-btnOk");


    let nameNote = modalWindow.querySelector('#modal_title'),
        dateNote = modalWindow.querySelector('#date'),
        categoryNote = modalWindow.querySelector('#select'),
        contentNote = modalWindow.querySelector('#content'),
        datesNote = modalWindow.querySelector('#dates');


    function hideModal() {
        modalWindow.style.display = "none";
    }

    function showModal() {
        modalWindow.style.display = "block";

        nameNote.value = '';
        dateNote.value = '';
        categoryNote.value = '';
        contentNote.value = '';
        datesNote.value = '';

    }

    createNoteButton.addEventListener('click', () => {
        showModal();
    });

    closeModal.addEventListener('click', () => {
        hideModal();
    });

    cancelModal.addEventListener('click', () => {
        hideModal();
    });

    window.onclick = function (event) {
        if (event.target.classList.contains("modal")) {
            hideModal();
        }
    };


    // =========================================================================================

    okModal.addEventListener('click', () => {

        let imgNote;

        switch (categoryNote.value) {
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

        let newObjNote = {
            img: imgNote,
            name: nameNote.value,
            date: dateNote.value,
            category: categoryNote.value,
            content: contentNote.value,
            dates: datesNote.value
        };

        table.push(newObjNote);
        hideModal();
        noteRender();
        // newNote.render();
    });




    // =========================================================================================

    // class Note {

    //     showM() {
    //         console.log(0);
    //     }

    //     render() {
    //         let notesBlockHtml = '';

    //         table.forEach((item, index) => {
    //             notesBlockHtml +=
    //                 `
    //             <div class="notes__card card">
    //                     <div class="card-editable">
    //                         <span class="material-icons">
    //                             ${item.img}
    //                             </span>
    //                         <!-- <span><i class="fa-solid fa-cart-shopping"></i></span> -->
    //                         <ul class="card-list">
    //                             <li>${item.name}</li>
    //                             <li>${item.date}</li>
    //                             <li>${item.category}</li>
    //                             <li>${item.content}</li>
    //                             <li>${item.dates}</li>
    //                         </ul>
    //                     </div>
    //                     <div class="card-icons">
    //                         <span onclick="showModal()" id="${index}"><i class="fa-solid fa-pen"></i></span>
    //                         <span><i class="fa-solid fa-box-archive"></i></span>
    //                         <span><i class="fa-solid fa-trash"></i></span>
    //                     </div>
    //                 </div>
    //             `;
    //             document.querySelector('.notes-list').innerHTML = notesBlockHtml;
    //         });
    //     }
    // }
    // =========================================================================================

    function noteRender() {
        let notesBlockHtml = '';

        table.forEach((item, index) => {
            notesBlockHtml +=
                `
            <div class="notes__card card">
                    <div class="card-editable">
                        <span class="material-icons">
                            ${item.img}
                            </span>
                        <ul class="card-list">
                            <li>${item.name}</li>
                            <li>${item.date}</li>
                            <li>${item.category}</li>
                            <li>${item.content}</li>
                            <li>${item.dates}</li>
                        </ul>
                    </div>
                    <div class="card-icons">
                        <span class="material-icons">edit</span>
                        <span class="material-icons">archive</span>
                        <span class="material-icons">delete</span>
                    </div>
                </div>
            `;
            document.querySelector('.notes-list').innerHTML = notesBlockHtml;

            document.querySelectorAll(".card-icons").forEach((item, i) => {
                item.addEventListener('click', (event) => {
                    if(event.target.innerHTML == 'edit') {
                        showModal();
                    } else if(event.target.innerHTML == 'archive') {
                        // archive();
                    } else if(event.target.innerHTML == 'delete') {
                        event.target.closest(".card").remove();
                        table.splice(i, 1);
                        noteRender();

                        // deleteNote();
                    }
                    console.log(event.target);
                    
                });
            });

        });
    }
    noteRender();




    // const newNote = new Note();
    // newNote.render();



});

// =========================================================================================
{/* <span id="pen${index}"><i class="fa-solid fa-pen"></i></span> */ }




