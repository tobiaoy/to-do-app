import { delFromTasks, updateProjects, updateTasks } from "../app-logic/store"
import { makeBtn, makeDiv, makePar, makeItalic } from "../tags"
import { projects as projectList, tasks as taskList} from "../app-logic/store"
import { createForm as makeTaskForm } from "./taskForm";
import "../styles/tasks.scss";
import { setIsEditForm } from "./taskForm";
import { updateView } from "..";

export const renderTask = (task) => {
    const container = makeDiv('', 'rendered-task')
    const info = makeDiv('', 'render-task-info')
    const btnSet = makeDiv('', 'render-task-btn-set')
    
    const taskTitle = makePar('render-task-title')
    taskTitle.textContent = `${task.name}`;

    if (task.progress === 'completed'){
        taskTitle.classList.add('completed-tasks');
    }

    const taskDate = makePar('render-task-date')
    taskDate.textContent = `${task.dueDate}`;

    let projectName = '';
    for (let i = 0; i < projectList.length; i++){
        if (parseInt(task.project) === parseInt(projectList[i].id)){
            projectName = projectList[i].name;
        }
    }

    const taskProject = makePar('render-task-project')
    taskProject.textContent = projectName;

    const taskPriority = makePar('render-task-priority')
    taskPriority.textContent = `${task.priority}`;

    //btn set
    const uncompleteBtn = makeBtn('task-btn', '', 'un-complete-btn');
    let uncompleteIcon = makeItalic('uncomplete-icon');
    uncompleteBtn.appendChild(uncompleteIcon);

    const completeBtn = makeBtn('task-btn', '', 'complete-btn')
    let completeIcon = makeItalic('complete-icon');
    completeBtn.appendChild(completeIcon);

    completeBtn.addEventListener('click', () => {
        //update fn to re-render the page
        for (let i = 0; i < taskList.length; i++){
            if ((taskList[i].name === task.name ) && (taskList[i].dueDate.valueOf() === task.dueDate.valueOf())){
                taskList[i].progress = 'completed';
            }
        }
        taskTitle.classList.add('completed-tasks');
        updateTasks();
        updateProjects();
        updateView();
    })

    uncompleteBtn.addEventListener('click', () => {
        //update fn to re-render the page
        for (let i = 0; i < taskList.length; i++){
            if ((taskList[i].name === task.name ) && (taskList[i].dueDate.valueOf() === task.dueDate.valueOf())){
                taskList[i].progress = 'in-progress';
            }
        }
        taskTitle.classList.remove('completed-tasks');
        updateTasks();
        updateProjects();
        updateView();
    })

    const editBtn = makeBtn('task-btn', '', 'edit-btn' )
    let editIcon = makeItalic('edit-icon');
    editBtn.appendChild(editIcon);
    // open form -> set default values in the form -> make those the values 

    editBtn.addEventListener('click', () => {
        setIsEditForm(true);
        makeTaskForm();
        //call all the values from the DOM in the form and set them to the tasks current values
        let taskName = document.querySelector('#task-name');
        let taskDesc = document.querySelector('#task-desc');
        let priorityDd = document.querySelector('#priority-dropdown');
        let dueDate = document.querySelector('#due-date');
        let taskProgress = document.querySelector('#progressDropDown');
        let projectDd = document.querySelector('#project-dropdown');
        let taskConfirm = document.querySelector('#task-form-confirm');

        taskName.value = task.name;
        taskDesc.value = task.desc;
        dueDate.value = task.dueDate;

        priorityDd.value = task.priority;
        taskProgress.value = task.progress;
        projectDd.value = task.project;

        taskConfirm.addEventListener('click', () => {
            for (let i = 0; i < taskList.length; i++){
                if ((taskList[i].name === task.name ) && (taskList[i].dueDate.valueOf() === task.dueDate.valueOf())){
                    taskList[i].name = taskName.value;
                    taskList[i].desc = taskDesc.value;
                    taskList[i].dueDate = dueDate.value;
                    taskList[i].priority = priorityDd.value;
                    taskList[i].progress = taskProgress.value;
                    taskList[i].project = projectDd.value;
                }
            }
            updateTasks();
            updateProjects();
        })

        
    })
    
    const deleteBtn = makeBtn('task-btn', '', 'delete-btn') // delete task
    let deleteIcon = makeItalic('delete-icon');
    deleteBtn.appendChild(deleteIcon);

    deleteBtn.addEventListener('click', () => {
        // delete task from the tasks in ls
        // should delete from everywhere
        delFromTasks(task)
        updateTasks()
        updateProjects()
        updateView();
    })

    info.append(taskDate, taskProject, taskPriority)
    if (task.progress === 'completed'){
        btnSet.appendChild(uncompleteBtn);
    } else {
        btnSet.appendChild(completeBtn);
    }

    btnSet.append(editBtn, deleteBtn)
    container.append(taskTitle, info, btnSet)
    
    if (task.priority === 'high'){
        container.classList.add('high-priority');
    } else if (task.priority === 'mid'){
        container.classList.add('mid-priority');
    } else if (task.priority === 'low'){
        container.classList.add('low-priority');
    }

    return container    
}