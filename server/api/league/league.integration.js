'use strict';

var app = require('../..');
import request from 'supertest';

var newLeague;

describe('League API:', function() {

  describe('GET /api/leagues', function() {
    var leagues;

    beforeEach(function(done) {
      request(app)
        .get('/api/leagues')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          leagues = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(leagues).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/leagues', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/leagues')
        .send({
          name: 'New League',
          info: 'This is the brand new league!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newLeague = res.body;
          done();
        });
    });

    it('should respond with the newly created league', function() {
      expect(newLeague.name).to.equal('New League');
      expect(newLeague.info).to.equal('This is the brand new league!!!');
    });

  });

  describe('GET /api/leagues/:id', function() {
    var league;

    beforeEach(function(done) {
      request(app)
        .get('/api/leagues/' + newLeague._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          league = res.body;
          done();
        });
    });

    afterEach(function() {
      league = {};
    });

    it('should respond with the requested league', function() {
      expect(league.name).to.equal('New League');
      expect(league.info).to.equal('This is the brand new league!!!');
    });

  });

  describe('PUT /api/leagues/:id', function() {
    var updatedLeague;

    beforeEach(function(done) {
      request(app)
        .put('/api/leagues/' + newLeague._id)
        .send({
          name: 'Updated League',
          info: 'This is the updated league!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedLeague = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLeague = {};
    });

    it('should respond with the updated league', function() {
      expect(updatedLeague.name).to.equal('Updated League');
      expect(updatedLeague.info).to.equal('This is the updated league!!!');
    });

  });

  describe('DELETE /api/leagues/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/leagues/' + newLeague._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when league does not exist', function(done) {
      request(app)
        .delete('/api/leagues/' + newLeague._id)
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
