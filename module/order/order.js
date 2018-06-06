HTML.main.content=fs.readFileSync("module/"+req.module+'/view/order.html','utf-8')+'';
var ndt={};
HTML.header.title="Đơn hàng của bạn";
var u_id=func.intval(req.session.u_id);
DB_order.find({u_id:u_id}).exec(function(err, aorder) {
	var html="Chưa đăng nhập";
    if(aorder.length>0){
    	html="";
    	var tong=0;
    	for (var i = aorder.length - 1; i >= 0; i--) {
    		var norder=aorder[i];
    		tong+=norder.price;
    		html+="<div class='order_row'><div class=order_id>Đơn hàng số : "+norder.id+"</div>";


for (var j = 0; j < norder.products.length; j++) {

html+="<div class=order_p_row><div class=order_p_name>"+norder.products[j].name+"</div>";
html+="<div class=order_p_price>"+func.toVnd(norder.products[j].price)+"</div></div>";

}
html+="<div class=order_ir>Địa chỉ giao hàng : "+(norder.address)+"</div>";
html+="<div class=order_ir>Số điện thoại : "+(norder.phone)+"</div>";
html+="<div class=order_ir>Tình trạng : "+(norder.status)+"</div>";
html+="<div class=order_price>Tổng tiền : "+func.toVnd(norder.total_price)+"</div></div>";
    	}
    }
	else
	{
		html="Chưa có đơn hàng nào";
	}
	ndt.html=html;
    HTML.main.content=func.templ(HTML.main.content,{order:ndt});
	endMain(false,"ok");
});