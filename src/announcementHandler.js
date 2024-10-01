const API = require("./APICalls.js");
const sendMessage = require("./sendMessageChannel.js");
const helperFunctions = require("./helperFunctions.js");

async function postAnnouncementsFromDatabaseToDiscord(db, client, requestOptions) {
  //get database items, return array
  const [results] = await db.query("SELECT * FROM courses");
  //loop through array, get api url and channel id for each row
  results.forEach(async courses => {
    var apiUrl = courses.api_url;
    var discordChannel = courses.channeldiscord_id;
    //wait for api call to be resolved...
    var apiCall = await API.canvasAPICall(apiUrl, requestOptions, client)
    //send message to specific channel
    sendMessage.sendMessageToChannel(client, apiCall, discordChannel.toString());
  });
}



async function saveAnnouncement(announcement, db, announcementHTMLtoText, course_id) {
  await db.query('INSERT INTO announcements (canvas_id, title, description, posted_at, course_id) VALUES (?, ?, ?, ?, ?)', [announcement.id, announcement.title, announcementHTMLtoText, announcement.created_at, course_id]);
}


async function getPostedAnnouncements(db) {
  const [rows] = await db.query('SELECT canvas_id FROM announcements');
  // return an array of IDs
  return rows.map(row => row.canvas_id);
}


async function fetchCourseNameById(courseId, db) {
  try {
    const [rows] = await db.query(`
      SELECT courses.name AS course_name 
      FROM announcements 
      INNER JOIN courses ON courses.course_id = announcements.course_id 
      WHERE announcements.course_id = ?
    `, [courseId]);

    // Check if any rows were returned
    if (rows.length === 0) {
      console.log(`No course found for course ID: ${courseId}`);
      return null; // Return null if no course is found
    }

    // Return the course name
    return rows[0].course_name;
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = {
  postAnnouncementsFromDatabaseToDiscord,
  saveAnnouncement,
  getPostedAnnouncements,
  fetchCourseNameById
};
