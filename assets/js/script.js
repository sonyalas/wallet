var walletModule = angular.module('wallet', ['ngRoute']);

walletModule.controller('operationsCtrl', function($scope){
	$scope.totalAmount=0;
	$scope.amount=0;
	$scope.operation="Add";
	if(localStorage.getItem('historial')!=null){
		$scope.historial=JSON.parse(localStorage.getItem('historial'));
		for (var i=0; i<$scope.historial.length; i++){
			if($scope.historial[i].operation=='Add'){$scope.totalAmount+=$scope.historial[i].amount;}
			else if($scope.historial[i].operation=='Remove'){$scope.totalAmount-=$scope.historial[i].amount;}
			if($scope.totalAmount<0){$scope.totalAmount=0;}
		}
	}
	else{$scope.historial=[];}
	
	
	/* Reset the wallet */
	$scope.resetWallet=function(){
		localStorage.clear();location.reload();
	};
	
	/* Receives the operation sent from the form (add or remove) and calls the appropiate function */
	$scope.updateWallet=function(){
		$scope.historial.push({amount:$scope.amount, date: new Date(), operation: $scope.operation});
		if($scope.operation=="Add"){$scope.totalAmount+=$scope.amount;}
		else if($scope.operation=="Remove"){$scope.totalAmount-=$scope.amount;}
		//totalAmount can't be less than 0
		if($scope.totalAmount<0){$scope.totalAmount=0;}
		localStorage.setItem('historial', JSON.stringify($scope.historial));
		console.log(JSON.parse(localStorage.getItem('historial')));
	};
})
