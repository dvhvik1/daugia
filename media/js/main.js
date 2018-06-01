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

$(document).on("click",".login_box",function(){

    $(".lg_bm").remove();
    $("body").append("<div class=lg_bm><div class=lg_title>Đăng nhập</div><div class=lg_row>Tên tài khoản:<br><input type=text name=user class=lg_inp></div><div class=lg_row>Mật khẩu:<br><input type=password name=pass class=lg_inp></div><div class=lg_row><div class=lg_login>Đăng nhập</div></div></div>");
$(".lg_bm").css({top:$(".menu").outerHeight(),left:$(this).offset().left-$(".lg_bm").outerWidth()+$(this).outerWidth()});
});

});