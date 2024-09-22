const bot = require("./initBot.js");
const client = bot.initBot();
const API = require("./APICalls.js");
const sendMessage = require("./sendMessageChannel.js");

//we use env file for secret tokens
require("dotenv").config();



const helperFunctions = require("./helperFunctions.js");
const announcementHandler = require("./announcementHandler.js");
const requestOptions = require("./requestOptions.js");


//Api urls
const apiUrl = "https://canvas.kdg.be/api/v1/announcements?context_codes[]=course_49719";
const apiUrl2 = "https://canvas.kdg.be/api/v1/announcements?context_codes[]=course_9656";
const apiUrl3 = "https://canvas.kdg.be/api/v1/announcements?context_codes[]=course_49715";

//when the bot is ready, execute the following code
client.on("ready", async () => {
  console.log(`Bot is online.`);


  //make connection to database
  const db = await require("./initDB.js").createDbConnection();

  //API stuff
  //message = await API.canvasAPICall(apiUrl2, requestOptions.basic, client);
  //await sendMessage.sendMessageToChannel(client, message, process.env.ANNOUNCEMENT_CHANNEL_ID);

  //get announcements from DB and post in the right discord channel
  //announcementHandler.postAnnouncementsFromDatabaseToDiscord(db, client, requestOptions.basic);


  API.pollingCanvasAPICall(apiUrl, requestOptions.basic, 1500, client);
  //sendMessage.sendMessageToChannel(client, await API.pollingCanvasAPICall(apiUrl, requestOptions.basic, 1500, client), "1287211078249611287");
});





//when the bot receives a message, it will respond with "pong"
client.on("messageCreate", (message) => {
  console.log(message.content);
  if (message.content === "ping") {
    message.reply("pong");
  } else if (message.content === "salam") {
    message.reply("aleikum ");
  } else if (message.content === "marco") {
    message.reply("polo");
  } else if (message.content === "lepel") {
    message.reply("tepel");
  }
});


module.exports = {
  client,
}
