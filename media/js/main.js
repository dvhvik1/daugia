var socket;
function loadcart(){
if(u_id>0)
$.post( "api/cart/user_count", {})
  .done(function( data ) {
    var jsdata=JSON.parse(data);
    $(".m_child.m_cart").find(".nb_cart").remove();
    if(jsdata.count>0)
    {
        $(".m_child.m_cart").append("<div class='nb_cart'>"+jsdata.count+"</div>");
    }
  });
}
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
socket.on('login', function(dtx){
        alert(dtx.msg);
        $(".login_box").trigger("click");
});
socket.on('mes', function(dtx){
    if(dtx.type=="cart")
        loadcart();
taomsg(dtx.msg);
});

function taomsg(msg){
    $(".msg_tbl").remove();
$("body").append("<table class=msg_tbl><tr><td valign=middle align=center>"+
    "<div class='msg_box HWCO'>"+
    "<div class=msg_title>Thông báo</div>"+
    "<div class=msg_content>"+msg+"</div>"+
    "<div class=msg_footer></div>"+
    "</div>"+
    "</td></tr></table>");

}

loadcart();

$(document).on("click",".msg_tbl",function(){
$(".msg_tbl").remove();
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

$(document).on("click",".HWCO",function(e){
    e.stopPropagation();
    $(".HWCO").show();
});

$(document).on("click",function(e){
    $(".HWCO").hide();
});


$(document).on("click",".login_box",function(e){
    $(".lg_bm").remove();
    $("body").append("<div class='lg_bm HWCO'><div class=lg_title>Đăng nhập</div><div class=lg_row>Tên tài khoản:<br><input type=text name=user class=lg_inp></div><div class=lg_row>Mật khẩu:<br><input type=password name=pass class=lg_inp></div><div class=lg_row><div class=lg_login>Đăng nhập</div></div></div>");
$(".lg_bm").css({top:$(".menu").outerHeight(),left:$(this).offset().left-$(".lg_bm").outerWidth()+$(this).outerWidth()});
e.stopPropagation();
});



$(document).on("click",".reg_box",function(e){
    $(".lg_bm").remove();
    $("body").append("<div class='lg_bm HWCO'><div class=lg_title>Đăng ký</div><div class=lg_row>Tên tài khoản:<br><input type=text name=user class=lg_inp></div><div class=lg_row>Mật khẩu:<br><input type=password name=pass class=lg_inp></div><div class=lg_row>Nhập lại mật khẩu:<br><input type=password name=re_pass class=lg_inp></div><div class=lg_row><div class='lg_reg_btn btn'>Đăng ký</div></div></div>");
$(".lg_bm").css({top:$(".menu").outerHeight(),left:$(this).offset().left-$(".lg_bm").outerWidth()+$(this).outerWidth()});
e.stopPropagation();
});



$(document).on("click",".logu_box",function(e){
    $(".lg_bm").remove();
    $("body").append("<div class='lg_bm HWCO'><div class=lg_logout>Đăng xuất</div></div>");
$(".lg_bm").css({top:$(".menu").outerHeight(),left:$(this).offset().left-$(".lg_bm").outerWidth()+$(this).outerWidth()});
e.stopPropagation();
});




$(document).on("click",".lg_reg_btn",function(){
$.post( "api/user/reg", { name: $(".lg_inp[name='user']").val(), pass: $(".lg_inp[name='pass']").val(), re_pass: $(".lg_inp[name='re_pass']").val() })
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
    if(ctime<=0)
        ctime="Đang đợi kết thúc";
    $(this).html(ctime);
});
},1000);










});