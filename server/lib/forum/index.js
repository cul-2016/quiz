const axios = require('axios');
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.FORUM_TOKEN}`;

const createCategory = require('./createCategory.js');
const addPrivileges = require('./addPrivileges.js');

function load (func) {
  return (...args) => func(axios, ...args);
}

module.exports = {
  createCategory: load(createCategory),
  addPrivileges: load(addPrivileges)
}