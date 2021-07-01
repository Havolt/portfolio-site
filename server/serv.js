const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path')
const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');
const portfolioLinks = ['to-do', 'calculator', 'checkers', 'nc-creepy', 'offline-hacker', 'prev-portfolio', 'tetris', 'wiki-search'];

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/markfz.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/markfz.com/cert.pem')
  };

app.use(express.static('public'))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('requested main page');
    res.sendFile(path.resolve(__dirname + '/../views/index.html'));
});

var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", 
    secureConnection: false, 
    port: 587, 
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: 'markfitz101@hotmail.com', 
        pass: ''
    }
});


        

app.post('/form', (req, res) => {
    let parseObj = JSON.stringify(req.body.name) + '\n' + JSON.stringify(req.body.email) + '\n' + JSON.stringify(req.body.comment) + '\n \n \n';
    
    // const mailOpt = {
    //     from: 'Portfolio ✔ <markfitz101@hotmail.com>',
    //     to: 'markfitz815@gmail.com',
    //     subject: "Portfolio Message",
    //     text: 'Hello ' + parseObj,
    //     html: "<p>Hello " + parseObj + " </p>",
    //     bcc: "markfitz815@gmail.com"
    // };
    // transporter.sendMail(mailOpt, function(error, inf){
    //     if(error){
    //         console.log(error);
    //     }else{
    //         console.log('Message sent: ' + inf.response);
    //     }
    // });    
    fs.appendFile('comments.txt', parseObj, function(err) {
        if(err) throw err;
    })
    res.send({item: 'recieved'})
})

for(let i = 0; i < portfolioLinks.length; i++) {
    app.get(`/port/${portfolioLinks[i]}`, (req, res) => {
        res.sendFile(path.resolve(`${__dirname}/../views/port/${portfolioLinks[i]}.html`))
    })
}

app.listen(port, () => {console.log(`Listening on port ${port}`)});