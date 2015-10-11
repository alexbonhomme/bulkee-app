(function () {
  angular
    .module('bulkee.map')
    .constant('API_BASE', 'http://localhost:3000')
    // .constant('API_BASE', 'http://172.16.2.101:3000')
    .factory('Map', mapService);

  mapService.$inject = [ '$http', 'API_BASE' ];

  function mapService($http, API_BASE) {
    return {
      getBulkiesNearMe: function (distance, long, lat) {

        return $http.get(API_BASE + '/api/v1.0/bulkies/' + distance + '/nearme?latitude=' + lat + '&longitude=' + long, {headers : {
          'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NDUwMzUwNTU0NDR9.xN30lbtQFT7ySJ15ZPdK0SiRnP4L2a9DXBrHkeE3sU4'
        }})
        .then(function (data) {
          return data.data;
        }, function (err) {
          return err;
        });
      },

      postBulky: function (newBulky) {
        return $http.post(API_BASE + '/api/v1.0/bulkies/', newBulky,{headers : {
          'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NDUwMzUwNTU0NDR9.xN30lbtQFT7ySJ15ZPdK0SiRnP4L2a9DXBrHkeE3sU4'
        }});
      },

      getAddress: function (long, lat) {
        return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&sensor=true&key=AIzaSyDPj81ZZ7kkB_fexihCRowKjtd7XqrC2QQ')
          .then(function (response) {
            if (response.data.results.length) {
              return response.data.results[0].formatted_address;
            }

            return null;
          });
      }
    };
  }
})();
