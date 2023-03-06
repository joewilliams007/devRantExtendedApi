// Main file
const express = require('express');
const rateLimit = require('express-rate-limit')
const path = require('path');

const app = express()
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	max: 100, // Limit each IP to 100 requests per `window`
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter)
const port = 9999;

/*
An account can be verified

0. generating access key from this API
0. generating verification key from this API

1. sending verification key to a specific post
2. your account will be verified after 5 min
*/

app.listen(
    port, 
    () => console.log("devRant extended API launched on http://localhost:" + port)
)

app.use(express.json())
app.use(express.static(path.join(__dirname,"public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.get("/register/:devRant_user_id/:password",
    require("./scripts/register.js")
)

app.get("/verify/key/:verify_key",
    require("./scripts/verify_key.js")
)

/* app.post("/block/:user_id",
    require("./scripts/block.js")
)
params: 
user_id, devRant_user_id, target_id, app_id, key
*/

process.on('uncaughtException', err => {
    console.error(err && err.stack)
});