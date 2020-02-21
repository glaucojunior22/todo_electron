const ul = document.querySelector('ul')
document.addEventListener('submit', formSubmit)
//Recupera a lista de tarefas salvas no LocalStorage
let tasks = JSON.parse(window.localStorage.getItem('tasks')) || []
let lastId = tasks.length > 0 ? tasks[tasks.length - 1].id : 0
for (task of tasks){
    insertItemHTML(task)
}

//Insere o item no HTML
function insertItemHTML(item){
    const li = document.createElement('li')
    li.setAttribute('id', item.id)
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = item.status
    checkbox.addEventListener('click', checkboxClicked)
    const span = document.createElement('span')
    span.contentEditable = true;
    span.className = 'editable'
    if (!item.status){
        span.classList += ' task-done'
    }
    span.addEventListener('blur', editText)
    const itemText = document.createTextNode(item.text)
    span.appendChild(itemText)
    const btn = document.createElement('button')
    btn.setAttribute('class', 'btn btn-danger delete')
    btn.addEventListener('click', deleteTask)
    const btnText = document.createTextNode('Excluir')
    btn.appendChild(btnText)
    li.appendChild(checkbox)
    li.appendChild(span)
    li.appendChild(btn)
    ul.appendChild(li)
}

//Salva uma nova tarefa na lista de tarefas e persiste no localStorage
function saveItem(item){
    tasks.push(item)
    saveItems()
}

//Salva o array de tarefas no estado atual no localStorage
function saveItems(){
    window.localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Altera o Status da tarefa
function statusToggle(id){
    tasks = tasks.map(task => task.id === id ? {id: task.id, text: task.text, status:!task.status} : task)
    saveItems()
}

//Edita o texto de uma tarefa no localStorage
function editItem(id, text){
    tasks = tasks.map(task => task.id === id ? {id: task.id, text: text, status: task.status} : task)
    saveItems()
}

function deleteItem(id){
    tasks = tasks.filter(task => task.id !== id)
    saveItems()
}

//Funcao para tratar o evento de submit do form
function formSubmit(evt){
    evt.preventDefault()
    const task = document.querySelector('#task')
    const novaTarefa = {
        id: lastId + 1,
        text: task.value,
        status: true
    }
    insertItemHTML(novaTarefa)
    saveItem(novaTarefa)
    task.value = ''
    lastId++
}

//Excluir objeto
function deleteTask(evt){
    const button = evt.target
    const itemId = parseInt(button.parentNode.getAttribute('id'))
    button.parentNode.remove()
    deleteItem(itemId)
}

//Marca ou desmarca tarefa como feita
function checkboxClicked(evt){
    const checkbox = evt.target
    const itemId = parseInt(checkbox.parentNode.getAttribute('id'))
    const span = checkbox.nextSibling
    if (checkbox.checked === false){
        span.setAttribute('class', 'editable task-done')
    }else{
        span.setAttribute('class', 'editable task-undone')
    }
    statusToggle(itemId)
}

//Funcao chamada quando ocorrer o blur no span apos edicao
function editText(evt){
    const span = evt.target
    const newText = span.innerText
    const itemId = parseInt(span.parentNode.getAttribute('id'))
    console.log(itemId, newText)
    editItem(itemId, newText)
}