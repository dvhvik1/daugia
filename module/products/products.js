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
	HTML.main.content=func.templ(HTML.main.content,{product:ndt});
	}
	
	
endMain(false,"ok");
});