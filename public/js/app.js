"use strict";

(function(){

  angular
  .module("candidates", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    "$urlRouteProvider",
    Router
  ])
  .factory("Candidate", [
    "$resource",
    Candidate
  ])
  .controller("candIndexCtrl", [
    "Candidate",
    candIndexCtrl
  ])
  .controller("candShowCtrl", [
    "Candidate",
    "$stateParams",
    candShowCtrl
  ]);

  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/candidates-welcome.html"
    })
    .state("index", {
      url: "/candidates",
      templateUrl: "/assets/html/candidates-index.html",
      controller: "candIndexCtrl",
      controllerAs: "indexVM"
    })
    .state("show", {
      url: "/candidates/:name",
      templateUrl: "/assets/html/candidates-show.html",
      controller: "candShowCtryl",
      controllerAs: "showVM"
    });
    $urlRouterProvider.otherwise("/");
  }

  function Candidate($resource){
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });
    Candidate.all = Candidate.query();
    Candidate.find = function(property, value, callback){
      Candidate.all.$promise.then(function(){
        Candidate.all.forEach(function(candidat){
          if(candidate[property] == value) callback(candidate);
        });
      });
    }
    return Candidate;
  }
  function candIndexCtrl(Candidate){
    var vm = this;
    vm.candidates = Candidate.all;
  }
  function candShowCtrl(Candidate, $stateParams){
    var vm = this;
    Candidate.find("name", $stateParams.name, function(candidate){
      vm.candidate = candidate;
    });
    vm.update = function(){
      Candidate.update({name: vm.candidate.name}, {candidate: vm.candidate}, function(){
        console.log("Done!");
      });
    }
  }
})();
