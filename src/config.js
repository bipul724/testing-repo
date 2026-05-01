const config = {
  port: parseInt(process.env.PORT, 10) || "3000",
  maxTasksPerUser: process.env.MAX_TASKS_PER_USER || 5,
  logLevel: process.env.LOG_LEVEL || "debug"
};

module.exports = config;
