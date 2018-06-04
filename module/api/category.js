if(req.act=="getlist")
{
DB_category.find({},function(err,data){
	if(data.length>0){
	res.send(JSON.stringify(data));
	}
	else
	{
		res.send("[]");
	}
});
}
if(req.act=="add")
{
var new_category={name:"",url:""};
if(func.stringval(req.body.name)!=""){
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
		if(err!=null)
		{
			errText=err.errmsg;
			res.send('{"sys":"false","err":"'+errText+'"}');
		}
		else
		{
		errText="Thêm thành công !";
		res.send('{"sys":"true","err":"'+errText+'"}');
	}

	});
}
else
{
	res.send('{"sys":"false","err":"'+errText+'"}');
}
}
}

if(req.act=="remove" && req.session.isAdmin==1)
{

var id_remove=func.intval(req.body.id);
if(id_remove>0){
DB_category.remove({ id: id_remove }, function(err) {
    if (!err) {
       res.send('{"sys":"true"}');
    }
    else {
       res.send('{"sys":"false"}');
    }
});
}
else
{
	res.send('{"sys":"false"}');
}
}

if(req.act=="update" && req.session.isAdmin=="admin")
{

var id=func.intval(req.body.id);
var new_category={name:"",url:""};


if(id>0 && func.stringval(req.body.name)!=""){

new_category.name=func.removeHtmlTag(func.removeSpcChar(func.stringval(req.body.name)));
new_category.url=func.makeUrl(new_category.name);

DB_category.findOneAndUpdate({ id: id }, new_category, {upsert:true}, function(err, doc){
    if (err) res.send('{"sys":"false"}');
    else
    reres.send('{"sys":"true"}');
});





}
else
{
	res.send('{"sys":"false"}');
}
}