if(req.act=="update_status" && req.session.isAdmin==1)
{
var id_remove=func.intval(req.body.id);
var name=func.removeHtmlTag(func.removeSpcChar(func.stringval(req.body.name)));
if(id_remove>0 && name!=""){
DB_order.find({ id: id_remove },function(err,data){
    if(!err)
  if(data.length>0){
DB_order.update({ id: id_remove },{status:name}, {multi:true}, function(err,doc) {
  console.log("====update===",doc);
    if (!err) {

if(name=="Khách hàng hủy bỏ")
{
  DB_user.update({ id: data[0].u_id },{$inc: { report: 1} }, {multi:true}, function(err,doc) {
    res.send('{"sys":"true"}');
  });
}
else
res.send('{"sys":"true"}');

    }
    else {
       res.send('{"sys":"false","err":"Tên bị trùng"}');
    }
});
}
  else
  {
    res.send('{"sys":"false","err":"Không tồn tại nhóm này"}');
  }
});
}
else
{
    res.send('{"sys":"false","err":"Tên không được để trống"}');
}
}

if(req.act=="remove" && req.session.isAdmin==1)
{

var id_remove=func.intval(req.body.id);
if(id_remove>0){
DB_order.find({ id: id_remove }, function(err,books) {
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


if(req.act=="make" && func.intval(req.session.u_id)>0)
{
if(func.stringval(req.body.act)=="make"){
var u_id=func.intval(req.session.u_id);
var address=func.removeHtmlTag(func.removeSpcChar(func.stringval(req.body.address)));
var phone=func.removeHtmlTag(func.removeSpcChar(func.stringval(req.body.phone)));
var ertxt="";
if(address=="")
{
	ertxt="Chưa nhập địa chỉ giao hàng";
}
if(phone=="")
{
	ertxt="Chưa nhập số điện thoại";
}
if(ertxt==""){



DB_cart.aggregate([{$match:{u_id:u_id}},{
    $lookup: {
        from: "products",
        localField: "p_id",
        foreignField: "id",
        as: "product_doc"
    }
}
]).exec(function(err, acart) {
	var prds=[];
    if(acart.length>0){
    	html="";
    	var tong=0;
    	for (var i = acart.length - 1; i >= 0; i--) {
    		var ncart=acart[i];
        if(ncart.product_doc.length>0){
    		tong+=ncart.price;

var prd={};
prd.id=ncart.product_doc[0].id;
prd.name=ncart.product_doc[0].name;
prd.price=ncart.price;
prd.phien_id=ncart.product_doc[0].phien_id;
prds.push(prd);

}
    	}
    	total_price=tong+29000;

    
var add_ord={
  products : prds,
  u_id:u_id,
  address: address,
  phone:phone,
  cart_price:tong,
  total_price:total_price,
  time:func.getTime()
};
var add_order=DB_order(add_ord);
	add_order.save(function(err,aorder){
		if(!err)
			{
				DB_cart.deleteMany({u_id,u_id}, function(err, doc){
    if (err) res.send('{"sys":"false"}');
    else
    res.send('{"sys":"true","err":"Đơn hàng đã được tạo, xin chờ nhận hàng"}');
});
	}
	else
		{
			errText=err.errmsg;
			res.send('{"sys":"false","err":"'+errText+'"}');
		}
		

	});

}
	else
	{
		res.send('{"sys":"false","err":"Chưa có sản phẩm nào trong giỏ."}');
	}
	
});




}
else
{
res.send('{"sys":"false","err":"'+ertxt+'"}');
}

}
else
{
	res.send('{"sys":"false","err":"Chưa nhập dữ liệu"}');
}
}