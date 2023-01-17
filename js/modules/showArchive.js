import { notes } from "./render";

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
        const arrNotes = notes.filter(note => note.completed === true && note.category === category);

        arrNotes.forEach(note => {
            const checkAtr = notesList.querySelector(`#${note.id}`);
            checkAtr.removeAttribute('hidden');
        });
    }
}

export default showArchive;