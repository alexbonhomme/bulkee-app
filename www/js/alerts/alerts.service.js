(function () {
  angular
    .module('bulkee.alerts')
    .factory('Alerts', alertService);

  alertService.$inject = ['$http'];

  function alertService($http) {
    return {
      postAlert : function (data) {
        return $http.post('http://localhost:3000/api/v1.0/users/56196f8ffb302d10036ff415/alerts', data, {headers : {
            'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NDUwMzUwNTU0NDR9.xN30lbtQFT7ySJ15ZPdK0SiRnP4L2a9DXBrHkeE3sU4'
          }})
          .then(function (data) {
            return data.data;
          });
      }
    };
  }
})();
