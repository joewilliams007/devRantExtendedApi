// this file checks a devRant post every 5 minutes to verify accounts

var post_id = 2121
module.exports = {
    start: function () {
        var minutes = 5, the_interval = minutes * 60 * 1000;
        var getJSON = require('get-json')
        console.log("Verifying Accounts has been set to every "+minutes+" minutes.");

        setInterval(function() {
            console.log("Verifying Accounts..");
            contactDevRant(getJSON);
        }, the_interval);
    }
};

function contactDevRant(getJSON) {
   
    getJSON('https://www.devrant.io/api/devrant/rants/'+post_id+'?app=3')

    .then(function (response) {
   
        console.log(response.comments)
        proccessResponse(response);

    }).catch(function (error) {
        
        console.log(error);

    });
}

function proccessResponse(response) {
    response.forEach(element => {
        console.log(element.user_id);
        console.log(element.created_time);
        console.log(element.body);
    });
}
