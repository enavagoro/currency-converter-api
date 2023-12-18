import express from 'express';
import cors from 'cors';
import userRouter from './user/routes/user.route';
import authRouter from './authorization/routes/auth.route';
import conversionRouter from './conversion/routes/conversion.route';

import { connectToDb } from './shared/services/mongoose.service';

import * as dotenv from 'dotenv';
dotenv.config();

const app: express.Application = express();
const port: number | string = process.env.PORT || 3000;

app.set('port', port);
app.use(express.json());
app.use(cors());

try {
    express.Router();
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/conversion', conversionRouter);
    
    connectToDb();
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
} catch (err) {
    console.log('Error in server configuration');
}