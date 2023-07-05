"use client";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase/clientApp";

export default function SigninForm() {
  const [resetPasswordForm, setResetPasswordForm] = useState({
    email: "",
  });
  const [resetPasswordResult, setResetPasswordResult] = useState(null);

  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    const result = await sendPasswordResetEmail(resetPasswordForm.email);
    setResetPasswordResult(result);
  };

  const onFormInfoChange = (event) => {
    const { name, value } = event.target;
    setResetPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handlePasswordReset} key="resetPasswordForm">
        <label key="emailLabel">
          <h4>Email</h4>
          <Input
            my="2"
            name="email"
            key="email"
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
        <div className="flex justify-end">
          <div className="flex-grow justify-start">
            <div className="flex items-center gap-2"></div>
          </div>
        </div>
        {resetPasswordResult ? (
          <Alert status="success" borderRadius="xl" my="2">
            <AlertIcon />
            <AlertTitle>Password reset request sent to your e-mail</AlertTitle>
            <AlertDescription>Please check your e-mail</AlertDescription>
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
          isLoading={sending}
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
}
