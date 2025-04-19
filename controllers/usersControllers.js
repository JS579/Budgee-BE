const User = require("../models/usersModels");
exports.getAllUsers = async (request, reply) => {
  try {
    const users = await User.find();
    reply.code(200).send({users});
  } catch (error) {
    reply
      .code(500)
      .send({error: "Internal Server Error", message: error.message});
  }
};
exports.getUserById = async (request, reply) => {
  try {
    const user = await User.findById(request.params.id);

    if (!user) {
      reply.code(404).send({message: "User not found"});
    }
    reply.send({user});
  } catch (error) {
    reply
      .code(500)
      .send({error: "Internal Server Error", message: error.message});
  }
};

exports.createUser = async (request, reply) => {
  try {
    const {username, name, email} = request.body;

    const existedUsername = await User.findOne({username});
    if (existedUsername) {
      return reply
        .code(400)
        .send({error: "Bad Request", message: "username already taken."});
    }
    const existedUser = await User.findOne({name});
    if (existedUser) {
      return reply
        .code(400)
        .send({error: "Bad Request", message: "name already taken."});
    }
    const existedUseremail = await User.findOne({name});

    if (existedUseremail) {
      return reply
        .code(400)
        .send({error: "Bad Request", message: "email already taken."});
    }
    const user = new User(request.body);

    const createdUser = await user.save();
    reply.code(201).send({createdUser});
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.name === "ValidationError") {
      reply.code(400).send({error: "Bad Request", message: error.message});
    } else {
      reply
        .code(500)
        .send({error: "Internal Server Error", message: error.message});
    }
  }
};

exports.updateUser = async (request, reply) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      request.body,
      {new: true}
    );
    reply.send({updatedUser});
  } catch (error) {
    reply
      .code(500)
      .send({error: "Internal Server Error", message: error.message});
  }
};

exports.deleteUser = async (request, reply) => {
  try {
    await User.findByIdAndDelete(request.params.id);
    reply.status(203).send("");
  } catch (error) {
    reply
      .code(500)
      .send({error: "Internal Server Error", message: error.message});
  }
};

