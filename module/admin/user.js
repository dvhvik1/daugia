


HTML.main.content=fs.readFileSync('module/'+req.module+'/view/'+req.act+'.html','utf-8')+'';


var new_category={name:"",url:""};
var errText="";console.log(req.body);
if(req.body.doaction=="1"){

new_category.name=func.removeHtmlTag(func.removeSpcChar(func.stringval(req.body.name)));
new_category.url=func.makeUrl(new_category.name);
if(new_category.name=="")
{
errText+="Tên tin không được để trống<br>";
}

if(errText=="")
{
	var add_category=DB_category({name:new_category.name,url:new_category.url});
	add_category.save(function(err,acategory){
		console.log(err);
		if(err!=null)
		{
			errText=err.errmsg;
		}
		else
		errText="Thêm thành công !<br>";
		HTML.main.content=func.templ(HTML.main.content,{categorylist:"",msg:{err:errText}});
endMain(false,"ok");
	});
}
else
{
	HTML.main.content=func.templ(HTML.main.content,{categorylist:"",msg:{err:errText}});
endMain(false,"ok");
}


}//end post
else
{

HTML.main.content=func.templ(HTML.main.content,{categorylist:"",msg:{err:""}});
endMain(false,"ok");

}
