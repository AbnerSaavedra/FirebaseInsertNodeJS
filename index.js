const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nodejsinsert.firebaseio.com"
});

const db = admin.firestore();

exports.app = functions.https.onRequest(app);

// Hello world
app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello World!');
});

// Create
app.post('/api/create', (req, res) => {
    (async () => {
        var random = Math.random().toString(16).substring(2, 7).toUpperCase();
        var item = "#QPI" + random;
        try {
          await db.collection('items').doc('item' + random).create({ID: item});
          return res.status(200).send(res.data);
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      })();
  });

/* // create
app.post('/api/create', (req, res) => {
    (async () => {
        try {
          await db.collection('items').doc('/' + req.body.id + '/').create({item: req.body.item});
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      })();
  }); */

































// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


