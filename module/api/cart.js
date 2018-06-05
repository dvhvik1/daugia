
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



if(req.act=="remove" && func.intval(req.session.u_id)>0)
{

var id_remove=func.intval(req.body.id);
if(id_remove>0){
	var u_id=func.intval(req.session.u_id);
	var find={id: id_remove,u_id:u_id};
if(req.session.isAdmin=="admin")
find={ id: id_remove };


DB_cart.find(find, function(err,books) {
    if (!err) {
    	books.forEach(function(book){
           book.remove(function(err){
              
           });
       });
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