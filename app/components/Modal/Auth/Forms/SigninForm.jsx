"use client";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Checkbox,
  Flex,
  Input,
  Text,
  chakra,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import * as jose from "jose";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../../atoms/authAtom";
import { authModalAtom } from "../../../atoms/modalAtoms";
import { CustomAnimatedLoadingSpinnerIcon } from "../../../Icons/Components/IconComponents";

export default function SigninForm({ InitialFocusRef }) {
  const toast = useToast();

  const [rememberDisplay, setRememberDisplay] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const [signInLoading, setSignInLoading] = useState(false);
  const [signInError, setSignInError] = useState({
    code: "",
    message: "",
  });
  const [authModalState, setAuthModalState] = useRecoilState(authModalAtom);

  const handleLogin = async (event) => {
    event.preventDefault();

    // Process sign in
    try {
      setSignInLoading(true);
      setSignInError({
        code: "",
        message: "",
      });
      const alg = process.env.NEXT_PUBLIC_ACCESS_JWT_ALGORITHM;
      const accessSecret = new TextEncoder().encode(
        `${process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET_KEY}`
      );

      const encodedPassword = await new jose.SignJWT({
        Password: loginForm.password,
      })
        .setProtectedHeader({ alg })
        .sign(accessSecret);

      await axios
        .post("/auth/login", {
          Auth_Type: "password",
          Email: loginForm.email,
          Password: encodedPassword,
        })
        .then(async (response) => {
          if (response.data.error !== undefined) {
            setSignInError({
              code: response.data.error.code,
              message: response.data.error.message,
            });
            setSignInLoading(false);
            return;
          }
          const userData = await jose.jwtVerify(
            response.data.access_token,
            accessSecret
          );
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          Cookies.set("accessToken", response.data.access_token, {
            expires: 1 / 48,
            secure: true,
            sameSite: "strict",
          });
          Cookies.set("refreshToken", response.data.refresh_token, {
            expires: 100,
            secure: true,
            sameSite: "strict",
          });
          setUserInfo({
            authenticated: true,
            authType: "password",
            Custom_Claims: userData.payload.Custom_Claims,
            Disabled: !!userData.payload.Disabled,
            // @ts-ignore
            Display_Name: userData.payload.Display_Name,
            // @ts-ignore
            Email: userData.payload.Email,
            // @ts-ignore
            Email_Verified: userData.payload.Email_Verified,
            // @ts-ignore
            Metadata: JSON.parse(userData.payload.Metadata),
            // @ts-ignore
            Photo_Url: userData.payload.Photo_Url,
            // @ts-ignore
            Provider_Data: JSON.parse(userData.payload.Provider_Data),
            // @ts-ignore
            Uid: userData.payload.Uid,
            // @ts-ignore
            Password_Hash: userData.payload.Password_Hash,
            // @ts-ignore
            Phone_Number: userData.payload.Phone_Number,
            // @ts-ignore
            Password_Salt: userData.payload.Password_Salt,
            // @ts-ignore
            Tokens_Valid_After_Time: userData.payload.Tokens_Valid_After_Time,
            // @ts-ignore
            Verification_Code: userData.payload.Verification_Code,
            // @ts-ignore
            Communities: JSON.parse(userData.payload.Communities),
          });
          localStorage.setItem(
            "tempCommunities",
            // @ts-ignore
            userData.payload.Communities
          );
          setSignInLoading(false);
          toast({
            title: "Login success!",
            description: "You successfully logged in to your account.",
            status: "success",
            duration: 2500,
            position: "bottom-left",
            isClosable: true,
          });
          setAuthModal((prev) => ({
            ...prev,
            openAuthModal: false,
          }));
        })
        .catch((error) => {
          console.log(error);
          setSignInError(error.error);
          setSignInLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onFormInfoChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column">
      <form onSubmit={handleLogin} key="loginForm">
        <chakra.label key="emailLabel">
          <h4>Email</h4>
          <Input
            ref={InitialFocusRef}
            my="2"
            name="email"
            key="emailInput"
            onChange={onFormInfoChange}
            required
            type="email"
            placeholder="example@mail.com"
            overflowY="hidden"
            display="block"
            autoComplete="true"
            w="full"
            h="12"
            borderRadius="0.375rem"
          ></Input>
        </chakra.label>
        <chakra.label key="passwordLabel">
          <h4>Password</h4>
          <Input
            my="2"
            name="password"
            key="passwordInput"
            onChange={onFormInfoChange}
            required
            type="password"
            placeholder="password"
            autoComplete="on"
            overflowY="hidden"
            display="block"
            w="full"
            h="12"
            borderRadius="0.375rem"
          ></Input>
        </chakra.label>
        <Flex justifyContent="flex-end" my="1">
          <Flex flexGrow="1" justifyContent="flex-start">
            <Flex align="center" gap="0.5rem">
              <Checkbox
                size="md"
                borderColor="blue.500"
                id="remember"
                display={rememberDisplay ? "block" : "none"}
                isChecked={rememberDisplay}
                onChange={() => setRememberDisplay(!rememberDisplay)}
              />
              <Button
                aria-label="remember me button"
                onClick={() => setRememberDisplay(!rememberDisplay)}
              >
                <Text fontSize="sm">Remember me?</Text>
              </Button>
            </Flex>
          </Flex>
          <Button
            aria-label="forgot password button"
            onClick={() =>
              setAuthModalState((prev) => ({
                ...prev,
                authModalView: "passwordReset",
              }))
            }
          >
            <Text
              fontSize="0.875rem"
              lineHeight="1.25rem"
              display="block"
              verticalAlign="top"
              textDecorationLine="underline"
              textColor="blue.500"
              _dark={{
                textColor: "blue.500",
              }}
              _hover={{
                textDecorationLine: "none",
              }}
              cursor="pointer"
            >
              Forgot Password?
            </Text>
          </Button>
        </Flex>
        {signInError?.code !== "" ? (
          <Alert status="error" borderRadius="xl" my="2">
            <AlertIcon />
            <AlertTitle>
              {signInError?.message !== undefined
                ? signInError?.message
                : "There was an error, please try again"}
            </AlertTitle>
          </Alert>
        ) : null}
        <Button
          aria-label="login button"
          type="submit"
          margin="auto"
          w="full"
          marginTop="2"
          textColor="white"
          bg="#1e40af"
          _dark={{
            textColor: "white",
          }}
          _hover={{
            bg: "#60a5fa",
          }}
          isDisabled={signInLoading}
        >
          {signInLoading ? (
            <CustomAnimatedLoadingSpinnerIcon
              w="10"
              h="10"
              top="50%"
              left="50%"
              transform="translate(15%, 15%)"
            />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Flex>
  );
}
