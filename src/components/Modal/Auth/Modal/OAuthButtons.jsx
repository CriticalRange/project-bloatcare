import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase/clientApp";

function OAuthButtons() {
  const [signInWithGoogle, user, loading, googleError] =
    useSignInWithGoogle(auth);
  return (
    <Flex>
      <Button isLoading={loading} onClick={() => signInWithGoogle()}>
        Continue with{" "}
        <Image
          src="images/google-logo.png"
          ml="2"
          width="6"
          height="6"
          alt="Google logo"
        />
      </Button>
      {googleError && <Text>{googleError.message}</Text>}
    </Flex>
  );
}

export default OAuthButtons;
