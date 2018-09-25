const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(express.static('public'))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('requested main page');
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/form', (req, res) => {
    let parseObj = JSON.stringify(req.body.name) + '\n' + JSON.stringify(req.body.email) + '\n' + JSON.stringify(req.body.comment) + '\n \n \n';
    fs.appendFile('comments.txt', parseObj, function(err) {
        if(err) throw err;
    })
    res.send({item: 'recieved'})
})

app.get('/port/to-do', (req, res) => {
    res.sendFile(__dirname + '/views/port/to-do.html')
})

app.listen(port, () => {console.log(`Listening on port ${port}`)});