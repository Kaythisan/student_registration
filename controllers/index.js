var express = require('express');
var router = express.Router();

router.get('/logintest', function(req, res) {
	//console.log(req)
	res.send({
		token: 'test123'
	  });
});

//router.use(require('../middlewares/auth'));

router.get('/login', function(req, res) {
	//console.log(req)
    res.render('login',{error: null});
});

router.get('/verify', function(req, res) {
	res.redirect('/login');
});

router.post('/verify', function(req, res) {
	var params = req.body;

	if(req.body.Username == "admin" && req.body.Password == "admin123" )
	{
		session = req.session;
		session.user = {};
		session.user.name = "Admin";
		session.user.id = "1";
		res.redirect('/admin/welcome');
	}
	else
	{
		res.render('login', {error: "Invalid user name or password!"});
	}
});


router.use('/admin', require('./admin'));
router.use('/student', require('./student'));

module.exports = router;
