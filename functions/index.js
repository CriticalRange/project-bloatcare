const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios").default;

admin.initializeApp();

const db = admin.firestore();

exports.applyDummyImage = functions.firestore
  .document("posts/{postId}")
  .onCreate(async (snapshot, context) => {
    const postData = snapshot.data();
    const communityId = "Dummy"; // Replace with the communityId you are looking for

    if (postData.communityId === communityId) {
      const imageURL = "https://picsum.photos/1920/1080";
      try {
        const response = await axios.get(imageURL, {
          maxRedirects: 5,
          validateStatus: null,
        });
        console.log(
          "FIREBASE: Response url please work: ",
          response.request.res.responseUrl
        );
        const redirectedURL = response.request.res.responseUrl;
        // Update the document with the new redirectedURL
        await snapshot.ref.update({ imageURL: redirectedURL });
        console.log("Dummy image applied for postId:", context.params.postId);
      } catch (error) {
        console.error(
          "Error applying dummy image for postId:",
          context.params.postId,
          error
        );
      }
    }
    return null;
  });

exports.createUserDocument = functions.auth.user().onCreate(async (user) => {
  // Create a user document inside the "users" collection to make changes whenever needed
  db.collection("users")
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(user)));
  // Inside the user document, create a communitySnippets collection to hold the communities visited/joined
  db.collection("users")
    .doc(user.uid)
    .collection("communitySnippets")
    .doc("template")
    .set({ communityId: "template", isJoined: true, isModerator: false });
});
