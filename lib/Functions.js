

function func() {
this.geturl=function(url){
return url;
};
}
func.prototype.xoadau = function( alias )
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
    str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\#|\[|\]|~|$|_/g,"-");
    str= str.replace(/-+-/g,"-");
    str= str.replace(/^\-+|\-+$/g,""); 
    str= str.replace(/\-/g," ");
    str= this.removeSpcChar(str);
    return str;
}
func.prototype.makeUrl = function( alias )
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
    str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
    str= str.replace(/-+-/g,"-");
    str= str.replace(/^\-+|\-+$/g,""); 
    str= this.removeSpcChar(str);
    return str;
}

func.prototype.getSrc = function(html) {
  return global.config.rooturl+html;
};
func.prototype.formatMoney = function(data,c,d,t){
var n = data, 
    c = isNaN(c = Math.abs(c)) ? 0 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "." : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "")+" đ";
 }
func.prototype.toVnd = function(n){
return this.formatMoney(n);
}

func.prototype.safeHtml = function(html) {
  return html;
};
func.prototype.intval = function(html) {
var rt=parseInt(html);
	if(typeof rt === 'undefined' || isNaN(rt))
		rt=0;
  return rt;
};
func.prototype.stringval = function(html) {
var rt=html+"";
  if(typeof rt === 'undefined')
    rt="";
  return rt;
};
func.prototype.getTime = function() { return new Date().getTime(); }

func.prototype.timeToDate = function(time) { 
var d1 = new Date(time);
return d1; }


func.prototype.timeToString = function(time) { 
var d1 = new Date(time);
return d1.getDate()+"/"+(d1.getMonth()+1)+"/"+d1.getFullYear();
}

func.prototype.md5 = function(str) { 
return global.md5(str);
}


func.prototype.removeSpcChar = function(string) {
var string = string.replace(/[\/\\#+()$~%'":*?<>{}]/g, '');
  return string;
}

func.prototype.removeHtmlTag = function(string) {
var regex = /(&nbsp;|<([^>]+)>)/ig;
result = string.replace(regex, "");
return (result);
}

func.prototype.rand=function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




func.prototype.tmp = function(htstring,htname,htstringfile) { 
	if(typeof htstring == 'undefined'){htstring=" ";}
  if(typeof htstringfile == 'undefined'){htstringfile=" ";}
var hgt=htstringfile;
var reg = new RegExp("{{"+htname+"}}", "g");
hgt=hgt.replace(reg,htstring);
return hgt;
}

func.prototype.temp = function(tpl, data) {
	var re = /\{\{([^\}\}]+)?\}\}/g, match;
  while(match = re.exec(tpl)) {
		tpl = tpl.replace(match[0], data[match[1]])
    re.lastIndex = 0;
  }
  return tpl;
}

func.prototype.templ = function(tpl, obj) {
  for(var key in obj){
    var i=0;
    for(var key2 in obj[key])
    {
      i++;
    }
    if(i==0)
      tpl=this.tmp(obj[key],key,tpl);
    else
      for(var key2 in obj[key])
      {
      tpl=this.tmp(obj[key][key2],(key+"."+key2),tpl);
      }
    }
  return tpl;
}
module.exports = func;