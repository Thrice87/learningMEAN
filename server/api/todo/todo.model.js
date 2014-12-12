'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  text: String,
  dateCreated: Date,
  dateLastUpdated: Date
});

module.exports = mongoose.model('todo', ThingSchema);
