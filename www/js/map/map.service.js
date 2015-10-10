(function () {
  angular
    .module('bulkee.map')
    .factory('Map', mapService);

  mapService.$inject = ['$http'];

  function mapService($http) {
    return {
      getBulkiesNearMe: function (distance, long, lat) {

        return $http.get('http://localhost:3000/api/v1.0/bulkies/' + distance + '/nearme?latitude=' + lat + '&longitude=' + long, {headers : {
          'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NDUwMzUwNTU0NDR9.xN30lbtQFT7ySJ15ZPdK0SiRnP4L2a9DXBrHkeE3sU4'
        }})
        .then(function (data) {
          return data.data;
        }, function (err) {
          return err;
        });
      }
    };
  }
})();
