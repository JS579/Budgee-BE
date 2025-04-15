const User =  require('../models/usersModels')

exports.getAllUsers = async (request, reply) => {
  try{
  const users = await User.find();
  reply.code(200).send(users);
} catch (error) {
  reply.code(500).send({ error: 'Internal Server Error', message: error.message });
}
};