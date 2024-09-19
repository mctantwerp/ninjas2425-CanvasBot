
const helperFunctions = require("./functions.js");

//we use env file for secret tokens
require("dotenv").config();

//using the package discord.js
const { Client, IntentsBitField } = require("discord.js");

//Api url
const apiUrl = "https://canvas.kdg.be/api/v1/announcements?context_codes[]=course_49719";
const apiKey = process.env.CANVAS_API;

const requestOptions = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${apiKey}`
    }
};

//creating a new client
//intents are used to specify what events the bot should listen to
//in this case, the bot will listen to guilds, guild members, guild messages, and guild message content (guild in discord is a server)
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

//logs the bot in using the token
client.login(process.env.DISCORD_TOKEN);

//when the bot is ready, it will log "ready" to the console
client.on("ready", (c) => {
  console.log(c.user.tag + " has started");
});



//fetching data from the api
fetch(apiUrl, requestOptions)
    .then(response=> {
        if(!response.ok){
            throw new Error('Network response was not ok!');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        helperFunctions.handleData(data, client);
    })
    .catch(error =>{
        console.error('Error:', error);
    });






//when the bot receives a message, it will respond with "pong"
client.on("messageCreate", (message) => {
  console.log(message.content);
  if (message.content === "ping") {
    message.reply();
  } else if (message.content === "salam") {
    message.reply("aleikum ");
  } else if (message.content === "marco") {
    message.reply("polo");
  } else if (message.content === "lepel") {
    message.reply("tepel");
  }
});
