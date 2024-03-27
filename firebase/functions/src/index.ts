// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import { logger } from "firebase-functions";
import { onRequest } from "firebase-functions/v2/https";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

// The Firebase Admin SDK to access Firestore.
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";


initializeApp();


exports.addmessage = onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await getFirestore()
    .collection("messages")
    .add({original: original});
  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

exports.makeUppercase = onDocumentCreated("/messages/{documentId}", (event) => {
    const original = event.data?.data().original;
    logger.log("Uppercasing", event.params.documentId, original);

    const uppercase = original.toUpperCase();

    return event.data?.ref.set({uppercase}, {merge: true});
});