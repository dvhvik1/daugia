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
$(document).on("click",".logu_box",function(){
    $(".lg_bm").remove();
    $("body").append("<div class=lg_bm><div class=lg_logout>Đăng xuất</div></div>");
$(".lg_bm").css({top:$(".menu").outerHeight(),left:$(this).offset().left-$(".lg_bm").outerWidth()+$(this).outerWidth()});
});
$(document).on("click",".lg_login",function(){
$.post( "api/user/login", { name: $(".lg_inp[name='user']").val(), pass: $(".lg_inp[name='pass']").val() })
  .done(function( data ) {
    var jsdata=JSON.parse(data);
    if(jsdata.sys=="false")
    {
        alert("Sai tên đăng nhập hoạc mật khẩu !");
    }
    else
    {
        location.reload();
    }
  });

});

$(document).on("click",".lg_logout",function(){
$.post( "api/user/logout", {})
  .done(function( data ) {
    var jsdata=JSON.parse(data);
    if(jsdata.sys=="false")
    {
        alert("Chưa đăng nhập !");
    }
    else
    {
        location.reload();
    }
  });

});

setInterval(function(){
$(".prd_timecount").each(function(){
    var endtime=parseFloat($(this).attr("endtime"));
    var ctime=parseInt((endtime-serverTime)/1000);
    $(this).html(ctime);
});
},1000);










});