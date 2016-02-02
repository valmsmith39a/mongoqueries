var mongoose = require('mongoose'); 
var moment = require('moment');

var personSchema = mongoose.Schema({
	occupation: String,
	name: {first:String, last:String},
	age:Number, 
	likes:[], 
	dislikes:[], 
	gender:String, 
	education:String, 
	birthday:{type:Date, default:Date.now}
});

// This is a pre-save hook. pre is Mongoose middleware 
// Other Mongoose middleware: http://mongoosejs.com/docs/middleware.html
// Just before goes to database to be saved, can implement something 
personSchema.pre('save', function(next){
	this.age = moment().diff(moment(this.birthday), 'years');
	next();  // 
});

var Person = mongoose.model('Person', personSchema);
module.exports = Person; 
