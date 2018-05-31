req.session.idx="123";
HTML.main.content=fs.readFileSync("module/"+req.module+'/view/main.html','utf-8')+'';

endMain(false,"ok");