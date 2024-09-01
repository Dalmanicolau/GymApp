import './db.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import memberRoutes from './routes/members.js';
import activityRoutes from './routes/activities.js';
import userRoutes from './routes/users.js';


const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/members', memberRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/users', userRoutes);

app.listen(3001, () => {
    console.log('server running on port', 3001);
});
