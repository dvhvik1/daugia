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

mongoose.Types.ObjectId.isValid

func.objid=function(str){
  if(mongoose.Types.ObjectId.isValid(str))
  {
    return str;
  }
  else
  {
    return "";
  }
}
eval(fs.readFileSync('db/counter.js')+'');
eval(fs.readFileSync('db/user.js')+'');
eval(fs.readFileSync('db/menu.js')+'');
eval(fs.readFileSync('db/post.js')+'');
eval(fs.readFileSync('db/seo.js')+'');
eval(fs.readFileSync('db/product.js')+'');
eval(fs.readFileSync('db/category.js')+'');
eval(fs.readFileSync('db/phien.js')+'');
eval(fs.readFileSync('db/daugia.js')+'');
eval(fs.readFileSync('db/cart.js')+'');
eval(fs.readFileSync('db/order.js')+'');
var phiens={};
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("loaded DATA");

DB_user.update({}, {onl: 0}, {multi: true}, function(err) {  });
func.phien_process=function(phien){
console.log("phien "+phien.id+" end");
DB_phien.update({p_id:phien.p_id,endtime:{$gte:func.getTime()}}, {run: 0}, {multi: true}, function(err) {});
DB_product.find({id:phien.p_id}).exec(function(err,product){
  if(typeof product == "undefined")
product=[];
  if(product.length>0){
if(product[0].quantity>0 )
    {
  


DB_daugia.find({phien_id:phien.id}).exec(function(err,daugia){
  if(!err){
    if(daugia.length>0){
      var phiendf={p_id:product[0].id,price:product[0].min_price,time:func.getTime(),endtime:(func.getTime()+60000)};
  var add_phien=DB_phien(phiendf);
  add_phien.save(function(err,aphien){
    if(!err)
    {
 console.log("phien "+phien.id+" new");
    clearTimeout(phiens['phien_'+aphien.id]);
    phiens['phien_'+aphien.id]=setTimeout(function(){func.phien_process(aphien)},(aphien.endtime-aphien.time));
var winnerDG=daugia[daugia.length-1];     

var cartinfo={
  u_id:winnerDG.u_id,
  p_id:winnerDG.p_id,
  phien_id:winnerDG.phien_id,
  daugia_id:winnerDG.id,
  price:winnerDG.price,
  time:func.getTime()
};

  var add_cart=DB_cart(cartinfo);
  add_cart.save(function(err,acart){
    if(!err)
    {
      console.log("======= add cart  new");
     io.to("product_"+product[0].id).emit("updatephien",aphien);
     io.to("user_"+daugia[daugia.length-1].u_id).emit("mes",{type:"cart",msg:"Bạn đã chiến thắng trong phiên giao dịch <b>"+phien.id+"</b><br> Sản phẩm <b>"+product[0].name+"</b> đã chuyển đến giỏ hàng của bạn."});
   }
   });

    }
    else
    {
   
  }

  });
     
   }
   else
   {
    console.log("phien "+phien.id+" refes "+phien.p_id);
    DB_phien.update({id:phien.id}, {run: 1,time:func.getTime(),endtime:(func.getTime()+60000)}, {multi: true}, function(err) {
       clearTimeout(phiens['phien_'+phien.id]);
       phien.run=1;
       phien.time=func.getTime();
       phien.endtime=func.getTime()+60000;
    phiens['phien_'+phien.id]=setTimeout(function(){func.phien_process(phien)},(phien.endtime-phien.time));
     io.to("product_"+product[0].id).emit("updatephien",phien);
    });
   }
 }
  });




















    }
    else
    {
      io.to("product_"+product[0].id).emit("endphien",{data:0});
    }
  

}
});

}
func.phienSetEndTime=function(phien){
var endt=func.getTime()-phien.endtime;
phiens['phien_'+phien.id]=setTimeout(function(){func.phien_process(phien)},phien.endtime);
}
function checkphien(phien){
  console.log("checkphien");
if(phien.endtime>func.getTime())
{
func.phien_process(phien);
}
else
{
func.phienSetEndTime(phien);
}

}

var time=func.getTime();
DB_phien.find({run:1},function(err,phien){
  if(phien.length>0){
  for (var i = 0; i < phien.length; i++) {
    checkphien(phien[i]);
  }

  }
});





  /*
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
if(port!=3000)
config={
  rooturl:"https://daugia-vikclass.herokuapp.com/"
};
global.md5=md5;
global.fs=fs;
global.func=func;
global.config=config;
app.use("/media",express.static('./media'));

app.use("/favicon.ico",function(req, res){
res.status(404).end('Not found');
});

app.use(cookieParser);

io.use(function(socket, next) {
    /*var req = socket.handshake;
    var res = {};
    session_config(req, res, next);
    cookieParser(req, res, function(err) {
      //console.log("========================================== 222",req.signedCookies);
        if (err) return next(err);
        session_config(req, res, next);
    });
    */
    session_config(socket.request, socket.request.res, next);
});

app.use(session_config);
app.use(fileUpload());
console.log(func.getTime()+"------"+func.timeToString(func.getTime())+"---"+func.rand(1,100));
app.use("/api",function(req, res){
eval(fs.readFileSync('include/api.js')+'');
});
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
if(func.intval(client.request.session.u_id)>0)
{
  client.u_id=func.intval(client.request.session.u_id);
  client.join("user_"+client.u_id);
  client.u_name=func.stringval(client.request.session.u_name);
}
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
var rooms={};

client.on('DG', function(data) {
       
          var p_id=func.intval(data.p_id);
          var phien_id=func.intval(data.phien_id);
          var price=func.intval(data.price);
       client.join("product_"+p_id);
       if(typeof client.roomList == "undefined")
        client.roomList=[];
       client.roomList.push("product_"+p_id);

DB_phien.find({id:phien_id,p_id:p_id},function(err,phien){
  if(phien.length>0){
    
    if(func.intval(client.u_id)>0 && phien[0].endtime>func.getTime() && price>=(phien[0].price+1000) && phien[0].winner!=client.u_id){
      var endtime=func.getTime()+60000;
      var time=func.getTime();
      console.log("DG",data,client.u_id,phien[0].price);
var newDG={
  u_id: client.u_id,
  u_name: client.u_name,
  p_id: p_id,
  phien_id:phien_id,
  price:price,
  time:time
}
  var addDG=DB_daugia(newDG);
  var update_phien={winner:client.u_id,price:price,time:time,endtime:(time+60000)};
  addDG.save(function(err,aphien){
    if(!err)
    {
DB_phien.findOneAndUpdate({ id: phien_id }, update_phien, {upsert:true}, function(err, aphien){
    
clearTimeout(phiens['phien_'+phien_id]);
phiens['phien_'+phien_id]=setTimeout(function(){func.phien_process(aphien)},(aphien.endtime-aphien.time));
io.to("product_"+p_id).emit("DG",{p_id:p_id,phien_id:phien_id,price:price,endtime:endtime,time:time,u_name:client.u_name,u_id:client.u_id});

});
    }

  });

}
else
{
  if(func.intval(client.u_id)<=0)
  client.emit("login",{msg:"Đăng nhập để đấu giá."});
if(phien[0].winner==client.u_id && phien[0].winner!=0)
client.emit("mes",{type:"",msg:"Bạn đang đạt giá cao nhất."});
   
}
  
  }
});
      });

      client.on('message', function(message) {
        console.log(client.request.session);
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
