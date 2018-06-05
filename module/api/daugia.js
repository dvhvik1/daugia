
if(req.act=="getlist")
{
DB_daugia.find({},function(err,data){
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
		DB_daugia.find({phien_id:phien.id},function(err,daugia){
	if(daugia.length>0){
	res.send('{"phien":'+JSON.stringify(phien[0])+',"daugia":'+JSON.stringify(daugia)+'}');

}
else
{
	console.log("==================daugia:",phien[0]);
			
	res.send('{"phien":'+JSON.stringify(phien[0])+',"daugia":'+JSON.stringify(daugia)+'}');
}
});
	}
	else
	{
		if(product[0].quantity>0)
		{
	var phiendf={p_id:product[0].id,price:product[0].min_price,time:func.getTime(),endtime:(func.getTime()+60000)};
	var add_phien=DB_phien(phiendf);
	add_phien.save(function(err,aphien){
		if(err!=null)
		{
			res.send('{"sys":"false","err":"'+err.errmsg+'"}');
		}
		else
		{
		aphien.daugia={};
		res.send(JSON.stringify(aphien));
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