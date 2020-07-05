var express = require('express')
var fs = require('fs');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(cors());
const data = require('./data/data');
let users = {};

app.get('/', function (req, res) {
    res.send('<h1>Scalez Server in on</h1>')
});


app.get('/products', function (req, res) {
    let offset = Math.ceil(Math.random() * data.products.length - data.appSettings.ratingExperienceProducts);
    res.send(data.products.slice(offset, offset+data.appSettings.ratingExperienceProducts));
});

app.post('/products-by-ids', function (req, res) {
    res.send(data.products.filter(product => req.body.includes(product._id)));
});

app.get('/app-settings', function (req, res) {
    res.send(data.appSettings);
});

app.get('/user-history', function (req, res) {
    const userHistory = users[req.query.userId];
    res.send(userHistory);
});

app.post('/user-history', function (req, res) {
    if (req.body && req.body.userId) {
        if (!users[req.body.userId]) {
            users[req.body.userId] = [];
        }
        users[req.body.userId].push({
            timestamp: new Date(),
            ratingButtonsModeA : req.body.ratingButtonsModeA,
            history: req.body.userHistory
        });
        res.send({success: true, message: 'data saved'});
    } else {
        res.send({success: false, message: 'user id must be not empty'});
    }

});


app.listen(process.env.PORT || 1000, () => {
    console.log('SERVER LISTENING..');

})
