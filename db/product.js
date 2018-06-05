var productSchema = mongoose.Schema({
  id:{type:Number},
  name: {
    type:String,
    required:true,
    unique:true
  },
  search: {
    type:String
  },
  category : [{
    id : Number
     }],
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
    min_price:{
      type:Number
    }
  ,
    price:{
      type:Number
    }
  ,
    url:{
    type:String
  }
  ,
    u_time:{
    type:Number,
    default: 0
  }, 
  quantity:{
    type:Number,
    default: 0
  },
    time:{
    type:Number,
    required:true
  }
});

productSchema.pre('save', function(next) {
    var doc = this;
    DB_counter.findByIdAndUpdate({_id: 'product_id'}, {$inc: { seq: 1} }, function(error, counter2)   {
        console.log(counter2);
        if(counter2==null)
        {
          var counterx = new DB_counter({_id: 'product_id',seq:2});
          counterx.save(function(err,countetadd){});
          var counter2={_id: 'product_id',seq:1};
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

productSchema.pre('remove', function (next) {
    var project = this;
    project.model('phien').remove({ p_id: project.id },function(err,doc){});
    project.model('cart').remove({ p_id: project.id },function(err,doc){});
    
    next();
});

var DB_product = mongoose.model('product', productSchema);