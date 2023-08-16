"use client";

// common errors when signing in/up (Documentation: https://firebase.google.com/docs/auth/admin/errors?hl=en)
export const FIREBASE_ERRORS = {
  "Firebase: Error (auth/email-already-in-use).":
    "A user with that email is already in use.",
  "Firebase: Password should be at least 6 characters (auth/weak-password).":
    "Password is too weak.",
  "Firebase: Error (auth/invalid-email).": "Email is invalid.",
  "Firebase: Error (auth/user-not-found).": "Email is invalid.",
  "Firebase: Error (auth/wrong-password).": "Wrong password.",
};
