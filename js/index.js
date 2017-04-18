

(function($){

	var user = CookieHandler.checkCookie();

	// if(!user) window.location.replace("https://gutomotta.github.io/querodinheiros/login");



	// When document is ready, check for the user
	$(document).ready(function() {
	    
	    console.log( "index ready!" );

	    // Initialize collapse button
	      $(".button-collapse").sideNav();
	      // Initialize collapsible (uncomment the line below if you use the dropdown variation)
	      //$('.collapsible').collapsible();


	      $('#spedingRecord').click(function(){
	      	var spedingObj = {
  		      	spendingDescription: $("#spendingDescription").val(),
  				spendingValue: $("#spendingValue").val(),
  				spendingTags: $("#spendingTags").val(),
  				spendingMonth: "Março".substring(0,3),
  				spendingYear: "2017"
	      	};

			console.log(spedingObj);
	      })

	});
	

})(jQuery);



