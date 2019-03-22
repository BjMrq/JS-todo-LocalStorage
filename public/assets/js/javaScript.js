window.onload = function(){
  var todos = [];
  init();

  // Init
  function init(){
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    renderItems();
    addCreateEvent();
  }

  // Add create listener
  function addCreateEvent(){
    //Create ToDo
    $(".newToDo").on("keypress", function(e){
      var newToDoText = $(this).val();
      if(e.which === 13) {
        addingTodo(newToDoText);
        syncLocalStorage();
        renderItems();
        $(this).val("");
        }
    });
  }

  // Add other listener
  function addOtherEvents(){

    //TODO grab id of element clicked to change for True in local storage

    // Check off Specific Todos by Clicking
    $("li").on("click", function(){
      $(this).toggleClass(" completed");
      var itemId = $(this).data("id");
      if ($(this).hasClass("completed")){
        updateTodo(itemId, true);
      } else {
        updateTodo(itemId, false);
      }
      syncLocalStorage();
      renderItems();
    });

    $(".icon").click(function(){
      $(".newToDo").fadeToggle();
    });

    // Click on X to delete TODO
    $(".binIcon").on("click", function() {
      var itemId = $(this).data("id");
      removeTodo(itemId);
      event.stopPropagation();
      syncLocalStorage();
      $(this).parent().fadeOut(400, function() {
        $(this).remove();
        renderItems();
      });
    });
  }

  // Creating ToDo
  function addingTodo (newToDoText){
    todos.push({id: todos.lenght, task: newToDoText, done:false});
  }
  // Sync with local storage
  function syncLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // Append all todos from localstorage
  function renderItems(){
    $(".toDos").html("");
    for(var i = 0; i < todos.length; i++){
      var item = createHtmlItem(todos[i], i);
      $(".toDos").prepend(item);
    }
    addOtherEvents();
  }

  // Create new htlm code for todo
  function createHtmlItem(todo, i){
    todo.id = i;
    var item = '<li data-id='+ todo.id + ' class="toDo' + (todo.done ? ' completed' : '') + '"><span class="binIcon" data-id='+ todo.id + '>';
        item += '<button class="deleteBtn"><i class="far fa-trash-alt"></i></button>';
        item += '</span>';
        item += todo.task;
        item += '</li>';
    return item;
  }

  // Update done of todo in localStorage
  function updateTodo(id, isDone){
    for (var i = 0; i < todos.length; i++){
      if (todos[i].id === id){
        todos[i].done = isDone;
        break;
      }
    }
  }

  // Delete todo from local storage
  function removeTodo(id){
    for (var i = 0; i < todos.length; i++){
      if (todos[i].id === id){
        todos.splice(i, 1);
        break;
      }
    }
  }
};
