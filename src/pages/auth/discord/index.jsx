import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../firebase/clientApp";
import { useRecoilState } from "recoil";
import { discordButtonLoading } from "../../../atoms/discordButtonLoading";

const DiscordAuth = () => {
  const router = useRouter();
  const [discordOauthPassword, setDiscordOauthPassword] = useState({
    discordOauthPassword: "",
    discordOauthPasswordAgain: "",
  });
  const [discordLoading, setDiscordLoading] =
    useRecoilState(discordButtonLoading);
  const [accountCreatedBefore, setAccountCreatedBefore] = useState(false);
  const [userDataState, setUserDataState] = useState({
    email: "",
    avatarUrl: "",
    displayName: "",
  });
  const [authHandlerLoading, setAuthHandlerLoading] = useState(false);

  const code = router.query.code;
  const discordTokenURL = "https://discord.com/api/oauth2/token"; // Endpoint to get the access token
  const discordUserURL = "https://discord.com/api/users/@me"; // Endpoint to get the user data
  const redirectUri = "http://localhost:3000/auth/discord";

  useEffect(() => {
    DiscordOauthHandler();
  }, [code]);

  const DiscordOauthHandler = async () => {
    try {
      const tokenResponse = await axios.post(
        discordTokenURL,
        {
          client_id: "1133179039176208496",
          client_secret: "sSOGG8jhve0q2dxpUjgReJor_BvpCs3f",
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
          scope: "identify%20email",
          code: code,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const accessToken = tokenResponse.data.access_token;
      console.log(accessToken);

      const userResponse = await axios.get(discordUserURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = userResponse.data;
      console.log("User Data: ", userData);
      await fetchSignInMethodsForEmail(
        auth,
        `discord.${userResponse.data.email}`
      )
        .then(async (signInMethods) => {
          if (signInMethods.length === 0) {
            setAccountCreatedBefore(false);
            console.log("Not signed in yet, ", signInMethods);
          }
          setAccountCreatedBefore(true);
        })
        .catch((error) => {
          console.log(error);
        });
      setUserDataState({
        email: userData.email,
        avatarUrl: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`,
        displayName: userData.global_name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onDiscordOauthPasswordChange = (event) => {
    const { name, value } = event.target;
    setDiscordOauthPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDiscordFirebaseAuth = async (event) => {
    event.preventDefault();
    setAuthHandlerLoading(true);
    console.log(userDataState);
    if (
      discordOauthPassword.discordOauthPassword !==
        discordOauthPassword.discordOauthPasswordAgain ||
      discordOauthPassword.discordOauthPassword === "" ||
      discordOauthPassword.discordOauthPasswordAgain === ""
    ) {
      console.log("Passwords did not match!");
      setAuthHandlerLoading(false);
      return;
    }
    if (accountCreatedBefore) {
      await signInWithEmailAndPassword(
        auth,
        `discord.${userDataState.email}`,
        discordOauthPassword.discordOauthPassword
      );
      await updateProfile(auth.currentUser, {
        displayName: userDataState.displayName,
        photoURL: userDataState.avatarUrl,
      });
      console.log("Current user: ", auth.currentUser);
    } else {
      await createUserWithEmailAndPassword(
        auth,
        `discord.${userDataState.email}`,
        discordOauthPassword.discordOauthPassword
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
      <form onSubmit={handleDiscordFirebaseAuth}>
        <Text fontSize="2xl">
          For your security, please also{" "}
          {accountCreatedBefore ? "login with your" : "create a"} password.{" "}
        </Text>
        <Input
          mt="3"
          name="discordOauthPassword"
          onKeyDown={(event) => {
            if (event.code === "Space") event.preventDefault();
          }}
          onChange={onDiscordOauthPasswordChange}
          key="discordOauthPassword"
          placeholder="Password"
        />
        <Input
          mt="3"
          name="discordOauthPasswordAgain"
          onKeyDown={(event) => {
            if (event.code === "Space") event.preventDefault();
          }}
          onChange={onDiscordOauthPasswordChange}
          key="discordOauthPasswordAgain"
          placeholder="Password"
        />
        <Button isLoading={authHandlerLoading} type="submit" mt="4">
          Apply
        </Button>
      </form>
    </Flex>
  );
};

export default DiscordAuth;
