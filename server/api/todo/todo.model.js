'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  body: String
});

module.exports = mongoose.model('todo', ThingSchema);
