var walletModule = angular.module('wallet', ['ngRoute']);

walletModule.controller('operationsCtrl', function($scope){
	$scope.amount=0;
	$scope.operation="Add";
	// Initialize the list historial and the totalAmount
	if(localStorage.getItem('historial')!=null){$scope.historial=JSON.parse(localStorage.getItem('historial'));}
	else{$scope.historial=[];}
	if(localStorage.getItem('totalAmount')!=null){$scope.totalAmount=localStorage.getItem('totalAmount');}
	else{$scope.totalAmount=0;}
	
	/* Reset the wallet */
	$scope.resetWallet=function(){
		localStorage.clear();location.reload();
	};
	
	/* Receives the operation sent from the form (add or remove) and calls the appropiate function */
	$scope.updateWallet=function(){
		$scope.historial.push({amount:$scope.amount, date: new Date(), operation: $scope.operation});
		if($scope.operation=="Add"){$scope.totalAmount+=$scope.amount;}
		else if($scope.operation=="Remove"){$scope.totalAmount-=$scope.amount.toFixed(2);}
		//totalAmount can't be less than 0
		if($scope.totalAmount<0){$scope.totalAmount=0;}
		localStorage.setItem('historial', JSON.stringify($scope.historial));
		localStorage.setItem('totalAmount',$scope.totalAmount);
	};
})
