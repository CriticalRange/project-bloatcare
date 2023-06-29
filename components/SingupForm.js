"use client";
import { Button, Checkbox, HelperText, Label, TextInput } from "flowbite-react";
import { useCredentialsStore } from "../pages/api/stores";
import { useToggleStore } from "../pages/api/stores";
import signUp from "../firebase/auth/signup";
import { shallow } from "zustand/shallow";
import { useToast } from "@chakra-ui/react";

export default function SignupForm() {
  const toast = useToast();

  const emailStandard =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const {
    userInfo,
    setUserInfo,
    userInfoname,
    setUserInfoname,
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
      userInfoname: state.userInfoname,
      setUserInfoname: state.setUserInfoname,
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

    const { result, error } = await signUp(email, password);

    !error
      ? (toggleModalOpen(!isModalOpen),
        toast({
          title: "Account created.",
          description: "Your account has been created.",
          status: "success",
          duration: 1600,
          isClosable: true,
          position: "bottom-left",
        }))
      : (toggleModalOpen(!isModalOpen),
        toast({
          title: "There was an issue.",
          description: `${
            error.code === "auth/invalid-email"
              ? "You entered a wrong email, please try again"
              : error.code === "auth/email-already-exists"
              ? "Email you entered already exists, try logging in instead."
              : error.code === "auth/internal-error"
              ? "The authentication server encountered an unexpected error while trying to process the request."
              : error
          }`,
          status: "error",
          duration: 3200,
          isClosable: true,
          position: "bottom-left",
        }));
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleLogin} className="form" key="loginForm">
        <label key="usernameLabel">
          <h4>Username</h4>
          <TextInput
            name="signupUsernameInput"
            key="usernameInput"
            onChange={(event) => {
              const newValue = event.target.value;
              setUsername(newValue);
            }}
            required
            type="text"
            placeholder="Username"
            className="overflow-y-hidden block w-full h-12 rounded-md"
          ></TextInput>
        </label>
        <label key="emailLabel">
          <h4>Email</h4>
          <TextInput
            name="signupEmailInput"
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
            name="signupPasswordInput"
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
        <Button
          type="submit"
          className="bg-[#1e40af] hover:bg-[#60a5fa] block m-auto mt-2"
          onClick={(value) => {
            emailStandard.test(value)
              ? authType === "signup"
                ? toast({
                    title: "Account created.",
                    description: "Your account has been created.",
                    status: "success",
                    duration: 3200,
                    isClosable: true,
                    position: "bottom-left",
                  })
                : null
              : "Invalid Email";
          }}
        >
          Signup
        </Button>
      </form>
    </div>
  );
}
