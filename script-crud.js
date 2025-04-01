const btnAddTask = document.querySelector('.app__button--add-task')
const formTask = document.querySelector('.app__form-add-task')
const textAreaTask = document.querySelector('.app__form-textarea')

const tasks = []

btnAddTask.addEventListener('click', () => {
    formTask.classList.toggle('hidden')
    textAreaTask.focus()
})

formTask.addEventListener('submit', (e) => {
    e.preventDefault()
    const task = {
        descricao: textAreaTask.value
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
})