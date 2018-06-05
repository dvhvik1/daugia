
req.urlmap=(req.originalUrl.split("?")[0]).split("/");
req.module=req.urlmap[1];
req.act=req.urlmap[2];
if(req.module=="" || typeof req.module== "undefined"){
req.module="main";
}
if(req.act=="" || typeof req.act== "undefined"){
req.act="main";
}
req.session.module=req.module;

if(typeof req.urlmap[1] !== 'undefined' && req.urlmap[1]!="")
{
DB_seo.find({seo_url:req.urlmap[1]},function(err,data){
	var menu="";
	if(!err)
	if(data){
req.originalUrl=req.originalUrl.replace(data.seo_url,data.url);
req.urlmap=(req.originalUrl.split("?")[0]).split("/");
req.module=req.urlmap[1];
req.act=req.urlmap[2];
if(req.module=="" || typeof req.module== "undefined"){
req.module="main";
}
if(req.act=="" || typeof req.act== "undefined"){
req.act="main";
}
req.session.module=req.module;
console.log("seo_module:"+req.module+" --- act:"+req.act,req.urlmap);
endFirst(false,"ok");
}
else
endFirst(false,"ok");

});

}
else
{
endFirst(false,"ok");
}