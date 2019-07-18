const fs = require('fs');
const { google } = require('googleapis');
const readline = require('readline');

exports.analyzeImage = async (req, res) => {
  handleCors(req, res);

  var authToken = req.body.auth;
  	console.log("authToken, using body, is: " + authToken);
  
  
  
  createSheet(authToken).then(sheet => {
    console.log("Created sheet!");
  }).catch(err => {
    console.log("Error: " + err);
  })
  
};

async function createSheet(authToken, labels, labelScores) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
   access_token: authToken
  });
  
  const sheet = google.sheets({version: 'v4', 
                              auth: oauth2Client
                             });  

  // Set authorization to create sheet.                                                     
  var request = {
    auth: oauth2Client,
  };
  
  // Make create request.
   sheet.spreadsheets.create(request, { 
  	}).then(function(response)  {
    // deal with response data
    var spreadsheetId = response.data.spreadsheetId;
    console.log("Spreadsheet ID: " + spreadsheetId);
   }).catch(function(err) { console.log("Caught error is: " + err) 
   });
}

handleCors = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  if (req.method == 'OPTIONS') {
    res.status(204).send('');
  }
}