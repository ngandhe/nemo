var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/bankDb');

mongoose.connection.on('connected',function(){
	console.log('connected to mongodb successfully');	
});

mongoose.connection.on('error',function(err){
	console.log('error connecting to mongodb '+err);
});

var UserSchema=mongoose.Schema({
	name:String,
	email:String,
	pwd:String,
	dob:Date,
	img:String
});

var User=mongoose.model('User',UserSchema);

module.exports.User=User;