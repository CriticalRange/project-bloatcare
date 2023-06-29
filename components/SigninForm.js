"use client";
import { Button, Checkbox, HelperText, Label, TextInput } from "flowbite-react";
import { useToggleStore, useCredentialsStore } from "../pages/api/stores";
import signIn from "../firebase/auth/signin";
import { shallow } from "zustand/shallow";
import { useToast } from "@chakra-ui/react";

export default function SigninForm() {
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

    const { result, error } = await signIn(email, password);

    !error
      ? (setUserInfo(result),
        console.log(
          "Result of auth: ",
          result,
          " is being transferred to userInfo via setUserInfo"
        ),
        toggleModalOpen(!isModalOpen),
        toast({
          title: "Successfully logged in!.",
          description: "Logged in to your account.",
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
              ? "Invalid Email."
              : error.code === "auth/invalid-password"
              ? "Invalid Password."
              : error.code === "auth/user-not-found"
              ? "User couldn't be found. Did you type it incorrectly?"
              : error.code === "auth/wrong-password"
              ? "You typed a wrong password"
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
              <Label htmlFor="remember">Remember me?</Label>
            </div>
          </div>
          <p className=" text-sm block align-top underline text-blue-500 dark:text-blue-500 hover:no-underline cursor-pointer">
            Forgot Password?
          </p>
        </div>
        <Button
          type="submit"
          className="bg-[#1e40af] hover:bg-[#60a5fa] block m-auto mt-2"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
