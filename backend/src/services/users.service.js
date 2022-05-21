const Joi = require('joi');
const { users } = require('../database/models');
const { badRequest, conflict, notFound } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorhandlers');
const { createToken } = require('../middlewares/auth');

const schemaUser = Joi.object({
  name: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
  }),
  birthday: Joi.string().required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const getUserByEmail = async (email) => {
  const response = await users.findOne({
    where: { email },
    attributes: { exclude: ['password'] },
    raw: true,
  });
  return response;
};

const createUser = async (name, email, password, birthday) => {
  const { error } = schemaUser.validate({ name, email, password, birthday });
  if (error) throw errorConstructor(badRequest, error.message);
  const userVerifcExist = await getUserByEmail(email);
  if (userVerifcExist) throw errorConstructor(conflict, 'Conflict');
  const createdUserResponse = await users.create({
    name,
    email,
    birthday,
    password,
  });
  return createdUserResponse;
};

const userLogin = async (email, password) => {
  const { error } = schemaLogin.validate({ email, password });
  if (error) throw errorConstructor(badRequest, error.message);

  const searchingUser = await users.findOne({ where: { email }, raw: true });
  if (!searchingUser || searchingUser.password !== password) {
    throw errorConstructor(notFound, 'Not Found');
  }
  const user = await getUserByEmail(email);
  const token = createToken({ payload: searchingUser });
  user.token = token;
  return { token };
};

const getUserAll = async () => {
  const response = await users.findAll({ attributes: { exclude: ['password'] } });
  return response;
};

const getUserById = async (id) => {
  const response = await users.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!response) throw errorConstructor(notFound, 'Not Found');
  return response;
};

module.exports = {
  createUser,
  getUserAll,
  getUserById,
  userLogin,
};
