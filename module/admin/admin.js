HTML.html=fs.readFileSync("module/"+req.module+'/view/global_admin.html','utf-8')+'';
menu='<div class=menu><a href="/admin">Admin</a><a href="/">HOME</a><a href="/admin/category">CATEGORY</a><a href="/admin/product">PRODUCT</a><a href="/admin/product_list">PRODUCT LIST</a><a href="/admin/order">ORDER</a><a href="/admin/phien">PHIÊN</a></div>';
HTML.main.menu=menu;
if(req.session.isAdmin!=1)
{
	HTML.main.content="Vui lòng đăng nhập ở trang chủ với tài khoản admin";
	endMain(false,"ok");
}
else
{
if (fs.existsSync('module/'+req.module+'/'+req.act+'.js')) {
eval(fs.readFileSync('module/'+req.module+'/'+req.act+'.js')+'');
}
else
{
	endMain(false,"ok");
}
}