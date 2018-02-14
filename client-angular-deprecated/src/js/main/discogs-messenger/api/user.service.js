angular
  .module('discogs.messenger')
  .service('userService', userService);

/*@ngInject*/
function userService($http, $q, apiURL, $log) {

  return {identity};

  function identity() {
    return $http
      .get(`${apiURL.baseUrl}/identity`)
      .then(requestSuccess)
      .catch(requestFail);
  }

  function requestSuccess(response) {
    return response.data;
  }
  function requestFail(response) {
    $log.error('userService: ', response);
    return $q.reject(response.data);
  }
}