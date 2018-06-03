if(req.act=="getlist")
{
DB_cart.find({},function(err,data){
	if(data.length>0){
	res.send(JSON.stringify(data));
	}
	else
	{
		res.send("[]");
	}
});
}
if(req.act=="user")
{
var id=func.intval(req.urlmap[4]);
if(id>0)
{
DB_cart.find({u_id:id},function(err,data){
	if(data.length>0){
	res.send(JSON.stringify(data));
	}
	else
	{
		res.send("[]");
	}
});
}
}
if(req.act=="user_count")
{
var u_id=func.intval(req.session.u_id);
if(u_id>0)
{
DB_cart.count({u_id:u_id}, function( err, count){
	console.log(err,count);
    res.send('{"u_id":'+u_id+',"count":'+count+'}');
});

}
else
res.send('{"u_id":0,"count":0}');
}