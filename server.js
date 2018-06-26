var express=require('express');
var bodyParser=require('body-parser');
var passport=require('passport');
var cors=require('cors');
var path=require('path');
var JwtStrategy=require('passport-jwt').Strategy;
var ExtractJwt=require('passport-jwt').ExtractJwt
var jwt=require('jsonwebtoken');

var models=require('./models.js')

let opts={}
	opts.jwtFromRequest=ExtractJwt.fromHeader('authorization');
	opts.secretOrKey='ab43dfg';
	
	passport.use(new JwtStrategy(opts,function(payload,done){
		
		models.User.findOne({_id:payload._id},function(err,usr){
			if(err) done(err,null);
			if(usr) {
				
				done(null,usr)
			}
				else done(null,false);
		});
	}));
	
var app=express();
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(passport.initialize())
app.use(passport.session())
	
app.post('/login',function(req,res){
	console.log('in login');
	username=req.body.username;
	password=req.body.password;
	console.log(username);console.log(password);
	models.User.findOne({name:username},function(err,usr){
		console.log('in res');
		
		if(err) {
			console.log('err');
			res.json({sucess:false,msg:'user not found'});
		}
		else if(usr){
			console.log('usr');
			if(password==usr.pwd){
				console.log('log in success');
				var token=jwt.sign(usr.toObject(),'ab43dfg',{expiresIn:604800});
				gtoken=token;
				res.json({
					success:true,
					token:token,
					username:usr.name,
					_id:usr._id
				})
			}
			else{
				console.log('pwd wrong');
				res.json({sucess:false,msg:'password wrong'});
			}
		}
		else res.json({success:false,msg:'User not found'});
	});
});

app.get('/logout',function(req,res){
	req.logout();
	res.json({success:true,msg:'logged out'});
});


app.get('/profile',passport.authenticate('jwt',{session:false}),function(req,res){	
	res.json({user:req.user})	
});

app.listen(3000,function(){
	console.log('express server listening on port 3000');
});
	
	
	
	
	
	
