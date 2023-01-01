// filtering tasks based on time and progress
import { compareAsc, isThisWeek, isToday, isPast, parseISO } from 'date-fns'
import { tasks as taskList } from "./store" 

// to organize tasks by time/date
export const organizeTasks = (arr) => {
    return arr.map((task) => {
        task.date
    }).sort(compareAsc);
}

// time based filters
// this week's tasks
export const setWeek = () => {
    const getWeek = (task) => {return isThisWeek(new Date(task.dueDate))}
    const getWeekTasks = (arr) => {return arr.filter(getWeek)}

    if (localStorage.tasks){
        let weekTasks = JSON.stringify(getWeekTasks(taskList));
        localStorage.setItem('week-tasks', weekTasks);    
    } else {
        return
    }
}

// today's tasks
export const setToday = () => {
    const getToday = (task) => {return isToday(new Date(task.dueDate))}
    const getTodayTasks = (arr) => {return arr.filter(getToday)}
    
    if (localStorage.tasks){
        let todayTasks = JSON.stringify(getTodayTasks(taskList)); 
        localStorage.setItem('today-tasks', todayTasks);
    } else {
        return
    }
}

// tasks that are past due
export const setPastDue = () => {
    const getPastDue = (task) => {return isPast(new Date(task.dueDate))}
    const getPastDueTasks = (arr) => {return arr.filter(getPastDue)}

    if (localStorage.tasks){
        let pastDueTasks = JSON.stringify(getPastDueTasks(taskList)); 
        localStorage.setItem('past-due-tasks', pastDueTasks);
    } else {
        return
    }
}

// progress filters
// tasks that aren't started
export const setNotStarted = () => {
    const getNotStarted = (task) => {return task.progress === 'not-started';}
    const getNotStartedTasks = (arr) => {return arr.filter(getNotStarted);}

    if (localStorage.tasks){
        let notStartedTasks = JSON.stringify(getNotStartedTasks(taskList)); 
        localStorage.setItem('not-started-tasks', notStartedTasks);
    } else {
        return
    }
}

// tasks that are in progress
export const setInProgress = () => {
    const getInProgress = (task) => {return task.progress === 'in-progress';}
    const getInProgressTasks = (arr) => {return arr.filter(getInProgress)}

    if (localStorage.tasks){
        let inProgressTasks = JSON.stringify(getInProgressTasks(taskList)); 
        localStorage.setItem('in-progress-tasks', inProgressTasks);
    } else {
        return
    }
}

// tasks that have been completed
export const setComplete = () => {
    const getComplete = (task) => {return task.progress === 'completed';}
    const getCompletedTasks = (arr) => {return arr.filter(getComplete);}
    
    if (localStorage.tasks){
        let completeTasks = JSON.stringify(getCompletedTasks(taskList)); 
        localStorage.setItem('completed-tasks', completeTasks);
    } else {
        return
    }
}
