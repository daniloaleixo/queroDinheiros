

(function($){

	var user = CookieHandler.checkCookie();
	var url = window.location.href;

	if(!user) window.location.replace(url + "/login");



	window.onload = function(){  
		var today = new Date();
		var date = today.getFullYear().toString() + "-" + 
					(today.getMonth() +1).toString() + "-" + 
					today.getDate().toString();
		$("#spendingDate").val(date);

	}


	// When document is ready, check for the user
	$(document).ready(function() {
	    
	    console.log( "index ready!" );

	    // Initialize collapse button
	      $(".button-collapse").sideNav();
	      // Initialize collapsible (uncomment the line below if you use the dropdown variation)
	      //$('.collapsible').collapsible();


	      $('#spedingRecord').click(function(){
	      	var spedingObj = {
  		      	description: validateDescription($("#spendingDescription").val()),
  				amount: validateAmount($("#spendingValue").val()),
  				tags: $("#spendingTags").val().split(" "),
  				date: $("#spendingDate").val()
	      	};
	      	var spendingMonth = "Março".substring(0,3);
  			var spendingYear = "2015";

	      	console.log("Vou colocar no servidor ano:" + spendingYear + " mes:" + spendingMonth + " o objeto:")
			console.log(spedingObj);

			var newSpedingRef = firebase.database().ref()
													.child(user.uid)
													// .child("CpLSvM5t9lTDbMyydika4Cdq4Ek1")
													.child(spendingYear)
													.child(spendingMonth)
													.child("debts")
													.push();
          	newSpedingRef.set(spedingObj).then(function(){
          		console.log("Informação colocada no servidor com sucesso");
          	}, function(error){
          		console.log(error);
          	});
	      })

	      $('#spendingDate').bootstrapMaterialDatePicker({ weekStart : 0, time: false });



	});



	// *********************
	// Auxiliary functions
	// *********************
	var validateAmount = function(amount){
		amount.replace(/,/g, '.');
		return parseFloat(amount);
	}

	var validateDescription = function(description){
		if(description.length == 0) return 'null';
		return description;
	}
	

})(jQuery);




