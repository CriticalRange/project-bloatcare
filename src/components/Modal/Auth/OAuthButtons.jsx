// Don't forget to add "use client" when you get profile pictures working!
import { Button, Flex, Image, useToast } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

function OAuthButtons() {
  const toast = useToast();
  const [signInWithGoogle, user, loading, googleError] =
    useSignInWithGoogle(auth);

  const handleGoogleSignin = async () => {
    await signInWithGoogle();
  };

  return (
    <Flex direction="column">
      <Button isLoading={loading} onClick={handleGoogleSignin}>
        Continue with{" "}
        <Image
          src="images/google-logo.png"
          ml="2"
          width="6"
          height="6"
          alt="Google logo"
        />
      </Button>
    </Flex>
  );
}
export default OAuthButtons;
