'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var pronoCtrlStub = {
  index: 'pronoCtrl.index',
  show: 'pronoCtrl.show',
  create: 'pronoCtrl.create',
  update: 'pronoCtrl.update',
  destroy: 'pronoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var pronoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './prono.controller': pronoCtrlStub
});

describe('Prono API Router:', function() {

  it('should return an express router instance', function() {
    expect(pronoIndex).to.equal(routerStub);
  });

  describe('GET /api/pronos', function() {

    it('should route to prono.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'pronoCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/pronos/:id', function() {

    it('should route to prono.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'pronoCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/pronos', function() {

    it('should route to prono.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'pronoCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/pronos/:id', function() {

    it('should route to prono.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'pronoCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/pronos/:id', function() {

    it('should route to prono.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'pronoCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/pronos/:id', function() {

    it('should route to prono.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'pronoCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
