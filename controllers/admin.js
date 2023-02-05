var express = require('express');
var router = express.Router();
var AdminModel = require('../models/AdminModel');

router.get('/welcome', function(req, res) {
    //console.log(req.session);
	if(req.session.user !== undefined){
		var settings = {};
		settings.user = req.session.user;
		res.render('index', {	
            bodypage: 'welcome',
            settings: settings,
            summarydata: null
        });
	}else{
		res.redirect('/login');
	} 
});

router.get('/logout', function(req, res) {
  req.session.destroy(function(err){
		if(err){
			console.log(err);
		}
		else
		{
			res.redirect('/login');
		}
	});
});

router.get('/sixthyear_list', function(req, res) {
    //console.log(req.session);
	if(req.session.user !== undefined){
		var settings = {};
		settings.user = req.session.user;
		res.render('index', {	
            bodypage: 'sixthyearstudent',
            settings: settings,
            summarydata: null
        });
	}else{
		res.redirect('/login');
	} 
});

router.get('/fifthyear_list', function(req, res) {
    //console.log(req.session);
	if(req.session.user !== undefined){
		var settings = {};
		settings.user = req.session.user;
		res.render('index', {	
            bodypage: 'fifthyearstudent',
            settings: settings,
            summarydata: null
        });
	}else{
		res.redirect('/login');
	} 
});

router.get('/fourthyear_list', function(req, res) {
    //console.log(req.session);
	if(req.session.user !== undefined){
		var settings = {};
		settings.user = req.session.user;
		res.render('index', {	
            bodypage: 'fourthyearstudent',
            settings: settings,
            summarydata: null
        });
	}else{
		res.redirect('/login');
	} 
});

router.get('/thirdyear_list', function(req, res) {
    //console.log(req.session);
	if(req.session.user !== undefined){
		var settings = {};
		settings.user = req.session.user;
		res.render('index', {	
            bodypage: 'thirdyearstudent',
            settings: settings,
            summarydata: null
        });
	}else{
		res.redirect('/login');
	} 
});

router.get('/secondyear_list', function(req, res) {
    //console.log(req.session);
	if(req.session.user !== undefined){
		var settings = {};
		settings.user = req.session.user;
		res.render('index', {	
            bodypage: 'secondyearstudent',
            settings: settings,
            summarydata: null
        });
	}else{
		res.redirect('/login');
	} 
});
  



module.exports = router;
