'use strict';

var app = require('../..');
import request from 'supertest';

var newProno;

describe('Prono API:', function() {

  describe('GET /api/pronos', function() {
    var pronos;

    beforeEach(function(done) {
      request(app)
        .get('/api/pronos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          pronos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(pronos).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/pronos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/pronos')
        .send({
          name: 'New Prono',
          info: 'This is the brand new prono!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newProno = res.body;
          done();
        });
    });

    it('should respond with the newly created prono', function() {
      expect(newProno.name).to.equal('New Prono');
      expect(newProno.info).to.equal('This is the brand new prono!!!');
    });

  });

  describe('GET /api/pronos/:id', function() {
    var prono;

    beforeEach(function(done) {
      request(app)
        .get('/api/pronos/' + newProno._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          prono = res.body;
          done();
        });
    });

    afterEach(function() {
      prono = {};
    });

    it('should respond with the requested prono', function() {
      expect(prono.name).to.equal('New Prono');
      expect(prono.info).to.equal('This is the brand new prono!!!');
    });

  });

  describe('PUT /api/pronos/:id', function() {
    var updatedProno;

    beforeEach(function(done) {
      request(app)
        .put('/api/pronos/' + newProno._id)
        .send({
          name: 'Updated Prono',
          info: 'This is the updated prono!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProno = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProno = {};
    });

    it('should respond with the updated prono', function() {
      expect(updatedProno.name).to.equal('Updated Prono');
      expect(updatedProno.info).to.equal('This is the updated prono!!!');
    });

  });

  describe('DELETE /api/pronos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/pronos/' + newProno._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when prono does not exist', function(done) {
      request(app)
        .delete('/api/pronos/' + newProno._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
