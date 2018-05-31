HTML.main.content=fs.readFileSync('module/'+req.module+'/view/'+req.act+'.html')+'';
var ndt={name:"",des:"",tag:"",html:"",img:""};
var product=ndt;
var errText="";
var waitupload=false;
console.log("===files",req.files);
if(req.body.doaction=="1"){
ndt=req.body;
product.name=func.removeHtmlTag(func.removeSpcChar(req.body.name));
product.des=func.removeHtmlTag(func.removeSpcChar(req.body.des));
product.tag=func.removeHtmlTag(func.removeSpcChar(req.body.tag));
product.html=func.safeHtml(req.body.html);
product.price=func.intval(req.body.price);
product.min_price=func.intval(req.body.min_price);
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


var productsave = new DB_product({ name: product.name,des:product.des,img:product.img,tag:product.tag,price:product.price,min_price:product.min_price,html:product.html,time:product.time,url:product.url });
productsave.save(function (err, user1) {
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
var productsave = new DB_product({ name: product.name,des:product.des,img:product.img,tag:product.tag,price:product.price,min_price:product.min_price,html:product.html,time:product.time,url:product.url });
productsave.save(function (err, user1) {
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