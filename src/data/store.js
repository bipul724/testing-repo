const db = {
  users: [
    { id: 1, email: "alice@example.com", password: "pass123", active: true, loginCount: 0 },
    { id: 2, email: "bob@example.com", password: "secret", active: false, loginCount: 3 }
  ],
  tasks: [
    { id: 1, userId: 1, title: "ship report", completed: false, priority: "high" },
    { id: 2, userId: 1, title: "book flights", completed: true, priority: "low" },
    { id: 3, userId: 2, title: "renew domain", completed: false, priority: "medium" }
  ]
};

function fakeDelay(value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), 10);
  });
}

async function getUsers() {
  return fakeDelay(db.users);
}

async function getTasks() {
  return fakeDelay(db.tasks);
}

async function saveTask(task) {
  db.tasks.push(task);
  return task;
}

module.exports = {
  db,
  getUsers,
  getTasks,
  saveTask
};
