//How to select an element in Document Object Model:
//var buttonEl = document.querySelector("#save-task");
//console.log(buttonEl);
//add DOM object reference to task list towards the top pf the page
//then add event listener and change text of new task item dynamically using textContent to identify it as a new task
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//define this b4 event listener bc it wont know about this funciton otherwise
var createTaskHandler = function(){
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};

//dynamically create li elements in the DOM
buttonEl.addEventListener("click", createTaskHandler);//"in a click instance, create a task"
