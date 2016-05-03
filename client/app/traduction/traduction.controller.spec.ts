'use strict';

describe('Component: TraductionComponent', function () {

  // load the controller's module
  beforeEach(module('euroProno2016WebApp'));

  var TraductionComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    TraductionComponent = $componentController('TraductionComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
