"use client";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Text,
  useToast,
  Input,
  Flex,
} from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { authModalAtom } from "../../../../atoms/atoms";
import { auth } from "../../../../firebase/clientApp";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERRORS } from "../../../../firebase/errors";

export default function SigninForm() {
  const toast = useToast();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  user
    ? toast({
        title: "Successfully logged in.",
        description: "Logged in to your account.",
        status: "success",
        duration: 1600,
        isClosable: true,
        position: "bottom-left",
      })
    : null;

  const [authModalState, setAuthModalState] = useRecoilState(authModalAtom);

  const handleLogin = async (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(loginForm.email, loginForm.password);
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
        <label key="emailLabel">
          <h4>Email</h4>
          <Input
            my="2"
            name="email"
            key="emailInput"
            onChange={onFormInfoChange}
            required
            type="email"
            placeholder="example@mail.com"
            overflowY="hidden"
            display="block"
            w="full"
            h="12"
            borderRadius="0.375rem"
          ></Input>
        </label>
        <label key="passwordLabel">
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
        </label>
        <Flex justifyContent="flex-end">
          <Flex flexGrow="1" justifyContent="flex-start">
            <Flex justifyItems="center" gap="0.5rem">
              <Checkbox borderColor="blue.500" id="remember" />
              <Text fontSize="sm">Remember me?</Text>
            </Flex>
          </Flex>
          <Text
            onClick={() =>
              setAuthModalState((prev) => ({ ...prev, view: "resetPassword" }))
            }
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
        </Flex>
        {error ? (
          <Alert status="error" borderRadius="xl" my="2">
            <AlertIcon />
            <AlertTitle>{FIREBASE_ERRORS[error.message]}</AlertTitle>
          </Alert>
        ) : null}
        <Button
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
          isLoading={loading}
        >
          Login
        </Button>
      </form>
    </Flex>
  );
}
