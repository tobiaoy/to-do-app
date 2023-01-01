export const taskFactory = (name, desc, priority, dueDate, progress, project) => {
	return {
  	name,
    desc,
    priority,
    dueDate,
    progress,
    project,
    rendered: false,
  }
}