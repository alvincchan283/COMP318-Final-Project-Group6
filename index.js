import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import helper from './api/helper.js';

// Detect if openai api key exists in environment variable.
if (!process.env.OPENAI_API_KEY) {
    console.log("OpenAI API key was not found in environment variables. \nPlease create a .env file under the root folder of this project.\nThen, specify the api key by writing \"OPENAI_API_KEY=\", followed by your API key, thank you!");
    process.exit(1);
}

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', helper);

app.listen(3000, () => { console.log('Express server started.')});