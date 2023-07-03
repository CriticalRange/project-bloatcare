"use client";
import { Checkbox, HelperText, Label, TextInput } from "flowbite-react";
import { Text } from "@chakra-ui/react";
import { Button, useToast } from "@chakra-ui/react";
import { useToggleStore, useCredentialsStore } from "../pages/api/stores";
import { shallow } from "zustand/shallow";
import firebase_app from "../firebase/config/firebase.config";
import { getAuth } from "firebase/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const auth = getAuth(firebase_app);

export default function SigninForm() {
  const [signInWithEmailAndPassword, user, loading, fbError] =
    useSignInWithEmailAndPassword(auth);
  const toast = useToast();

  const {
    userInfo,
    setUserInfo,
    email,
    setEmail,
    password,
    setPassword,
    authType,
    setAuthType,
  } = useCredentialsStore(
    (state) => ({
      userInfo: state.userInfo,
      setUserInfo: state.setUserInfo,
      email: state.email,
      setEmail: state.setEmail,
      password: state.password,
      setPassword: state.setPassword,
      authType: state.authType,
      setAuthType: state.setAuthType,
    }),
    shallow
  );
  const { isModalOpen, toggleModalOpen } = useToggleStore(
    (state) => ({
      isModalOpen: state.isModalOpen,
      toggleModalOpen: state.toggleModalOpen,
    }),
    shallow
  );

  const handleLogin = async (event) => {
    event.preventDefault();

    await signInWithEmailAndPassword(email, password);
    if (fbError === null) {
      toast({
        title: "Successfully logged in!",
        description: "Logged in to your account.",
        status: "success",
        duration: 1600,
        isClosable: true,
        position: "bottom-left",
      }),
        toggleModalOpen(!isModalOpen);
    } else {
      console.log(fbError),
        toast({
          title: "There was an issue.",
          description: `${
            fbError === "auth/invalid-email"
              ? "Invalid Email."
              : fbError === "auth/invalid-password"
              ? "Invalid Password."
              : fbError === "auth/too-many-requests"
              ? "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
              : fbError === "auth/user-not-found"
              ? "User couldn't be found. Did you type it incorrectly?"
              : fbError === "auth/wrong-password"
              ? "You typed a wrong password"
              : fbError
          }`,
          status: "error",
          duration: 3200,
          isClosable: true,
          position: "bottom-left",
        });
    }
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleLogin} className="form" key="loginForm">
        <label key="emailLabel">
          <h4>Email</h4>
          <TextInput
            name="signinEmailInput"
            key="emailInput"
            onChange={(event) => {
              const newValue = event.target.value;
              setEmail(newValue);
            }}
            required
            type="email"
            placeholder="example@mail.com"
            className="overflow-y-hidden block w-full h-12 rounded-md"
          ></TextInput>
        </label>
        <label key="passwordLabel">
          <h4>Password</h4>
          <TextInput
            name="signinPasswordInput"
            key="passwordInput"
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
            required
            type="password"
            placeholder="password"
            autoComplete="on"
            className="overflow-y-hidden block w-full h-12 rounded-md"
          ></TextInput>
        </label>
        <div className="flex justify-end">
          <div className="flex-grow justify-start">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Text fontSize="sm">Remember me?</Text>
            </div>
          </div>
          <p className=" text-sm block align-top underline text-blue-500 dark:text-blue-500 hover:no-underline cursor-pointer">
            Forgot Password?
          </p>
        </div>
        <Button
          type="submit"
          margin="auto"
          display="block"
          marginTop="2"
          textColor="white"
          bg="#1e40af"
          _dark={{
            textColor: "white",
          }}
          _hover={{
            bg: "#60a5fa",
          }}
        >
          Login
        </Button>
      </form>
    </div>
  );
}
