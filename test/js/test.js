
var utils = new ObjectUtils();
var aqsApp = angular.module("aqsApp", []);
	aqsApp.filter('stringifyJSON',function(){
		return function(object){
			return JSON.stringify(object);
		};
	});
    aqsApp.controller("aqsController", function ($scope) {
	$scope.model = {
		items:[]
	};
	$scope.result = '';
	var model = $scope.model;
    $scope.dump = function (){
        var mdl = JSON.stringify(model);
        $('#saved').html(mdl);
    };
    $scope.pick = function (){
        var mdl = JSON.parse($('#saved').html(),reviveItems);
        $scope.model = mdl || {};
		return mdl;
    };
    $scope.save = function (){
		$scope.lastAction = "Tried to Save to file";
        var items = JSON.stringify(model);
        var file = new Blob([items], {type: 'application/json'});
        var a = document.createElement("a");
            a.href = URL.createObjectURL(file);
            a.download = 'data.json';
            a.click();
		$scope.lastAction = "Done Saving to file";
    };
    $scope.load = function (){$('#loadFile').click()};

    $('#loadFile').change(function (event) {
        var file = event.target.files.length ? event.target.files[0]:null;
        if (file == null) return false;
        $scope.loadFrom(file);
    });
    $scope.loadFrom = function (file){
		$scope.lastAction = "Tried to Load from file";
        var urlPath = URL.createObjectURL(file);
        $.getJSON(urlPath, function (mdl) {
            mdl = mdl || {};
            $scope.$apply(function() {
                $scope.model = mdl;
				$scope.dump();
				$scope.pick();
            });
        });
		$scope.lastAction = "Done Loading from file";
    };
	$scope.run = function(items){
		$scope.lastAction = "Tried to Run the test";
		items = model.items || [];
		log(items);
		var a = new AQS(items);
		var b = new AQS([]);
		var res1 = a.find();
		var res2 = b.find();
		result = {
			aOfItems:res1,
			bOfEmptyArray:res2
		};
		log(res1);
		log(res2);
		$scope.lastAction = "Done Running the test";
	};
	//$scope.loadFrom({name:'../data/data.json',size:3020,type:'application/json'});
	$scope.lastAction = angular.noop();
	$scope.getModel = function(){return JSON.stringify(model);};
	$scope.getResult = function(){return JSON.stringify(result)};
	function reviveItems(key,value){
		log(value,key);
		if (utils.instanceIs(value,'String') && /^@eval=/.test(value)){
			return eval(value.replace(/^@eval=/,''));
		}
		return value;
	}
	window.$scope = $scope;
	window.getModel = function(){return model}
});