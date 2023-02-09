var express = require('express');
var router = express.Router();
var StudentModel = require('../models/StudentModel');

router.get('/getallstudentlist', function(req, res) {
	StudentModel.GetAllStudentList(req.query,function(error,result){
		if(error){
			res.send(error);
		}else{
			res.send(result);
		}
	})
});
router.get('/getsixthyearstudentlist', function(req, res) {
	StudentModel.GetsixthyearstudentList(req.query,function(error,result){
		if(error){
			res.send(error);
		}else{
			res.send(result);
		}
	})
});

router.get('/getfifthyearstudentlist', function(req, res) {
	StudentModel.GetfifthyearstudentList(req.query,function(error,result){
		if(error){
			res.send(error);
		}else{
			res.send(result);
		}
	})
});

router.get('/getfourthyearstudentlist', function(req, res) {
	StudentModel.GetfourthyearstudentList(req.query,function(error,result){
		if(error){
			res.send(error);
		}else{
			res.send(result);
		}
	})
});

router.get('/getthirdyearstudentlist', function(req, res) {
	StudentModel.GetthirdyearstudentList(req.query,function(error,result){
		if(error){
			res.send(error);
		}else{
			res.send(result);
		}
	})
});

router.get('/getsecondyearstudentlist', function(req, res) {
	StudentModel.GetsecondyearstudentList(req.query,function(error,result){
		if(error){
			res.send(error);
		}else{
			res.send(result);
		}
	})
});

router.get('/getfirst_1semyearstudentlist', function(req, res) {
	StudentModel.Getfirst_1semyearstudentList(req.query,function(error,result){
		if(error){
			res.send(error);
		}else{
			res.send(result);
		}
	})
});

router.get('/getfirst_2semyearstudentlist', function(req, res) {
	StudentModel.Getfirst_2semyearstudentList(req.query,function(error,result){
		if(error){
			res.send(error);
		}else{
			res.send(result);
		}
	})
});

router.post('/savestudent', function(req, res) {
    StudentModel.SaveStudent(req.body,function(err,result){
        if(err){
            res.send({status:500,text:"Saving Failed"})
        }else{
            res.send({status:200,text:"succsss",data:result});
        }
    });
});

router.post('/deletestudent', function(req, res) {
    StudentModel.DeleteStudent(req.body.student_id,function(err,result){
        if(err){
            res.send({status:500,text:"Deleteing Failed"})
        }else{
            res.send({status:200,text:"succsss",data:result});
        }
    });
});

router.post('/getstudentdatabyid',function(req,res){
	if(req.body.student_id){
        StudentModel.GetStudentDataByID(req.body.student_id,function(err,result){
                if(err){
                    res.send(err);
                }else{
                    res.render('studentprofile',{
                        student:result
                    });

                }
            });
    }else{
        res.render('studentprofile',{student:null});
    }
});

module.exports = router;
