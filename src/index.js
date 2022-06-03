import './style.css';
import { addTask } from './crud-methods.js';

const inputBtn = document.getElementById('text-input');

inputBtn.addEventListener('keydown', (i) => {
  if (i.key === 'Enter' && inputBtn.value) {
    addTask(inputBtn.value);
    inputBtn.value = null;
  }
});
