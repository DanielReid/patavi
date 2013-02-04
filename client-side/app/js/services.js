'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('cliniccio.services', ['ngResource']).
factory('Result', function($resource){
  return $resource('api/result/:resultId', {}, {
    query: {method:'GET'}
  });
});
