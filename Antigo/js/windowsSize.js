var WindowsSize = function(){
    var h=$(window).height(),
        w=$(window).width();

    // console.log(h, w);

    var getSize = function(){
    	return [h, w];
    }
};
$(document).ready(WindowsSize); 
$(window).resize(WindowsSize); 