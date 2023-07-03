"use client";
import { Button, Text, useToast } from "@chakra-ui/react";
import { Checkbox, TextInput } from "flowbite-react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../../atoms/AuthModalAtom";

export default function SigninForm() {
  const toast = useToast();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleLogin = async (event) => {
    event.preventDefault();
    /*  const result = await signInWithEmailAndPassword(email, password);
    console.log(result);
    if (result === undefined) {
      toast({
        title: "There was an issue.",
        description: `${
          loginError.code === "auth/invalid-email"
            ? "Invalid Email."
            : loginError === "auth/invalid-password"
            ? "Invalid Password."
            : loginError === "auth/too-many-requests"
            ? "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
            : loginError === "auth/user-not-found"
            ? "User couldn't be found. Did you type it incorrectly?"
            : loginError === "auth/wrong-password"
            ? "You typed a wrong password"
            : loginError
        }`,
        status: "error",
        duration: 3200,
        isClosable: true,
        position: "bottom-left",
      });
    }
    console.log(auth.userCredential, error); */

    /* 
      toast({
        title: "Successfully logged in!",
        description: "Logged in to your account.",
        status: "success",
        duration: 1600,
        isClosable: true,
        position: "bottom-left",
      }),
        toggleModalOpen(!isModalOpen); */
  };

  const onFormInfoChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleLogin} className="form" key="loginForm">
        <label key="emailLabel">
          <h4>Email</h4>
          <TextInput
            name="email"
            key="emailInput"
            onChange={onFormInfoChange}
            required
            type="email"
            placeholder="example@mail.com"
            className="overflow-y-hidden block w-full h-12 rounded-md"
          ></TextInput>
        </label>
        <label key="passwordLabel">
          <h4>Password</h4>
          <TextInput
            name="password"
            key="passwordInput"
            onChange={onFormInfoChange}
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
