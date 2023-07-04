"use client";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Text,
  Input,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../../atoms/AuthModalAtom";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../../firebase/errors";

export default function SignupForm() {
  const toast = useToast();

  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleSignup = async (event) => {
    event.preventDefault();
    if (error) {
      setError("");
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      toast({
        title: "Passwords do not match.",
        description: "Please type the same password.",
        status: "error",
        duration: 1600,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }

    createUserWithEmailAndPassword(signupForm.email, signupForm.password);

    /* addDoc(dbInstance, {
      email: email,
      password: password,
      username: username,
    })
      .then(() => {
        setEmail("");
        setPassword("");
        setUsername("");
        console.log("Document has been added successfully");
      })
      .catch((error) => {
        console.log("Error adding document:", error);
      }); */
  };

  const onFormInfoChange = (event) => {
    const { name, value } = event.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" justify="">
      <form onSubmit={handleSignup} className="form" key="loginForm">
        <label key="usernameLabel">
          <h4>Username</h4>
          <Input
            my="2"
            name="username"
            key="username"
            /* onChange={onFormInfoChange} dont forget to add this to firestore*/
            required
            type="text"
            placeholder="Username"
            className="overflow-y-hidden block w-full h-12 rounded-md"
          ></Input>
        </label>
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
            className="overflow-y-hidden block w-full h-12 rounded-md"
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
            className="overflow-y-hidden block w-full h-12 rounded-md"
          ></Input>
        </label>
        <label key="confirmPasswordLabel">
          <h4>Password</h4>
          <Input
            my="2"
            name="confirmPassword"
            key="confirmPasswordInput"
            onChange={onFormInfoChange}
            required
            type="password"
            placeholder="confirmPassword"
            autoComplete="on"
            className="overflow-y-hidden block w-full h-12 rounded-md"
          ></Input>
        </label>
        {(error || userError) && (
          <Alert status="error" borderRadius="xl" my="2">
            <AlertIcon />
            <AlertTitle>
              {error || FIREBASE_ERRORS[userError.message]}
            </AlertTitle>
          </Alert>
        )}
        <Button
          type="submit"
          w="full"
          margin="auto"
          marginTop="2"
          bg="brand.primary"
          textColor="white"
          _dark={{
            textColor: "white",
          }}
          _hover={{
            bg: "brand.secondary",
          }}
          isLoading={loading}
          /* onClick={(value) => {
            emailStandard.test(value);
          }} */
        >
          Signup
        </Button>
      </form>
    </Flex>
  );
}
