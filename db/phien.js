var phienSchema = mongoose.Schema({
  id:{type:Number},
  p_id: {
    type:Number,
    required:true
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

phienSchema.pre('save', function(next) {
    var doc = this;
    DB_counter.findByIdAndUpdate({_id: 'phien_id'}, {$inc: { seq: 1} }, function(error, counter2)   {
        console.log(counter2);
        if(counter2==null)
        {
          var counterx = new DB_counter({_id: 'phien_id',seq:2});
          counterx.save(function(err,countetadd){});
          var counter2={_id: 'phien_id',seq:1};
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



var DB_phien = mongoose.model('phien', phienSchema);