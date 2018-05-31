HTML.main.content=fs.readFileSync('module/'+req.module+'/view/'+req.act+'.html')+'';
var ndt={name:"",des:"",tag:"",html:"",img:""};
var post=ndt;
var errText="";
var waitupload=false;
console.log("===files",req.files);
if(req.body.doaction=="1"){
ndt=req.body;
post.name=func.removeHtmlTag(func.removeSpcChar(req.body.name));
post.des=func.removeHtmlTag(func.removeSpcChar(req.body.des));
post.tag=func.removeHtmlTag(func.removeSpcChar(req.body.tag));
post.html=func.safeHtml(req.body.html);

if(post.name=="")
{
errText+="Tên tin không được để trống<br>";
}
if(post.des=="")
{
errText+="Nội dung rút gọn không được để trống<br>";
}
if(post.tag=="")
{
errText+="Tag không được để trống<br>";
}
if(post.html=="")
{
errText+="Nội dung không được để trống<br>";
}

if(errText=="")
{
	
	  if (Object.keys(req.files).length>0)
	  {
	  	console.log("co file");
	  	waitupload=true;
	  	var files=req.files;
//var newpath = path.join(__dirname, './media/post/'+ files.my_file.name);
var newname= func.rand(1,999)+""+func.getTime()+".jpg";
var newpath = path.join(__dirname, './media/post/'+ newname);
  files.my_file.mv(newpath, function(err) {
    if (err)
throw err;
post.img='media/post/'+newname;
post.tag=post.tag.split(",");
post.time=func.getTime();
post.url=func.makeUrl(post.name);


var postsave = new DB_post({ name: post.name,des:post.des,img:post.img,tag:post.tag,html:post.html,time:post.time,url:post.url });
postsave.save(function (err, user1) {
	HTML.main.content=func.tmp("Đăng tin thành công !!<br>","msg.err",HTML.main.content);
HTML.main.content=func.temp(HTML.main.content,ndt);
endMain(false,"ok");
});






 

  });

}
else
{
	waitupload=true;
console.log("ko file");
post.img='media/post/noimg.jpg';
post.tag=post.tag.split(",");
post.time=func.getTime();
post.url=func.makeUrl(post.name);
var postsave = new DB_post({ name: post.name,des:post.des,img:post.img,tag:post.tag,html:post.html,time:post.time,url:post.url });
console.log("datao");
postsave.save(function (err, user1) {
	HTML.main.content=func.tmp("Đăng tin thành công !!<br>","msg.err",HTML.main.content);
HTML.main.content=func.temp(HTML.main.content,ndt);
endMain(false,"ok");
});

}

}






}

if(!waitupload){
HTML.main.content=func.tmp(errText,"msg.err",HTML.main.content);
HTML.main.content=func.temp(HTML.main.content,ndt);
endMain(false,"ok");
}