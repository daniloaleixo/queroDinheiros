

(function($){

	$("#switchToRegisterForm").click(function(){
		$(".register-form").css("display", "block");
		$(".login-form").css("display", "none");
	})

	$("#switchToLoginForm").click(function(){
		$(".register-form").css("display", "none");
		$(".login-form").css("display", "block");
	})


	$("#login").click(function(){


		var emailInput = $("#emailInput").val();
		var passwordInput = $("#passwordInput").val();

		console.log([emailInput, passwordInput]);


		var trySignIn = firebase.auth().signInWithEmailAndPassword(emailInput, passwordInput);

		trySignIn.then(function(auth){
			alert("Conseugi logar");
		}, function(error){
			alert("Não conseugi logar");
		});
	})

	$("#register").click(function(){


		var emailInput = $("#emailInput").val();
		var passwordInput = $("#passwordInput").val();

		console.log([emailInput, passwordInput]);

		firebase.auth()
		.createUserWithEmailAndPassword(emailInput, passwordInput)
		.then(function(user){
			// Already registrated, just have to login
			// loginCtrl.signingUp = false;
			// loginCtrl.login();
			alert("registrated");
		},function(error){
			if(error.code == 'auth/email-already-in-use')
				alert("O email escolhido já esta em uso");
			else
				alert("Não consegui realizar o cadastro, por favor tente novamente");
		})
	})




})(jQuery);