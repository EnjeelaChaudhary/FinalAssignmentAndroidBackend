const mongoose = require('mongoose') //to connect with mongodb, database related tasks
const express = require('express') //third party
const bodyParser = require('body-parser');
const cors=require('cors');

const db= require("./database/db");
const Reader = require("./route/reader_route");
const Comic = require("./route/comicRoute");

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false })); 


app.use(Reader);
app.use(Comic)
app.listen(90);