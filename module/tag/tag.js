HTML.main.content=fs.readFileSync("module/"+req.module+'/view/tag.html')+'';
var ndt={};
var tag=[];
for (var i = 2; i < req.urlmap.length; i++) {
	if(typeof req.urlmap[i] !== 'undefined' && req.urlmap[i]!=""){
tag.push(req.urlmap[i]);
}
}
if(tag.length==1)
var check={tag:req.urlmap[2]};
if(tag.length>1)
var check={tag:{$all:check.tag}};
if(tag.length==0)
var check={};
console.log(tag.length,check);
DB_post.find(check,function(err,data){
	var noidung="";
	for (var i =0;i<data.length;i++) {
		noidung+="<div class=t_p_row><div class=t_p_row_img><img src='"+func.getSrc(data[i].img)+"'></div><div class=t_p_row_note><a href='"+func.getSrc("post/"+data[i].id)+"' class=t_p_title>"+data[i].name+"</a><br>"+data[i].des+"</div></div>";
	};
	ndt.noidung=noidung;
	HTML.main.content=func.temp(HTML.main.content,ndt);
endMain(false,"ok");
});