import './style.css';

const tasks = [
  {
    description: 'Clean the kitchen',
    completed: false,
    index: 1,
  },

  {
    description: 'Buy some groceries',
    completed: false,
    index: 5,
  },

  {
    description: 'Walk the dogs',
    completed: false,
    index: 3,
  },
];

const toDo = document.getElementById('to-do');
const title = document.createElement('li');
title.textContent = 'Today\'s To Do';
title.classList.add('title');
toDo.append(title);

const form = document.createElement('form');
form.classList.add('form');
const input = document.createElement('input');
input.placeholder = 'Add to your list..';
input.classList.add('input');
const addBtn = document.createElement('button');
addBtn.classList.add('add-button');

form.append(input);
form.append(addBtn);
toDo.append(form);

const tasksCreation = () => {
  for (let i = 0; i < tasks.length; i += 1) {
    const li = document.createElement('li');
    li.classList.add('list-item');
    li.textContent = tasks[i].description;
    const box = document.createElement('div');
    box.classList.add('checkbox');
    toDo.append(li);
    li.insertAdjacentElement('afterbegin', box);
  }
};

const sortTasks = () => {
  tasks.sort((a, b) => a.index - b.index);
};

sortTasks();
tasksCreation();

const clearBtnContainer = document.createElement('div');
clearBtnContainer.classList.add('clear-button-container');
const clearBtn = document.createElement('p');
clearBtn.classList.add('clear-button');
clearBtn.textContent = 'Clear all completed';
clearBtnContainer.append(clearBtn);
toDo.append(clearBtnContainer);