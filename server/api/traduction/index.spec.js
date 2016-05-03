'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var traductionCtrlStub = {
  index: 'traductionCtrl.index',
  show: 'traductionCtrl.show',
  create: 'traductionCtrl.create',
  update: 'traductionCtrl.update',
  destroy: 'traductionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var traductionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './traduction.controller': traductionCtrlStub
});

describe('Traduction API Router:', function() {

  it('should return an express router instance', function() {
    expect(traductionIndex).to.equal(routerStub);
  });

  describe('GET /api/traductions', function() {

    it('should route to traduction.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'traductionCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/traductions/:id', function() {

    it('should route to traduction.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'traductionCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/traductions', function() {

    it('should route to traduction.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'traductionCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/traductions/:id', function() {

    it('should route to traduction.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'traductionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/traductions/:id', function() {

    it('should route to traduction.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'traductionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/traductions/:id', function() {

    it('should route to traduction.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'traductionCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
