'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var leagueCtrlStub = {
  index: 'leagueCtrl.index',
  show: 'leagueCtrl.show',
  create: 'leagueCtrl.create',
  update: 'leagueCtrl.update',
  destroy: 'leagueCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var leagueIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './league.controller': leagueCtrlStub
});

describe('League API Router:', function() {

  it('should return an express router instance', function() {
    expect(leagueIndex).to.equal(routerStub);
  });

  describe('GET /api/leagues', function() {

    it('should route to league.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'leagueCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/leagues/:id', function() {

    it('should route to league.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'leagueCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/leagues', function() {

    it('should route to league.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'leagueCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/leagues/:id', function() {

    it('should route to league.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'leagueCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/leagues/:id', function() {

    it('should route to league.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'leagueCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/leagues/:id', function() {

    it('should route to league.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'leagueCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
