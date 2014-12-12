'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var id,
    body;

describe('GET /api/todos', function() {

  before(function() {
    body = {
      text: 'Test 1',
      dateCreated: new Date()
    };
  });

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/todos')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should respond with 201 after post', function(done) {
    request(app)
      .post('/api/todos')
      .send(body)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err,res) {
        if (err) return done(err);
        id = res.body._id;
        done();
    });
  });

   it('should respond with 200 after update', function(done) {

    request(app)
      .put('/api/todos/' + id)
      .expect(200)
      .end(function(err,res) {
        if (err) return done(err);
        done();
      })
  });

  it('should respond with 204 after delete', function(done) {
    request(app)
      .delete('/api/todos/' + id)
      .expect(204)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      })
  })
});
