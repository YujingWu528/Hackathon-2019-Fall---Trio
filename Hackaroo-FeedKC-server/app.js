/**const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://feedkc:feedkc@hackaroo2019-ow7op.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("feedkc");
  dbo.collection("user").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.firstname);
    db.close();
  });
});*/


/**
 * Created by user on 23/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var resultF = "";
var docs ="";
var all ="";
var queue = "";
var deleteF = false;
var inserted = false;
var gotQueue = false;
var port = process.env.PORT || 8081;


var url = 'mongodb+srv://feedkc:feedkc@hackaroo2019-ow7op.mongodb.net/test?retryWrites=true&w=majority';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/adduser', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("feedkc");
    //var myobj = { firstname: req.query.firstname, lastname: req.query.lastname, phone: req.query.phone, email: req.query.email, username:req.query.username, password: req.query.password, is_donor: req.query.is_donor };
    //console.log(req.body)
    dbo.collection("user").insertOne(req.body, function(err, result) {
      if (err) throw err;
      //console.log(req.query)
      console.log("1 document inserted");
      res.status(200).send(true)
      db.close();
    });
  });
})

app.post('/additem', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("feedkc");
    //var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("available_items").insertOne(req.body, function(err, result) {
      if (err) throw err;
      console.log("1 document inserted");
      res.status(200).send(true)
      db.close();
    });
  });
})

app.get('/availableitems', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("feedkc");
    dbo.collection("available_items").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).send(result);
      db.close();
    });
  });
})

app.get('/alluser', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("feedkc");
    dbo.collection("user").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).send(result);
      db.close();
    });
  });
})

app.get('/username', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("feedkc");
    //var query = { username: "Park Lane 38" };
    dbo.collection("user").find({username: req.query.username}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).send(result)
      db.close();
    });
  });
})

app.get('/getitembyuserid', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("feedkc");
    console.log(req.query.id);
    //var query = { username: "Park Lane 38" };
    dbo.collection("available_items").find({user_id: req.query.id}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).send(result)
      db.close();
    });
  });
})

app.get('/cart', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("feedkc");
    //var query = { username: "Park Lane 38" };
    dbo.collection("cart").find({user_id: req.query.userid}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).send(result)
      db.close();
    });
  });
})

app.post('/addtocart', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("feedkc");
    var ObjectId = require('mongodb').ObjectID;
    var myobj={};

    console.log(req.body.item_id);
    dbo.collection("available_items").find({_id: new ObjectId(req.body.item_id)}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      //res.status(200).send(result)
      //myobjstr = { item_type: result[0].item_type, donate_address: result[0].donate_address ,donate_date: result[0].donate_date,donate_quantity: result[0].donate_quantity, receiver_user_id:req.body.receiver_user_id,item_id:req.body.item_id};
     myobj = { item_type: result[0].item_type, donate_address: result[0].donate_address ,donate_date: result[0].donate_date,donate_quantity: result[0].donate_quantity, receiver_user_id:req.body.receiver_user_id,item_id:req.body.item_id};
      //myobj = JSON.stringify(temp);
     console.log("temp object " + myobj);
      //db.close();
      setTimeout(function() {
        console.log('Blah blah blah blah extra-blah');
      }, 4000);
    });
console.log("now " +myobj);
    dbo.collection("cart").insertOne(myobj, function(err, result) {
      if (err) throw err;
      console.log(myobj);
      console.log("1 document inserted");
      //res.status(200).send(true)
      //db.close();
    });



    dbo.collection("donations").insertOne(myobj, function(err, result) {
      if (err) throw err;
      console.log("1 document inserted");
      //res.status(200).send(true)
      //db.close();
    });

      /*dbo.collection("cart").insertOne(JSON.parse(myobj)), function(err, result) {
        if (err) throw err;
        console.log(myobj);
        console.log("1 document inserted");
        //res.status(200).send(true)
        //db.close();
      });
      dbo.collection("donations").insertOne(JSON.parse(myobj)), function(err, result) {
        if (err) throw err;
        console.log(myobj);
        console.log("1 document inserted");
        //res.status(200).send(true)
//db.close();
      });*/

      var myquery = { _id: new ObjectId(req.body.item_id) };
      dbo.collection("available_items").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log(myquery);
        console.log("1 document deleted");
        //res.status(200).send(true)
      });
      db.close();
  });
})

app.post('/addtodonations', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("feedkc");
    dbo.collection("donations").insertOne(req.query, function(err, result) {
      if (err) throw err;
      console.log("1 document inserted");
      res.status(200).send(true)
      db.close();
    });
  });
})

app.get('/getdonations', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("feedkc");
    //var query = { username: "Park Lane 38" };
    dbo.collection("donations").find({_id: req.query.userid}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).send(result)
      db.close();
    });
  });
})

app.post('/addtoorders', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("feedkc");
    dbo.collection("orders").insertOne(req.query, function(err, result) {
      if (err) throw err;
      console.log("1 document inserted");
      res.status(200).send(true)
      db.close();
    });
  });
})

app.get('/getorders', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("feedkc");
    //var query = { username: "Park Lane 38" };
    dbo.collection("orders").find({_id: req.query.userid}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).send(result)
      db.close();
    });
  });
})

app.listen(port, function() {
  console.log('app running')
})