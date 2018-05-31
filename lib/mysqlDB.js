var mysql = require('mysql');




function DB() {
  this.con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vertrigo",
  database: "pokemon"
});
  this.con.connect(function(err) {
  if (err) throw err;
  console.log("mysql Connected!");

});
}


DB.prototype.query = function(query) {
  console.log("mysql query!"+query);
    this.con.query(query, function (err, result) {
    if (err) {  console.log(err); }
    else
    {  
console.log(result);
      return result;  }
  });
};

module.exports = DB;