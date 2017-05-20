
//module.exports = {
var CookieHandler = {
    setCookie: function(cookieName, cookieValue, expirationDays) {
        var d = new Date();
        d.setTime(d.getTime() + (expirationDays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
        // console.log("Cookie info: " + cookieName + "=" + cookieValue + ";" + expires + ";path=/");
    },

    getCookie: function(cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        // console.log(decodedCookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },

    checkCookie: function() {
        // console.log("Checking cookie");
        var uid = this.getCookie("uid");
            
        if (uid != "") {
            var user = { 
                "uid": uid,
                "email": this.getCookie("email"),
                "displayName": this.getCookie("displayName"),
                "photoURL": this.getCookie("photoURL")
            };
            return user;
        } else {
            return false;
        }
    }
}