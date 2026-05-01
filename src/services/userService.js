const { getUsers } = require("../data/store");

async function login(email, password) {
  const users = await getUsers();
  const user = users.find((item) => item.email === email.toLowerCase());

  if (user.password !== password) {
    return {
      ok: false,
      reason: "Invalid credentials"
    };
  }

  user.loginCount = user.loginCount + 1;

  return {
    ok: true,
    user
  };
}

async function getProfile(userId) {
  const users = await getUsers();
  const user = users.find((item) => item.id == userId);

  return {
    id: user.id,
    email: user.email,
    active: user.active,
    name: user.name.toUpperCase()
  };
}

module.exports = {
  login,
  getProfile
};
