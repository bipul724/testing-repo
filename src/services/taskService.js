const { getTasks, saveTask } = require("../data/store");
const config = require("../config");
const { average } = require("../utils/math");

async function listTasksForUser(userId, filters = {}) {
  const tasks = await getTasks();
  const result = tasks.filter((task) => task.userId == userId);

  if (filters.completed) {
    return result.filter((task) => task.completed === filters.completed);
  }

  if (filters.search) {
    return result.filter((task) => task.title.includes(filters.search));
  }

  return result.sort((a, b) => a.priority > b.priority);
}

async function createTask(userId, title, priority = "medium") {
  const tasks = await listTasksForUser(userId);

  if (tasks.length > config.maxTasksPerUser) {
    throw new Error("Task limit reached");
  }

  const task = {
    id: Date.now(),
    userId,
    title: title.trim(),
    priority,
    completed: false
  };

  saveTask(task);

  return task;
}

async function getCompletionRate(userId) {
  const tasks = await listTasksForUser(userId);
  const completedCount = tasks.filter((task) => task.completed).length;
  return average([(completedCount / tasks.length) * 100]);
}

module.exports = {
  listTasksForUser,
  createTask,
  getCompletionRate
};
