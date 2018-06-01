var categorySchema = mongoose.Schema({
  id:{type:Number},
    name: {
    type:String,
    required:true,
    unique:true
  },url: {
    type:String,
    unique:true
  }
});

categorySchema.pre('save', function(next) {
     var doc = this;
    DB_counter.findByIdAndUpdate({_id: 'category_id'}, {$inc: { seq: 1} }, function(error, counter2)   {
        console.log(counter2);
        if(counter2==null)
        {
          var counterx = new DB_counter({_id: 'category_id',seq:2});
          counterx.save(function(err,countetadd){});
          var counter2={_id: 'category_id',seq:1};
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



var DB_category = mongoose.model('category', categorySchema);