//#Dependencias
var config = require("./config");
var express = require("express");
var path = require("path");

var app = express();

//#Tables
var tables = [];

var WaitList = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/tables", function(req, res) {
    res.json(tables);
});

app.post("/api/tables", function(req, res) {
    var newItem = req.body;
    console.log(newItem);

    if (tables.length < 5) {
        tables.push(newItem);
        console.log("TRUE:Tu reservacion fue realizada");
    } else {
        WaitList.push(newItem);
        console.log("FALSE:Te encuentras en la lista de espera");
    }
    res.json(newItem);
});

app.get("/api/waitlist", function(req, res) {
    res.json(WaitList);
});

app.post("/api/clear", function(req, res) {
    tables = [];
    WaitList = [];
    console.log("Empty tables");
})

app.listen(config.app.port, () => {
    console.log(`Server running on port ${config.app.port}`)
})