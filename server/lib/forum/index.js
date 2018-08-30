const axios = require('axios');
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.FORUM_TOKEN}`;

const createCategory = require('./createCategory.js');
const addPrivileges = require('./addPrivileges.js');
const createUser = require('./createUser.js');
const createTopic = require('./createTopic.js');

function load (func) {
  return (...args) => func(axios, ...args);
}

module.exports = {
  createCategory: load(createCategory),
  addPrivileges: load(addPrivileges),
  createUser: load(createUser),
  createTopic: load(createTopic)
}
