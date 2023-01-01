//import { createContent as renderPage } from "./display-logic/page";
import {projects as projectList} from "./app-logic/store"
import { makeNav } from "./display-logic/nav";
import { renderProject } from "./display-logic/renderProject";
import { todayView, weekView, pastDueView, progressView } from "./display-logic/view";
import "./styles/core.scss";
import { makeItalic, makePar } from "./tags";

export const main = document.querySelector('#main');
export const navigation = document.querySelector('#navigation');
export const sideView = document.querySelector('#view');
export const setNav = (x) => { nav = x }
export let nav = makeNav()

export const isInPage = (node) => {
    return (node === document.body) ? false : document.body.contains(node);
}

const footer = document.querySelector('#footer');
footer.textContent = '';
let gitLink = document.createElement('a');
gitLink.href = `https://www.github.com/tobiaoy`;
let footerText = makePar('footer-text');
footerText.textContent = `Made By Tobi Oyero`;
let githubIcon = makeItalic('github-icon');
gitLink.append(footerText, githubIcon);
footer.appendChild(gitLink);

window.addEventListener('load', (e) => {
    e.preventDefault();
    navigation.append(nav.container);
    sideView.append(todayView());
})

export const clearMain = () => {
    main.innerHTML = '';
}

export const clearNav = () => {
    navigation.innerHTML = '';
}

export const clearView = () => {
    sideView.innerHTML = '';
}

export const updateView = () => {
    // should clear the current view and update with the current nav
    // how to get the nav if the nav changes
    let activeNav = nav.getActiveNav();
    clearView();
    if (activeNav === 'today-btn'){
        todayView();
    } else if (activeNav === 'week-btn'){
        weekView();
    } else if (activeNav === 'past-due-btn'){
        pastDueView();
    } else if (activeNav === 'progress-btn'){
        progressView();
    } else {
        for (let i = 0; i < projectList.length; i++){
            if (parseInt(activeNav) === projectList[i].id){
                renderProject(projectList[i]);
            }
        }
    }
}
