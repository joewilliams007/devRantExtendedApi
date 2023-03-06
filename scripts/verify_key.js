module.exports = (req, res) => {
    var db = require('./db');
    var timestamp = Math.floor(new Date().getTime() / 1000) // in seconds
    var { verify_key } = req.params;
    var getJSON = require('get-json')
    var post_id = 6436619

             
    res.status(200).json({
        success: true,
        error: false,
        verify_key: verify_key,
        post_id: post_id,
        message: "please enter the verification key in the post"
    })
                 
    getJSON('https://www.devrant.io/api/devrant/rants/'+post_id+'?app=3')

    .then(function (response) {
   
        console.log(response.comments)
        proccessResponse(response);

    }).catch(function (error) {
        
        console.log(error);

    });

    function proccessResponse(response) {
        response.forEach(element => {

            if (element.body.includes(verify_key)) {
                console.log(element.user_id);
                console.log(element.created_time);
                console.log(element.body);
                console.log(element.user_username);

                compareId(element)
            }
        });
    }

    function compareId(element) {

        db.query(

            `SELECT * FROM Verify
    WHERE verify_key="${verify_key}"`
            , function (error, results, fields) {
                if (error) console.log(error.message);

                var dbRes = JSON.parse(JSON.stringify(results))

                if (dbRes.verify_key == verify_key) {
                    finishRegistration(element, dbRes)
                }
            });
    }

    function finishRegistration (element, dbRes) {
        db.query(
            `INSERT INTO Users (user_devRant_user_id, password, verify_key, timestamp) 
            VALUES (${dbRes.user_devRant_user_id},"${dbRes.password}","${verify_key}",${timestamp})`
            , function (error, results, fields) {

                if (error) {
                    console.log(error.message);
                } else {
                    returnUserId(dbRes);
                }
        })
    }

    function returnUserId (dbRes) {
        db.query(

            `SELECT user_id FROM Users
            WHERE user_devRant_user_id=${dbRes.user_devRant_user_id}`

            , function (error, results, fields) {
                if (error) console.log(error.message);

                var dbRes = JSON.parse(JSON.stringify(results))

                res.status(200).json({
                    success: true,
                    error: false,
                    user_id: dbRes[0].user_id,
                    message: "success"
                })         
                console.log('registration successfull');  
        });
    }
}