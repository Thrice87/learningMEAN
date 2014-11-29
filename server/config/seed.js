/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var todo = require('../api/todo/todo.model');


todo.find({}).remove(function() {
});
