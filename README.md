# Automatically create a Google Spreadsheet when user signs in.

_Use client/server relationships and GCF to create a new Google Spreadsheet._

Last updated: July, 2019

This solution uses [Google Cloud Functions][g-c-f] to automatically create
a new Google Spreadsheet in the end-user's account, when the end-user
signs in. The client (JavaScript in HTML) obtains end-user authentication &
sends it in as a parameter of a 'POST' request to the server (GCF written in
Node.js). The server then makes a call to the [Google Sheets API][sheets-api],
creates a new Spreadsheet, and sends back its URL to the client. Lastly, the 
client displays the sheet's URL as a link to the end-user.

[g-c-f]: https://cloud.google.com/functions
[sheets-api]: https://developers.google.com/sheets/api/

## Technology highlights

- The client makes a 'POST' request to the Google Cloud Function, securely
  sending an authorization parameter.
- The server makes a call to the Google Sheets API.
- The client deals with the GCF's response, and displays it appropriately.



## Try it

First, set up Google Calendar:

1. Open [Google Calendar][calendar] in your browser.
1. [Create a new calendar][calendar_setup] called "Team Vacations".
1. Still in the settings screen, select the new calendar from the left menu.
1. Scroll to **Integrate calendar** and copy the value under **Calendar ID**.

You can view the corresponding [blog post][blog-post] where I discuss client/
server relationships. 

[blog-post]: https://medium.com/@yoyomade/the-its-complicated-relationship-between-client-server-5da472ef0c50?sk=ba060127b5a266f2a084bdea18eb6d7a
