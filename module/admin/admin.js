HTML.html=fs.readFileSync("module/"+req.module+'/view/global_admin.html','utf-8')+'';
menu='<div class=menu><a href="/admin">Admin</a><a href="/admin/post">POST</a></div>';
HTML.main.menu=menu;
if (fs.existsSync('module/'+req.module+'/'+req.act+'.js')) {
eval(fs.readFileSync('module/'+req.module+'/'+req.act+'.js')+'');
}
else
{
	endMain(false,"ok");
}
