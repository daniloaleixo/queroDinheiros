

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

	});
	

})(jQuery);



