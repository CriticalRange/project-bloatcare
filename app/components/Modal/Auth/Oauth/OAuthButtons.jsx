"use client";

import { Box, Flex, IconButton, useToast } from "@chakra-ui/react";
import {
  useSignInWithFacebook,
  useSignInWithGithub,
  useSignInWithGoogle,
  useSignInWithMicrosoft,
  useSignInWithTwitter,
  useSignInWithYahoo,
} from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import {
  CustomAnimatedTwitchIcon,
  DiscordIcon,
  FacebookIcon,
  GithubIcon,
  GoogleIcon,
  MicrosoftIcon,
  TwitchIcon,
  TwitterIcon,
  YahooIcon,
} from "../../../Icons/Components/IconComponents";
import { discordButtonLoading } from "../../../atoms/authAtom";
import { twitchButtonLoading } from "../../../atoms/authAtom";
import { auth } from "../../../firebase/clientApp";

function OAuthButtons() {
  const toast = useToast();
  const [discordLoading, setDiscordLoading] =
    useRecoilState(discordButtonLoading);
  const [twitchLoading, setTwitchLoading] = useRecoilState(twitchButtonLoading);

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithYahoo, yahooUser, yahooLoading, yahooError] =
    useSignInWithYahoo(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);
  const [signInWithMicrosoft, microsoftUser, microsoftLoading, microsoftError] =
    useSignInWithMicrosoft(auth);
  const [signInWithTwitter, twitterUser, twitterLoading, twitterError] =
    useSignInWithTwitter(auth);
  const [signInWithFacebook, facebookUser, facebookLoading, facebookError] =
    useSignInWithFacebook(auth);

  // Handle mechanisms
  const handleGoogleSignin = async () => {
    await signInWithGoogle();
  };
  const handleFacebookSignin = async () => {
    await signInWithFacebook();
  };
  const handleGithubSignin = async () => {
    await signInWithGithub();
  };
  const handleMicrosoftSignin = async () => {
    await signInWithMicrosoft();
  };
  const handleTwitterSignin = async () => {
    await signInWithTwitter();
  };
  const handleYahooSignin = async () => {
    await signInWithYahoo();
  };
  const handleDiscordSignin = async () => {
    try {
      console.log("Handle discord sign in started.");
      setDiscordLoading(true);
      const discordClientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
      const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&redirect_uri=${window.location.origin}/auth/discord&response_type=code&scope=identify%20email`;
      const width = 600; // Popup pencerenin genişliği
      const height = 600; // Popup pencerenin yüksekliği
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;
      const options = `width=${width}, height=${height}, top=${top}, left=${left}`;
      const popupWindow = window.open(discordAuthUrl, "_blank", options);

      // Check if the popup is closed every 500ms
      const interval = window.setInterval(() => {
        if (popupWindow.closed) {
          console.log("Discord popup closed.");
          setDiscordLoading(false);
          // Clear the interval once the popup is closed
          window.clearInterval(interval);
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };
  const handleTwitchSignin = async () => {
    try {
      console.log("Handle twitch sign in started.");
      setTwitchLoading(true);
      const twitchClientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
      const twitchAuthUrl = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${twitchClientId}&redirect_uri=${window.location.origin}/auth/twitch&scope=user%3Aread%3Aemail&force_verify=true`;
      const width = 600; // Popup pencerenin genişliği
      const height = 600; // Popup pencerenin yüksekliği
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;
      const options = `width=${width}, height=${height}, top=${top}, left=${left}`;
      const popupWindow = window.open(twitchAuthUrl, "_blank", options);

      // Check if the popup is closed every 500ms
      const interval = window.setInterval(() => {
        if (popupWindow.closed) {
          console.log("Twitch popup closed.");
          setTwitchLoading(false);
          // Clear the interval once the popup is closed
          window.clearInterval(interval);
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      direction="column"
      p="5"
      w="full"
      justify="space-evenly"
      align="center"
      bg="customWhite"
      _dark={{ bg: "customGray" }}
    >
      <Flex
        direction="row"
        w="full"
        justify="space-evenly"
        align="center"
        bg="customWhite"
        _dark={{ bg: "customGray" }}
      >
        <Box>
          <IconButton
            isLoading={googleLoading}
            onClick={handleGoogleSignin}
            aria-label="Sign in with Google"
            icon={<GoogleIcon w="10" h="10" />}
          ></IconButton>
        </Box>
        {" • "}
        <Box>
          <IconButton
            isLoading={yahooLoading}
            onClick={handleYahooSignin}
            aria-label="Sign in with Yahoo"
            icon={<YahooIcon w="10" h="10" fill="#5f01d3" />}
          ></IconButton>
        </Box>
        {" • "}
        <Box>
          <IconButton
            isLoading={githubLoading}
            onClick={handleGithubSignin}
            aria-label="Sign in with Github"
            icon={
              <GithubIcon
                w="10"
                h="10"
                fill="black"
                _dark={{ fill: "white" }}
                fillRule="evenodd"
                clipRule="evenodd"
              />
            }
          ></IconButton>
        </Box>
        {" • "}
        <Box>
          <IconButton
            isLoading={discordLoading}
            onClick={handleDiscordSignin}
            aria-label="Sign in with Discord"
            icon={<DiscordIcon h="10" w="10" color="#5562ea" />}
          />
        </Box>
      </Flex>
      <Flex
        mt="5"
        direction="row"
        w="full"
        justify="space-evenly"
        align="center"
        bg="customWhite"
        _dark={{ bg: "customGray" }}
      >
        <Box>
          <IconButton
            isLoading={microsoftLoading}
            onClick={handleMicrosoftSignin}
            aria-label="Sign in with Microsoft"
            icon={<MicrosoftIcon w="8" h="8" />}
          ></IconButton>
        </Box>
        {" • "}
        <Box>
          <IconButton
            isLoading={twitterLoading}
            onClick={handleTwitterSignin}
            aria-label="Sign in with Twitter"
            icon={<TwitterIcon h="10" w="10" color="#1d9bf0" />}
          ></IconButton>
        </Box>
        {" • "}
        <Box>
          <IconButton
            isLoading={facebookLoading}
            onClick={handleFacebookSignin}
            aria-label="Sign in with Facebook"
            icon={<FacebookIcon h="10" w="10" color="#1877f2" />}
          ></IconButton>
        </Box>
        {" • "}
        <Box>
          <IconButton
            isLoading={twitchLoading}
            onClick={handleTwitchSignin}
            aria-label="Sign in with Twitch"
            icon={<CustomAnimatedTwitchIcon w="10" h="10" fill="#a970ff" />}
          ></IconButton>
        </Box>
      </Flex>
    </Flex>
  );
}
export default OAuthButtons;
