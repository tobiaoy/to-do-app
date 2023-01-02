import { makeDiv, makePar, makeBtn } from "../tags"
import { updateProjects, projects as projectList, updateTasks } from "../app-logic/store";
import { createForm as addProject } from "./projectForm"
import { navigation, clearView } from "../index"
import { todayView, weekView, pastDueView, progressView } from "./view"
import { renderProject } from "./renderProject";
import "../styles/core.scss"

export const makeNav = () => {
    const container = makeDiv('nav', 'nav'); // container for the nav
    const nav1 = makeDiv('nav-one', 'sub-nav'); // for the first half of the nav -> filters
    const nav2 = makeDiv('nav-two', 'sub-nav'); // for the projects section
    let activeNav = 'today-btn';

    // nav 1/filter buttons
    const todayBtn = makeBtn('nav-btn', 'Today', 'today-btn')
    const weekBtn = makeBtn('nav-btn', 'This Week', 'week-btn')
    const pastDueBtn = makeBtn('nav-btn', 'Past Due', 'past-due-btn')
    const progressBtn = makeBtn('nav-btn', 'Progress', 'progress-btn')

    // event listeners
    todayBtn.addEventListener('click', () => {
        activeNav = 'today-btn';
        for (let child of nav1.children){child.classList.remove('active-nav')}
        for (let child of nav2.children){child.classList.remove('active-nav')}
        todayBtn.classList.add('active-nav');
        clearView();
        todayView();
    })

    weekBtn.addEventListener('click', () => {
        activeNav = 'week-btn';
        for (let child of nav1.children){child.classList.remove('active-nav')}
        for (let child of nav2.children){child.classList.remove('active-nav')}
        weekBtn.classList.add('active-nav')
        clearView();
        weekView();
    })

    pastDueBtn.addEventListener('click', () => {
        activeNav = 'past-due-btn';
        for (let child of nav1.children){child.classList.remove('active-nav')}
        for (let child of nav2.children){child.classList.remove('active-nav')}
        pastDueBtn.classList.add('active-nav');
        clearView();
        pastDueView();
    })

    progressBtn.addEventListener('click', () => {
        activeNav = 'progress-btn';
        for (let child of nav1.children){child.classList.remove('active-nav')}
        for (let child of nav2.children){child.classList.remove('active-nav')}
        progressBtn.classList.add('active-nav');
        clearView();
        progressView();
    })

    nav1.append(todayBtn, weekBtn, pastDueBtn, progressBtn);

    // nav 2/projects buttons
    const projectTitle = makePar('nav-title');
    projectTitle.textContent = 'Projects';
    nav2.append(projectTitle)

    updateTasks();
    updateProjects();
    let projectBtn;
    for (let i = 0; i < projectList.length; i++){
        projectBtn = makeBtn('nav-btn', `${projectList[i].name}`, `${projectList[i].id}`);

        projectBtn.addEventListener('click', () => {
            activeNav = `${projectList[i].id}`
            for (let child of nav1.children){child.classList.remove('active-nav')}
            for (let child of nav2.children){child.classList.remove('active-nav')}
            //projectBtn.classList.add('active-nav')
            clearView();
            renderProject(projectList[i]);
        })
        nav2.append(projectBtn)
    }  

    const addBtn = makeBtn('nav-btn', '+ Add New Project'); //triggers project form
    addBtn.setAttribute('id', 'nav-add-btn');
    addBtn.addEventListener('click', addProject);  // make sure to overlay)

    nav2.append(addBtn); 
    container.append(nav1, nav2);

    const getActiveNav = () => { 
        return activeNav; 
    }

    const setActiveNav = (x) => {
        activeNav = x;
    }

    return {container, activeNav, getActiveNav, setActiveNav};
}

export const createNav = () => {
    navigation.append(makeNav())
}

