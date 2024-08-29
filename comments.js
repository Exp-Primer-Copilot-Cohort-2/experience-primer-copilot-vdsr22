// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET /comments
app.get('/comments', function(req, res) {
  fs.readFile(__dirname + '/comments.json', 'utf8', function(err, data) {
    if (err) {
      res.status(500).send('Error reading comments.json');
    } else {
      res.send(data);
    }
  });
});

// POST /comments
app.post('/comments', function(req, res) {
  fs.readFile(__dirname + '/comments.json', 'utf8', function(err, data) {
    if (err) {
      res.status(500).send('Error reading comments.json');
    } else {
      var comments = JSON.parse(data);
      comments.push(req.body);
      var newComments = JSON.stringify(comments, null, 2);
      fs.writeFile(__dirname + '/comments.json', newComments, function(err) {
        if (err) {
          res.status(500).send('Error writing comments.json');
        } else {
          res.send(newComments);
        }
      });
    }
  });
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});