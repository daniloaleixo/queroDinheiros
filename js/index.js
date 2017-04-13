

(function($){

	var user = CookieHandler.checkCookie();

	if(!user) window.location.replace("https://gutomotta.github.io/querodinheiros/login");



	// When document is ready, check for the user
	$(document).ready(function() {
	    
	    console.log( "index ready!" );

	});
	

})(jQuery);



