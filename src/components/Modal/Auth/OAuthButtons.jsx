// Don't forget to add "use client" when you get profile pictures working!
import { Button, Flex, Image } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { useRecoilState } from "recoil";
import { oauthErrorAtom } from "../../../atoms/oauthErrorAtom";

function OAuthButtons() {
  const [signInWithGoogle, user, loading, googleError] =
    useSignInWithGoogle(auth);

  const [oauthError, setOauthError] = useRecoilState(oauthErrorAtom);

  return (
    <Flex direction="column">
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
    </Flex>
  );
}
export default OAuthButtons;
