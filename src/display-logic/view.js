import { organizeTasks, setComplete, setInProgress, setPastDue, setToday, setNotStarted, setWeek } from '../app-logic/filter'
import { updateProjects, tasks as taskList } from '../app-logic/store'
import { makeBtn, makeDiv, makePar } from '../tags'
import { renderTask } from './renderTask'
import { createForm as makeTaskForm } from './taskForm'
import { sideView } from "../index"
import "../styles/core.scss"

//today's tasks
export const todayView = () => {
    // this will be the view for tasks that are due that day
    const container = makeDiv('today-view', 'view');
    const current = makeDiv('today-existing', 'existing-tasks');
    const addNew = makeBtn('view-btn', '+ Add New Task');
    const todayTitle = makePar('view-title');
    todayTitle.textContent = 'Today';

    let todayTasks
    updateProjects();
    if (localStorage['today-tasks']){
        todayTasks = JSON.parse(localStorage.getItem('today-tasks'));
        todayTasks = Array.from(todayTasks);
    } else if (localStorage.tasks){
        setToday();
        todayTasks = JSON.parse(localStorage.getItem('today-tasks'))
        todayTasks = Array.from(todayTasks);
    } else return

    if (todayTasks){
        todayTasks.forEach((task) => {
            current.appendChild(renderTask(task));
        })
    }

    addNew.addEventListener('click', () => {
        let form = makeTaskForm()
        if (form){document.body.append(form);}
    })
    
    container.append(todayTitle, current, addNew);
    sideView.append(container);
    return container;
}

// this week's tasks
export const weekView = () => {
    const container = makeDiv('week-view', 'view');
    const current = makeDiv('week-existing', 'existing-tasks');
    const addNew = makeBtn('view-btn', '+ Add New Task');
    const weekTitle = makePar('view-title');
    weekTitle.textContent = 'This Week';

    let weekTasks
    updateProjects();

    if (localStorage['week-tasks']){
        weekTasks = JSON.parse(localStorage.getItem('week-tasks'));
        weekTasks = Array.from(weekTasks);
    } else if (localStorage.tasks){
        setWeek();
        weekTasks = JSON.parse(localStorage.getItem('week-tasks'))
        weekTasks = Array.from(weekTasks);
    } else return

    if (weekTasks){
        weekTasks.forEach((task) => {
            current.appendChild(renderTask(task));
        })
    }
    
    addNew.addEventListener('click', () => {
        let form = makeTaskForm()
        if (form){document.body.append(form);}
    })

    container.append(weekTitle, current, addNew)
    sideView.append(container)
    // return container;
}

export const pastDueView = () => {
    const container = makeDiv('past-due-view', 'view');
    const current = makeDiv('past-due-existing', 'existing-tasks');
    const addNew = makeBtn('view-btn', '+ Add New Task');
    const pastDueTitle = makePar('view-title');
    pastDueTitle.textContent = 'Past Due';
    let pastDueTasks
    
    updateProjects();
    if (localStorage['past-due-tasks']){
        pastDueTasks = JSON.parse(localStorage.getItem('past-due-tasks'));
        pastDueTasks = Array.from(pastDueTasks);
    } else if (localStorage.tasks){
        setPastDue();
        pastDueTasks = JSON.parse(localStorage.getItem('past-due-tasks'));
        pastDueTasks = Array.from(pastDueTasks);
    } else return

    if (pastDueTasks){
        pastDueTasks.forEach((task) => {
            current.appendChild(renderTask(task));
        })
    }

    addNew.addEventListener('click', () => {
        let form = makeTaskForm()
        if (form){document.body.append(form);}
    })
    
    container.append(pastDueTitle, current, addNew);
    sideView.append(container);
    // return container;
}

export const progressView = () => {
    const container = makeDiv('progress-box', 'view');
    const notStartedBox = makeDiv('not-started-box', 'progress-view');
    const inProgressBox = makeDiv('inprogress-box', 'progress-view');
    const completedBox = makeDiv('completed-box', 'progress-view');

    const progressTitle = makePar('view-title');
    progressTitle.textContent = 'Progress';
    
    // not started
    const notStartedTitle = makePar('progress-title');
    notStartedTitle.textContent = 'Not Started';
    notStartedBox.appendChild(notStartedTitle);

    let notStartedTasks
    updateProjects()
    if (localStorage['not-started-tasks']){
        notStartedTasks = JSON.parse(localStorage.getItem('not-started-tasks'));
        notStartedTasks = Array.from(notStartedTasks);
    } else if (localStorage.tasks){
        setNotStarted()
        notStartedTasks = JSON.parse(localStorage.getItem('not-started-tasks'))
        notStartedTasks = Array.from(notStartedTasks);
    } else return
        
    if (notStartedTasks){
        notStartedTasks.forEach((task) => {
            notStartedBox.appendChild(renderTask(task))
        })
    }
    
    // in progress
    const inProgressTitle = makePar('progress-title');
    inProgressTitle.textContent = 'In Progress';
    inProgressBox.appendChild(inProgressTitle);

    let inProgressTasks
    updateProjects();
    if (localStorage['in-progress-tasks']){
        inProgressTasks = JSON.parse(localStorage.getItem('in-progress-tasks'));
        inProgressTasks = Array.from(inProgressTasks);
    } else if (localStorage.tasks){
        setInProgress();
        inProgressTasks = JSON.parse(localStorage.getItem('in-progress-tasks'));
        inProgressTasks = Array.from(inProgressTasks);
    } else return
        
    if (inProgressTasks){        
        inProgressTasks.forEach((task) => {
            inProgressBox.appendChild(renderTask(task));
        })
    }

    // completed
    const completedTitle = makePar('progress-title');
    completedTitle.textContent = 'Completed';
    completedBox.appendChild(completedTitle);

    let completedTasks
    updateProjects();
    if (localStorage['completed-tasks']){
        completedTasks = JSON.parse(localStorage.getItem('completed-tasks'));
        completedTasks = Array.from(completedTasks);
    } else if (localStorage.tasks){
        setComplete();
        completedTasks = JSON.parse(localStorage.getItem('completed-tasks'));
        completedTasks = Array.from(completedTasks);
    } else {
        return;
    }

    if (completedTasks){
        completedTasks.forEach((task) => {
            completedBox.appendChild(renderTask(task));
        })
    }

    const addNew = makeBtn('view-btn', '+ Add New Task');

    addNew.addEventListener('click', () => {
        let form = makeTaskForm()
        if (form){document.body.append(form);}
    })
        
    container.append(progressTitle, notStartedBox, inProgressBox, completedBox, addNew);
    sideView.appendChild(container);
    // return container;
}
