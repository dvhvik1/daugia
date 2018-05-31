var menuSchema = mongoose.Schema({
  id:{type:Number},
    url: {
    type:String,
    unique:true
  },
    name:{
    type:String,
    required:true
  }
});

menuSchema.pre('save', function(next) {
    var doc = this;
    DB_counter.findByIdAndUpdate({_id: 'menuid'}, {$inc: { seq: 1} }, function(error, counter2)   {
        if(counter2==null)
        {
          var counterx = new DB_counter({_id: 'menuid',seq:2});
          counterx.save(function(err,countetadd){});
          var counter2={_id: 'menuid',seq:1};
          doc.id = counter2.seq;
        next();
        }
          else
        {
          doc.id = counter2.seq;
        next();
        }
    });
});



var DB_menu = mongoose.model('menu', menuSchema);