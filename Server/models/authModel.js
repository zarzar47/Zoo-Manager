const oracledb = require("oracledb");

const users = [
  { id: 3, username: "user1", password: "pass1", status: "employee" },
  { id: 2, username: "user2", password: "pass2", status: "manager" },
  { id: 1, username: "John Doe", password: "pass3", status: "employee" },
];

async function UserExists({ username }) {
  return users.find((user) => user.username === username);
}

module.exports = { UserExists };
