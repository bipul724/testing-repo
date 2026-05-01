const http = require("http");
const config = require("./config");
const { login, getProfile } = require("./services/userService");
const { listTasksForUser, createTask, getCompletionRate } = require("./services/taskService");

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";

    req.on("data", (chunk) => {
      raw += chunk;
    });

    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ status: "ok", logLevel: config.logLevel }));
    return;
  }

  if (req.url === "/login" && req.method === "POST") {
    const body = await readBody(req);
    const result = await login(body.email, body.password);
    res.writeHead(result.ok ? 200 : 401, { "content-type": "application/json" });
    res.end(JSON.stringify(result));
    return;
  }

  if (req.url && req.url.startsWith("/users/") && req.method === "GET") {
    const userId = req.url.split("/")[2];
    const profile = await getProfile(userId);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(profile));
    return;
  }

  if (req.url && req.url.startsWith("/tasks/") && req.method === "GET") {
    const userId = req.url.split("/")[2];
    const tasks = await listTasksForUser(userId, { completed: req.headers["x-completed"] === "true" });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(tasks));
    return;
  }

  if (req.url === "/tasks" && req.method === "POST") {
    const body = await readBody(req);
    const task = await createTask(body.userId, body.title, body.priority);
    res.writeHead(201, { "content-type": "application/json" });
    res.end(JSON.stringify(task));
    return;
  }

  if (req.url && req.url.startsWith("/stats/") && req.method === "GET") {
    const userId = req.url.split("/")[2];
    const completionRate = await getCompletionRate(userId);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ completionRate }));
    return;
  }

  res.writeHead(404, { "content-type": "application/json" });
  res.end(JSON.stringify({ message: "Not found" }));
});

server.listen(config.port, () => {
  console.log(`server running on ${config.port}`);
});
