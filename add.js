var models=require('./models.js');

var user=new models.User();
user.name="user123";
user.pwd="pass123";
user.email="user123@gmail.com";
user.dob=new Date();
user.img='http://media.santabanta.com/gallery/Global%20Celebrities(M)/Tom%20Cruise/Tom-Cruise-48-v_th.jpg';
user.save(function(err,doc){
	if(err) console.log(err);
	else console.log('user added fine');
});