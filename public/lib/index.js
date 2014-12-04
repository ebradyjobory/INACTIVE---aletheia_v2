var app = angular.module('App', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partial-home.html'
    })
    .state('student', {
      url: '/student',
      templateUrl: 'partial-student.html'
    })
    .state('mentor', {
      url: '/mentor',
      templateUrl: 'partial_mentor.html'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'partial-signin.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'partial-signup.html'
    });
});

app.controller('GitHubCtrl', function ($scope, $http) {

  $scope.students = [];

  $scope.getGitInfo = function () {
    if(!$scope.username || $scope.username === '') { return; }
    $scope.userNotFound = false;
    $scope.loaded = false;
    $http.get("https://api.github.com/users/" + $scope.username)
     .success(function (data) {
        if (data.name === "") data.name = data.login;
        $scope.students.push(data);
        $scope.loaded = true;
     })
     .error(function () {
        $scope.userNotFound = true;
     });
    $http.get("https://api.github.com/users/" + $scope.username + "/repos")
      .success(function (data) {
        $scope.repos = data;
        $scope.reposFound = data.length > 0;
    });
    $scope.username = '';
  };
});


app.controller('MentorCtrl', function ($scope, $http) {

  var mentors =[];
  $scope.showAllMentors = function() {
      $http.get('/mentor')
        .success(function(data){
          for (var i = 0; i < data.length; i++) {
          mentors.push((data[i].name));
        }
        
      });
  };

  $scope.mentors = mentors;
  $scope.showAllMentors();


  $scope.getGitInfo = function () {
    createMentor = function(data) {
      console.log('createMentor', data);
      $http.post('/mentor', data)
        .success(function(res){
          console.log('res after posting into db', JSON.stringify(res) );
        });
    };
    var mentors = [];
    $scope.showMentors = function() {
      $http.get('/mentor')
        .success(function(data){
          for (var i = 0; i < data.length; i++) {
          mentors.push((data[i].name));
          console.log(mentors);
        }
      });
    };

    $scope.mentors = mentors;
    console.log(mentors);
    $scope.userNotFound = false;
    $scope.loaded = false;
    $http.get("https://api.github.com/users/" + $scope.username)
     .success(function (data) {
        if ($scope.username !== undefined) {
          $('#studentsTable').show();
          $('#totalReputation').show();
          createMentor(data);
        }
        
        if (data.name === "") data.name = data.login;
        $scope.user = data;
        console.log(data);
        $scope.loaded = true;
     })
     .error(function () {
        $scope.userNotFound = true;
     });
    $http.get("https://api.github.com/users/" + $scope.username + "/repos").success(function (data) {
      $scope.repos = data;
      $scope.reposFound = data.length > 0;
    });
    var counter = 0;
    $scope.up = function() {
      counter++;
      $('#reputation').html(counter);
    };
    $scope.down = function() {
      if (counter >= 1) {
        counter--;
        $('#reputation').html(counter);
      }    
    }
  };

});

