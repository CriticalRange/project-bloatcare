"use client";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { passwordCheckerAtom, showPasswordAtom } from "../../../../atoms/atoms";
import { auth } from "../../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../../firebase/errors";
import ConfirmPasswordChecker from "./ConfirmPasswordChecker";
import PasswordChecker, { passwordValidateRegex } from "./PasswordChecker";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function SignupForm() {
  const toast = useToast();

  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordChecker, setPasswordChecker] =
    useRecoilState(passwordCheckerAtom);

  const [showPassword, setShowPassword] = useRecoilState(showPasswordAtom);

  const [isFormValid, setFormValid] = useState(false);

  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

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

    await createUserWithEmailAndPassword(signupForm.email, signupForm.password);
  };

  const onFormInfoChange = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      passwordValidateRegex.forEach((regex, i) => {
        const regexTestResult = new RegExp(regex).test(value);
        if (regex === "[a-z]") {
          setPasswordChecker((prev) => ({
            ...prev,
            testIsLowercase: regexTestResult,
          }));
        } else if (regex === "[A-Z]") {
          setPasswordChecker((prev) => ({
            ...prev,
            testIsUppercase: regexTestResult,
          }));
        } else if (regex === "[0-9]") {
          setPasswordChecker((prev) => ({
            ...prev,
            testIsNumbers: regexTestResult,
          }));
        } else if (regex === "\\W") {
          setPasswordChecker((prev) => ({
            ...prev,
            testIsSpecialChars: regexTestResult,
          }));
        }
        if (value.length < 8) {
          setPasswordChecker((prev) => ({
            ...prev,
            testPasswordLength: false,
          }));
        } else if (value.length >= 8) {
          setPasswordChecker((prev) => ({ ...prev, testPasswordLength: true }));
        }
        let isPasswordValid = false;
        if (
          passwordChecker.testIsLowercase &&
          passwordChecker.testIsUppercase &&
          passwordChecker.testIsNumbers &&
          passwordChecker.testIsSpecialChars &&
          passwordChecker.testPasswordLength
        ) {
          isPasswordValid = true;
        }
        const isFormValid = isPasswordValid;
        setFormValid(isFormValid);
      });
    }

    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onPasswordFocus = (event) => {
    const { name, value } = event.target;
    setPasswordChecker((prev) => ({ ...prev, showPasswordChecker: true }));
  };

  const onConfirmPasswordFocus = (event) => {
    const { name, value } = event.target;
    setPasswordChecker((prev) => ({
      ...prev,
      showConfirmPasswordChecker: true,
    }));
  };

  useEffect(() => {
    const isPasswordValid =
      passwordChecker.testIsLowercase &&
      passwordChecker.testIsUppercase &&
      passwordChecker.testIsNumbers &&
      passwordChecker.testIsSpecialChars &&
      passwordChecker.testPasswordLength;

    const isFormValid = isPasswordValid;
    setFormValid(isFormValid);
  }, [
    passwordChecker.testIsLowercase,
    passwordChecker.testIsUppercase,
    passwordChecker.testIsNumbers,
    passwordChecker.testIsSpecialChars,
    passwordChecker.testPasswordLength,
  ]);

  return (
    <Flex direction="column" mb={{ base: "3" }}>
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
          />
        </label>
        <label key="passwordLabel">
          <h4>Password</h4>
          <InputGroup size="md">
            <Input
              onFocus={onPasswordFocus}
              onBlur={() =>
                setPasswordChecker((prev) => ({
                  ...prev,
                  showPasswordChecker: false,
                }))
              }
              my="2"
              name="password"
              key="passwordInput"
              onChange={onFormInfoChange}
              required
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="on"
              className="overflow-y-hidden block w-full h-12 rounded-md"
            />
            <InputRightElement>
              {showPassword ? <Icon as={HiEyeOff} /> : <Icon as={HiEye} />}
            </InputRightElement>
          </InputGroup>
        </label>
        <PasswordChecker />
        <label key="confirmPasswordLabel">
          <h4>Confirm Password</h4>
          <Input
            onFocus={() =>
              setPasswordChecker((prev) => ({
                ...prev,
                showConfirmPasswordChecker: false,
              }))
            }
            onBlur={onConfirmPasswordFocus}
            my="2"
            name="confirmPassword"
            key="confirmPasswordInput"
            onChange={onFormInfoChange}
            required
            type="password"
            placeholder="Confirm Password"
            autoComplete="on"
            className="overflow-y-hidden block w-full h-12 rounded-md"
          />
        </label>
        {signupForm.password !== signupForm.confirmPassword &&
        signupForm.password !== "" ? (
          <ConfirmPasswordChecker />
        ) : null}
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
          isDisabled={!isFormValid}
        >
          Signup
        </Button>
      </form>
    </Flex>
  );
}
