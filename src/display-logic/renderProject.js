import { makeBtn, makeDiv, makePar } from "../tags"
import { renderTask } from "./renderTask"
import { updateProjects, projects as projectList, delFromProjects} from "../app-logic/store"
import { sideView, updateView, clearNav, setNav, nav, navigation } from "../index"
import { makeNav } from "./nav"
import { createForm as makeTaskForm } from './taskForm'
import "../styles/projects.scss";

export const renderProject = (project) => {
    const container = makeDiv(`${project.id}`, 'render-project');
    const taskBox = makeDiv('', 'render-project-task-box');
    const projectTitle = makePar('view-title');
    projectTitle.textContent = `${project.name}`;

    updateProjects();
    project.tasks.forEach((task)=> {
        taskBox.append(renderTask(task));
    })

    const addBtn = makeBtn('view-btn', '+ Add New Task')
    addBtn.addEventListener('click', () => {
        let form = makeTaskForm()
        if (form){document.body.append(form);}
    })

    const delBtn = makeBtn('view-btn', 'Delete Project') 
    delBtn.setAttribute('id', 'del-project-btn')
    
    delBtn.addEventListener('click', () => {
        delFromProjects(project);
        clearNav();
        setNav(makeNav());
        nav.setActiveNav('today-btn');
        navigation.append(nav.container);
        updateView()
    })
    // const delBtn = makeBtn('del-project-btn', 'Delete Project') -> consider adding this to the side of the project
    container.append(projectTitle, taskBox, addBtn, delBtn)
    sideView.append(container)
    }
