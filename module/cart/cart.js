HTML.main.content=fs.readFileSync("module/"+req.module+'/view/cart.html','utf-8')+'';
var ndt={};
HTML.header.title="Giỏ hàng";
var u_id=func.intval(req.session.u_id);
DB_cart.aggregate([{$match:{u_id:u_id}},{
    $lookup: {
        from: "products",
        localField: "p_id",
        foreignField: "id",
        as: "product_doc"
    }
}
]).exec(function(err, acart) {
	var html="Chưa đăng nhập";
    if(!err){
    if(acart.length>0){
    	html="";
    	var tong=0;
    	for (var i = acart.length - 1; i >= 0; i--) {
    		var ncart=acart[i];
    		tong+=ncart.price;
    		html+="<div class='cart_row'>";
            if(ncart.product_doc.length>0)
            html+="<div class='cart_img'><div class='prd_img'><img src='"+ncart.product_doc[0].img+"'></div></div><div class=cart_name>"+ncart.product_doc[0].name+"</div>";
            html+="<div class=cart_price>"+func.toVnd(ncart.price)+"</div><div class=cart_read cart_id='"+ncart.id+"'>Xem chi tiết</div></div>";
    	}
    	total_price=tong+29000;
 html+="<div class='cart_row_tt'><div class='cart_cart_price'>Tiền giỏ hàng : "+func.toVnd(tong)+"</div><div class='cart_ship_price'>Tiền giao hàng : "+func.toVnd(29000)+"</div><div class='cart_total_price'>Tổng tiền : "+func.toVnd(total_price)+"</div><div class='cart_thanhtoan btn'>Thanh Toán</div></div>";   	
	}
	else
	{
		html="Chưa có đơn hàng nào";
	}
}
	ndt.html=html;
    HTML.main.content=func.templ(HTML.main.content,{cart:ndt});
	endMain(false,"ok");
});