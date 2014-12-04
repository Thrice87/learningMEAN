'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  body: String,
  dateCreated: Date,
  dateLastUpdated: Date
});

module.exports = mongoose.model('todo', ThingSchema);
