'use strict';

describe('Component: RegulationComponent', function () {

  // load the controller's module
  beforeEach(module('euroProno2016WebApp'));

  var RegulationComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    RegulationComponent = $componentController('RegulationComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
