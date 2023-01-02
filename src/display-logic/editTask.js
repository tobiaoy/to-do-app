import {makeDiv, makeDropDown, makeForm, makeInput, makeLabel, makePar} from "../tags";
import {updateTasks, updateProjects, projects as projectList, tasks as taskList} from "../app-logic/store";
import { updateView, isInPage } from "..";
import "../styles/forms.scss"

const makeEditForm = (task) => {
    const overlay = makeDiv('edit-form-overlay', 'form-overlay');
    let form = makeForm('edit-form');
    let editInfo = makeDiv('edit-form-info', 'form-info');

    // title
    let title = makePar('form-title');
    title.textContent = 'Edit Task';

    // name
    let nameDiv = makeDiv('edit-name-div', 'edit-input');
    let name = makeInput('edit-name', 'text', 'edit-name');
    let nameInput = name.input;
    name.makeRequired();
    let nameLabel = makeLabel('edit-name', 'edit-label', 'Task Name: ')
    nameDiv.append(nameLabel, nameInput);

    // description
    let descDiv = makeDiv('edit-desc-div', 'edit-input');
    let desc = document.createElement('textarea');
    desc.setAttribute('id', 'edit-desc');
    desc.name = 'edit-desc';
    let descLabel = makeLabel('edit-desc', 'edit-label', 'Task Description: ');
    descDiv.append(descLabel, desc);

    // priority
    let priorityDiv = makeDiv('edit-priority-div', 'edit-input');
    let priority = makeDropDown('edit-priority', 'edit-priority');
    let priorityInput = priority.select;
    priority.addOption('high', 'High');
    priority.addOption('mid', 'Medium');
    priority.addOption('low', 'Low');
    let priorityLabel = makeLabel('edit-priority', 'edit-label', 'Task Priority: ');
    priorityDiv.append(priorityLabel, priorityInput);
  
    // due date
    let dateDiv = makeDiv('edit-date-div', 'edit-input');
    let dueDate = makeInput('edit-date', 'date', 'edit-date');
    let dueDateInput = dueDate.input;
    dueDate.makeRequired();
    let dueDateLabel = makeLabel('edit-date', 'edit-label', 'Due Date: ');
    dateDiv.append(dueDateLabel, dueDateInput);

    // progress
    let progressDiv = makeDiv('edit-progress-div', 'edit-input');
    let progress = makeDropDown('edit-progress', 'edit-progress');
    let progressInput = progress.select;
    progress.addOption('not-started', 'Not Started');
    progress.addOption('in-progress', 'In Progress');
    progress.addOption('completed', 'Completed');
    let progressLabel = makeLabel('edit-progress', 'edit-label', 'Progress: ');
    progressDiv.append(progressLabel, progressInput);
  
    // project
    let projectDiv = makeDiv('edit-project', 'edit-input');
    let project = makeDropDown('edit-project', 'edit-project');
    let projectInput = project.select;

    updateProjects();
    projectList.forEach((proj) => {
        project.addOption(`${proj.id}`, `${proj.name}`);
    })

    let projectLabel = makeLabel('edit-project', 'edit-label', 'Project: ');
    projectDiv.append(projectLabel, projectInput);
 
    // set placeholders
    nameDiv.children[1].value = task.name;
    descDiv.children[1].value = task.desc;
    dateDiv.children[1].value = task.dueDate;
    priorityDiv.children[1].value = task.priority;
    progressDiv.children[1].value = task.progress;
    projectDiv.children[1].value = task.project;
 
    const btnSet = makeDiv('edit-form-btn-set', 'form-btn-set');

    let submit = makeInput('edit-form-confirm', 'submit', 'confirm');
    submit.input.setAttribute('value', 'Confirm');
 
    form.addEventListener('submit', (e) => {
    e.preventDefault();
        for (let i= 0; i < taskList.length; i++){
        if ((taskList[i].name === task.name) && (new Date(taskList[i].dueDate).valueOf() === new Date(task.dueDate).valueOf())){
            taskList[i].name = nameDiv.children[1].value;
            taskList[i].desc = descDiv.children[1].value;
            taskList[i].dueDate = dateDiv.children[1].value;
            taskList[i].priority = priorityDiv.children[1].value;
            taskList[i].progress = progressDiv.children[1].value;
            taskList[i].project = projectDiv.children[1].value;

            updateTasks();
            updateProjects();
            overlay.style.display = 'none';
            updateView();
            }
        }
    })
 
    let cancel = makeInput('edit-form-cancel', 'reset', 'Cancel');
    cancel.input.setAttribute('value', 'Cancel');

    form.addEventListener('reset', (e) => {
        e.preventDefault();
        overlay.style.display = 'none';
        updateView();
    })
    
    btnSet.append(submit.input, cancel.input);
    editInfo.append(nameDiv, descDiv, priorityDiv, dateDiv, progressDiv, projectDiv, btnSet);
    form.append(title, editInfo);
    overlay.appendChild(form);
    return overlay;
}

export const createForm = (task) => {
    const editForm = document.querySelector('#edit-form-overlay');
    if (!isInPage(editForm)){
        document.body.append(makeEditForm(task));
    } else {
        // instead of making this reappear, instead delete the existing form and restart with a new one
        editForm.remove();
        document.body.append(makeEditForm(task));        
        //editForm.style.display = 'flex';
    }
}