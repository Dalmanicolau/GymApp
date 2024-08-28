require('./db');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const memberRoutes = require('./routes/members');
const activityRoutes = require('./routes/activities');

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/members', memberRoutes);
app.use('/api/activities', activityRoutes);

app.listen(3001, () => {
    console.log('server running on port', 3001);
});