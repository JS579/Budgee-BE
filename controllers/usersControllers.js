

const userService = require('../services/userService');

exports.getAllUsers = async (req, reply) => {
  const users = await userService.getAllUsers();
  reply.send(users);
};
