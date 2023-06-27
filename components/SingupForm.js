"use client";
import { Button, HelperText, TextInput } from "flowbite-react";
import { useEmailStore, usePasswordStore } from "../pages/api/stores";
import { useLoginModalStore } from "../pages/api/stores";
import signUp from "../firebase/auth/signup";
import { shallow } from "zustand/shallow";

export default function LoginForm() {
  const { email, setEmail } = useEmailStore(
    (state) => ({ email: state.email, setEmail: state.setEmail }),
    shallow
  );
  const { password, setPassword } = usePasswordStore(
    (state) => ({ password: state.password, setPassword: state.setPassword }),
    shallow
  );
  const { isModalOpen, toggleModalOpen } = useLoginModalStore(
    (state) => ({
      isModalOpen: state.isModalOpen,
      toggleModalOpen: state.toggleModalOpen,
    }),
    shallow
  );

  const handleLogin = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      console.log("error came out:", error);
    } else {
      console.log("Success!", result);
      toggleModalOpen(!isModalOpen);
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleLogin} className="form" key="loginForm">
        <label htmlFor="email" key="emailLabel">
          <h4 className="text-center">Email</h4>
          <TextInput
            key="emailInput"
            onChange={(event) => {
              const newValue = event.target.value;
              setEmail(newValue);
              console.log("Target email:", newValue);
            }}
            required
            type="email"
            placeholder="example@mail.com"
            className="overflow-y-hidden text-center block w-48 m-auto h-12 resize-none rounded-md"
          ></TextInput>
        </label>
        <label htmlFor="password" key="passwordLabel">
          <h4 className="text-center">Password</h4>
          <TextInput
            key="passwordInput"
            onChange={(event) => {
              setPassword(event.currentTarget.value),
                console.log(
                  "Target password: don't look at anyone's password again, I warn you!"
                );
            }}
            required
            type="password"
            name="password"
            placeholder="password"
            autoComplete="on"
            className="overflow-y-hidden text-center block w-48 m-auto h-12 resize-none rounded-md"
          ></TextInput>
        </label>
        <HelperText className="text-center block mt-0 mr-16 underline text-blue-500 dark:text-blue-500 hover:no-underline cursor-pointer">
          Forgot Password?
        </HelperText>
        <Button type="submit" className="block m-auto mt-2">
          Login
        </Button>
      </form>
    </div>
  );
}
