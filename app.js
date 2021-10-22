// Skeleton

// touch app.js styles.css header.ejs footer.ejs home.ejs
// mkdir -p public/images
// mkdir -p public/css
// mkdir -p views/partials

// npm init -y
// npm install express ejs body-parser http https fs express-force-ssl serve-favicon path dotenv

// openssl genrsa -out key.pem
// openssl req -new -key key.pem -out csr.pem
// openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem

// App
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const favicon = require("serve-favicon");

const http = require('http');
const https = require('https');
const forceSsl = require('express-force-ssl');
const path = require('path');
const fs = require('fs');

const app = express();

const server = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app);

// FAVICON
app.use(favicon(__dirname + "/public/favicon.ico"));

const port = process.env.PORT || 3000;

// PUBLIC DIRECTORY
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
	res.render("home");
});

app.get("/instructions", function(req, res) {
	res.render("instructions");
});

app.get("/screenshots", function(req, res) {
	res.render("screenshots");
});



// app.listen(port, function() {
// 	console.log("Server is listening on port: " + port);
// });

http.createServer(app).listen(80);
server.listen(port, () => console.log('Secure Server on port ' + port));
