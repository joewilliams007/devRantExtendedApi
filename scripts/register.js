module.exports = (req, res) => {
    var { devRant_user_id } = req.params;
    var { password } = req.params;

    var db = require('./db');
    var post_id = 2121

    checkExistence()

    function checkExistence() {
        db.query(
            `SELECT COUNT(*) AS RowCount FROM Users WHERE devRant_user_id=${devRant_user_id}`
            , function (error, results, fields) {
                if (error) {

                }
    
                if (Number(results[0].RowCount) == 0) {
                    createExistence();
                } else {
                    console.log("account already exists")
                }

        });
    }

    function createExistence() {
        var verify_key = makeid(6)

        db.query(
            `INSERT INTO Verify (user_devRant_user_id, password, verify_key, timestamp) 
            VALUES (${devRant_user_id},"${password}","${verify_key}",${timestamp})`
            , function (error, results, fields) {

                if (error) {

                } else {
                    res.status(200).json({
                        success: true,
                        error: false,
                        verify_key: verify_key,
                        post_id: post_id,
                        message: "please enter the verification key in the post"
                    })  
                }
        })
    }


    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }
    
    console.log(makeid(5));
}