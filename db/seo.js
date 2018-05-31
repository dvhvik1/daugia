var seoSchema = mongoose.Schema({
  id:{type:Number},
    seo_url: {
    type:String,
    required:true
  },
    url:{
    type:String,
    required:true
  },
    time:{
    type:Number,
    default: 0
  }
});

seoSchema.pre('save', function(next) {
    var doc = this;
    DB_counter.findByIdAndUpdate({_id: 'seo_id'}, {$inc: { seq: 1} }, function(error, counter2)   {
        console.log(counter2);
        if(counter2==null)
        {
          var counterx = new DB_counter({_id: 'seo_id',seq:2});
          counterx.save(function(err,countetadd){});
          var counter2={_id: 'seo_id',seq:1};
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



var DB_seo = mongoose.model('seo', seoSchema);