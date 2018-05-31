var socket;
$(document).ready(function(){
var docURL = document.URL;
var linksList = document.querySelectorAll('a[href]');
    for (var i = 0; i< linksList.length; i++) {
        var link = linksList[i];
        if (link.href === docURL) {
            link.className += ' actL';
        }
    }
 socket = io.connect(ROOT);
  socket.on('connect', function (data) {
    console.log("connected");
    socket.emit('message', { my: 'data' });
  });
socket.on('hello', function(dtx){
        console.log(dtx);
});
$(window).scroll(function(){
	if($(window).scrollTop()>0)
	{
		$(".menu").addClass("active");
	}
	else
	{
		$(".menu").removeClass("active");
	}
});



});