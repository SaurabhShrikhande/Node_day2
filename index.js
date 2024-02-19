// const readline = require('readline');


// const r1 = readline.createInterface({
//     input : process.stdin,
//     output: process.stdout,
// })


const fs = require('fs');
const path = require('path');
const readline = require('readline');

const dataFilePath = path.join(__dirname, 'tasks.txt');

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to load tasks from the file
function loadTasks() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Function to save tasks to the file
function saveTasks(tasks) {
  const data = JSON.stringify(tasks);
  fs.writeFileSync(dataFilePath, data, 'utf8');
}

// Function to add a new task
function addTask(task) {
  const tasks = loadTasks();
  tasks.push({ text: task, completed: false });
  saveTasks(tasks);
  console.log('Task added successfully.');
}

// Function to view the list of tasks
function viewTasks() {
  const tasks = loadTasks();
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. [${task.completed ? 'X' : ' '}] ${task.text}`);
  });
}

// Function to mark a task as complete
function markComplete(index) {
  const tasks = loadTasks();
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = true;
    saveTasks(tasks);
    console.log('Task marked as complete.');
  } else {
    console.log('Invalid task index.');
  }
}

// Function to remove a task
function removeTask(index) {
  const tasks = loadTasks();
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    saveTasks(tasks);
    console.log('Task removed successfully.');
  } else {
    console.log('Invalid task index.');
  }
}

// Main function to interact with the user
function main() {
  rl.question('Enter operation (add/view/complete/remove/exit): ', (operation) => {
    switch (operation.toLowerCase()) {
      case 'add':
        rl.question('Enter new task: ', (task) => {
          addTask(task);
          main();
        });
        break;
      case 'view':
        viewTasks();
        main();
        break;
      case 'complete':
        rl.question('Enter task index to mark as complete: ', (index) => {
          markComplete(parseInt(index) - 1);
          main();
        });
        break;
      case 'remove':
        rl.question('Enter task index to remove: ', (index) => {
          removeTask(parseInt(index) - 1);
          main();
        });
        break;
      case 'exit':
        rl.close();
        break;
      default:
        console.log('Invalid operation. Try again.');
        main();
        break;
    }
  });
}

// Start the application
main();
