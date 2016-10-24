var walletModule = angular.module('wallet', ['ngRoute']);

walletModule.controller('operationsCtrl', function($scope){
	$scope.amount=0;
	$scope.operation="Add";
	// Initialize the list historial and the totalAmount
	if(localStorage.getItem('historial')!=null){$scope.historial=JSON.parse(localStorage.getItem('historial'));}
	else{$scope.historial=[];}
	if(localStorage.getItem('totalAmount')!=null){$scope.totalAmount=parseFloat(localStorage.getItem('totalAmount'));}
	else{$scope.totalAmount=0;}
	
	/* Reset the wallet */
	$scope.resetWallet=function(){
		localStorage.clear();location.reload();
	};
	
	/* Receives the operation sent from the form (add or remove) and calls the appropiate function */
	$scope.updateWallet=function(){
		//If the operation is Add, we add the amount to the wallet and push the object with the amount, date and operation into the list
		if($scope.operation=="Add"){
			$scope.totalAmount+=$scope.amount;
			$scope.historial.push({amount:$scope.amount, date: new Date(), operation: $scope.operation});
		}
		//If the operation is Remove we substract the amount and push the object with the amount, date and operation into the list
		else if($scope.operation=="Remove"){
			if($scope.totalAmount-$scope.amount.toFixed(2)>=0){
				$scope.totalAmount-=$scope.amount.toFixed(2);
				$scope.historial.push({amount:$scope.amount, date: new Date(), operation: $scope.operation});
			}
			//totalAmount can't be less than 0
			else{alert('The wallet must have a positive a positive amount.')}
		}
		//totalAmount can't be less than 0
		if($scope.totalAmount<0){$scope.totalAmount=0;}
		//Save the list historial and the total amount in localStorage for persistence
		localStorage.setItem('historial', JSON.stringify($scope.historial));
		localStorage.setItem('totalAmount',$scope.totalAmount);
	};
})

