const express = require('express');
const session = require('express-session');
const compress = require('compression');
const path = require('path');
const bodyParser = require('body-parser');

// dotenv
require('dotenv').config()
// heroku
// const sslRedirect = require('heroku-ssl-redirect');

const app = express();


// heroku
// app.use(sslRedirect());


const sessionsObj = {
  secret: "photoMeetUp",
  resave: "false",
  saveUninitialized: "false",
  cookie: {}
};

const buildPath = path.join(__dirname, '..', 'build');
app.use(session(sessionsObj));
app.use(express.static(buildPath));
app.use(compress());

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));


// ALL ROUTES WILL GO HERE
app.use(require('./Routes/user'))
app.use(require('./Routes/images'))
app.get('/checklogged', (req,res)=>{
    if(req.session.user){
        res.send({user: req.session.user})
    }else{
        res.send({error:'no-user'})
    }
})
// frontend entry
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build/index.html'));
});



// Handles unknown routes
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    console.log(err);
    res.send('404: Page Not Found');
    next(err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});
