




 window.addEventListener('load', ()=> {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const newFormSubmit = document.querySelector("#new-Task-Submit")
const taskNameInput = document.querySelector("#taskNameInput");
const newDescriptionInput = document.querySelector('#newDescriptionInput');
const newAssignInput = document.querySelector('#assignee');
const newDateDueInput = document.querySelector('#newDateDueInput');
let newImportanceInput = "";


function validFormFieldInput(newFormSubmit) {  
    
    const name = taskNameInput.value;
    const description = newDescriptionInput.value;
    const assign = newAssignInput.value;
    const dateDue = newDateDueInput.value;

    
  if (name =="") {
    alert('Please enter taks name.')
    preventDefault();

    return false;
  } else if (description == "") {
    alert('Please enter task description.')
    preventDefault();
    return false;
  } else if (assign == '') {
    alert('Please assign the task.')
    preventDefault();
    return false;
  } else if (dateDue == '') {
    alert('Please enter the due date.')
    preventDefault();
    return false;
  } else {
    result = true;
  }
  }

 




//Get Todo list item

newFormSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    
    validFormFieldInput()
    

         normal = document.getElementById("Normal");
         important = document.getElementById("Important");
         urgent = document.getElementById("Urgent");

        if(important.checked == true) {
            newImportanceInput = "Important"
        } else if (urgent.checked == true)  {
            newImportanceInput = "Urgent"

        }else {
            newImportanceInput = "Normal";
        }

        



    const newTask= {
       
        task: e.target.elements.taskNameInput.value
        ,assignee: e.target.elements.assignee.value
        ,"due date": e.target.elements.newDateDueInput.value
        ,"level of Importance": newImportanceInput
        ,description: e.target.elements.newDescriptionInput.value
        
    }
    tasks.push(newTask);
    window.localStorage.setItem('tasks', JSON.stringify(tasks));

    e.target.reset();
    displayTasks()
})

displayTasks()

})

//Display of tasks DOM

function displayTasks () {
    const  taskList = document.querySelector('#taskList');
    taskList.innerHTML='';

    tasks.forEach(newTask => {
        
        const taskListLine = document.createElement('div');
        taskListLine.classList.add('newTaskItem');

        const row = document.createElement('div')
        const label = document.createElement('label');
        const taskObject= document.createElement('div');
        const taskObjectDate= document.createElement('div');
        const taskObjectDescription= document.createElement('div');
        const taskObjectLevel= document.createElement('div');
        const inputTask = document.createElement('input');
        const deleteButton = document.createElement('button');
        const editButton = document.createElement('button');
        const actions = document.createElement('div');
        
        

        inputTask.type = 'checkbox';
        inputTask.checked = newTask.done;

        
        if (inputTask.checked == true) {
            inputTask.classList.add('done');
      
            
            
        } else {
            inputTask.classList.add('pending');
        }

        
        //Add class

        row.classList.add('card', 'bg-primary', 'shadow', 'mb-2')
        taskObject.classList.add('taskListItem');
        editButton.classList.add('editButton', 'btn', 'btn-dark', 'btn,', 'btn-outline-primary', 'btn-sm', 'shadow');
        deleteButton.classList.add('deleteButton', 'btn', 'btn-dark', 'btn,', 'btn-outline-primary', 'btn-sm', 'shadow');        
        actions.classList.add('actions')
        taskList.classList.add('mx-5', 'p-2', 'bg-light', "shadow", "hidden")
        inputTask.classList.add('ml-5', 'float-right', "d-flex-inline")
        taskObjectDescription.classList.add('text-wrap')
        

        //level styling
        
        const normal = document.getElementById("Normal");
        const important = document.getElementById("Important");
        const urgent = document.getElementById("Urgent");

        if(newTask["level of Importance"] === "Important") {
            label.classList.add("font-weight-bold")
            
        } if (newTask["level of Importance"] === "Urgent")  {
            label.classList.add("text-danger", "font-weight-bold")
            

        }

        //Reveal Hidden div
        if(newTask){
            taskList.classList.remove("hidden");
        }

        label.setAttribute("id", 'labelTitle');

        //place innerHTML

        label.innerHTML = `Pending task: ${newTask.task}`
        taskObject.innerHTML = `Assigned To: ${newTask.assignee}`
        taskObjectDate.innerHTML = `Due date: ` + newTask["due date"]
        taskObjectLevel.innerHTML = `Level: ` + newTask["level of Importance"]
        taskObjectDescription.innerHTML = `Description: ${newTask.description}`
        editButton.innerHTML = "Edit";
        deleteButton.innerHTML = "Delete";
        

        label.appendChild(inputTask);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        taskList.appendChild(row);
        row.appendChild(label);
        row.appendChild(taskObject);
        row.appendChild(taskObjectDate);
        row.appendChild(taskObjectLevel);
        row.appendChild(taskObjectDescription);
        row.appendChild(actions);
        
    

        
        
       

       
        inputTask.addEventListener('click', e => {
            newTask.done = e.target.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));

            if(newTask.done) {
                label.classList.add('done', 'text-muted')
                taskObject.classList.add('done', 'text-muted')
                taskObjectDate.classList.add('done', 'text-muted')
                taskObjectDescription.classList.add('done', 'text-muted')
                taskObjectLevel.classList.add('done', 'text-muted')
                
                
            } else {
                label.classList.remove('done', 'text-muted')
                taskObject.classList.remove('done', 'text-muted')
                taskObjectDate.classList.remove('done', 'text-muted')
                taskObjectDescription.classList.remove('done', 'text-muted')
                taskObjectLevel.classList.remove('done', 'text-muted')
            }

        })


//Edit button



//Functionality for delete button

       deleteButton.addEventListener('click', e => {
        tasks = tasks.filter(task => task !=newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
       })

    
       editButton.addEventListener('click', e => {

       })

    })
}


