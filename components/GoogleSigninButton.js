import { Button } from "@chakra-ui/react";
import {
  googleProvider,
  firebaseAuth,
} from "../firebase/config/firebase.config";
import { signInWithPopup } from "firebase/auth";

function GoogleSigninButton() {
  const googleSignIn = () => {
    signInWithPopup(firebaseAuth, googleProvider)
      .then((result) => {
        console.log("Login with google: successful");
      })
      .catch((error) => {
        console.log("Login with google: failed", error);
      });
  };

  return (
    <div>
      <Button onClick={googleSignIn}>Login with google</Button>
    </div>
  );
}

export default GoogleSigninButton;
