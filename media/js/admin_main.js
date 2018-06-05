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
        return hours+':'+minutes+':'+seconds;
}
function xoadau( alias )
{
    var str = alias;
    str= str.toLowerCase(); 
    str= str.replace(/à|à|á|á|ạ|ạ|ả|ả|ã|ã|â|â|ầ|ầ|ấ|ấ|ậ|ậ|ẩ|ẩ|ẫ|ẫ|ă|ă|ằ|ằ|ắ|ắ|ặ|ặ|ẳ|ẳ|ẵ|ẵ/g,"a"); 
    str= str.replace(/è|è|é|é|ẹ|ẹ|ẻ|ẻ|ẽ|ẽ|ê|ê|ề|ề|ế|ế|ệ|ệ|ể|ể|ễ|ễ/g,"e"); 
    str= str.replace(/ì|ì|í|í|ị|ị|ỉ|ỉ|ĩ|ĩ/g,"i"); 
    str= str.replace(/ò|ò|ó|ó|ọ|ọ|ỏ|ỏ|õ|õ|ô|ô|ồ|ồ|ố|ố|ộ|ộ|ổ|ổ|ỗ|ỗ|ơ|ơ|ờ|ờ|ớ|ớ|ợ|ợ|ở|ở|ỡ|ỡ/g,"o"); 
    str= str.replace(/ù|ù|ú|ú|ụ|ụ|ủ|ủ|ũ|ũ|ư|ư|ừ|ừ|ứ|ứ|ự|ự|ử|ử|ữ|ữ/g,"u"); 
    str= str.replace(/ỳ|ỳ|ý|ý|ỵ|ỵ|ỷ|ỷ|ỹ|ỹ/g,"y"); 
    str= str.replace(/đ/g,"d");
    str= str.replace(/à|à|á|á|ạ|ạ|ả|ả|ã|ã|â|â|ầ|ầ|ấ|ấ|ậ|ậ|ẩ|ẩ|ẫ|ẫ|ă|ă|ằ|ằ|ắ|ắ|ặ|ặ|ẳ|ẳ|ẵ|ẵ/g,"a"); 
    str= str.replace(/è|è|é|é|ẹ|ẹ|ẻ|ẻ|ẽ|ẽ|ê|ê|ề|ề|ế|ế|ệ|ệ|ể|ể|ễ|ễ/g,"e"); 
    str= str.replace(/ì|ì|í|í|ị|ị|ỉ|ỉ|ĩ|ĩ/g,"i"); 
    str= str.replace(/ò|ò|ó|ó|ọ|ọ|ỏ|ỏ|õ|õ|ô|ô|ồ|ồ|ố|ố|ộ|ộ|ổ|ổ|ỗ|ỗ|ơ|ơ|ờ|ờ|ớ|ớ|ợ|ợ|ở|ở|ỡ|ỡ/g,"o"); 
    str= str.replace(/ù|ù|ú|ú|ụ|ụ|ủ|ủ|ũ|ũ|ư|ư|ừ|ừ|ứ|ứ|ự|ự|ử|ử|ữ|ữ/g,"u"); 
    str= str.replace(/ỳ|ỳ|ý|ý|ỵ|ỵ|ỷ|ỷ|ỹ|ỹ/g,"y"); 
    str= str.replace(/đ/g,"d");
    return str;
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



$(document).on("click",".HWCO",function(e){
    e.stopPropagation();
    $(".HWCO").show();
});



$(document).on("click",".msg_tbl",function(e){
$(".msg_tbl").remove();
});




});