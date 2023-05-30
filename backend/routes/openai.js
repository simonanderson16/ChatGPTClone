var express = require("express");
var router = express.Router();
require('dotenv').config()

const {Configuration} = require('openai');
const {OpenAIApi} = require('openai');


// import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-m6G5Z8iC517W4sc3RNfD1Hm6",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateResponse = async (message) => {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{role: 'user', content: message}],
    })
    return response.data.choices[0].message.content; //response.data??
};


router.get("/", function(req, res, next) {
    res.send("chatbot api");
});

// send message and get response from chatbot
router.post("/send", async (req, res, next) => {
    const message = req.body.message;
    const response = await generateResponse(message);
    res.json({result: response})
  })

  module.exports = router;