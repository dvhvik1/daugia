req.session.idx="123";
HTML.main.content=fs.readFileSync("module/"+req.module+'/view/main.html','utf-8')+'';
var product_box=fs.readFileSync('module/product/view/box.html','utf-8')+'';
var product_list="";
var ndt={};

DB_product.find({quantity:{$gt:0}},function(err,data){
	
	if(data.length>0){
		for (var i = 0; i < data.length; i++) {
			ndt=data[i];
	ndt.date=func.timeToString(ndt.time);
	ndt.price=func.toVnd(ndt.price);
	var product_box2=product_box;
	
	product_list+=func.templ(product_box2,{product:ndt});
		}
	
	}
HTML.main.content=func.templ(HTML.main.content,{"data":{"product_list":product_list}});
endMain(false,"ok");
});