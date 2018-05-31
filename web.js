var express=require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var md5=require('md5');
var SECKEY="keysec";
var session = require("express-session");
var cookieParser = require('cookie-parser')("keysec");
var async = require('async');
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var cfunc = require('./lib/Functions.js');
var func= new cfunc();
var cHTML = require('./lib/HTML.js');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');


var mongoose = require('mongoose');
mongoose.connect('mongodb://daugia:123456@ds237770.mlab.com:37770/daugia', { useMongoClient: true });
mongoose.Promise = global.Promise;

eval(fs.readFileSync('db/counter.js')+'');
eval(fs.readFileSync('db/user.js')+'');
eval(fs.readFileSync('db/menu.js')+'');
eval(fs.readFileSync('db/post.js')+'');
eval(fs.readFileSync('db/seo.js')+'');
eval(fs.readFileSync('db/product.js')+'');





var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("loaded DATA");
  /*
//user.update({}, {onl: 0}, {multi: true}, function(err) {  });
var user1 = new DB_user({ name: "admin",pass:"admin",socket:"21321321" });
user1.save(function (err, user1) {
});
*/

});












app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
  extended: true
})); 

    var MemoryStore =session.MemoryStore;
    var session_store = new MemoryStore();

  var session_config=session({
        name : 'sid',
        secret: SECKEY,
        key:"aass",
        resave: true,
        store: session_store,
        saveUninitialized: true
});
var config={
  rooturl:"http://localhost:3000/"
};

global.md5=md5;
global.fs=fs;
global.ejs=ejs;
global.func=func;
global.config=config;
app.use("/media",express.static('./media'));

app.use("/favicon.ico",function(req, res){
res.status(404).end('Not found');
});

app.use(cookieParser);

io.use(function(socket, next) {
    var req = socket.handshake;
    var res = {};
    cookieParser(req, res, function(err) {
      //console.log("========================================== 222",req.signedCookies);
        if (err) return next(err);
        session_config(req, res, next);
    });
});

app.use(session_config);
app.use(fileUpload());
console.log(func.getTime()+"------"+func.timeToString(func.getTime())+"---"+func.rand(1,100));



app.use(function(req, res){
var HTML=new cHTML();
HTML.html=fs.readFileSync('view/global.html','utf-8')+'';
req.session=req.session;








async.parallel([function(endFirst){
  eval(fs.readFileSync('include/seo.js')+'');
}],function(err,results){
  async.parallel([function(endHeader){
  eval(fs.readFileSync('include/header.js')+'');
}],function(err,results){
  async.parallel([function(endMain){
  eval(fs.readFileSync('include/main.js')+'');
}],function(err,results){
  async.parallel([function(endFooter){
  eval(fs.readFileSync('include/footer.js')+'');
  endFooter(false,HTML);
}],function(err,results){
   results[results.length-1].toHtml(res);
});//footer
});//main
});//header
});//seo









});






io.on('connection', function(client) {

//eval(fs.readFileSync('socket_module/onconnect.js')+'');
  client.on('view', function(data) {
        
          var p_id=func.intval(data.p_id);
       client.join("product_"+p_id);
       if(typeof client.roomList == "undefined")
        client.roomList=[];
       client.roomList.push("product_"+p_id);
        var room = io.sockets.adapter.rooms["product_"+p_id];
io.to("product_"+p_id).emit("viewcount",{count:room.length});

      });

      client.on('message', function(message) {
        
        //if (message.email === session.email)
        {
       io.sockets.emit("hello",{hihi:"ihihi"});
        }

      });

 //end message


 client.on('disconnect', function () {
  var roomlist=func.intval(client.roomList);
  for (index = 0; index < roomlist.length; index++) {
    var room = io.sockets.adapter.rooms[roomlist[index]];
    if(typeof room != "undefined")
    io.to(roomlist[index]).emit("viewcount",{count:room.length});
}
 });








});

http.listen(port, function(){
  console.log('io on *:' + port);
});
