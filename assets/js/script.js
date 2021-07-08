var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");//selecting <main> by its id

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
    //create task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

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
    taskIdCounter ++;
};

//returns DOM element
var createTaskActions =  function(taskId){
    //create a div to act as a container for the pther elements
    var actionContainerEl = document.createElement("div"); 
    actionContainerEl.className = "task-actions";
    
    //create two more button elements and append them to the div u just made

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId); //sets task's id to data-task-id
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
        statusOptionEl.setAttribute("value", statusChoices[i]);
        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
return actionContainerEl;
};
//dynamically create li elements in the DOM

formEl.addEventListener("submit", taskFormHandler);//listedn for an instance of clicking submit or pressing the enter key

var taskButtonHandler = function(event){
    //get target element form clicking event
    var targetEl = event.target;

    //if edit is clicked:
    if(targetEl.matches(".edit-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //if delete is clicked
    else if(targetEl.matches(".delete-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

//select li item by searching for a .task-item with a task-item-id equal to the taskId passed into the funciton
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();//removes item from page
  };
var editTask = function(taskId) {
    // get task li element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save task";
    //to amek sure that taskId is preserved in some way so devs have a way to access it
    formEl.setAttribute("data-task-id", taskId);
    

};


pageContentEl.addEventListener("click", taskButtonHandler);







//at 4.3.8