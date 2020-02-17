const ul = document.querySelector('ul')
document.addEventListener('submit', formSubmit)
//Funcao para tratar o evento de submit do form
function formSubmit(evt){
    evt.preventDefault()
    const task = document.querySelector('#task')
    const li = document.createElement('li')
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.addEventListener('click', checkboxClicked)
    const span = document.createElement('span')
    span.contentEditable = true;
    span.className = 'editable'
    const itemText = document.createTextNode(task.value)
    span.appendChild(itemText)
    const btn = document.createElement('button')
    btn.setAttribute('class', 'btn btn-danger delete')
    btn.addEventListener('click', deleteItem)
    const btnText = document.createTextNode('Excluir')
    btn.appendChild(btnText)
    li.appendChild(checkbox)
    li.appendChild(span)
    li.appendChild(btn)
    ul.appendChild(li)
    task.value = ''
}

//Excluir objeto
function deleteItem(evt){
    const button = evt.target
    button.parentNode.remove()
}

//Marca ou desmarca tarefa como feita
function checkboxClicked(evt){
    const checkbox = evt.target
    const span = checkbox.nextSibling
    if (checkbox.checked === true){
        span.setAttribute('class', 'editable task-done')
    }else{
        span.setAttribute('class', 'editable task-undone')
    }
}