HTML.main.content=fs.readFileSync("module/"+req.module+'/view/product.html','utf-8')+'';
var ndt={};
var check={id:0};
var productid=func.intval(req.urlmap[2]);
if(productid>0)
var check={id:productid};
console.log(check);

DB_product.find(check,function(err,data){
	
	if(data.length>0){
	ndt=data[0];
	ndt.date=func.timeToString(ndt.time);
	ndt.price=func.toVnd(ndt.price);
	console.log(ndt);
	HTML.header.title=ndt.name;


var product_list="";
var find={"category.id":0,id:{$ne:ndt.id}};
if(data[0].category.length>0)
 find={"category.id":data[0].category[0].id,id:{$ne:ndt.id}};
console.log("find:",find);
DB_product.find(find).limit(4).exec(function(err,data){

	if(data.length>0){
		var product_box=fs.readFileSync('module/product/view/box.html','utf-8')+'';
		for (var i = 0; i < data.length; i++) {
			ndt2=data[i];
	ndt2.date=func.timeToString(ndt2.time);
	ndt2.price=func.toVnd(ndt2.price);
	var product_box2=product_box;
	
	product_list+=func.templ(product_box2,{product:ndt2});
		}
	
	}
HTML.main.content=func.templ(HTML.main.content,{product:ndt});
HTML.main.content=func.templ(HTML.main.content,{"data":{"product_list":product_list}});
endMain(false,"ok");
});





	
	}
	
	
});