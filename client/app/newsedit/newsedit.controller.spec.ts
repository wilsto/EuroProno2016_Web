'use strict';

describe('Component: NewseditComponent', function () {

  // load the controller's module
  beforeEach(module('euroProno2016WebApp'));

  var NewseditComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    NewseditComponent = $componentController('NewseditComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
