const test = require("node:test");
const assert = require("node:assert/strict");
const { listTasksForUser, createTask, getCompletionRate } = require("../src/services/taskService");

test("returns only incomplete tasks when completed=false", async () => {
  const tasks = await listTasksForUser(1, { completed: false });
  assert.equal(tasks.every((task) => task.completed === false), true);
});

test("creates a new task for the user", async () => {
  const task = await createTask(1, "follow up with vendor", "high");
  assert.equal(task.title, "follow up with vendor");
});

test("completion rate is 50 for user 1", async () => {
  const rate = await getCompletionRate(1);
  assert.equal(rate, 50);
});
