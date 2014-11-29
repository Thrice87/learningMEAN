/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var thing = require('./todo.model');

exports.register = function(socket) {
  thing.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  thing.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('todo:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('todo:remove', doc);
}
