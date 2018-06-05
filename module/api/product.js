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

if(req.act=="remove" && req.session.isAdmin==1)
{
console.log("==========delete prd========");
var id_remove=func.intval(req.body.id);
if(id_remove>0){
DB_product.find({ id: id_remove }, function(err,books) {
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
}, {
    $unwind: "$phien_doc"
}
,

{$lookup: {
        from: "daugias",
        localField: "phien_doc.id",
        foreignField: "phien_id",
        as: "daugia_doc"
    }
},{ "$sort": { "phien_doc.id": -1 } }, {
    $group: {
        _id: null,
        id: {
            $first: "$id"
        },
        phien_doc: {
            $first: "$phien_doc"
        },
        daugia_doc: {
            $first: "$daugia_doc"
        }
    }
}
]).exec(function(err, product) {
    if(product.length>0){
        if(product[0].daugia_doc.length==0 && product[0].phien_doc.run==0)
        {
            DB_phien.update({id:product[0].phien_doc.id}, {time:func.getTime(),endtime:(func.getTime()+60000),run:1}, {multi:true}, function(err, doc){
        var aphien=product[0].phien_doc;
    clearTimeout(phiens['phien_'+aphien.id]);
    phiens['phien_'+aphien.id]=setTimeout(function(){func.phien_process(aphien)},(aphien.endtime-aphien.time));
product[0].phien_doc.run=1;
product[0].phien_doc.time=func.getTime();
product[0].phien_doc.endtime=func.getTime()+60000;
res.send(JSON.stringify(product));
});
        }
        else
        {
            product[0].phien_doc.time=func.getTime();
	res.send(JSON.stringify(product));
}
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