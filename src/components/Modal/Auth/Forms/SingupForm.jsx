"use client";
import { TextInput } from "flowbite-react";
import { Button } from "@chakra-ui/react";
import { useCredentialsStore } from "../../../../pages/api/stores";
import { shallow } from "zustand/shallow";
import { useToast } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../../atoms/AuthModalAtom";

export default function SignupForm() {
  const toast = useToast();

  const emailStandard =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const { username, setUsername, email, setEmail, password, setPassword } =
    useCredentialsStore(
      (state) => ({
        username: state.username,
        setUsername: state.setUsername,
        email: state.email,
        setEmail: state.setEmail,
        password: state.password,
        setPassword: state.setPassword,
      }),
      shallow
    );

  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleSignup = async (event) => {
    event.preventDefault();

    /* try {
      const emailPasswordSignupResult = await createUserWithEmailAndPassword(
        email,
        password
      );
      toggleModalOpen(!isModalOpen),
        toast({
          title: "Account created.",
          description: "Your account has been created.",
          status: "success",
          duration: 1600,
          isClosable: true,
          position: "bottom-left",
        });
    } catch (fbError) {
      console.log("fbError: ", fbError);
      toggleModalOpen(!isModalOpen),
        toast({
          title: "There was an issue.",
          description: `${
            fbError.code === "auth/invalid-email"
              ? "You entered a wrong email, please try again"
              : fbError.code === "auth/email-already-exists"
              ? "Email you entered already exists, try logging in instead."
              : fbError.code === "auth/internal-error"
              ? "The authentication server encountered an unexpected error while trying to process the request."
              : fbError
          }`,
          status: "error",
          duration: 3200,
          isClosable: true,
          position: "bottom-left",
        });
    } */

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

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSignup} className="form" key="loginForm">
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
          display="block"
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
          /* onClick={(value) => {
            emailStandard.test(value);
          }} */
        >
          Signup
        </Button>
      </form>
    </div>
  );
}
