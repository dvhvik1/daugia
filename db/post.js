var postSchema = mongoose.Schema({
  id:{type:Number},
  name: {
    type:String,
    required:true,
    unique:true
  },
  des: {
    type:String,
    required:true
  },
    img: {
    type:String
  },
    tag:{
    type:String
  },
    html:{
    type:String
  },
    url:{
    type:String
  },
    time:{
    type:Number,
    required:true
  }
});

postSchema.pre('save', function(next) {
    var doc = this;
    DB_counter.findByIdAndUpdate({_id: 'postid'}, {$inc: { seq: 1} }, function(error, counter2)   {
        console.log(counter2);
        if(counter2==null)
        {
          var counterx = new DB_counter({_id: 'postid',seq:2});
          counterx.save(function(err,countetadd){});
          var counter2={_id: 'postid',seq:1};
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



var DB_post = mongoose.model('post', postSchema);