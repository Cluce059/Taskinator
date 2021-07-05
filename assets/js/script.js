//How to select an element in Document Object Model:
//var buttonEl = document.querySelector("#save-task");
//console.log(buttonEl);
//add DOM object reference to task list towards the top pf the page
//then add event listener and change text of new task item dynamically using textContent to identify it as a new task
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//define this b4 event listener bc it wont know about this funciton otherwise
var createTaskHandler = function(event){
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name = 'task-name']").value; //use [] to select attribute of an html element
    var taskTypeInput = document.querySelector("select[name = 'task-type']").value;
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML contents to div
    taskInfoEl.innerHTML ="<h3 class = 'task-name'>" + taskNameInput + "</h3><span class = 'task-type'>" + taskTypeInput + "</span>";
    listItemEl.appendChild(taskInfoEl);
    //add entie list item to list
    tasksToDoEl.appendChild(listItemEl);
    console.dir(listItemEl);
};

//dynamically create li elements in the DOM
formEl.addEventListener("submit", createTaskHandler);//listedn for an instance of clicking submit or pressing the enter key
