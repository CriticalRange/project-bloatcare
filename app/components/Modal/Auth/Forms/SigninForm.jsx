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
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { authModalAtom } from "../../../atoms/modalAtoms";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

export default function SigninForm({ InitialFocusRef }) {
  const toast = useToast();

  const [rememberDisplay, setRememberDisplay] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [authModalState, setAuthModalState] = useRecoilState(authModalAtom);

  const handleLogin = async (event) => {
    event.preventDefault();

    // Process sign in
    try {
      await signInWithEmailAndPassword(loginForm.email, loginForm.password);
      !error && user
        ? toast({
            title: "Login success!",
            description: "You successfully logged in to your account.",
            status: "success",
            duration: 2500,
            position: "bottom-left",
            isClosable: true,
          })
        : null;
    } catch (error) {}
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
        {error ? (
          <Alert status="error" borderRadius="xl" my="2">
            <AlertIcon />
            <AlertTitle>{FIREBASE_ERRORS[error.message]}</AlertTitle>
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
          isLoading={loading}
        >
          Login
        </Button>
      </form>
    </Flex>
  );
}
