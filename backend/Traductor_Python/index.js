const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/indexRoutes');
let app = express();
app.set('port', process.env.PORT || 4000);
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: true
}));
app.use('/', indexRoutes);
app.listen(app.get('port'), () => {
    console.log('Listening on', app.get('port'));
})