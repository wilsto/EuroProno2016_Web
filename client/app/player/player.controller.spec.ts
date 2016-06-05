'use strict';

describe('Component: PlayerComponent', function () {

  // load the controller's module
  beforeEach(module('euroProno2016WebApp'));

  var PlayerComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PlayerComponent = $componentController('PlayerComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
