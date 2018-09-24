const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(express.static('public'))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('requested main page');
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/form', (req, res) => {
    console.log(req.body);
    res.send('thanks')
})

app.listen(port, () => {console.log(`Listening on port ${port}`)});