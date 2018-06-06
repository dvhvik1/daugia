req.session.idx="123";
HTML.main.content=fs.readFileSync("module/"+req.module+'/view/phien.html','utf-8')+'';
var product_box=fs.readFileSync('module/product/view/box.html','utf-8')+'';
var product_list="";
var ndt={};
var phientime=func.intval(req.urlmap[3]);


var match={run:1};


DB_phien.aggregate([{$match:match},{
    $lookup: {
        from: "products",
        localField: "p_id",
        foreignField: "id",
        as: "product_doc"
    }
},{ "$sort": { "endtime": -1 } }
]).exec(function(err, product) {
	if(!err)
    if(product.length>0){
        if(product[0].product_doc.length>0)
        {
        	for (var i = 0; i < product.length; i++) {
			ndt=product[i].product_doc[0];
			console.log(product[i].id);
	ndt.date=func.timeToString(ndt.time);
	ndt.price=func.toVnd(ndt.price);
	var product_box2=product_box;
	
	product_list+=func.templ(product_box2,{product:ndt});
		}
        }
	}
	HTML.main.content=func.templ(HTML.main.content,{"data":{"product_list":product_list}});
endMain(false,"ok");
});

