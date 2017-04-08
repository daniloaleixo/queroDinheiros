

(function($){

	$("#switchToRegisterForm").click(function(){
		$(".register-form").css("display", "block");
		$(".login-form").css("display", "none");
	})

	$("#switchToLoginForm").click(function(){
		$(".register-form").css("display", "none");
		$(".login-form").css("display", "block");
	})

})(jQuery);