const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const lessons = require('./entites/lessons');
// const ansvers = require('./entites/ansvers');
const MongoClient = require('mongoose');
// const assert = require('assert');

// Connection URL
const url = 'mongodb://zorox:123123123@tsu-shard-00-00-9gsja.gcp.mongodb.net:27017,tsu-shard-00-01-9gsja.gcp.mongodb.net:27017,tsu-shard-00-02-9gsja.gcp.mongodb.net:27017/TSU?replicaSet=TSU-shard-0&authSource=admin&ssl=true';

// Use connect method to connect to the Server
MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    if(err){
        console.log(err);
    }


    // const db = client.db("TSU");
    // var lessons = db.collection('lessons');
    // var cursor = db.collection('lessons').find({});
    // function iterateFunc(doc) {
    //     console.log(JSON.stringify(doc, null, 4));
    // }

    // function errorFunc(error) {
    //     console.log(error);
    // }
    
    // cursor.forEach(iterateFunc, errorFunc);
    
    app.set('view engine', 'ejs');

    app.use('/', express.static('./public'));

    app.use(cors());

    app.use(bodyParser.urlencoded({
        extended: false,
        limit: '5mb',
    }));

    app.use(bodyParser.json());

    app.get('/lessons',function (req,res) {
        let les = lessons.find({}).exec((e,r)=>{
            res.render('lessons',{lessons:r});
        });
    })

    app.post('/lessons',function (req,res) {
        var les = new lessons({
            ...req.body
        });
        les.save(function (err, les1) {
            if(err){
                console.log(err);
                res.send(err);
            } else {
                res.send(les1);
            }
        })
    })

    var httpServer = http.createServer(app);
    function onListening(){
        console.log('Оно запустилось!');
    }
    httpServer.on('listening', onListening);

    var port = process.env.PORT || 5000;
    httpServer.listen(port, onListening);
});
    

