var socket;
function toVnd(data,c,d,t){
var n = data, 
    c = isNaN(c = Math.abs(c)) ? 0 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "." : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "")+" đ";
 }
function toHHMMSS(i) {
        var sec_num = parseInt(i, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}

if(isNaN(seconds))
    return "Đang đợi...";

        return hours+':'+minutes+':'+seconds;
}
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




if($(".prd_item").length>0)
{
$(".prd_item").each(function(){
    loadDGmain($(this).attr("p_id"));
socket.emit('view', { p_id: $(this).attr("p_id")});
});
}











  });
function loadDGmain(p_id){
    $.post( "/api/phien/getFormProduct/"+p_id, {})
  .done(function( data ) {
    $.post( "/api/product/getdaugia/"+p_id, {})
  .done(function( data ) {
    var jsdata=JSON.parse(data);
    console.log(data);
    if(jsdata.sys!="false")
    {
if(jsdata.length>0 && jsdata[0].phien_doc.run>0){
    var dtx=jsdata[0].phien_doc;
    serverTime=dtx.time;
    console.log(".prd_c_price[p_id='"+dtx.p_id+"']");
$(".prd_c_price[p_id='"+dtx.p_id+"']").html(toVnd(dtx.price));
$(".prd_timecount[p_id='"+dtx.p_id+"']").attr("time",dtx.time);
$(".prd_timecount[p_id='"+dtx.p_id+"']").attr("endtime",dtx.endtime);
    }
    else
    {
    }
    }
  });
  });

}
function setDGmain(dtx){
$(".prd_c_price[p_id='"+dtx.p_id+"']").html(toVnd(dtx.price));
$(".prd_timecount[p_id='"+dtx.p_id+"']").attr("time",dtx.time);
$(".prd_timecount[p_id='"+dtx.p_id+"']").attr("endtime",dtx.endtime);
}
socket.on('DG', function(dtx){
      setDGmain(dtx);
});
socket.on('updatephien', function(dtx){
      loadDGmain(dtx.p_id);
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
    $("body").append("<div class='lg_bm HWCO'><div class=lg_title>Đăng nhập</div><div class=lg_row>Tên tài khoản:<br><input type=text name=user class=lg_inp></div><div class=lg_row>Mật khẩu:<br><input type=password name=pass class=lg_inp></div><div class=lg_row><div class=lg_login>Đăng nhập</div> <div class='reg_box btn' style='float:right'>Đăng ký</div></div></div>");
$(".lg_bm").css({top:$(".menu").outerHeight(),left:$(this).offset().left-$(".lg_bm").outerWidth()+$(this).outerWidth()});
e.stopPropagation();
});



$(document).on("click",".reg_box",function(e){
    $(".lg_bm").remove();
    $("body").append("<div class='lg_bm HWCO'><div class=lg_title>Đăng ký</div><div class=lg_row>Tên tài khoản:<br><input type=text name=user class=lg_inp></div><div class=lg_row>Mật khẩu:<br><input type=password name=pass class=lg_inp></div><div class=lg_row>Nhập lại mật khẩu:<br><input type=password name=re_pass class=lg_inp></div><div class=lg_row>Email:<br><input type=email name=email class=lg_inp></div><div class=lg_row><div class='lg_reg_btn btn'>Đăng ký</div></div></div>");
$(".lg_bm").css({top:$(".menu").outerHeight(),left:$(".login_box").offset().left-$(".lg_bm").outerWidth()+$(".login_box").outerWidth()});
e.stopPropagation();
});



$(document).on("click",".logu_box",function(e){
    $(".lg_bm").remove();
    $("body").append("<div class='lg_bm HWCO'><div class=lg_logout>Đăng xuất</div></div>");
if($(".logu_box").text().trim()=="admin")
    {$(".lg_bm").append("<a class=lg_row href='./admin'>Quản lý admin</a>");}
$(".lg_bm").css({top:$(".menu").outerHeight(),left:$(this).offset().left-$(".lg_bm").outerWidth()+$(this).outerWidth()});
e.stopPropagation();
});




$(document).on("click",".lg_reg_btn",function(){
$.post( "api/user/reg", { name: $(".lg_inp[name='user']").val(), pass: $(".lg_inp[name='pass']").val(), re_pass: $(".lg_inp[name='re_pass']").val(),email: $(".lg_inp[name='email']").val() })
  .done(function( data ) {
    var jsdata=JSON.parse(data);
    if(jsdata.sys=="false")
    {
        alert(jsdata.err);
    }
    else
    {
        alert(jsdata.err);
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
        if(jsdata.err=="pass")
        alert("Sai tên đăng nhập hoặc mật khẩu !");
    else
        alert(jsdata.err);
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
    else
        ctime=toHHMMSS(ctime);
    $(this).html(ctime);
});
},1000);










});