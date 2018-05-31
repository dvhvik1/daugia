

function DB() {
this.MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/web";
this.connected=false;
console.log("Database false!");
var that=this;
this.MongoClient.connect(url, function(err, datab) {
  if (err) throw err;
  that.connected=true;
  that.db=datab;
  console.log("Database true!");
  
});

}

DB.prototype.update = function(table,where,newvalues,next) {
 this.db.collection(table).updateMany(where, newvalues,next);
};

DB.prototype.find = function(table,myobj) {
if(this.connected)
  return this.db.collection(table).find(myobj);
else
return false;
 
};

DB.prototype.select = function(table,myobj,func) {

if(this.connected)
  this.db.collection(table).find(myobj).toArray(func);
};
DB.prototype.selectwaint =function(table,myobj) {
  var that=this;
return new Promise((resolve,reject)=>{
that.db.collection(table).find(myobj).toArray(function(err,data){
  console.log(data);
    resolve(data);
});
});

}
DB.prototype.insert = function(table,myobj,next) {
if(this.connected){
  var that=this;
  that.db.collection(table).find({}).sort({ida:-1}).limit(1).toArray(function(err,res){
    if(res.length>0)
      myobj.ida=res[0].ida+1;
      else
      myobj.ida=1;
    that.db.collection(table).insertOne(myobj, function(err,res){
      next(err,myobj.ida);
    });
  });
  
}
};

module.exports = DB;