"use client";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import PasswordChecker, {
  passwordValidateRegex,
} from "../../components/Modal/Auth/Forms/Checkers/PasswordChecker";
import { passwordCheckerAtom } from "../../components/atoms/passwordsAtom";
import { useRecoilState } from "recoil";
import { CustomAnimatedLoadingSpinnerIcon } from "../../components/Icons/Components/IconComponents";

const DiscordAuth = ({ searchParams }) => {
  const toast = useToast();
  const [discordOauthPassword, setDiscordOauthPassword] = useState({
    password: "",
    passwordAgain: "",
  });
  const [isFormValid, setFormValid] = useState(false);
  const [passwordChecker, setPasswordChecker] =
    useRecoilState(passwordCheckerAtom);
  const [formChecker, setFormChecker] = useState({
    passwordsMatch: "unknown",
  });
  const [accountCreatedBefore, setAccountCreatedBefore] = useState(false);
  const [userDataState, setUserDataState] = useState({
    email: "",
    avatarUrl: "",
    displayName: "",
  });
  const [authHandlerLoading, setAuthHandlerLoading] = useState(false);

  const code = searchParams.code;
  const discordTokenURL = "https://discord.com/api/oauth2/token"; // Endpoint to get the access token
  const discordUserURL = "https://discord.com/api/users/@me"; // Endpoint to get the user data
  const redirectUri = `${window.location.origin}/auth/discord`;
  const discordClientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
  const discordClientSecret = process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET;

  useEffect(() => {
    DiscordOauthHandler();
  }, [code]);

  const DiscordOauthHandler = async () => {
    /* try {
      const tokenResponse = await axios.post(
        discordTokenURL,
        {
          client_id: discordClientId,
          client_secret: discordClientSecret,
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

      const userResponse = await axios.get(discordUserURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = userResponse.data;
      await fetchSignInMethodsForEmail(
        auth,
        `discord.${userResponse.data.email}`
      )
        .then(async (signInMethods) => {
          if (signInMethods.length === 0) {
            setAccountCreatedBefore(false);
            console.log("Not signed in yet, ", signInMethods);
          } else {
            setAccountCreatedBefore(true);
          }
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
    } */
  };

  /* const onPasswordChange = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      passwordValidateRegex.forEach((regex, i) => {
        const regexTestResult = new RegExp(regex).test(value);
        if (regex === "[a-z]") {
          setPasswordChecker((prev) => ({
            ...prev,
            testIsLowercase: regexTestResult,
          }));
        } else if (regex === "[A-Z]") {
          setPasswordChecker((prev) => ({
            ...prev,
            testIsUppercase: regexTestResult,
          }));
        } else if (regex === "[0-9]") {
          setPasswordChecker((prev) => ({
            ...prev,
            testIsNumbers: regexTestResult,
          }));
        } else if (regex === "\\W") {
          setPasswordChecker((prev) => ({
            ...prev,
            testIsSpecialChars: regexTestResult,
          }));
        }
        if (value.length < 8) {
          setPasswordChecker((prev) => ({
            ...prev,
            testPasswordLength: false,
          }));
        } else if (value.length >= 8) {
          setPasswordChecker((prev) => ({ ...prev, testPasswordLength: true }));
        }
        let isPasswordValid = false;
        if (
          passwordChecker.testIsLowercase &&
          passwordChecker.testIsUppercase &&
          passwordChecker.testIsNumbers &&
          passwordChecker.testIsSpecialChars &&
          passwordChecker.testPasswordLength
        ) {
          isPasswordValid = true;
        }
        const isFormValid = isPasswordValid;
        setFormValid(isFormValid);
      });
    }
    setDiscordOauthPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  }; */

  /* const handleDiscordAuth = async (event) => {
    event.preventDefault();
    setAuthHandlerLoading(true);
    if (!isFormValid) {
      setAuthHandlerLoading(false);
      return;
    } else {
      if (accountCreatedBefore) {
        await signInWithEmailAndPassword(
          auth,
          `discord.${userDataState.email}`,
          discordOauthPassword.password
        );
        await updateProfile(auth.currentUser, {
          displayName: userDataState.displayName,
          photoURL: userDataState.avatarUrl,
        });
      } else {
        await createUserWithEmailAndPassword(
          auth,
          `discord.${userDataState.email}`,
          discordOauthPassword.password
        );
        await updateProfile(auth.currentUser, {
          displayName: userDataState.displayName,
          photoURL: userDataState.avatarUrl,
        });
      }
      setAuthHandlerLoading(false);
      window.close();
    }
  };

  useEffect(() => {
    const isPasswordValid =
      passwordChecker.testIsLowercase &&
      passwordChecker.testIsUppercase &&
      passwordChecker.testIsNumbers &&
      passwordChecker.testIsSpecialChars &&
      passwordChecker.testPasswordLength;

    const isFormValid = isPasswordValid;
    setFormValid(isFormValid);
  }, [
    passwordChecker.testIsLowercase,
    passwordChecker.testIsUppercase,
    passwordChecker.testIsNumbers,
    passwordChecker.testIsSpecialChars,
    passwordChecker.testPasswordLength,
  ]); */

  return (
    <Flex w="90%" h="300" mt="10" mx="5" direction="column">
      <Text fontSize="4xl" mb="2">
        Welcome {accountCreatedBefore ? " back " : " "}{" "}
        {` ${
          userDataState.displayName
            ? userDataState.displayName
            : userDataState.email
        }`}
      </Text>
      <form /* onSubmit={handleDiscordAuth} */>
        <Text fontSize="2xl">
          For your security, please also{" "}
          {accountCreatedBefore ? "login with your" : "create a"} password.{" "}
        </Text>
        <Input
          mt="3"
          name="password"
          onKeyDown={(event) => {
            if (event.code === "Space") event.preventDefault();
          }}
          onFocus={() =>
            setPasswordChecker((prev) => ({
              ...prev,
              showConfirmPasswordChecker: true,
            }))
          }
          /* onChange={onPasswordChange} */
          type="password"
          key="discordOauthPassword"
          placeholder="Password"
        />
        <Input
          mt="3"
          name="passwordAgain"
          type="password"
          onKeyDown={(event) => {
            if (event.code === "Space") event.preventDefault();
          }}
          /* onChange={onPasswordChange} */
          key="discordOauthPasswordAgain"
          placeholder="Password Again"
        />
        {formChecker.passwordsMatch === "no-match" ? (
          <Alert mt="3" borderRadius="5" status="error">
            <AlertIcon />
            <AlertTitle>Passwords didn&apos;t match!</AlertTitle>
          </Alert>
        ) : !isFormValid ? (
          <Alert mt="3" borderRadius="5" status="error">
            <AlertIcon />
            <AlertTitle>Passwords doesn&apos;t match the standarts.</AlertTitle>
          </Alert>
        ) : null}
        <PasswordChecker />
        <Button
          aria-label={accountCreatedBefore ? "Login button" : "Signup button"}
          isDisabled={authHandlerLoading}
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
          ) : accountCreatedBefore ? (
            "Login"
          ) : (
            "Signup"
          )}
        </Button>
      </form>
    </Flex>
  );
};

export default DiscordAuth;
