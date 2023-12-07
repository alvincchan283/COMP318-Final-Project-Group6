import express from 'express';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/', async (req, res) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ 'role': 'user', content: req.body.text }]
    });

    res.send({
        response: completion.choices[0]?.message?.content
    });
});

app.listen(3000, () => { console.log('Express server started.' )});