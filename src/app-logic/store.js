import {setComplete, setInProgress, setPastDue, setToday, setNotStarted, setWeek} from "./filter"
import {projectFactory} from "./project"
// make these accessible from anywhere
export let tasks; 
export let projects;

//tasks
if (localStorage.tasks){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = Array.from(tasks);
} else {
    tasks = [];
}

//projects
if (localStorage.projects){
    projects = JSON.parse(localStorage.getItem('projects'));
    projects = Array.from(projects);
} else {
    projects = [];
    let defaultProject = projectFactory("Default");
    projects.push(defaultProject);
    
}

//manage tasks
export const updateTasks = () => {
    initFilters();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export const addToTasks = (task) => {
    tasks.push(task);
    projects.forEach((proj) => {
        if (proj.id === task.project){
            proj.tasks.push(task);
        }
    })
    updateTasks();
    updateProjects();
}

export const delFromTasks = (task) => {
    let i = tasks.indexOf(task);
    tasks.splice(i, 1);
    projects.forEach((proj) => {
        if (proj.id === task.project){
            let i = proj.tasks.indexOf(task);
            proj.tasks.splice(i,1);
        }
    })
    updateTasks();
    updateProjects();
}

export const updateProjectTasks = () => {
    updateTasks();
    if (tasks) {
        projects.forEach((proj) => {
            const inProject = (task) => {return parseInt(task.project) === proj.id}
            let projTasks = tasks.filter(inProject);
            proj.tasks = projTasks;
        })
    }
}

//manage projects
export const updateProjects = () => {
    initFilters();
    updateProjectTasks();
    localStorage.setItem('projects', JSON.stringify(projects));
}

export const addToProjects = (project) => {
    projects.push(project);
    updateProjects();
}

export const delFromProjects = (project) => {
    for(let i = (project.tasks.length) - 1; i > 0; i--){
        delFromTasks(project[i]);
    }
    let i = projects.indexOf(project);
    projects.splice(i, 1);
    updateTasks()
    updateProjects();
}

const initFilters = () => {
    setComplete();
    setInProgress();
    setPastDue();
    setToday();
    setNotStarted();
    setWeek();
}