import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { twitchButtonLoading } from "../../../atoms/twitchButtonLoading";
import axios from "axios";
import { auth } from "../../../firebase/clientApp";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const TwitchAuth = () => {
  const router = useRouter();
  const [twitchOauthPassword, setTwitchOauthPassword] = useState({
    twitchOauthPassword: "",
    twitchOauthPasswordAgain: "",
  });
  const [accountCreatedBefore, setAccountCreatedBefore] = useState(false);
  const [userDataState, setUserDataState] = useState({
    email: "",
    avatarUrl: "",
    displayName: "",
  });
  const [authHandlerLoading, setAuthHandlerLoading] = useState(false);

  const code = router.query.code;
  const twitchTokenURL = "https://id.twitch.tv/oauth2/token";
  const twitchUserURL = "https://api.twitch.tv/helix/users";
  const redirectUri = "http://localhost:3000/auth/twitch";

  useEffect(() => {
    TwitchOauthHandler();
  }, [code]);

  useEffect(() => {
    console.log(accountCreatedBefore);
  }, [accountCreatedBefore]);

  const TwitchOauthHandler = async () => {
    try {
      const tokenResponse = await axios.post(
        twitchTokenURL,
        {
          client_id: "g76y1y24qtcenhbrkb0m6b5usr79zb",
          client_secret: "pzvlyyei0y2ymhwn70l2amsf4lkap3",
          code: code,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const accessToken = tokenResponse.data.access_token;
      console.log(accessToken);

      const userInfoResponse = await axios.get(twitchUserURL, {
        headers: {
          "Client-Id": "g76y1y24qtcenhbrkb0m6b5usr79zb",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = userInfoResponse.data.data[0];
      console.log("User data: ", userData.email);
      await fetchSignInMethodsForEmail(auth, `twitch.${userData.email}`)
        .then(async (signInMethods) => {
          if (signInMethods.length === 0) {
            setAccountCreatedBefore(false);
            console.log(
              "Not signed in yet, ",
              accountCreatedBefore,
              signInMethods
            );
          } else {
            setAccountCreatedBefore(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setUserDataState({
        email: userData.email,
        avatarUrl: `${userData.profile_image_url}`,
        displayName: userData.display_name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onTwitchOauthPasswordChange = (event) => {
    const { name, value } = event.target;
    setTwitchOauthPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTwitchFirebaseAuth = async (event) => {
    event.preventDefault();
    setAuthHandlerLoading(true);
    console.log(userDataState);
    if (
      twitchOauthPassword.twitchOauthPassword !==
        twitchOauthPassword.twitchOauthPasswordAgain ||
      twitchOauthPassword.twitchOauthPassword === "" ||
      twitchOauthPassword.twitchOauthPasswordAgain === ""
    ) {
      console.log("Passwords did not match!");
      setAuthHandlerLoading(false);
      return;
    }
    if (accountCreatedBefore) {
      await signInWithEmailAndPassword(
        auth,
        `twitch.${userDataState.email}`,
        twitchOauthPassword.twitchOauthPassword
      );
      await updateProfile(auth.currentUser, {
        displayName: userDataState.displayName,
        photoURL: userDataState.avatarUrl,
      });
      console.log("Current user: ", auth.currentUser);
    } else {
      await createUserWithEmailAndPassword(
        auth,
        `twitch.${userDataState.email}`,
        twitchOauthPassword.twitchOauthPassword
      );
      await updateProfile(auth.currentUser, {
        displayName: userDataState.displayName,
        photoURL: userDataState.avatarUrl,
      });
    }
    setAuthHandlerLoading(false);
    window.close();
  };

  return (
    <Flex w="90%" h="300" mt="10" mx="5" direction="column">
      <form onSubmit={handleTwitchFirebaseAuth}>
        <Text fontSize="2xl">
          For your security, please also{" "}
          {accountCreatedBefore ? "login with your" : "create a"} password.{" "}
        </Text>
        <Input
          mt="3"
          name="twitchOauthPassword"
          onKeyDown={(event) => {
            if (event.code === "Space") event.preventDefault();
          }}
          onChange={onTwitchOauthPasswordChange}
          key="twitchOauthPassword"
          placeholder="Password"
        />
        <Input
          mt="3"
          name="twitchOauthPasswordAgain"
          onKeyDown={(event) => {
            if (event.code === "Space") event.preventDefault();
          }}
          onChange={onTwitchOauthPasswordChange}
          key="twitchOauthPasswordAgain"
          placeholder="Password Again"
        />
        <Button isLoading={authHandlerLoading} type="submit" mt="4">
          Apply
        </Button>
      </form>
    </Flex>
  );
};

export default TwitchAuth;
