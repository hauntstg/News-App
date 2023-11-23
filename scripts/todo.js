'use strict';

const todoTitle = document.getElementById('input-task');
const btnAdd = document.getElementById('btn-add');
const todoList = document.getElementById('todo-list');
const KEY = 'USER_ARRAY';
const userArr = JSON.parse(getFromStorage(KEY, '[]'));
const KEY_CURRENTUSER = 'CURRENT_USER';
const currentUser = JSON.parse(getFromStorage(KEY_CURRENTUSER, '[]'));
const KEY_TODO = 'TODOLIST';
const todoArr = JSON.parse(getFromStorage(KEY_TODO, '[]'));

class Task {
  constructor(task, owner, isDone, idTask) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
    this.idTask = idTask;
  }
}

btnAdd.addEventListener('click', function () {
  if (Object.keys(currentUser).length === 0) {
    alert('Vui lòng đăng nhập để sử dụng chức năng này!');
  } else {
    if (todoTitle.value === '') alert('Vui lòng nhập nội dung!');
    else {
      // nextID tự tăng, nếu mảng rỗng thì id bắt đầu từ 0
      let nextID =
        todoArr.length != 0 ? todoArr[todoArr.length - 1].idTask + 1 : 0;
      const todo = new Task(
        todoTitle.value,
        currentUser.username,
        false,
        nextID
      );
      todoArr.push(todo);
      saveToStorage(KEY_TODO, JSON.stringify(todoArr));
      displayTodoList();
      todoTitle.value = '';
    }
  }
});

const displayTodoList = function () {
  todoList.innerHTML = '';

  const todoListOfCurrentUser = todoArr.filter(
    todoList => todoList.owner === currentUser.username
  );

  todoListOfCurrentUser.forEach(currUser => {
    let El = document.createElement('li');
    if (currUser.isDone === true) El.classList.add('checked');
    El.innerHTML = `${currUser.task}<span class="close" onclick="deleteTodo(${currUser.idTask}, event)">×</span>`;
    todoList.appendChild(El);
  });
};
displayTodoList();

todoList.addEventListener('click', function (e) {
  e.target.classList.toggle('checked');

  let li = e.target.closest('li');
  // let li = e.target;
  let nodes = Array.from(li.closest('ul').children);
  let index = nodes.indexOf(li);

  // Thay đổi isDone: từ idTask => nhận được index trong todoArr => thay đổi isDone tại phần tử thứ index
  const todoListOfCurrentUser = todoArr.filter(
    todoList => todoList.owner === currentUser.username
  );
  const getIndexTodoArr = todoArr.findIndex(
    todoCheck => todoCheck.idTask === todoListOfCurrentUser[index].idTask
  );
  todoArr[getIndexTodoArr].isDone = !todoArr[getIndexTodoArr].isDone;
  saveToStorage(KEY_TODO, JSON.stringify(todoArr));
});

const deleteTodo = function (id, e) {
  // Nút delete nằm trong thẻ span và nằm trong thẻ li => stopPropagation: click delete event sẽ không đi đến phần tử cha, ở đây là thẻ li
  e.stopPropagation();
  if (confirm('Bạn chắc chắn muốn xóa nội dung này?')) {
    const getIndexTodoArr = todoArr.findIndex(
      todoCheck => todoCheck.idTask === id
    );
    todoArr.splice(getIndexTodoArr, 1);
    saveToStorage(KEY_TODO, JSON.stringify(todoArr));
    displayTodoList();
  }
};
