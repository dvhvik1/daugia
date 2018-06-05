
HTML.main.content=fs.readFileSync('module/'+req.module+'/view/'+req.act+'.html')+'';
var ndt={name:"",des:"",tag:"",html:"",img:"",catelist:"123"};
var product=ndt;
var errText="";
var waitupload=false;

var catelist="";
var check={id:0};
var productid=func.intval(req.urlmap[3]);
if(productid>0)
var check={id:productid};

DB_product.find(check,function(err,aproduct){
	
	if(aproduct.length>0){
ndt=aproduct[0];
DB_category.find({},function(err,category){
	if(category.length>0){
		
	for (var i = 0; i < category.length; i++) {
		catelist+="<option value='"+category[i].id+"'>"+category[i].name+"</option>";
	}
	}
	else
	{
	}
ndt.catelist=catelist;
console.log(ndt.catelist);
if(req.body.doaction=="1"){
ndt=req.body;
ndt.catelist=catelist;
product.name=func.removeHtmlTag(func.removeSpcChar(req.body.name));
product.search=func.xoadau(product.name);
product.des=func.removeHtmlTag(func.removeSpcChar(req.body.des));
product.tag=func.removeHtmlTag(func.removeSpcChar(req.body.tag));
product.html=func.safeHtml(req.body.html);
product.price=func.intval(req.body.price);
product.min_price=func.intval(req.body.min_price);
product.category=[{id:func.intval(req.body.category)}];
product.quantity=func.intval(req.body.quantity);
if(product.price==0)
{
errText+="Giá sản phẩm không được để trống<br>";
}
if(product.name=="")
{
errText+="Tên sản phẩm không được để trống<br>";
}
if(product.des=="")
{
errText+="Nội dung rút gọn không được để trống<br>";
}
if(product.tag=="")
{
errText+="Tag không được để trống<br>";
}
if(product.html=="")
{
errText+="Nội dung không được để trống<br>";
}

if(errText=="")
{
	
	  if (Object.keys(req.files).length>0)
	  {
	  	console.log("co file");
	  	waitupload=true;
	  	var files=req.files;
//var newpath = path.join(__dirname, './media/product/'+ files.my_file.name);
var newname= func.rand(1,999)+""+func.getTime()+".jpg";
var newpath = path.join(__dirname, './media/product/'+ newname);
  files.my_file.mv(newpath, function(err) {
    if (err)
throw err;
product.img='media/product/'+newname;
product.tag=product.tag.split(",");
product.time=func.getTime();
product.url=func.makeUrl(product.name);


var productsave = new DB_product(product);
productsave.save(function (err, aproduct) {
console.log("aproduct:",aproduct);
if(!err)
		{

	DB_product.update(check, phiendf, {multi:true},function(err,aphien){
		if(!err)
		{
	}
	else
	{
		
	}

	});
}





HTML.main.content=func.tmp("Đăng sản phẩm thành công !!<br>","msg.err",HTML.main.content);
HTML.main.content=func.temp(HTML.main.content,ndt);
endMain(false,"ok");
});






 

  });

}
else
{
	waitupload=true;
console.log("ko file");
product.img='media/product/noimg.jpg';
product.tag=product.tag.split(",");
product.time=func.getTime();
product.url=func.makeUrl(product.name);
var phiendf={ name: product.name,des:product.des,img:product.img,tag:product.tag,price:product.price,min_price:product.min_price,html:product.html,time:product.time,url:product.url,category:product.category,quantity:product.quantity };
//var productsave = new DB_product({ name: product.name,des:product.des,img:product.img,tag:product.tag,price:product.price,min_price:product.min_price,html:product.html,time:product.time,url:product.url,category:product.category,quantity:product.quantity });
DB_product.update(check, product, {multi:true},function(err,aphien){
HTML.main.content=func.tmp("Đăng sản phẩm thành công !!<br>","msg.err",HTML.main.content);
HTML.main.content=func.temp(HTML.main.content,ndt);
endMain(false,"ok");
});

}

}






}

if(!waitupload){
HTML.main.content=func.tmp(errText,"msg.err",HTML.main.content);
HTML.main.content=func.temp(HTML.main.content,ndt);
endMain(false,"ok");
}
});
}
	
});