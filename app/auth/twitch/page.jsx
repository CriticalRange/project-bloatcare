"use client";

import { Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { CustomAnimatedLoadingSpinnerIcon } from "../../components/Icons/Components/IconComponents";

const TwitchAuth = ({ searchParams }) => {
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

  const code = searchParams.code;
  const twitchTokenURL = "https://id.twitch.tv/oauth2/token";
  const twitchUserURL = "https://api.twitch.tv/helix/users";
  const redirectUri = `${window.location.origin}/auth/twitch`;
  const twitchClientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
  const twitchClientSecret = process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET;

  useEffect(() => {
    TwitchOauthHandler();
  }, [code]);

  useEffect(() => {
    console.log(accountCreatedBefore);
  }, [accountCreatedBefore]);

  const TwitchOauthHandler = async () => {
    /* try {
      const tokenResponse = await axios.post(
        twitchTokenURL,
        {
          client_id: twitchClientId,
          client_secret: twitchClientSecret,
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

      const userInfoResponse = await axios.get(twitchUserURL, {
        headers: {
          "Client-Id": twitchClientId,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = userInfoResponse.data.data[0];
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
    } */
  };

  /* const onTwitchOauthPasswordChange = (event) => {
    const { name, value } = event.target;
    setTwitchOauthPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTwitchAuth = async (event) => {
    event.preventDefault();
    setAuthHandlerLoading(true);
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
  }; */

  return (
    <Flex w="90%" h="300" mt="10" mx="5" direction="column">
      <form /* onSubmit={handleTwitchAuth} */>
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
          /* onChange={onTwitchOauthPasswordChange} */
          key="twitchOauthPassword"
          placeholder="Password"
        />
        <Input
          mt="3"
          name="twitchOauthPasswordAgain"
          onKeyDown={(event) => {
            if (event.code === "Space") event.preventDefault();
          }}
          /* onChange={onTwitchOauthPasswordChange} */
          key="twitchOauthPasswordAgain"
          placeholder="Password Again"
        />
        <Button
          isDisabled={authHandlerLoading}
          aria-label="Apply"
          type="submit"
          mt="4"
        >
          {authHandlerLoading ? (
            <CustomAnimatedLoadingSpinnerIcon
              w="10"
              h="10"
              top="50%"
              left="50%"
              transform="translate(15%, 15%)"
            />
          ) : (
            "Apply"
          )}
        </Button>
      </form>
    </Flex>
  );
};

export default TwitchAuth;
