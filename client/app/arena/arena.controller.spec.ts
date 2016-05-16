'use strict';

describe('Component: ArenaComponent', function () {

  // load the controller's module
  beforeEach(module('euroProno2016WebApp'));

  var ArenaComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ArenaComponent = $componentController('ArenaComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
