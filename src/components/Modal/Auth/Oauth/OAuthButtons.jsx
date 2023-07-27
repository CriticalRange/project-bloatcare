// Don't forget to add "use client" when you get profile pictures working!
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  Image,
  Text,
  createIcon,
  useToast,
} from "@chakra-ui/react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { FaDiscord } from "react-icons/fa";
import { addDoc, collection } from "firebase/firestore";
import { auth, firestore } from "../../../../firebase/clientApp";
import {
  BsDiscord,
  BsFacebook,
  BsGithub,
  BsMicrosoft,
  BsTwitter,
} from "react-icons/bs";
import MicrosoftSvg from "./Icons/MicrosoftSvg";
import GoogleSvg from "./Icons/GoogleSvg";
import GithubSvg from "./Icons/GithubSvg";
import { BiLogoYahoo } from "react-icons/bi";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import {
  fetchSignInMethodsForEmail,
  signInWithCredential,
} from "firebase/auth";
import {
  useSignInWithFacebook,
  useSignInWithGithub,
  useSignInWithGoogle,
  useSignInWithMicrosoft,
  useSignInWithTwitter,
  useSignInWithYahoo,
} from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { discordButtonLoading } from "../../../../atoms/discordButtonLoading";
import YahooSvg from "./Icons/YahooSvg";
import TwitchSvg from "./Icons/TwitchSvg";
import { twitchButtonLoading } from "../../../../atoms/twitchButtonLoading";

function OAuthButtons() {
  const toast = useToast();
  const router = useRouter();
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

  const {
    loginWithPopup,
    loginWithRedirect,
    isLoading,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
  } = useAuth0();

  const MicrosoftIcon = createIcon({
    displayName: "MicrosoftIcon",
    viewBox: "0 0 23 23",
    path: <MicrosoftSvg />,
  });

  const GoogleIcon = createIcon({
    displayName: "GoogleIcon",
    viewBox: "0 0 48 48",
    path: <GoogleSvg />,
  });

  const GithubIcon = createIcon({
    displayName: "GithubIcon",
    viewBox: "0 0 98 96",
    path: <GithubSvg />,
  });

  const YahooIcon = createIcon({
    displayName: "YahooIcon",
    viewBox: "0 0 520 480",
    path: <YahooSvg />,
  });

  const TwitchIcon = createIcon({
    displayName: "TwitchIcon",
    viewBox: "0 0 24 24",
    path: <TwitchSvg />,
  });

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
      const discordAuthUrl =
        "https://discord.com/api/oauth2/authorize?client_id=1133179039176208496&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord&response_type=code&scope=identify%20email";
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
      const twitchAuthUrl =
        "https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=g76y1y24qtcenhbrkb0m6b5usr79zb&redirect_uri=http://localhost:3000/auth/twitch&scope=user%3Aread%3Aemail&force_verify=true";
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

  useEffect(() => {
    if (googleUser) {
      console.log("User (Google): ", googleUser);
    }
  }, [googleUser]);

  useEffect(() => {
    console.log(googleError);
  }, [googleError]);

  useEffect(() => {
    if (facebookUser) {
      console.log("User (Facebook): ", facebookUser);
    }
  }, [facebookUser]);

  useEffect(() => {
    console.log(facebookError);
  }, [facebookError]);

  useEffect(() => {
    if (githubUser) {
      console.log("User (GitHub): ", githubUser);
    }
  }, [githubUser]);

  useEffect(() => {
    console.log(githubError);
  }, [githubError]);

  useEffect(() => {
    if (microsoftUser) {
      console.log("User (Microsoft): ", microsoftUser);
    }
  }, [microsoftUser]);

  useEffect(() => {
    console.log(microsoftError);
  }, [microsoftError]);

  useEffect(() => {
    if (twitterUser) {
      console.log("User (Twitter): ", twitterUser);
    }
  }, [twitterUser]);

  useEffect(() => {
    console.log(twitterError);
  }, [twitterError]);

  useEffect(() => {
    if (yahooUser) {
      console.log("User (Yahoo): ", yahooUser);
    }
  }, [yahooUser]);

  useEffect(() => {
    console.log(yahooError);
  }, [yahooError]);

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
            icon={<BsDiscord size={36} color="#5562ea" />}
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
            icon={<BsTwitter size={36} color="#1d9bf0" />}
          ></IconButton>
        </Box>
        {" • "}
        <Box>
          <IconButton
            isLoading={facebookLoading}
            onClick={handleFacebookSignin}
            aria-label="Sign in with Facebook"
            icon={<BsFacebook size={36} color="#1877f2" />}
          ></IconButton>
        </Box>
        {" • "}
        <Box>
          <IconButton
            isLoading={twitchLoading}
            onClick={handleTwitchSignin}
            aria-label="Sign in with Twitch"
            icon={<TwitchIcon w="10" h="10" fill="#a970ff" />}
          ></IconButton>
        </Box>
      </Flex>
    </Flex>
  );
}
export default OAuthButtons;
