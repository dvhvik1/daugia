if(req.act=="removeall" && req.session.isAdmin==1)
{

DB_phien.find({}, function(err,books) {
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

if(req.act=="getlist")
{
DB_phien.find({},function(err,data){
	if(data.length>0){
	res.send(JSON.stringify(data));
	}
	else
	{
		res.send("[]");
	}
});
}


if(req.act=="getFormProduct")
{
	//console.log(req.urlmap);
var id=func.intval(req.urlmap[4]);
if(id>0)
{
DB_product.find({id:id}).exec(function(err,product){
	if(product.length>0){
DB_phien.find({p_id:id},function(err,phien){
	if(phien.length>0){
	res.send(JSON.stringify(phien[0]));
	}
	else
	{
		if(product[0].quantity>0)
		{
	var phiendf={p_id:product[0].id,price:product[0].min_price,time:func.getTime(),endtime:(func.getTime()+func.intval(product[0].timedaugia))};
	var add_phien=DB_phien(phiendf);
	add_phien.save(function(err,aphien){
		if(!err)
		{
			console.log("tao phien : ",aphien);
			phiens['phien_'+aphien.id]=setTimeout(function(){func.phien_process(aphien)},(aphien.endtime-aphien.time));
     io.to("product_"+product[0].id).emit("updatephien",aphien);
		res.send(JSON.stringify(aphien));
	}
	else
	{
		
			res.send('{"sys":"false","err":"'+err.errmsg+'"}');
		
	}

	});
		}else
res.send('{"sys":"false","err":"quantity = 0"}');
	}

});
}
else
res.send('{"sys":"false","err":"'+id+'"}');
});
}
else
res.send('{"sys":"false","err":"'+id+'"}');
}