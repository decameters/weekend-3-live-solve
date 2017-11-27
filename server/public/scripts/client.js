console.log('JS loaded');

$(document).ready(function(){
    console.log('JQ loaded');
    $('#newTaskButton').on('click', addNewTask);
    $('#taskList').on('click', '.completeButton', completeTask);
    getTasks();
})

function getTasks(){
    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then(function(response){
        console.log('response', response);
        $('#taskList').empty(); // be sure to empty so it doesn't reappend to itself
        response.forEach(appendToDom);
        // shorter way but maybe a more confusing way to write a for loop
    });
    // .then is a promise
    // promises are very common in async code because you're WAITING
}

function appendToDom(taskObject){
    var $newListItem = $('<li></li>');
    $newListItem.append(taskObject.name); // adds the list name into the <li>
    if (taskObject.is_completed) {
        $newListItem.addClass('completed');
    } else {
        $newListItem.append('<button class="completeButton">Complete</button>');        
    }
    $newListItem.data('id', taskObject.id);
    $('#taskList').append($newListItem);
}

function addNewTask(){
    var newTaskName = $('#newTaskName').val();
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            name: newTaskName
        }
    }).then(function(response){
        console.log('response', response);
        $('#newTaskName').val('');
        getTasks();
    })
}

function completeTask(){
    var taskToComplete = $(this).parent().data().id;
    console.log('task to complete', taskToComplete);

    $.ajax({
        method: 'PUT',
        url: '/tasks/complete/' + taskToComplete,
    }).then(function(response){
        console.log('response', response);
        getTasks();
    })
    
    
}