

(function($){

	var user = CookieHandler.checkCookie();
	var url = window.location.href;

	if(!user) window.location.replace(url + "/login");

	

	var today = new Date();
	var dd = today.getDate().toString();
	var mm = today.getMonth() + 1;
	if (mm < 10) mm = "0" + mm.toString();
	var yyyy = today.getFullYear().toString();
	var todayDate = yyyy + "-" + mm + "-" + dd;

	window.onload = function(){  
		$("#spendingDate").val(todayDate);

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
				Materialize.toast('Novo gasto incluído com sucesso', 4000);
				clearSpedingsInputs();
          	}, function(error){
          		Materialize.toast('Desculpe mas não consegui incluir seu gasto :(, tente novamente', 4000);
          		console.log(error);
          		clearSpedingsInputs();
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

	var clearSpedingsInputs = function(){
      	$("#spendingDescription").val("");
		$("#spendingValue").val("");
		$("#spendingTags").val("");
		$("#spendingDate").val(todayDate);
	}
	

})(jQuery);




