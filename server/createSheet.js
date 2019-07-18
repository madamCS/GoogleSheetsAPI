const fs = require('fs');
const { google } = require('googleapis');
const readline = require('readline');

/**
 * HTTP Cloud Function that obtains authentication from 
 * client & makes calls to helper functions.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.analyzeImage = async (req, res) => {
  handleCors(req, res);

  // Obtain authentication from server request.
  var authToken = req.body.auth;
 
  createSheet(authToken).then(sheet => {
    console.log("Created sheet");
  }).catch(err => {
    console.log("Error: " + err);
  })
};

/**
 * Helper function that uses the Google Sheets API
 * to create a new Spreadsheet.
 *
 * @param {String} authToken authentication from server request.
 */
async function createSheet(authToken) {
  // Initialize new oAuth2 client.
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
   access_token: authToken
  });
  
  // Create new authorized Google Sheets client.
  const sheet = google.sheets({version: 'v4', 
                              auth: oauth2Client
                             });  

  // Set request to create sheet.                                                     
  var request = {
    auth: oauth2Client,
  };
  
  // Make create request to the Sheets API.
   sheet.spreadsheets.create(request, { 
  	}).then(function(response)  {
    // Deal with response data.
    var spreadsheetId = response.data.spreadsheetId;
    console.log("Spreadsheet ID: " + spreadsheetId);
   }).catch(function(err) { console.log("Caught error is: " + err) 
   });
}

/**
 * HTTP function that supports CORS requests.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
handleCors = (req, res) => {
  // Sets CORS headers for preflight requests
  // Allows GETs from any origin with the Content-Type header
  // Caches preflight response for 3600s
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  if (req.method == 'OPTIONS') {
    res.status(204).send('');
  }
}