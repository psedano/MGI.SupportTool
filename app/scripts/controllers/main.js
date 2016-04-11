'use strict';

/**
 * @ngdoc function
 * @name transactionLoggingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the transactionLoggingApp
 */
angular.module('transactionLoggingApp')
  .controller('MainCtrl', function ($scope, localStorageService, $http) {
      $scope.todos = ['Item 1','Item 2','Item 3'];
      $scope.results = [];
      $scope.showResults = false;
      
      $scope.open1 = function() {
          $scope.popup1.opened = true;
      };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };
    
    $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate','yyyy-MM-dd'];
  $scope.format = $scope.formats[4];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };
  
  $scope.getDataFromDB = function(){
      $http({
          method: 'GET',
          url: 'http://localhost:3000/'
        //   url: 'db.json'
      }).then(function successCallback(response){
          $scope.results = response.data;
          $scope.showResults = true;
      });
  };
  
  $scope.dateRange = function(item){
      
      if((item >= $scope.startDate.toJSON()) && (item <= $scope.endDate.toJSON())){
          return true;
      }
      return false;
  };
  
  }).filter('searchFor', function(){
    return function(arr, searchString){
        
        var result = [];
        
        angular.forEach(arr, function(item){
        
        if(searchString(item.Timestamps)){
             result.push(item);
        }
        });
        
        return result;
    };
});;
