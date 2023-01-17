

import renderFromLS from "./modules/render";
import showArchive from "./modules/showArchive";
import { createNote } from "./modules/createNote";
import { editNote } from "./modules/editNote";
import { modal } from "./modules/modal";
import deleteNote from "./modules/deleteNote";
import archiveNote from "./modules/archiveNote";


renderFromLS();
showArchive('.notes-list', '.total-list');
createNote('#form', ".modal", ".notes_create-btn");
editNote('#form', ".modal", '.notes-list');
modal('#form', ".modal", ".modal_footer-btnCancel", '[data-close]');
deleteNote('.notes-list');
archiveNote('.notes-list');
















