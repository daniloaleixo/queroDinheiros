

(function($){

	var user = CookieHandler.checkCookie();
	var url = window.location.href;

	if(!user) {
		if(url[url.length - 1] !== '/') url += '/';
		window.location.replace(url + 'login.html');
	}

	

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
  				tags: $('.chips-autocomplete').material_chip('data'),
  				date: $("#spendingDate").val()
	      	};

	      	// dateArray vai ter o ano na posição 0, mes posição 1 e dia pos 2
	      	var dateArray = $("#spendingDate").val().split('-');

	      	console.log("Vou colocar no servidor ano:" + dateArray[0] + " mes:" + dateArray[1] 
	      							+ " dia: " + dateArray[2] + " o objeto:");
			console.log(spedingObj);


			if(!isNaN(spedingObj.amount)){
				var newSpedingRef = firebase.database().ref()
														.child(user.uid)
														.child(dateArray[0])
														.child(dateArray[1])
														.child(dateArray[2])
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
				
			} else Materialize.toast('Por favor preencha o valor que foi gasto', 2000);

	      }) // End click function



	      // date picker
	      $('#spendingDate').bootstrapMaterialDatePicker({ weekStart : 0, time: false });


	      // Tags
	      $('.chips-autocomplete').material_chip({
	          autocompleteOptions: {
	            data: {
	              'Compras': null,
	              'Comida': null,
	              'Transporte': null,
	              'Supermercado': null,
	              'Roupas': null
	            },
	            limit: Infinity,
	            minLength: 1
	          }
	        });



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
		$("#spendingDate").val(todayDate);
	}
	

})(jQuery);




