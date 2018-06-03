
function HTML() {
	this.html="";
this.header={add:"",title:"Vikclass",u_id:0};
this.main={content:"",menu:""};
this.footer = "";
this.isMedia = false;
this.isAjax = false;
}

HTML.prototype.toHtml = function(res) {
  if(!this.isMedia){
  if(this.isAjax){
  res.send(this.main.content);
}
  else
  {
  	global.config.serverTime=func.getTime();
this.html=func.templ(this.html,{config:global.config,header:this.header,main:this.main});
res.send(this.html);
}
}
};

module.exports = HTML;