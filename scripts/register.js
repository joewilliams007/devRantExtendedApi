module.exports = (req, res) => {
    var { devRant_user_id } = req.params;
    var { password } = req.params;

    var db = require('./db');

    checkExistence()

    function checkExistence() {
        db.query(
            `SELECT COUNT(*) AS RowCount FROM Users WHERE devRant_user_id="${devRant_user_id}"`
            , function (error, results, fields) {
                if (error) {

                }
    
                if (Number(results[0].RowCount) == 0) {
                    createExistence();
                } else {
                    recoverExistence();
                }

        });
    }

    function createExistence() {
        
        db.query(
            `INSERT INTO Verify (user_devRant_user_id, user_username, password, magic_word, timestamp) 
            VALUES (${devRant_user_id},"${username}",${timestamp})`
            , function (error, results, fields) {

                if (error) {

                }
        })
    }

    function recoverExistence() {

    }
}