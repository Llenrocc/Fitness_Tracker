const express = require ("express");
const logger = require ("morgan");
const mongoose = require ("mongoose");
const path = require ("path");
const dotenv = require("dotenv");
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://llenrocc-admin:' + process.env.DB_PASSWORD + '@cluster0.xlkj9.mongodb.net/workoutDb?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object 
    client.close();
});


const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutDb", 
{
    useNewUrlParser: true,
    useUnifiedToplogy: true,
    useCreateIndex: true,
    useFindAndModify: false
    });

require("./routes/api-routes.js")(app);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});