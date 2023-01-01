//form meant to collect input from the user to make project object
import "../styles/forms.scss"
import { makeDiv, makeInput, makePar, makeForm, makeLabel } from "../tags";
import { projectFactory } from "../app-logic/project";
import { updateProjects, addToProjects } from "../app-logic/store";
import { clearNav, navigation, updateView, isInPage, setNav, nav } from "..";
import { makeNav } from "./nav";

const makeProjectForm = () => {
    //add overlay
    const overlay = makeDiv('project-form-overlay', 'form-overlay');

    //form
    let form = makeForm('project-form');

    //title
    let title = makePar('form-title')
    title.textContent = 'Project Form';

    //make a div for everything that isn't the title
    let infoDiv = makeDiv('project-form-info', 'form-info');
    // may have to alter selectors

    //name?
    let nameDiv = makeDiv('name-div', 'project-input');
    let name = makeInput('project-name', 'text', 'project-name');
    name.makeRequired();
    let nameLabel = makeLabel('project-name', 'project-label', 'Project Name');
    nameDiv.append(nameLabel, name.input);

    const btnSet = makeDiv('project-form-btn-set','form-btn-set')
    // submit
    let submit = makeInput('project-form-confirm', 'submit', 'confirm');
    submit.input.setAttribute('value', 'Confirm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let project = projectFactory(nameDiv.children[1].value);
        addToProjects(project);
        updateProjects();
        overlay.style.display = 'none';

        //reset the nav
        clearNav();
        setNav(makeNav());
        navigation.append(nav.container)
        updateView();
    })

    // cancel 
    let cancel = makeInput('project-form-cancel', 'reset', 'cancel')
    cancel.input.setAttribute('value', 'Cancel');

    form.addEventListener('reset', (e) => {
        e.preventDefault();
        overlay.style.display = 'none'
    })

    btnSet.append(submit.input, cancel.input);
    infoDiv.append(nameDiv, btnSet);
    form.append(title, infoDiv);
    overlay.appendChild(form);
    return overlay;
}

export const createForm = () => {
    const projectForm = document.querySelector('#project-form-overlay');
    if (!isInPage(projectForm)){
        document.body.append(makeProjectForm());
    } else {
        projectForm.style.display = 'flex';
    }    

}