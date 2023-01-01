// No longer in use :: Keeping for safety
import { navigation, sideView, clearMain, clearView } from "../index"
import { makeDiv } from "../tags"
import { makeNav } from "./nav"
import { renderProject } from "./renderProject"
import { pastDueView, progressView, todayView, weekView } from "./view"
import { updateProjects } from "../app-logic/store"

const createPage = () => {
    updateProjects()
    const container = makeDiv('main-page', 'main-page');
    let projects = localStorage.getItem('projects');
    let arr = JSON.parse(projects);

    let view;
    const nav = makeNav();
    const navigation = nav.container;

    const setView = (x) => {
        view = x;
    }

    const updateView = () => {
        if (nav.getActiveNav() === 'today-btn'){
            clearView();
            setView(todayView());
        } else if (nav.getActiveNav() === 'week-btn'){
            clearView();
            setView(weekView())
        } else if (nav.getActiveNav() === 'past-due-btn'){
            clearView();
            setView(pastDueView())
        } else if (nav.getActiveNav() === 'progress-btn'){
            clearView();
            setView(progressView())
        } else if (nav.getActiveNav() === 'sample-btn'){
            clearView();
            setView(renderProject(sampleProject))
        } else {
            clearView();
            arr.forEach((proj) => {
                if (proj.getId() === nav.activeNav){
                    setView(renderProject(proj))
                }
            })
        }
    }

    container.append(navigation)
    const addToMain = (view) => {
        container.append(view);
    }

    updateView();
    addToMain(view);
    
    return {
        container,
        updateView,
        addToMain
    }
}

export const createContent = () => {
    const page = createPage()
    let con = page.container
    let nav = con.querySelector('.nav')
    let view = con.querySelector('.view')

    //try to add reactivity to the nav
    // let navBtnSet = nav.querySelectorAll('.nav-btn');
    // navBtnSet.forEach((btn) => {
    //     btn.addEventListener('click', () => {
    //         page.updateView();
    //         page.addToMain(view);
    //     })

    // })

    navigation.append(nav)
    sideView.append(view)
}
