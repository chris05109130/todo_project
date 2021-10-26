// DOM Elements
const openPortal = document.querySelector('.open');
const form = document.querySelector('#todo-form');
const closePortal = document.querySelector('#close');
const todo = document.querySelector('#todo');
const todoControlPanel = document.querySelector('.todo-control-panel-container');
const descriptionTodo = document.querySelector('#description');
const errorPortal = document.querySelector('#error-portal');
const todoLayout = document.querySelector('#todo-layout');
const todoLayoutContainer = document.querySelector('.todo-layout-container');
const deleteTodo2 = document.querySelector('.deleteTodo');

console.log(deleteTodo2);


// functions goes here
function openPortalToDo(){
   todoControlPanel.classList.add('show');
}

function closePortalTodo(){
    todoControlPanel.classList.remove('show');
}
function showError(msg, className){
    errorPortal.innerHTML = msg;
    errorPortal.className = className;

}

function deleteTodo(){
    console.log('deleted');
}

function addTodo(e){
   
        let todoInput = todo.value;
       let  todoDescrip = descriptionTodo.value;

 
    if(todoInput === ''){
        showError('Please Enter Name of Todo', 'error');
 
    }else if(todoDescrip === ''){
        showError('Please Enter Description','error');
    }else{
        showError('Added Successfully', 'success');

    const todoLayout = document.createElement('div');
    todoLayout.className = 'todo-layout';

    const tools = document.createElement('div');
    tools.className = 'tools';

    const editBTN = document.createElement('p');
    editBTN.textContent = 'Edit';

    const exitBTN = document.createElement('p');
    exitBTN.textContent = 'X';
    exitBTN.className = 'deleteTodo'

   

    const todoName = document.createElement('p');
    todoName.textContent = todoInput; 
    todoName.className = 'todoTitle';

    const todoDescription = document.createElement('p');
    todoDescription.textContent = todoDescrip; 

    tools.appendChild(editBTN);
    tools.appendChild(exitBTN);
    todoLayout.appendChild(tools);
    todoLayout.appendChild(todoName);
    todoLayout.appendChild(todoDescription);


todoLayoutContainer.appendChild(todoLayout);
todoLayoutContainer.className = 'todo-layout-container';


    }
 
    e.preventDefault();
}

// event listeners go here
openPortal.addEventListener('click', openPortalToDo);
closePortal.addEventListener('click',closePortalTodo);
form.addEventListener('submit', addTodo);
