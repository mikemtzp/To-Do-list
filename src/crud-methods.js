/* eslint-disable */
import { setStorage } from './storage.js';
import { clearAll } from './clear.js';

export { deleteTask, updateStorage, tasks, addTask };

const toDoList = document.getElementById('to-dos');
const clearBtn = document.getElementById('clear-button');

class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

let tasks = [];
const addTask = (taskValue) => {
  const localData = JSON.parse(localStorage.getItem('todo'));
  localData.map((i) => tasks.push(i));
  const taskContainer = document.createElement('div');
  taskContainer.className = 'list-item';
  taskContainer.innerHTML += `
    <input type="checkbox" class="checkbox">
    <span>${taskValue}</span>
    <i class="fas fa-ellipsis-v"></i>
    <i class="fas fa-trash"></i>
  `;
  toDoList.appendChild(taskContainer);

  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((i) => {
    i.addEventListener('change', () => {
      i.parentElement.classList.toggle('list-selected-item');
      i.nextElementSibling.classList.toggle('text-selected');
      i.parentElement.lastElementChild.classList.toggle('delete-icon');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('disable-edit');
      updateStorage();
    });
  });

  const newTask = new Task(taskValue, false, checkbox.length);
  tasks.push(newTask);
  setStorage(tasks);

  const edit = document.querySelectorAll('.fa-ellipsis-v');
  edit.forEach((i) => {
    i.addEventListener('click', () => {
      editTask(taskContainer, i.previousElementSibling);
      i.parentElement.classList.add('list-selected-item');
    });
  });

  const remove = document.querySelectorAll('.fa-trash');
  remove.forEach((i) => {
    i.addEventListener('click', () => {
      deleteTask(i.parentElement);
    });
  });
};

const deleteTask = (task) => {
  toDoList.removeChild(task);
  let count = 0;
  const localData = JSON.parse(localStorage.getItem('todo'));
  const data = Array.from(localData).filter((i) => i.completed === false);
  data.map((i) => i.index = count += 1);
  setStorage(data);
};

const editTask = (taskContainer, task) => {
  const editText = document.createElement('input');
  editText.type = 'text';
  editText.className = 'editText';
  editText.value = task.textContent;
  taskContainer.replaceChild(editText, task);
  editText.addEventListener('keypress', (i) => {
    if (i.key === 'Enter') {
      const taskContainers = document.querySelectorAll('.list-item');
      const localData = JSON.parse(localStorage.getItem('todo'));
      for (let i = 0; i < taskContainers.length; i += 1) {
        if (taskContainers[i].classList.contains('list-selected-item')) {
          localData[i].description = editText.value;
          setStorage(localData);
        }
      }
      editText.parentElement.classList.remove('list-selected-item');
      taskContainer.replaceChild(task, editText);
      task.textContent = editText.value;
    }
  });
};


const getStorage = () => {
  const data = JSON.parse(localStorage.getItem('todo'));
  if (!data) {
    localStorage.setItem('todo', JSON.stringify([]));
  }
  data.map((i) => {
    const taskContainer = document.createElement('div');
    taskContainer.className = 'list-item';
    taskContainer.innerHTML += `
    <input type="checkbox" class="checkbox">
    <span>${i.description}</span>
    <i class="fas fa-ellipsis-v"></i>
    <i class="fas fa-trash"></i>
    `;
    toDoList.appendChild(taskContainer);

    const edit = document.querySelectorAll('.fa-ellipsis-v');
    edit.forEach((i) => {
      i.addEventListener('click', () => {
        editTask(taskContainer, i.previousElementSibling);
        i.parentElement.classList.add('list-selected-item');
      });
    });
  });

  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((i) => {
    i.addEventListener('change', () => {
      i.parentElement.classList.toggle('list-selected-item');
      i.nextElementSibling.classList.toggle('text-selected');
      i.parentElement.lastElementChild.classList.toggle('delete-icon');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('disable-edit');
      updateStorage();
    });
  });

  const remove = document.querySelectorAll('.fa-trash');
  remove.forEach((i) => {
    i.addEventListener('click', () => {
      deleteTask(i.parentElement);
    });
  });
};

window.addEventListener('load', () => {
  getStorage();
});

const updateStorage = () => {
  const localData = JSON.parse(localStorage.getItem('todo'));
  const allTasks = document.querySelectorAll('span');
  for (let i = 0; i < allTasks.length; i += 1) {
    if (allTasks[i].classList.contains('text-selected')) {
      localData[i].completed = true;
    } else {
      localData[i].completed = false;
    }
  }
  setStorage(localData);
};

clearBtn.addEventListener('click', () => {
  clearAll();
});
