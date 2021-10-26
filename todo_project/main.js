// adding dom elements to select
const opentodoportal = document.querySelector('.openTodoPortal');
const openPortal = document.querySelector('.openPortal');
const closePortal = document.querySelector('.exitPortal');
const todoForm = document.querySelector('#todoForm');
const errorPortal = document.querySelector('.error');
const todolist = document.querySelector('#todoList');
const toDoName = document.querySelector('#name');
const descript = document.querySelector('#description');


const todos = JSON.parse(localStorage.getItem('todos'))

if(todos){
    todos.forEach(todo => createTodo(todo))
}


// functions goes here
// when you click on add todo it opens todo portal
function openPortalTodo(){
 openPortal.classList.add('show');
}
// it will close todo portal
function closePortalTodo(){
    openPortal.classList.remove('show');
}

// displays general error section to user
function showMessage(message, className){
    errorPortal.textContent = message;
    errorPortal.className = className;

 

    setTimeout(function(){
        showMessage('');
    },3000);
}



function createTodo(){

    const nameTodo = document.querySelector('#name').value;
    const description = document.querySelector('#description').value;

   

   let createTodo = document.createElement('div');
    createTodo.classList = 'container';
    createTodo.innerHTML = `
    
    <div class="title">
        <h2 class="nameToDo">${nameTodo}</h2>
    <div class="together">
        <p class="editTodo">Edit</p>
        <p class="deleteTodo">X</p>
    </div>
    </div>
    <div class="description">
         <p class="todoDescription">${description}</p>
    </div>
    <div class="right">
    <input class="check" type="checkbox">Completed?
    </div>
    `
    
    todolist.appendChild(createTodo);
   
   
    // grabbing checkbox to see if completed or not
     const check = document.querySelector('.check');
    check.addEventListener('change', checkedTodoComplete);

  

    const editTodo = document.querySelector('.editTodo');
    editTodo.addEventListener('click', editTodoCard)


   

    const deleteTodo = document.querySelector('.deleteTodo');
    deleteTodo.addEventListener('click', deleteTodoCard);

   
    if(nameTodo === ''){
        showMessage('Please Enter Name of Todo', 'failed')
        createTodo.innerHTML = '';
        createTodo.classList.remove('container');
        
        
    }else if(description === ''){
        showMessage('Please Enter Description', 'failed');
        createTodo.innerHTML = '';
        createTodo.classList.remove('container');
     
    }else{
        showMessage('Successfull Entry', 'success');
        toDoName.value = '';
        descript.value = '';
    }

}

function checkedTodoComplete(e){
    const currentCheck = e.currentTarget.checked;
    const container = e.currentTarget.parentNode.parentNode;

    if(currentCheck){
        container.classList.add('completed');
    }else{
        container.classList.remove('completed');
    }
}

function editTodoCard(){
    const editTodo = document.querySelector('.editTodo');

    if(editTodo.textContent === 'Edit'){
        const title = document.querySelector('.title')
            const span = title.firstElementChild;

            const input = document.createElement('input');
            input.type="text";
            input.classList.add('removeBorder');
            input.value = span.textContent;

            title.insertBefore(input, span);
            title.removeChild(span);


            const description = document.querySelector('.description')
            const span2 = description.firstElementChild;

            const input2 = document.createElement('input');

            input2.value = span2.textContent
            input2.type="text";
            input2.classList.add('removeBorder');

            description.insertBefore(input2, span2);
            description.removeChild(span2);
            
            editTodo.textContent = 'Save';
       
    }else if(editTodo.textContent === 'Save'){
        const title = document.querySelector('.title')
        const input = title.firstElementChild;

        const span = document.createElement('span');
        span.textContent = input.value;
        title.insertBefore(span,input);
        title.removeChild(input);

        const description = document.querySelector('.description')
        const input2 = description.firstElementChild;

        const span2 = document.createElement('span');
        span2.textContent = input2.value;
        description.insertBefore(span2,input2);
        description.removeChild(input2);

        editTodo.textContent = 'Edit';

    }
}

function deleteTodoCard(e){
    const currentCard = e.currentTarget.parentNode.parentNode.parentNode;
    todolist.remove(currentCard);

}

// counter for the textarea
function wordsLeft(){
        // get placeholders for name and description(dom elements)
        const wordLengthName = document.querySelector('.wordLengthName');
        const wordLengthDescription = document.querySelector('.wordLengthDescription');

        // get the value and length of the two fields
        const todoNameValue = toDoName.value.length;
        const todoDescriptionValue = descript.value.length;

        // how many characters allowed for two fields
        let nameMax = 20;
        let descriptionMax = 100;

        // making the calculations for the two fields
        const totalName = nameMax - todoNameValue;
        const totalDescription = descriptionMax - todoDescriptionValue;


    
        // making sure it doesnt go below 0 words left
        if(totalName < 0){
                wordLengthName.innerHTML = 0;
        }else{
            wordLengthName.innerHTML = totalName; 
        }

        if(totalDescription < 0){
            wordLengthDescription.innerHTML = 0;
        }else{
            wordLengthDescription.innerHTML = totalDescription;
        }
}
// getting values and displaying
function enterData(e){

  
    
    // creates todo card
    createTodo();
    updateLs();
    e.preventDefault();
}



// event listeners goes here
opentodoportal.addEventListener('click', openPortalTodo);
closePortal.addEventListener('click',closePortalTodo);
todoForm.addEventListener('submit',enterData);
toDoName.addEventListener('keyup', wordsLeft);
descript.addEventListener('keyup', wordsLeft);



function updateLs(){
const todosEL = document.querySelectorAll('.nameToDo');
const descriptionVal = document.querySelectorAll('.todoDescription')
const container = document.querySelectorAll('.container');

    const todos = [];


   todosEL.forEach(function(toDoEL){
        todos.push(
            {
                text:toDoEL.innerText
            }
        )
    })
    

    localStorage.setItem('todos',JSON.stringify(todos));
}