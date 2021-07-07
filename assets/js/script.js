var taskIdCounter = 0;
//How to select an element in Document Object Model:
//var buttonEl = document.querySelector("#save-task");
//console.log(buttonEl);
//add DOM object reference to task list towards the top pf the page
//then add event listener and change text of new task item dynamically using textContent to identify it as a new task
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//define this b4 event listener bc it wont know about this funciton otherwise
var taskFormHandler = function(event){
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name = 'task-name']").value; //use [] to select attribute of an html element
    var taskTypeInput = document.querySelector("select[name = 'task-type']").value;
    //package up data as an object
    //check if input is empty string
    if(!taskNameInput || !taskTypeInput){
        alert("You need to fill ou the task form.");
        return false;
    }
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    //send to createTaskEl
    createTaskEl(taskDataObj);
    formEl.reset();
};
//
var createTaskEl = function(taskDataObj){
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML contents to div
    taskInfoEl.innerHTML ="<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
    //add entie list item to list
    var taskActionsEl = createTaskActions(taskIdCounter); 
    //^counter is an argument to make buttons cooresponding to the task Id...createTaskActiosn returns a DOM element and is stored here in taskActionsEl to make it tangible
//console.log(taskActionsEl); // good way to test if input is being logged
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);
};

//returns DOM element
var createTaskActions =  function(taskId){
    //create a div to act as a container for the pther elements
    var actionContainerEl = document.createElement("div"); 
    actionContainerEl.className = "task-actions";
    //create two more button elements and append them to the div u just made
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    //add to the end of the div
    actionContainerEl.appendChild(editButtonEl);

    //make delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    //add to the end of the div
    actionContainerEl.appendChild(deleteButtonEl);
    
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    //add to the end of the div
    actionContainerEl.appendChild(statusSelectEl);
    
    var statusChoices = ["To Do", "In Progress", "Completed"];
    //for loop to ......
    for(var i = 0; i < statusChoices.length; i++){
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    };
return actionContainerEl;
};
//dynamically create li elements in the DOM
formEl.addEventListener("submit", taskFormHandler);//listedn for an instance of clicking submit or pressing the enter key
//at 4.3.6 