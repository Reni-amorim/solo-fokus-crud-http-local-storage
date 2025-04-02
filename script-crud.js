const btnAddTask = document.querySelector('.app__button--add-task')
const formAddTask = document.querySelector('.app__form-add-task')
const textAreaTask = document.querySelector('.app__form-textarea')
const ulTasks = document.querySelector('.app__section-task-list')
const paragraphDescriptionTask = document.querySelector('.app__section-active-task-description')

const formBtnCancel = document.querySelector('.app__form-footer__button--cancel')
const formTask = document.querySelector('.app__form-add-task')

const tasks = JSON.parse(localStorage.getItem('tasks')) || []
let selectedTask = null
let liSelectedTask = null

const clearForm = () => {
    textAreaTask.value = ''
    formTask.classList.add('hidden')
}

function updateTasks() {
    textAreaTask.value = ''
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function createElementTask(task) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    const paragraph = document.createElement('p')
    paragraph.textContent = task.descricao
    paragraph.classList.add('app__section-task-list-item-description')

    const button = document.createElement('button')
    button.classList.add('app_button-edit')

    button.onclick = () => {
        const newDescription = prompt("Qual é a nova tarefa?")
        if (newDescription) {
            paragraph.textContent = newDescription
            task.descricao = newDescription
            updateTasks()
        }
    }

    const imgButton = document.createElement('img')
    imgButton.setAttribute('src', './imagens/edit.png')
    button.append(imgButton)

    li.append(svg)
    li.append(paragraph)
    li.append(button)

    li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active')
        .forEach(element => {
            element.classList.remove('app__section-task-list-item-active')
        })

        if (selectedTask == task) {
            paragraphDescriptionTask.textContent = ''
            selectedTask = null
            liSelectedTask = null
            return
        }
        selectedTask = task
        liSelectedTask = li
        paragraphDescriptionTask.textContent = task.descricao

        li.classList.add('app__section-task-list-item-active')
    }

    return li
}

//btn cancelar preechimento de textarea
formBtnCancel.addEventListener('click', clearForm)

btnAddTask.addEventListener('click', () => {
    formAddTask.classList.toggle('hidden')
    textAreaTask.focus()
})

formAddTask.addEventListener('submit', (e) => {
    e.preventDefault()
    const task = {
        descricao: textAreaTask.value
    }
    tasks.push(task)
    const elementTask = createElementTask(task)
    ulTasks.appendChild(elementTask)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    textAreaTask.value = ''
    formAddTask.classList.add('hidden')
})

tasks.forEach(task => {
    const elementTask = createElementTask(task)
    ulTasks.appendChild(elementTask)
});

document.addEventListener('FocoFinalizado', () => {
    if (selectedTask && liSelectedTask) {
        liSelectedTask.classList.remove('app__section-task-list-item-active')
        liSelectedTask.classList.add('app__section-task-list-item-complete')
        liSelectedTask.querySelector('button').setAttribute('disabled', true)
    }
})