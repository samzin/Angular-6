const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();

// Pass `compression` as a middleware!
app.use(compression());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'dist/')));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});

const port = process.env.PORT || 80;
app.listen(port);

console.log('App is running on port ' + port);
