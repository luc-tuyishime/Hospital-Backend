import express from 'express';
import bodyParser from 'body-parser';
import router from './server/src/routes';
import './server/src/jobs';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use('/api/v1/', router);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to Hospital Backend APIs.'
}));

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

export default app;