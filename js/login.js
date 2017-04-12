

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
		loginFunction();
	})

	$("#register").click(function(){
		registerFunction();
	})

	$("#loginGoogle").click(function(){
		loginGoogleFunction();
	})







	var loginFunction = function(){
		var emailInput = $("#emailInput").val();
		var passwordInput = $("#passwordInput").val();


		var trySignIn = firebase.auth().signInWithEmailAndPassword(emailInput, passwordInput);

		trySignIn.then(function(auth){
			console.log("Conseugi logar");
			// window.location.replace("https://gutomotta.github.io/querodinheiros/");
			cookieHandler.setCookie("uid", auth.uid, 30);
			var x = cookieHandler.getCookie("uid");
			console.log(x);
		}, function(error){
			console.log("Não conseugi logar");
		});
	}
	var registerFunction = function(){
		var emailInput = $("#emailInput").val();
		var passwordInput = $("#passwordInput").val();
		var password2Input = $("#password2Input").val();

		if(password2Input != passwordInput){
			alert("senhas devem ser iguais");
		} else {

			firebase.auth()
			.createUserWithEmailAndPassword(emailInput, passwordInput)
			.then(function(user){
				// Already registrated, just have to login
				loginFunction();
				console.log("registrated");
			},function(error){
				if(error.code == 'auth/email-already-in-use')
					console.log("O email escolhido já esta em uso");
				else
					console.log("Não consegui realizar o cadastro, por favor tente novamente");
			})

		}

	}	

	var loginGoogleFunction = function(){
		var provider = new firebase.auth.GoogleAuthProvider();

  		var tryGoogleSignIn = firebase.auth().signInWithPopup(provider);

  		tryGoogleSignIn.then(function(result) {
		  	// This gives you a Google Access Token. You can use it to access the Google API.
		  	var token = result.credential.accessToken;
		  	// The signed-in user info.
		  	user = result.user;
		  	console.log("loguei com o Google");
		  	window.location.replace("https://gutomotta.github.io/querodinheiros/");

		}).catch(function(error){
		  	console.log("nao consegui");
		  	console.log(error);
		});
	}




})(jQuery);