


HTML.main.content=fs.readFileSync('module/'+req.module+'/view/'+req.act+'.ejs','utf-8')+'';


var new_menu={name:"",url:""};
var errText="";console.log(req.body);
if(req.body.doaction=="1"){

new_menu.name=func.removeHtmlTag(func.removeSpcChar(func.stringval(req.body.name)));
new_menu.url=func.removeHtmlTag(func.removeSpcChar(func.stringval(req.body.url)));

if(new_menu.name=="")
{
errText+="Tên tin không được để trống<br>";
}
if(new_menu.url=="")
{
errText+="Nội dung rút gọn không được để trống<br>";
}

if(errText=="")
{
	var add_menu=DB_menu({name:new_menu.name,url:new_menu.url});
	add_menu.save(function(err,amenu){
		errText="Thêm thành công !<br>";
HTML.main.content=ejs.render(HTML.main.content,{menu:new_menu,errText:errText});
endMain(false,"ok");
	});
}
else
{
	HTML.main.content=ejs.render(HTML.main.content,{menu:new_menu,errText:errText});
endMain(false,"ok");
}


}//end post
else
{

HTML.main.content=ejs.render(HTML.main.content,{menu:new_menu,errText:errText});
endMain(false,"ok");

}
