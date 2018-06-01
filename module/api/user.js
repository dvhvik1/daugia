if(req.act=="login")
{
if(func.stringval(req.body.name)!=""){
var name=func.removeHtmlTag(func.removeSpcChar(func.stringval(req.body.name)));
var pass=func.removeHtmlTag(func.removeSpcChar(func.stringval(req.body.pass)));
DB_user.find({name:name,pass:pass},function(err,data){
	if(data.length>0){
	req.session.u_id=data.id;
	res.send('{"sys":"true","u_id":'+data.id+'}');
	}
	else
	{
		res.send('{"sys":"false","err":"pass"}');
	}
});
}
else
{
	res.send('{"sys":"false","err":"null"}');
}
}