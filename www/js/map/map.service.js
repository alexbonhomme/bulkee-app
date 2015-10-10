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
      },

      postBulky: function (newBulky) {
        return $http.post('http://localhost:3000/api/v1.0/bulkies/', newBulky,{headers : {
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
