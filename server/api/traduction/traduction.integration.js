'use strict';

var app = require('../..');
import request from 'supertest';

var newTraduction;

describe('Traduction API:', function() {

  describe('GET /api/traductions', function() {
    var traductions;

    beforeEach(function(done) {
      request(app)
        .get('/api/traductions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          traductions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(traductions).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/traductions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/traductions')
        .send({
          name: 'New Traduction',
          info: 'This is the brand new traduction!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTraduction = res.body;
          done();
        });
    });

    it('should respond with the newly created traduction', function() {
      expect(newTraduction.name).to.equal('New Traduction');
      expect(newTraduction.info).to.equal('This is the brand new traduction!!!');
    });

  });

  describe('GET /api/traductions/:id', function() {
    var traduction;

    beforeEach(function(done) {
      request(app)
        .get('/api/traductions/' + newTraduction._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          traduction = res.body;
          done();
        });
    });

    afterEach(function() {
      traduction = {};
    });

    it('should respond with the requested traduction', function() {
      expect(traduction.name).to.equal('New Traduction');
      expect(traduction.info).to.equal('This is the brand new traduction!!!');
    });

  });

  describe('PUT /api/traductions/:id', function() {
    var updatedTraduction;

    beforeEach(function(done) {
      request(app)
        .put('/api/traductions/' + newTraduction._id)
        .send({
          name: 'Updated Traduction',
          info: 'This is the updated traduction!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTraduction = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTraduction = {};
    });

    it('should respond with the updated traduction', function() {
      expect(updatedTraduction.name).to.equal('Updated Traduction');
      expect(updatedTraduction.info).to.equal('This is the updated traduction!!!');
    });

  });

  describe('DELETE /api/traductions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/traductions/' + newTraduction._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when traduction does not exist', function(done) {
      request(app)
        .delete('/api/traductions/' + newTraduction._id)
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
