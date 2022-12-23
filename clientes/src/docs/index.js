
const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const todos = require('./clientes');

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...todos
};