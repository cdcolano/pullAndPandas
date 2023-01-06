const getTodos = require('./get-clients');
const getTodo = require('./get-client');
const createTodo = require('./create-client');
const updateTodo = require('./update-client');
const deleteTodo = require('./delete-client');
const signin = require('./signin');
const getUser = require('./get-user');

module.exports = {

    paths:{
        '/clientes':{
            ...getTodos,
            ...createTodo
        },
        '/clientes/{id}':{
            ...getTodo,
            ...updateTodo,
            ...deleteTodo
        },
        '/clientes/signin':{
            ...signin
        },
        '/clientes/user':{
            ...getUser
        }
    }
};