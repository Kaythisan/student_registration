var DB = require('../config/database');

exports.GetAllStudentList = function(reqQuery,callback) {
    try {
            // console.log(reqQuery);
            // console.log(typeof reqQuery.sort);
            reqQuery.displaystart =  (Number(reqQuery.page) - 1) * Number(reqQuery.limit) || 0;
            const aColumns = [
               "No", "student_id","name","roll_no","phonenumber","address","father_name","gmail","year",
            ];
            /* Indexed column (used for fast and accurate table cardinality)*/
            const sIndexColumn = "student_id";

            /* DB table to use */
            const sTable = 'student';
            // Paging
            let sLimit = " ";
            if(reqQuery.draw && reqQuery.start){

                sLimit = " LIMIT " + reqQuery.start + ", " + reqQuery.length;
            }
            // Ordering
            // console.log("sorting")
            // console.log(reqQuery.sort)
            let sOrder = " ";
            if(reqQuery.sort && reqQuery.sort !== null && reqQuery.sort !== undefined){
                const nsort = JSON.parse(reqQuery.sort);
                sOrder += "ORDER BY " + nsort.field + " " + nsort.direction;
            }else{
                sOrder += "ORDER BY  Year,No asc";
            }
            // console.log(sOrder)
            // search
            let sWhere = " WHERE 1=1  "; //year = '6th Year' or year='5th Year'  or year='4th Year' or year='3rd Year' or year='2nd Year' or year='1st_1sem Year' or year='1st_2sem Year'
            console.log(reqQuery)
            if(reqQuery.search && reqQuery.search.value){
                console.log("here in filter")
            
                sWhere += " AND (";
                for (var eachcolumn=0; eachcolumn<aColumns.length; eachcolumn++)
                {

                    if(aColumns[eachcolumn] === 'createddate'){
                        sWhere += " date(createddate)  = '"+ moment(reqQuery.search.value).format('YYYY-MM-DD') +"' OR ";
                    }else{
                        const searchstr = (reqQuery.search.value).replace(/'/g, "\\'");
                        sWhere += aColumns[eachcolumn]  +" LIKE '%"+ searchstr +"%' OR ";
                    }

                }
                sWhere = sWhere.substring(0 , sWhere.length-3 );
                sWhere += ')';
            }
            console.log(sWhere)
            // rowcount = "(SELECT @rownum := 0) r "
            const sJoin = "  ";
            const sQuery = "SELECT  SQL_CALC_FOUND_ROWS @n := @n + 1 n,  "+aColumns.join()+" FROM "+ sTable  + sJoin + " ,(SELECT @n := 0) m "  + sWhere+ sOrder + sLimit;
            // console.log(sQuery)
            DB.getConnection((getconError, connection)=>{
                if(getconError){
                    console.log(getconError);
                    callback(getconError,null);
                }else{
                    const i= connection.query(sQuery, (queryerr, results) => {
                        if (queryerr) {
                            connection.release();
                            callback(queryerr,null);
                        }else {
                            const rResult = results;
                            console.log(rResult)
                            const totalquery = "SELECT COUNT("+sIndexColumn+") as totalrecord FROM "+sTable +";" ;
                            console.log(totalquery)
                            connection.query(totalquery,  (queryerr3, result) => {
                                connection.release();
                                if (queryerr3) {
                                    callback(queryerr3,null);
                                }else {
                                    console.log(rResult[rResult.length -1])
                                    const iTotal = result[0].totalrecord;
                                    const output = {
                                        recordsFiltered: iTotal,
                                        recordsTotal: rResult.length > 0 ? rResult[rResult.length -1].n : 0,
                                        draw: reqQuery.draw,
                                        data: rResult.map(each =>{
                                            return {
                                                "no": each.No,
                                        
                                                "name": each.name,
                                                "roll": each.roll_no,
                                                "phonenumber": each.phonenumber,
                                                "father": each.father_name,
                                                "address": each.address,
                                                "gmail": each.gmail,
                                                "year": each.year,
                                                "action": each.student_id,
                                            }
                                        })
                                    };
                                    callback(null, output);
                                }
                                
                            });
                        }
                    });console.log(i.sql);
                }
            });
        } catch (error) {
        console.error(error);
        callback(error,null)
    }
}
exports.GetsixthyearstudentList = function(reqQuery,callback) {
    try {
            // console.log(reqQuery);
            // console.log(typeof reqQuery.sort);
            reqQuery.displaystart =  (Number(reqQuery.page) - 1) * Number(reqQuery.limit) || 0;
            const aColumns = [
               "No", "student_id","name","roll_no","phonenumber","address","father_name","address","gmail","year",
            ];
            /* Indexed column (used for fast and accurate table cardinality)*/
            const sIndexColumn = "student_id";

            /* DB table to use */
            const sTable = 'student';
            // Paging
            let sLimit = " ";
            if(reqQuery.draw && reqQuery.start){

                sLimit = " LIMIT " + reqQuery.start + ", " + reqQuery.length;
            }
            // Ordering
            // console.log("sorting")
            // console.log(reqQuery.sort)
            let sOrder = " ";
            if(reqQuery.sort && reqQuery.sort !== null && reqQuery.sort !== undefined){
                const nsort = JSON.parse(reqQuery.sort);
                sOrder += "ORDER BY " + nsort.field + " " + nsort.direction;
            }else{
                sOrder += "ORDER BY  Year,No asc";
            }
            // console.log(sOrder)
            // search
            let sWhere = " WHERE year='6th Year'  "; //year = '6th Year' or year='5th Year'  or year='4th Year' or year='3rd Year' or year='2nd Year' or year='1st_1sem Year' or year='1st_2sem Year'
            console.log(reqQuery)
            if(reqQuery.search && reqQuery.search.value){
                console.log("here in filter")
            
                sWhere += " AND (";
                for (var eachcolumn=0; eachcolumn<aColumns.length; eachcolumn++)
                {

                    if(aColumns[eachcolumn] === 'createddate'){
                        sWhere += " date(createddate)  = '"+ moment(reqQuery.search.value).format('YYYY-MM-DD') +"' OR ";
                    }else{
                        const searchstr = (reqQuery.search.value).replace(/'/g, "\\'");
                        sWhere += aColumns[eachcolumn]  +" LIKE '%"+ searchstr +"%' OR ";
                    }

                }
                sWhere = sWhere.substring(0 , sWhere.length-3 );
                sWhere += ')';
            }
            console.log(sWhere)
            // rowcount = "(SELECT @rownum := 0) r "
            const sJoin = "  ";
            const sQuery = "SELECT  SQL_CALC_FOUND_ROWS @n := @n + 1 n,  "+aColumns.join()+" FROM "+ sTable  + sJoin + " ,(SELECT @n := 0) m "  + sWhere+ sOrder + sLimit;
            // console.log(sQuery)
            DB.getConnection((getconError, connection)=>{
                if(getconError){
                    console.log(getconError);
                    callback(getconError,null);
                }else{
                    const i= connection.query(sQuery, (queryerr, results) => {
                        if (queryerr) {
                            connection.release();
                            callback(queryerr,null);
                        }else {
                            const rResult = results;
                            console.log(rResult)
                            const totalquery = "SELECT COUNT("+sIndexColumn+") as totalrecord FROM "+sTable +"  WHERE year='6th Year' ;" ;
                            console.log(totalquery)
                            connection.query(totalquery,  (queryerr3, result) => {
                                connection.release();
                                if (queryerr3) {
                                    callback(queryerr3,null);
                                }else {
                                    console.log(rResult[rResult.length -1])
                                    const iTotal = result[0].totalrecord;
                                    const output = {
                                        recordsFiltered: iTotal,
                                        recordsTotal: rResult.length > 0 ? rResult[rResult.length -1].n : 0,
                                        draw: reqQuery.draw,
                                        data: rResult.map(each =>{
                                            return {
                                                "no": each.No,
                                        
                                                "name": each.name,
                                                "roll": each.roll_no,
                                                "phonenumber": each.phonenumber,
                                                "father": each.father_name,
                                                "address": each.address,
                                                "gmail": each.gmail,
                                                "year": each.year,
                                                "action": each.student_id,
                                            }
                                        })
                                    };
                                    callback(null, output);
                                }
                                
                            });
                        }
                    });console.log(i.sql);
                }
            });
        } catch (error) {
        console.error(error);
        callback(error,null)
    }
}



exports.GetfifthyearstudentList = function(reqQuery,callback) {
    try {
            // console.log(reqQuery);
            // console.log(typeof reqQuery.sort);
            reqQuery.displaystart =  (Number(reqQuery.page) - 1) * Number(reqQuery.limit) || 0;
            const aColumns = [
               "No", "student_id","name","roll_no","phonenumber","address","father_name","address","gmail","year",
            ];
            /* Indexed column (used for fast and accurate table cardinality)*/
            const sIndexColumn = "student_id";

            /* DB table to use */
            const sTable = 'student';
            // Paging
            let sLimit = " ";
            if(reqQuery.draw && reqQuery.start){

                sLimit = " LIMIT " + reqQuery.start + ", " + reqQuery.length;
            }
            // Ordering
            // console.log("sorting")
            // console.log(reqQuery.sort)
            let sOrder = " ";
            if(reqQuery.sort && reqQuery.sort !== null && reqQuery.sort !== undefined){
                const nsort = JSON.parse(reqQuery.sort);
                sOrder += "ORDER BY " + nsort.field + " " + nsort.direction;
            }else{
                sOrder += "ORDER BY  Year,No asc";
            }
            // console.log(sOrder)
            // search
            let sWhere = " WHERE year='5th Year'  "; //year = '6th Year' or year='5th Year'  or year='4th Year' or year='3rd Year' or year='2nd Year' or year='1st_1sem Year' or year='1st_2sem Year'
            console.log(reqQuery)
            if(reqQuery.search && reqQuery.search.value){
                console.log("here in filter")
            
                sWhere += " AND (";
                for (var eachcolumn=0; eachcolumn<aColumns.length; eachcolumn++)
                {

                    if(aColumns[eachcolumn] === 'createddate'){
                        sWhere += " date(createddate)  = '"+ moment(reqQuery.search.value).format('YYYY-MM-DD') +"' OR ";
                    }else{
                        const searchstr = (reqQuery.search.value).replace(/'/g, "\\'");
                        sWhere += aColumns[eachcolumn]  +" LIKE '%"+ searchstr +"%' OR ";
                    }

                }
                sWhere = sWhere.substring(0 , sWhere.length-3 );
                sWhere += ')';
            }
            console.log(sWhere)
            // rowcount = "(SELECT @rownum := 0) r "
            const sJoin = "  ";
            const sQuery = "SELECT  SQL_CALC_FOUND_ROWS @n := @n + 1 n,  "+aColumns.join()+" FROM "+ sTable  + sJoin + " ,(SELECT @n := 0) m "  + sWhere+ sOrder + sLimit;
            // console.log(sQuery)
            DB.getConnection((getconError, connection)=>{
                if(getconError){
                    console.log(getconError);
                    callback(getconError,null);
                }else{
                    const i= connection.query(sQuery, (queryerr, results) => {
                        if (queryerr) {
                            connection.release();
                            callback(queryerr,null);
                        }else {
                            const rResult = results;
                            console.log(rResult)
                            const totalquery = "SELECT COUNT("+sIndexColumn+") as totalrecord FROM "+sTable +"  WHERE year='5th Year' ;" ;
                            console.log(totalquery)
                            connection.query(totalquery,  (queryerr3, result) => {
                                connection.release();
                                if (queryerr3) {
                                    callback(queryerr3,null);
                                }else {
                                    console.log(rResult[rResult.length -1])
                                    const iTotal = result[0].totalrecord;
                                    const output = {
                                        recordsFiltered: iTotal,
                                        recordsTotal: rResult.length > 0 ? rResult[rResult.length -1].n : 0,
                                        draw: reqQuery.draw,
                                        data: rResult.map(each =>{
                                            return {
                                                "no": each.No,
                                        
                                                "name": each.name,
                                                "roll": each.roll_no,
                                                "phonenumber": each.phonenumber,
                                                "father": each.father_name,
                                                "address": each.address,
                                                "gmail": each.gmail,
                                                "year": each.year,
                                                "action": each.student_id,
                                            }
                                        })
                                    };
                                    callback(null, output);
                                }
                                
                            });
                        }
                    });console.log(i.sql);
                }
            });
        } catch (error) {
        console.error(error);
        callback(error,null)
    }
}



exports.GetfourthyearstudentList = function(reqQuery,callback) {
    try {
            // console.log(reqQuery);
            // console.log(typeof reqQuery.sort);
            reqQuery.displaystart =  (Number(reqQuery.page) - 1) * Number(reqQuery.limit) || 0;
            const aColumns = [
               "No", "student_id","name","roll_no","phonenumber","address","father_name","gmail","year",
            ];
            /* Indexed column (used for fast and accurate table cardinality)*/
            const sIndexColumn = "student_id";

            /* DB table to use */
            const sTable = 'student';
            // Paging
            let sLimit = " ";
            if(reqQuery.draw && reqQuery.start){

                sLimit = " LIMIT " + reqQuery.start + ", " + reqQuery.length;
            }
            // Ordering
            // console.log("sorting")
            // console.log(reqQuery.sort)
            let sOrder = " ";
            if(reqQuery.sort && reqQuery.sort !== null && reqQuery.sort !== undefined){
                const nsort = JSON.parse(reqQuery.sort);
                sOrder += "ORDER BY " + nsort.field + " " + nsort.direction;
            }else{
                sOrder += "ORDER BY  Year,No asc";
            }
            // console.log(sOrder)
            // search
            let sWhere = " WHERE year='4th Year'  "; //year = '6th Year' or year='5th Year'  or year='4th Year' or year='3rd Year' or year='2nd Year' or year='1st_1sem Year' or year='1st_2sem Year'

            console.log(reqQuery)
            if(reqQuery.search && reqQuery.search.value){
                console.log("here in filter")
            
                sWhere += " AND (";
                for (var eachcolumn=0; eachcolumn<aColumns.length; eachcolumn++)
                {

                    if(aColumns[eachcolumn] === 'createddate'){
                        sWhere += " date(createddate)  = '"+ moment(reqQuery.search.value).format('YYYY-MM-DD') +"' OR ";
                    }else{
                        const searchstr = (reqQuery.search.value).replace(/'/g, "\\'");
                        sWhere += aColumns[eachcolumn]  +" LIKE '%"+ searchstr +"%' OR ";
                    }

                }
                sWhere = sWhere.substring(0 , sWhere.length-3 );
                sWhere += ')';
            }
            console.log(sWhere)
            // rowcount = "(SELECT @rownum := 0) r "
            const sJoin = "  ";
            const sQuery = "SELECT  SQL_CALC_FOUND_ROWS @n := @n + 1 n,  "+aColumns.join()+" FROM "+ sTable  + sJoin + " ,(SELECT @n := 0) m "  + sWhere+ sOrder + sLimit;
            // console.log(sQuery)
            DB.getConnection((getconError, connection)=>{
                if(getconError){
                    console.log(getconError);
                    callback(getconError,null);
                }else{
                    const i= connection.query(sQuery, (queryerr, results) => {
                        if (queryerr) {
                            connection.release();
                            callback(queryerr,null);
                        }else {
                            const rResult = results;
                            console.log(rResult)
                            const totalquery = "SELECT COUNT("+sIndexColumn+") as totalrecord FROM "+sTable +"  WHERE year='4th Year'  ;" ;
                            console.log(totalquery)
                            connection.query(totalquery,  (queryerr3, result) => {
                                connection.release();
                                if (queryerr3) {
                                    callback(queryerr3,null);
                                }else {
                                    console.log(rResult[rResult.length -1])
                                    const iTotal = result[0].totalrecord;
                                    const output = {
                                        recordsFiltered: iTotal,
                                        recordsTotal: rResult.length > 0 ? rResult[rResult.length -1].n : 0,
                                        draw: reqQuery.draw,
                                        data: rResult.map(each =>{
                                            return {
                                                "no": each.No,
                                        
                                                "name": each.name,
                                                "roll": each.roll_no,
                                                "phonenumber": each.phonenumber,
                                                "father": each.father_name,
                                                "address": each.address,
                                                "gmail": each.gmail,
                                                "year": each.year,
                                                "action": each.student_id,
                                            }
                                        })
                                    };
                                    callback(null, output);
                                }
                                
                            });
                        }
                    });console.log(i.sql);
                }
            });
        } catch (error) {
        console.error(error);
        callback(error,null)
    }
}

exports.GetthirdyearstudentList = function(reqQuery,callback) {
    try {
            // console.log(reqQuery);
            // console.log(typeof reqQuery.sort);
            reqQuery.displaystart =  (Number(reqQuery.page) - 1) * Number(reqQuery.limit) || 0;
            const aColumns = [
               "No", "student_id","name","roll_no","phonenumber","address","father_name","gmail","year",
            ];
            /* Indexed column (used for fast and accurate table cardinality)*/
            const sIndexColumn = "student_id";

            /* DB table to use */
            const sTable = 'student';
            // Paging
            let sLimit = " ";
            if(reqQuery.draw && reqQuery.start){

                sLimit = " LIMIT " + reqQuery.start + ", " + reqQuery.length;
            }
            // Ordering
            // console.log("sorting")
            // console.log(reqQuery.sort)
            let sOrder = " ";
            if(reqQuery.sort && reqQuery.sort !== null && reqQuery.sort !== undefined){
                const nsort = JSON.parse(reqQuery.sort);
                sOrder += "ORDER BY " + nsort.field + " " + nsort.direction;
            }else{
                sOrder += "ORDER BY  Year,No asc";
            }
            // console.log(sOrder)
            // search
            let sWhere = " WHERE year='3rd Year'  "; //year = '6th Year' or year='5th Year'  or year='4th Year' or year='3rd Year' or year='2nd Year' or year='1st_1sem Year' or year='1st_2sem Year'

            console.log(reqQuery)
            if(reqQuery.search && reqQuery.search.value){
                console.log("here in filter")
            
                sWhere += " AND (";
                for (var eachcolumn=0; eachcolumn<aColumns.length; eachcolumn++)
                {

                    if(aColumns[eachcolumn] === 'createddate'){
                        sWhere += " date(createddate)  = '"+ moment(reqQuery.search.value).format('YYYY-MM-DD') +"' OR ";
                    }else{
                        const searchstr = (reqQuery.search.value).replace(/'/g, "\\'");
                        sWhere += aColumns[eachcolumn]  +" LIKE '%"+ searchstr +"%' OR ";
                    }

                }
                sWhere = sWhere.substring(0 , sWhere.length-3 );
                sWhere += ')';
            }
            console.log(sWhere)
            // rowcount = "(SELECT @rownum := 0) r "
            const sJoin = "  ";
            const sQuery = "SELECT  SQL_CALC_FOUND_ROWS @n := @n + 1 n,  "+aColumns.join()+" FROM "+ sTable  + sJoin + " ,(SELECT @n := 0) m "  + sWhere+ sOrder + sLimit;
            // console.log(sQuery)
            DB.getConnection((getconError, connection)=>{
                if(getconError){
                    console.log(getconError);
                    callback(getconError,null);
                }else{
                    const i= connection.query(sQuery, (queryerr, results) => {
                        if (queryerr) {
                            connection.release();
                            callback(queryerr,null);
                        }else {
                            const rResult = results;
                            console.log(rResult)
                            const totalquery = "SELECT COUNT("+sIndexColumn+") as totalrecord FROM "+sTable +"  WHERE year='3rd Year' ;" ;
                            console.log(totalquery)
                            connection.query(totalquery,  (queryerr3, result) => {
                                connection.release();
                                if (queryerr3) {
                                    callback(queryerr3,null);
                                }else {
                                    console.log(rResult[rResult.length -1])
                                    const iTotal = result[0].totalrecord;
                                    const output = {
                                        recordsFiltered: iTotal,
                                        recordsTotal: rResult.length > 0 ? rResult[rResult.length -1].n : 0,
                                        draw: reqQuery.draw,
                                        data: rResult.map(each =>{
                                            return {
                                                "no": each.No,
                                        
                                                "name": each.name,
                                                "roll": each.roll_no,
                                                "phonenumber": each.phonenumber,
                                                "father": each.father_name,
                                                "address": each.address,
                                                "gmail": each.gmail,
                                                "year": each.year,
                                                "action": each.student_id,
                                            }
                                        })
                                    };
                                    callback(null, output);
                                }
                                
                            });
                        }
                    });console.log(i.sql);
                }
            });
        } catch (error) {
        console.error(error);
        callback(error,null)
    }
}

exports.GetsecondyearstudentList = function(reqQuery,callback) {
    try {
            // console.log(reqQuery);
            // console.log(typeof reqQuery.sort);
            reqQuery.displaystart =  (Number(reqQuery.page) - 1) * Number(reqQuery.limit) || 0;
            const aColumns = [
               "No", "student_id","name","roll_no","phonenumber","address","father_name","gmail","year",
            ];
            /* Indexed column (used for fast and accurate table cardinality)*/
            const sIndexColumn = "student_id";

            /* DB table to use */
            const sTable = 'student';
            // Paging
            let sLimit = " ";
            if(reqQuery.draw && reqQuery.start){

                sLimit = " LIMIT " + reqQuery.start + ", " + reqQuery.length;
            }
            // Ordering
            // console.log("sorting")
            // console.log(reqQuery.sort)
            let sOrder = " ";
            if(reqQuery.sort && reqQuery.sort !== null && reqQuery.sort !== undefined){
                const nsort = JSON.parse(reqQuery.sort);
                sOrder += "ORDER BY " + nsort.field + " " + nsort.direction;
            }else{
                sOrder += "ORDER BY  Year,No asc";
            }
            // console.log(sOrder)
            // search
            let sWhere = " WHERE year='2nd Year'  "; //year = '6th Year' or year='5th Year'  or year='4th Year' or year='3rd Year' or year='2nd Year' or year='1st_1sem Year' or year='1st_2sem Year'
            console.log(reqQuery)
            if(reqQuery.search && reqQuery.search.value){
                console.log("here in filter")
                sWhere += " AND (";
                for (var eachcolumn=0; eachcolumn<aColumns.length; eachcolumn++)
                {

                    if(aColumns[eachcolumn] === 'createddate'){
                        sWhere += " date(createddate)  = '"+ moment(reqQuery.search.value).format('YYYY-MM-DD') +"' OR ";
                    }else{
                        const searchstr = (reqQuery.search.value).replace(/'/g, "\\'");
                        sWhere += aColumns[eachcolumn]  +" LIKE '%"+ searchstr +"%' OR ";
                    }

                }
                sWhere = sWhere.substring(0 , sWhere.length-3 );
                sWhere += ')';
            }
            console.log(sWhere)
            // rowcount = "(SELECT @rownum := 0) r "
            const sJoin = "  ";
            const sQuery = "SELECT  SQL_CALC_FOUND_ROWS @n := @n + 1 n,  "+aColumns.join()+" FROM "+ sTable  + sJoin + " ,(SELECT @n := 0) m "  + sWhere+ sOrder + sLimit;
            // console.log(sQuery)
            DB.getConnection((getconError, connection)=>{
                if(getconError){
                    console.log(getconError);
                    callback(getconError,null);
                }else{
                    const i= connection.query(sQuery, (queryerr, results) => {
                        if (queryerr) {
                            connection.release();
                            callback(queryerr,null);
                        }else {
                            const rResult = results;
                            console.log(rResult)
                            const totalquery = "SELECT COUNT("+sIndexColumn+") as totalrecord FROM "+sTable +"  WHERE year='2nd Year';" ;
                            console.log(totalquery)
                            connection.query(totalquery,  (queryerr3, result) => {
                                connection.release();
                                if (queryerr3) {
                                    callback(queryerr3,null);
                                }else {
                                    console.log(rResult[rResult.length -1])
                                    const iTotal = result[0].totalrecord;
                                    const output = {
                                        recordsFiltered: iTotal,
                                        recordsTotal: rResult.length > 0 ? rResult[rResult.length -1].n : 0,
                                        draw: reqQuery.draw,
                                        data: rResult.map(each =>{
                                            return {
                                                "no": each.No,
                                        
                                                "name": each.name,
                                                "roll": each.roll_no,
                                                "phonenumber": each.phonenumber,
                                                "father": each.father_name,
                                                "address": each.address,
                                                "gmail": each.gmail,
                                                "year": each.year,
                                                "action": each.student_id,
                                            }
                                        })
                                    };
                                    callback(null, output);
                                }
                                
                            });
                        }
                    });console.log(i.sql);
                }
            });
        } catch (error) {
        console.error(error);
        callback(error,null)
    }
}

exports.Getfirst_1semyearstudentList = function(reqQuery,callback) {
    try {
            // console.log(reqQuery);
            // console.log(typeof reqQuery.sort);
            reqQuery.displaystart =  (Number(reqQuery.page) - 1) * Number(reqQuery.limit) || 0;
            const aColumns = [
               "No", "student_id","name","roll_no","phonenumber","address","father_name","gmail","year",
            ];
            /* Indexed column (used for fast and accurate table cardinality)*/
            const sIndexColumn = "student_id";

            /* DB table to use */
            const sTable = 'student';
            // Paging
            let sLimit = " ";
            if(reqQuery.draw && reqQuery.start){

                sLimit = " LIMIT " + reqQuery.start + ", " + reqQuery.length;
            }
            // Ordering
            // console.log("sorting")
            // console.log(reqQuery.sort)
            let sOrder = " ";
            if(reqQuery.sort && reqQuery.sort !== null && reqQuery.sort !== undefined){
                const nsort = JSON.parse(reqQuery.sort);
                sOrder += "ORDER BY " + nsort.field + " " + nsort.direction;
            }else{
                sOrder += "ORDER BY  Year,No asc";
            }
            // console.log(sOrder)
            // search
            let sWhere = " WHERE year='1st_1sem Year'  "; //year = '6th Year' or year='5th Year'  or year='4th Year' or year='3rd Year' or year='2nd Year' or year='1st_1sem Year' or year='1st_2sem Year'
            console.log(reqQuery)
            if(reqQuery.search && reqQuery.search.value){
                console.log("here in filter")
                sWhere += " AND (";
                for (var eachcolumn=0; eachcolumn<aColumns.length; eachcolumn++)
                {

                    if(aColumns[eachcolumn] === 'createddate'){
                        sWhere += " date(createddate)  = '"+ moment(reqQuery.search.value).format('YYYY-MM-DD') +"' OR ";
                    }else{
                        const searchstr = (reqQuery.search.value).replace(/'/g, "\\'");
                        sWhere += aColumns[eachcolumn]  +" LIKE '%"+ searchstr +"%' OR ";
                    }

                }
                sWhere = sWhere.substring(0 , sWhere.length-3 );
                sWhere += ')';
            }
            console.log(sWhere)
            // rowcount = "(SELECT @rownum := 0) r "
            const sJoin = "  ";
            const sQuery = "SELECT  SQL_CALC_FOUND_ROWS @n := @n + 1 n,  "+aColumns.join()+" FROM "+ sTable  + sJoin + " ,(SELECT @n := 0) m "  + sWhere+ sOrder + sLimit;
            // console.log(sQuery)
            DB.getConnection((getconError, connection)=>{
                if(getconError){
                    console.log(getconError);
                    callback(getconError,null);
                }else{
                    const i= connection.query(sQuery, (queryerr, results) => {
                        if (queryerr) {
                            connection.release();
                            callback(queryerr,null);
                        }else {
                            const rResult = results;
                            console.log(rResult)
                            const totalquery = "SELECT COUNT("+sIndexColumn+") as totalrecord FROM "+sTable +"  WHERE year='1st-1sem Year';" ;
                            console.log(totalquery)
                            connection.query(totalquery,  (queryerr3, result) => {
                                connection.release();
                                if (queryerr3) {
                                    callback(queryerr3,null);
                                }else {
                                    console.log(rResult[rResult.length -1])
                                    const iTotal = result[0].totalrecord;
                                    const output = {
                                        recordsFiltered: iTotal,
                                        recordsTotal: rResult.length > 0 ? rResult[rResult.length -1].n : 0,
                                        draw: reqQuery.draw,
                                        data: rResult.map(each =>{
                                            return {
                                                "no": each.No,
                                        
                                                "name": each.name,
                                                "roll": each.roll_no,
                                                "phonenumber": each.phonenumber,
                                                "father": each.father_name,
                                                "address": each.address,
                                                "gmail": each.gmail,
                                                "year": each.year,
                                                "action": each.student_id,
                                            }
                                        })
                                    };
                                    callback(null, output);
                                }
                                
                            });
                        }
                    });console.log(i.sql);
                }
            });
        } catch (error) {
        console.error(error);
        callback(error,null)
    }
}

exports.Getfirst_2semyearstudentList = function(reqQuery,callback) {
    try {
            // console.log(reqQuery);
            // console.log(typeof reqQuery.sort);
            reqQuery.displaystart =  (Number(reqQuery.page) - 1) * Number(reqQuery.limit) || 0;
            const aColumns = [
               "No", "student_id","name","roll_no","phonenumber","address","father_name","gmail","year",
            ];
            /* Indexed column (used for fast and accurate table cardinality)*/
            const sIndexColumn = "student_id";

            /* DB table to use */
            const sTable = 'student';
            // Paging
            let sLimit = " ";
            if(reqQuery.draw && reqQuery.start){

                sLimit = " LIMIT " + reqQuery.start + ", " + reqQuery.length;
            }
            // Ordering
            // console.log("sorting")
            // console.log(reqQuery.sort)
            let sOrder = " ";
            if(reqQuery.sort && reqQuery.sort !== null && reqQuery.sort !== undefined){
                const nsort = JSON.parse(reqQuery.sort);
                sOrder += "ORDER BY " + nsort.field + " " + nsort.direction;
            }else{
                sOrder += "ORDER BY  Year,No asc";
            }
            // console.log(sOrder)
            // search
            let sWhere = " WHERE year='1st_2sem Year'  "; //year = '6th Year' or year='5th Year'  or year='4th Year' or year='3rd Year' or year='2nd Year' or year='1st_1sem Year' or year='1st_2sem Year'
            console.log(reqQuery)
            if(reqQuery.search && reqQuery.search.value){
                console.log("here in filter")
                sWhere += " AND (";
                for (var eachcolumn=0; eachcolumn<aColumns.length; eachcolumn++)
                {

                    if(aColumns[eachcolumn] === 'createddate'){
                        sWhere += " date(createddate)  = '"+ moment(reqQuery.search.value).format('YYYY-MM-DD') +"' OR ";
                    }else{
                        const searchstr = (reqQuery.search.value).replace(/'/g, "\\'");
                        sWhere += aColumns[eachcolumn]  +" LIKE '%"+ searchstr +"%' OR ";
                    }

                }
                sWhere = sWhere.substring(0 , sWhere.length-3 );
                sWhere += ')';
            }
            console.log(sWhere)
            // rowcount = "(SELECT @rownum := 0) r "
            const sJoin = "  ";
            const sQuery = "SELECT  SQL_CALC_FOUND_ROWS @n := @n + 1 n,  "+aColumns.join()+" FROM "+ sTable  + sJoin + " ,(SELECT @n := 0) m "  + sWhere+ sOrder + sLimit;
            // console.log(sQuery)
            DB.getConnection((getconError, connection)=>{
                if(getconError){
                    console.log(getconError);
                    callback(getconError,null);
                }else{
                    const i= connection.query(sQuery, (queryerr, results) => {
                        if (queryerr) {
                            connection.release();
                            callback(queryerr,null);
                        }else {
                            const rResult = results;
                            console.log(rResult)
                            const totalquery = "SELECT COUNT("+sIndexColumn+") as totalrecord FROM "+sTable +"  WHERE year='1st-2sem Year';" ;
                            console.log(totalquery)
                            connection.query(totalquery,  (queryerr3, result) => {
                                connection.release();
                                if (queryerr3) {
                                    callback(queryerr3,null);
                                }else {
                                    console.log(rResult[rResult.length -1])
                                    const iTotal = result[0].totalrecord;
                                    const output = {
                                        recordsFiltered: iTotal,
                                        recordsTotal: rResult.length > 0 ? rResult[rResult.length -1].n : 0,
                                        draw: reqQuery.draw,
                                        data: rResult.map(each =>{
                                            return {
                                                "no": each.No,
                                        
                                                "name": each.name,
                                                "roll": each.roll_no,
                                                "phonenumber": each.phonenumber,
                                                "father": each.father_name,
                                                "address": each.address,
                                                "gmail": each.gmail,
                                                "year": each.year,
                                                "action": each.student_id,
                                            }
                                        })
                                    };
                                    callback(null, output);
                                }
                                
                            });
                        }
                    });console.log(i.sql);
                }
            });
        } catch (error) {
        console.error(error);
        callback(error,null)
    }
}
exports.SaveStudent = function(data,callback){
	//console.log(data);
	
	var sQuery = '';
	var student_id = data.student_id;
	delete data.student_id; 
    if(data.student_id){

		sQuery += " update student set ? where student_id = ?;";
		
	}else{
		sQuery += " insert into student set ?;";
	}
	DB.getConnection(function(err, connection){
		//console.log(err);
	if(err){
		callback({status:500,text:"mysql getConnection Error",data:err});
	}else{
		//console.log(userdata.admin_email);
		var i = connection.query(sQuery,[data,student_id], function(err, result){
			
			if(!err){			
				   
					//console.log();
					callback(null,result);
			}else{
				callback({status:500,text:"mysql query Error",data:err});
			
			}
			
		});console.log(i.sql);
		connection.release();
	}	
});
}

exports.GetStudentDataByID = function(student_id,callback){
	DB.getConnection(function(err, connection){
		//console.log(err);
	if(err){
		callback({status:500,text:"mysql getConnection Error",data:err});
	}else{
		//console.log(userdata.admin_email);
		var i = connection.query('select * from student where student_id = ? ;',[student_id], function(err, result){
			
			if(!err & result.length === 1){			
				//console.log(result);
					callback(null,result[0]);
			}else{
				callback({status:500,text:"Error",data:null});
			
			}
			
		});console.log(i.sql);
		connection.release();
	}	
	
});
}

exports.DeleteStudent = function(student_id,callback){
    DB.getConnection(function(err, connection){
            console.log(err);
        if(err){
            callback({status:500,text:"mysql getConnection Error",data:err});
        }else{
            
            var i = connection.query("delete from student where student_id = ? ",[student_id], function(err, result){
                
                if(!err){			
                    //console.log(result);
                        callback(null,result);
                }else{
                    callback({status:500,text:"mysql query Error",data:err});
                
                }
                
            });console.log(i.sql);
            connection.release();
        }	
        
    });
}
