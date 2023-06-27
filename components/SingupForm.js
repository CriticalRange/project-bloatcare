"use client";
import { Button, Checkbox, HelperText, Label, TextInput } from "flowbite-react";
import { useCredentialsStore } from "../pages/api/stores";
import { useAuthModalStore } from "../pages/api/stores";
import signUp from "../firebase/auth/signup";
import { shallow } from "zustand/shallow";

export default function SignupForm() {
  const { email, setEmail, password, setPassword, authType, setAuthType } =
    useCredentialsStore(
      (state) => ({
        email: state.email,
        setEmail: state.setEmail,
        password: state.password,
        setPassword: state.setPassword,
        authType: state.authType,
        setAuthType: state.setAuthType,
      }),
      shallow
    );
  const { isModalOpen, toggleModalOpen } = useAuthModalStore(
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

        <div className="flex-grow justify-start">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me?</Label>
          </div>
        </div>
        <Button type="submit" className="block m-auto mt-2">
          Login
        </Button>
      </form>
    </div>
  );
}
