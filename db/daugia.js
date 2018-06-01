var daugiaSchema = mongoose.Schema({
  id:{type:Number},
  u_id: {
    type:Number
  },
  u_name: {
    type:String
  },
  p_id: {
    type:Number,
    required:true
  },
  phien_id:{
    type:Number,
    default:0
  },
  price:{
    type:Number,
    default:0
  },
  time:{
    type:Number,
    default: 0
  }
});

daugiaSchema.pre('save', function(next) {
    var doc = this;
    DB_counter.findByIdAndUpdate({_id: 'daugia_id'}, {$inc: { seq: 1} }, function(error, counter2)   {
        console.log(counter2);
        if(counter2==null)
        {
          var counterx = new DB_counter({_id: 'daugia_id',seq:2});
          counterx.save(function(err,countetadd){});
          var counter2={_id: 'daugia_id',seq:1};
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



var DB_daugia = mongoose.model('daugia', daugiaSchema);