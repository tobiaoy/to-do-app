import { delFromTasks, updateProjects, updateTasks } from "../app-logic/store"
import { makeBtn, makeDiv, makePar, makeItalic } from "../tags"
import { projects as projectList, tasks as taskList} from "../app-logic/store"
import { createForm as makeTaskForm } from "./taskForm";
import "../styles/tasks.scss";
import { updateView } from "..";
import { createForm as makeEditForm } from "./editTask";

export const renderTask = (task) => {
    const container = makeDiv('', 'rendered-task')
    const info = makeDiv('', 'render-task-info')
    const btnSet = makeDiv('', 'render-task-btn-set')
    const taskTitle = makePar('render-task-title')
    taskTitle.textContent = `${task.name}`;

    if (task.progress === 'completed'){
        taskTitle.classList.add('completed-tasks');
    }

    const taskDate = makePar('render-task-date');
    taskDate.textContent = `${task.dueDate}`;

    let projectName = '';
    for (let i = 0; i < projectList.length; i++){
        if (parseInt(task.project) === parseInt(projectList[i].id)){
            projectName = projectList[i].name;
        }
    }

    const taskProject = makePar('render-task-project');
    taskProject.textContent = projectName;

    const taskPriority = makePar('render-task-priority')
    taskPriority.textContent = `${task.priority}`;

    //btn set
    // complete btn to set to complete
    const completeBtn = makeBtn('task-btn', '', 'complete-btn')
    let completeIcon = makeItalic('complete-icon');
    completeBtn.appendChild(completeIcon);

    completeBtn.addEventListener('click', () => {
        for (let i = 0; i < taskList.length; i++){
            if ((taskList[i].name === task.name) && (taskList[i].dueDate.valueOf() === task.dueDate.valueOf())){
                taskList[i].progress = 'completed';
            }
        }
        taskTitle.classList.add('completed-tasks');
        updateTasks();
        updateProjects();
        updateView();
    })

    // uncomplete btn to reverse completion
    const uncompleteBtn = makeBtn('task-btn', '', 'un-complete-btn');
    let uncompleteIcon = makeItalic('uncomplete-icon');
    uncompleteBtn.appendChild(uncompleteIcon);

    uncompleteBtn.addEventListener('click', () => {
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

    // edit btn for viewing task details and changing them
    const editBtn = makeBtn('task-btn', '', 'edit-btn' )
    let editIcon = makeItalic('edit-icon');
    editBtn.appendChild(editIcon); 

    editBtn.addEventListener('click', () => {
        makeEditForm(task);
    });
    
    const deleteBtn = makeBtn('task-btn', '', 'delete-btn') // delete task
    let deleteIcon = makeItalic('delete-icon');
    deleteBtn.appendChild(deleteIcon);

    deleteBtn.addEventListener('click', () => {
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