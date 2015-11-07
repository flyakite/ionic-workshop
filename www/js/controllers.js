angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('NewsFeedCtrl', function($scope, DataStore) {
  var user = {
    name: 'Marty McFly',
    photo: 'http://ionicframework.com/img/docs/mcfly.jpg'
  };
  $scope.feeds = [
    {
      user: user,
      createdAt: new Date(),
      image: 'http://ionicframework.com/img/docs/delorean.jpg',
      content: 'Back to the future!',
      like: 0,
      comment: 0
    },
    {
      user: user,
      createdAt: new Date("11/5/1995"),
      image: 'http://ionicframework.com/img/docs/delorean.jpg',
      content: 'In the past!',
      like: 1,
      comment: 2
    }
  ];

  $scope.newFeed = {};
  $scope.Submit = function() {

    //use console.log to print a variable in the console
    console.log($scope.newFeed);

    var feed = {
      user: user,
      image: $scope.newFeed.image,
      content: $scope.newFeed.content,
      like: 0,
      comment: 0
    };

    $scope.feeds.unshift(feed);

    $scope.newFeed = {};

    DataStore.create('Feed', feed)
    .then(function(result) {
      console.log(result);
    }, function(err) {
      console.error(err);
    });

  };
})
;
