HTML.main.content=fs.readFileSync("module/"+req.module+'/view/post.html','utf-8')+'';
var ndt={};
var check={id:0};
var postid=func.intval(req.urlmap[2]);
if(postid>0)
var check={id:postid};
console.log(check);

DB_post.find(check,function(err,data){
	
	if(data.length>0){
	ndt=data[0];
	ndt.date=func.timeToString(ndt.time);
	console.log(ndt);
	HTML.header.title=ndt.name;
	HTML.main.content=func.templ(HTML.main.content,{post:ndt});
	}
	
	
endMain(false,"ok");
});