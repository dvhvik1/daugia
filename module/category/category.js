req.session.idx="123";
HTML.main.content=fs.readFileSync("module/"+req.module+'/view/category.html','utf-8')+'';
var product_box=fs.readFileSync('module/product/view/box.html','utf-8')+'';
var product_list="";
var ndt={};

var check={quantity:{$gt:0},category:{ $elemMatch : {id:0}}};
var productid=func.intval(req.urlmap[2]);
if(productid>0)
var check={quantity:{$gt:0},category:{ $elemMatch : {id:productid}}};
DB_category.find({id:productid},function(err,data){
	if(data.length>0){
		HTML.header.title=data[0].name;
DB_product.find(check,function(err,data){
	console.log(err,data);
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
}
});