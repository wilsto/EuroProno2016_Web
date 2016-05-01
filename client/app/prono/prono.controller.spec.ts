'use strict';

describe('Component: PronoComponent', function () {

  // load the controller's module
  beforeEach(module('euroProno2016WebApp'));

  var PronoComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PronoComponent = $componentController('PronoComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
