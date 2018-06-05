req.urlmap=(req.originalUrl.split("?")[0]).split("/");
req.module=func.stringval(req.urlmap[2]);
req.act=func.stringval(req.urlmap[3]);

if (fs.existsSync('module/api/'+req.module+'.js')) {
eval(fs.readFileSync('module/api/'+req.module+'.js')+'');
}
else
{
console.log("nofile:",'module/api/'+req.module+'.js');
}
/*});*/