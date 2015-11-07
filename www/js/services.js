angular.module('starter.services', [])
.factory('DataStore', function($q, $http) {
  
  function toJSDate (results) {
    var data, v;
    for(var i=results.length; i--;){
      data = results[i];
      for(var k in data){
        if(data[k].__type === 'Date'){
          data[k] = new Date(data[k].iso);
        }
      }
    }
    return results;
  }

  function parseParams (params) {
    //use angular.merge when available
    var headers = {
      'X-Parse-Application-Id': 'y0GChOYfPYD0g6ouaKsPu28xwTv5lmio0f9t3IXb',
      'X-Parse-REST-API-Key': 'MV8jeAGO0uckhBTSDxoHNXKaqGcuTkSMSnH4Bxio',
      // 'X-Parse-Session-Token': ParseConfiguration.sessionToken,
      'Content-Type':'application/json'
    };
    params = params || {};
    params.headers = params.headers || {};
    params.headers = angular.extend(headers, params.headers);
    return params;
  }


  var CLASS_URL = 'https://api.parse.com/1/classes/';
  var FILE_URL = 'https://api.parse.com/1/files/';

  var service = {
    all: function(classname, params) {
      var d = $q.defer();
      $http.get(CLASS_URL + classname, parseParams({params:params}))
      .then(function(result) {
        d.resolve(toJSDate(result.data.results));
      },function(err) {
        d.reject(err);
      });
      return d.promise;
    },
    create: function(classname, data) {
      // use copy to prevent callback update the data
      var dataCopied = angular.copy(data);
      return $http.post(CLASS_URL + classname, dataCopied, parseParams());
    }

  };
  return service;
})
;
