

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
			setCookies(auth);
			// window.location.replace("https://gutomotta.github.io/querodinheiros/");
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
		  	setCookies(user);
		  	// window.location.replace("https://gutomotta.github.io/querodinheiros/");

		}).catch(function(error){
		  	console.log("nao consegui");
		  	console.log(error);
		});
	}

	// Get the auth object and put the right cookies for it
	var setCookies = function(auth){
		cookieHandler.setCookie("uid", auth.uid, 30);

		cookieHandler.setCookie("email", auth.email, 30);

		if(auth.displayName) cookieHandler.setCookie("displayName", auth.displayName, 30);
		else cookieHandler.setCookie("displayName", auth.email, 30); // Put the email if do not have name

		if(auth.photoURL) cookieHandler.setCookie("photoURL", auth.photoURL, 30);
		else {
			cookieHandler.setCookie("displayName", 
			"https://firebasestorage.googleapis.com/v0/b/quero-dinheiros.appspot.com/o/null-avatar.png?alt=media&token=6a674e5e-c7af-4e22-8fe7-630fb1236518", 
			30); // Put the dumb image url
		}
	}




})(jQuery);