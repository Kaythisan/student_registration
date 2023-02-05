var express = require('express');
var router = express.Router();

var session;

router.use("/*", function(req, res, next){
	
	var params = req.originalUrl.split('/');

	console.log(params);

		if(params.length > 1)
		{
			switch(params[1].toLowerCase())
				{			
					case "login" :
						next();
						break;
					case "verify" :
						next();
						break;
					default :
						verify(req, res, next);
				}
		}
		else
		{
			verify(req, res, next);
		}
	
});

function verify(req, res, next) {
	//console.log(req);
    session = req.session;
	var params = req.originalUrl.split('/');
	//params.shift();
	//console.log(session.user);
	if(session && (session.user != undefined || session.user))
	{
		console.log("in auth, pass for session");
        //	console.log(params);
		
		next();
		return;
	}
	else
    {
		console.log("redirect to login");
		res.redirect("/login");
		return;   
    }
}
module.exports = router;
