
function HTML() {
	this.html="";
this.header={add:"",title:"Vikclass"};
this.main={content:"",menu:""};
this.footer = "";
this.isMedia = false;
this.isAjax = false;

}

HTML.prototype.toHtml = function(res) {
var ejs = global.ejs;
  if(!this.isMedia){
  if(this.isAjax){
  res.send(this.main.content);
}
  else
  {
this.html=func.templ(this.html,{config:global.config,header:this.header,main:this.main});
res.send(this.html);
}
}
};

module.exports = HTML;