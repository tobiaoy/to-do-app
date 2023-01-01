//the task form is supposed to collect user input and make it into a task
import { makeForm, makePar, makeDiv, makeInput, makeDropDown, makeLabel } from "../tags";
import { taskFactory } from "../app-logic/task"
import { addToTasks, updateTasks, updateProjects, projects as projectList } from '../app-logic/store'
import "../styles/forms.scss"
import { updateView, isInPage } from "..";
let isEditForm = false;
export const setIsEditForm = (x) => { isEditForm = x }

const makeTaskForm = () => {
	const overlay = makeDiv('task-form-overlay', 'form-overlay');
    let form = makeForm('task-form');

    let taskInfo = makeDiv('task-form-info', 'form-info');
    
    // form title
    let title = makePar('form-title');
    title.textContent = 'Task-Form';
    
    // task name
    let nameDiv = makeDiv('name-div', 'task-input');
    let name = makeInput('task-name', 'text', 'task-name');
    let nameInput = name.input;
    name.makeRequired();
    let nameLabel = makeLabel('task-name', 'task-label', 'Task Name: ')
    nameDiv.append(nameLabel, nameInput);
    
    // task description
    let descDiv = makeDiv('desc-div', 'task-input');
    let desc = document.createElement('textarea');
    desc.setAttribute('id', 'task-desc');
    desc.name = 'task-desc';
    let descLabel = makeLabel('task-desc', 'task-label', 'Task Description: ');
    descDiv.append(descLabel, desc);
    
    // task priority
    let priorityDiv = makeDiv('priority-div', 'task-input');
    let priority = makeDropDown('priority-dropdown', 'priority-dropdown');
    let priorityInput = priority.select;
    priority.addOption('high', 'High');
    priority.addOption('mid', 'Medium');
    priority.addOption('low', 'Low');
    let priorityLabel = makeLabel('priority-dropdown', 'task-label', 'Task Priority: ');
    priorityDiv.append(priorityLabel, priorityInput);
    
    // task due date
    let dateDiv = makeDiv('date-div', 'task-input');
    let dueDate = makeInput('due-date', 'date', 'due-date');
    let dueDateInput = dueDate.input;
    dueDate.makeRequired();
    let dueDateLabel = makeLabel('due-date', 'task-label', 'Due Date: ');
    dateDiv.append(dueDateLabel, dueDateInput);
    
    // task progress
    let progressDiv = makeDiv('progressDiv', 'task-input');
    let progress = makeDropDown('progressDropDown', 'progress-dropdown');
    let progressInput = progress.select;
    progress.addOption('not-started', 'Not Started');
    progress.addOption('in-progress', 'In Progress');
    progress.addOption('completed', 'Completed');
    let progressLabel = makeLabel('progress-dropdown', 'task-label', 'Progress: ');
    progressDiv.append(progressLabel, progressInput);

    // task's associated project
    let projectDiv = makeDiv('project-div', 'task-input');
    let project = makeDropDown('project-dropdown', 'project-dropdown');
    let projectInput = project.select;
    
    updateProjects();
    projectList.forEach((proj) => {
        project.addOption(`${proj.id}`, `${proj.name}`);
    })

    let projectLabel = makeLabel('project-dropdown', 'task-label', 'Project: ');
    projectDiv.append(projectLabel, projectInput);

    const btnSet = makeDiv('task-form-btn-set', 'form-btn-set')
    //submit btn
    let submit = makeInput('task-form-confirm', 'submit', 'confirm')
    submit.input.setAttribute('value', 'Confirm');

    form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isEditForm){   
        let task = taskFactory(nameDiv.children[1].value, descDiv.children[1].value, priorityDiv.children[1].value, dateDiv.children[1].value, progressDiv.children[1].value, projectDiv.children[1].value);
        addToTasks(task);
        updateTasks();
        updateProjects();
    }
    overlay.style.display = 'none';
    updateView();

    })

    //cancel btn
    let cancel = makeInput('task-form-cancel', 'reset', 'cancel')
    cancel.input.setAttribute('value', 'Cancel');

    form.addEventListener('reset', (e) => {
        e.preventDefault();
        overlay.style.display = 'none';
        updateView();
    })

    btnSet.append(submit.input, cancel.input);
    taskInfo.append(nameDiv, descDiv, priorityDiv, dateDiv, progressDiv, projectDiv, btnSet)
    form.append(title, taskInfo);
    overlay.appendChild(form)
    return overlay
    
}

export const createForm = () => {
    const taskForm = document.querySelector('#task-form-overlay');
    if (!isInPage(taskForm)){
        document.body.append(makeTaskForm());
    } else {
        taskForm.style.display = 'flex';
    }
}