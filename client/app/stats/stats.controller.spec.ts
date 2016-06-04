'use strict';

describe('Component: StatsComponent', function () {

  // load the controller's module
  beforeEach(module('euroProno2016WebApp'));

  var StatsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    StatsComponent = $componentController('StatsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
