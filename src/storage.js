/* eslint-disable */
export const setStorage = (task) => {
  localStorage.setItem('todo', JSON.stringify(task));
};
