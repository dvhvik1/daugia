var orderSchema = mongoose.Schema({
  id:{type:Number},
  u_id:{type:Number},
  products : [{
    id : Number,
    name : String,
    price : Number,
    phien_id : Number
    }],
  address: {
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  },
  cart_price:{
    type:Number
  },
  total_price:{
    type:Number
  },
  time:{
    type:Number,
    required:true
  },
  status:{
    type:String,
    default:"Đang chuyển"
  }
});

orderSchema.pre('save', function(next) {
    var doc = this;
    DB_counter.findByIdAndUpdate({_id: 'order_id'}, {$inc: { seq: 1} }, function(error, counter2)   {
        console.log(counter2);
        if(counter2==null)
        {
          var counterx = new DB_counter({_id: 'order_id',seq:2});
          counterx.save(function(err,countetadd){});
          var counter2={_id: 'order_id',seq:1};
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



var DB_order = mongoose.model('order', orderSchema);