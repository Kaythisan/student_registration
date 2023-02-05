var mysql = require('mysql2'); // mysql npm2

var pool  = mysql.createPool({
    //connectionLimit : 100,
    host: 'localhost',
    database: 'registrationsystem',
    user:  'root',
    password : 'root',
    //port : 3306,
    //multipleStatements:true
});
//console.log(pool)
exports.getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        if(err)
        {
            //console.log(err)
            callback(err);            
        }
        else
        {
            callback(err, connection);    
        }
        
    });
};
