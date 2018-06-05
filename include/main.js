/*
DB_menu.find({},function(err,data){
	var menu="";
	for (var i =0;i<data.length;i++) {
		menu+="<a href='"+data[i].url+"'>"+data[i].name+"</a>";
	};
	//if(menu!="")
	{
		menu='<div class=menu><a href="./">Home</a>'+menu+'</div>';
	}

*/
menu="<div class=menu>"+
"<div class=wrapper><a class='logo m_child' href='./'><i class='fa fa-gavel x_flip'></i> DEMO</a>"+
"<div class=r_menu><a class='m_child m_cart' href='./cart'><i class='fa fa-shopping-cart'></i> Giỏ hàng</a>"+
"<a class='m_child' href='./order'><i class='fa fa-gavel x_flip'></i> Đơn hàng của tôi</a>";
if(func.intval(req.session.u_id)>0)
menu+="<span class='m_child logu_box' ><i class='fa fa-user'></i> "+func.stringval(req.session.u_name)+"</span></div>";
else
menu+="<span class='m_child login_box' ><i class='fa fa-user'></i> Đăng nhập</span></div>";
menu+="</div></div>";
HTML.main.menu=menu;



DB_category.find({},function(err,category){
	if(!err)
	if(category.length>0){
		var catelist="";
		for (var i = 0; i < category.length; i++) {
			catelist+="<a class=mgr_i href='/category/"+category[i].id+"'>"+category[i].name+"</a>";
		}
	HTML.main.category=catelist;
	}
	else
	{
	HTML.main.category="";
	}

console.log("run file:",'module/'+req.module+'/'+req.module+'.js');
if (fs.existsSync('module/'+req.module+'/'+req.module+'.js')) {

eval(fs.readFileSync('module/'+req.module+'/'+req.module+'.js')+'');
}
else
{
	console.log("nofile:",'module/'+req.module+'/'+req.module+'.js');
	endMain(false,"ok");
}



});

/*});*/