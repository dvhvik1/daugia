var userSchema = mongoose.Schema({
  id:{type:Number},
    name: {
    type:String,
    required:true,
    unique:true
  },
    pass:{
    type:String,
    required:true
  },
  email:{
    type:String
  },
  socket:{
    type:String
  },
    report: {
    type: Number,
    default: 0
}
,
    onl: {
    type: Number,
    default: 0
}
});

userSchema.pre('save', function(next) {
     var doc = this;
    DB_counter.findByIdAndUpdate({_id: 'user_id'}, {$inc: { seq: 1} }, function(error, counter2)   {
        console.log(counter2);
        if(counter2==null)
        {
          var counterx = new DB_counter({_id: 'user_id',seq:2});
          counterx.save(function(err,countetadd){});
          var counter2={_id: 'user_id',seq:1};
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

userSchema.pre('remove', function (next) {
    var project = this;
    project.model('daugia').remove({ u_id: project.id },function(err,doc){});
    project.model('order').remove({ u_id: project.id },function(err,doc){});
    project.model('cart').remove({ u_id: project.id },function(err,doc){});
    next();
});

var DB_user = mongoose.model('user', userSchema);