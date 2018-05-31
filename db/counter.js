var CounterSchema = mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var DB_counter = mongoose.model('counters', CounterSchema);
