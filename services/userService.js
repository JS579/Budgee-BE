const users = require('../models/usersModels');

exports.fetchAllUsers = async () => {
  return await users.findAll();
};

