if(req.act=="getlist")
{
DB_product.find({},function(err,data){
	if(data.length>0){
	res.send(JSON.stringify(data));
	}
	else
	{
		res.send("[]");
	}
});
}

if(req.act=="getdaugia")
{
	var match={};
	var id=func.intval(req.urlmap[4]);
if(id>0)
{
	match={id:id};
}
	try{
DB_product.aggregate([{$match:match},{
    $lookup: {
        from: "phiens",
        localField: "id",
        foreignField: "p_id",
        as: "phien_doc"
    }
}
,

{$lookup: {
        from: "daugias",
        localField: "id",
        foreignField: "phien_id",
        as: "daugia_doc"
    }
}
]).exec(function(err, product) {
    if(product.length>0){
	res.send(JSON.stringify(product));
	}
	else
	{
		res.send("[]");
	}
});
}
catch(errx){
console.log("loi");
}
}