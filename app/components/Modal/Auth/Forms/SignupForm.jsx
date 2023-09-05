"use client";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { useDebouncedCallback } from "use-debounce";
import {
  CustomAnimatedLoadingSpinnerIcon,
  CustomEyeClosed,
  CustomEyeOpen,
} from "../../../Icons/Components/IconComponents";
import { passwordCheckerAtom } from "../../../atoms/passwordsAtom";
import { showPasswordAtom } from "../../../atoms/passwordsAtom";
import { auth, firestore } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import ConfirmPasswordChecker from "./Checkers/ConfirmPasswordChecker";
import PasswordChecker, {
  passwordValidateRegex,
} from "./Checkers/PasswordChecker";
import dynamic from "next/dynamic";
import * as jose from "jose";
import axios from "axios";

export default function SignupForm() {
  const toast = useToast();
  // STATES
  const [remainingChars, setRemainingChars] = useState(21);
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isFormValid, setFormValid] = useState(false);
  const [formChecker, setFormChecker] = useState({
    usernameStatus: "unknown",
    usernameLoading: false,
    usernameInvalid: false,
  });
  const [passwordChecker, setPasswordChecker] =
    useRecoilState(passwordCheckerAtom);
  const [showPassword, setShowPassword] = useRecoilState(showPasswordAtom);

  const debouncedUsername = useDebouncedCallback(async (value) => {
    const { doc, getDoc, setDoc, updateDoc } = await import(
      "firebase/firestore"
    );
    if (value.length != 0) {
      const usernameDocRef = doc(firestore, "usernames", value);
      setFormChecker((prev) => ({
        ...prev,
        usernameLoading: true,
        usernameInvalid: false,
      }));
      axios
        .get(`/api/usernames/${signupForm.username}`)
        .then((response) => {
          console.log(response.data.available);
          if (!response.data.available) {
            setFormChecker((prev) => ({
              ...prev,
              usernameLoading: false,
              usernameStatus: "taken",
              usernameInvalid: false,
            }));
            console.log("Username is taken");
            return;
          } else {
            setFormChecker((prev) => ({
              ...prev,
              usernameLoading: false,
              usernameStatus: "available",
              usernameInvalid: false,
            }));
            console.log("Username is available");
            return;
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    } else {
      setFormChecker((prev) => ({
        ...prev,
        usernameStatus: "unknown",
      }));
    }
  }, 1000);

  // Firebase auth hook
  const [createUserWithEmailAndPassword, fbUser, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignup = async (event) => {
    event.preventDefault();

    // Check if password and confirm password match
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

    if (isFormValid) {
      // Create user (firebase)
      const { doc, getDoc, setDoc, updateDoc } = await import(
        "firebase/firestore"
      );
      try {
        const alg = process.env.NEXT_PUBLIC_JWT_ALGORITHM;
        const secret = new TextEncoder().encode(signupForm.password);
        const encodedPassword = await new jose.SignJWT({
          "urn:example:claim": true,
        })
          .setProtectedHeader({ alg })
          .setIssuedAt()
          .setIssuer("urn:example:issuer")
          .setAudience("urn:example:audience")
          .sign(secret);
        axios
          .post("/api/users", {
            Display_Name: signupForm.username,
            Email: signupForm.email,
            Password: JSON.stringify(encodedPassword),
            Phone_Number: "nothereyet",
          })
          .then(async (response) => {
            console.log(response.status, response.data);
          });
        /* await createUserWithEmailAndPassword(
          signupForm.email,
          signupForm.password
        ).then(async (userCredential) => {
          await updateProfile(userCredential.user, {
            displayName: signupForm.username,
          });
          const usernameDocRef = doc(
            firestore,
            "usernames",
            userCredential.user.displayName
          );
          await setDoc(usernameDocRef, {
            userUid: userCredential.user.uid,
          });
          const usersDocRef = doc(firestore, "users", userCredential.user.uid);
          return await updateDoc(usersDocRef, {
            displayName: signupForm.username,
          });
        }); */
        setSignupForm({
          confirmPassword: "",
          email: "",
          password: "",
          username: "",
        });
        setPasswordChecker({
          showPasswordChecker: false,
          showConfirmPasswordChecker: false,
          passwordsMatch: false,
          testIsLowercase: false,
          testIsUppercase: false,
          testIsNumbers: false,
          testIsSpecialChars: false,
          testPasswordLength: false,
        });
        toast({
          title: "Signup success!",
          description:
            "You successfully signed up and logged in to your account.",
          status: "success",
          duration: 2500,
          position: "bottom-left",
          isClosable: true,
        });
      } catch (error) {
        console.log("Error creating account: ", error);
      }
    }
  };

  const onFormInfoChange = async (event) => {
    const { doc, getDoc, setDoc, updateDoc } = await import(
      "firebase/firestore"
    );
    const { name, value } = event.target;
    if (name === "username") {
      const truncatedValue = value.slice(0, 21);
      if (remainingChars <= 0) {
        setSignupForm((prev) => ({
          ...prev,
          username: truncatedValue,
        }));
      }
      setRemainingChars(21 - truncatedValue.length);
      debouncedUsername(value);
    }
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
      passwordChecker.testPasswordLength &&
      formChecker.usernameStatus === "available" &&
      signupForm.password === signupForm.confirmPassword;

    const isFormValid = isPasswordValid;
    setFormValid(isFormValid);
  }, [
    passwordChecker.testIsLowercase,
    passwordChecker.testIsUppercase,
    passwordChecker.testIsNumbers,
    passwordChecker.testIsSpecialChars,
    passwordChecker.testPasswordLength,
    formChecker.usernameStatus,
    signupForm.password,
    signupForm.confirmPassword,
  ]);

  return (
    <Flex direction="column" mb={{ base: "3" }}>
      <form onSubmit={handleSignup} className="form" key="loginForm">
        <label key="usernameLabel">
          <FormControl isRequired isInvalid={formChecker.usernameInvalid}>
            <FormLabel>Username</FormLabel>
            <InputGroup>
              <Input
                maxLength={21}
                my="2"
                name="username"
                onKeyDown={(event) => {
                  if (event.code === "Space") event.preventDefault();
                }}
                key="username"
                onChange={onFormInfoChange}
                required
                type="username"
                placeholder="Username"
                overflowY="hidden"
                display="block"
                w="full"
                h="12"
                borderRadius="0.375rem"
              />
              <InputRightElement my="3" mr="1">
                <Text>{remainingChars}</Text>
              </InputRightElement>
            </InputGroup>
            {formChecker.usernameInvalid ? (
              <FormHelperText my="1" color="red.400">
                Username can&apos;t be empty
              </FormHelperText>
            ) : formChecker.usernameLoading ? (
              <CustomAnimatedLoadingSpinnerIcon my="1" w="6" h="6" />
            ) : formChecker.usernameStatus === "unknown" ? (
              <FormHelperText fontWeight="semibold" my="1" color="gray">
                Pick something eligible
              </FormHelperText>
            ) : formChecker.usernameStatus === "taken" ? (
              <FormHelperText my="1" color="red.400">
                Username is taken
              </FormHelperText>
            ) : formChecker.usernameStatus === "available" ? (
              <FormHelperText my="1" color="green.500">
                Username is available to use
              </FormHelperText>
            ) : null}{" "}
          </FormControl>
        </label>
        <label key="emailLabel">
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              my="2"
              name="email"
              onKeyDown={(event) => {
                if (event.code === "Space") event.preventDefault();
              }}
              key="emailInput"
              onChange={onFormInfoChange}
              required
              type="email"
              placeholder="example@mail.com"
              overflowY="hidden"
              display="block"
              w="full"
              h="12"
              borderRadius="0.375rem"
            />
          </FormControl>
        </label>
        <label key="passwordLabel">
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md" alignContent="center">
              <Input
                onFocus={onPasswordFocus}
                onKeyDown={(event) => {
                  if (event.code === "Space") event.preventDefault();
                }}
                my="2"
                name="password"
                key="passwordInput"
                onChange={onFormInfoChange}
                required
                type={showPassword.showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="on"
                overflowY="hidden"
                display="block"
                w="full"
                h="12"
                borderRadius="0.375rem"
              />
              <InputRightElement
                onClick={() => {
                  setShowPassword((prev) => ({
                    ...prev,
                    showPassword: !showPassword.showPassword,
                  }));
                }}
                alignContent="center"
              >
                <IconButton
                  mt="6"
                  mr="2"
                  aria-label="show Password"
                  icon={
                    showPassword.showPassword ? (
                      <CustomEyeOpen />
                    ) : (
                      <CustomEyeClosed />
                    )
                  }
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </label>
        <FormControl isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            onKeyDown={(event) => {
              if (event.code === "Space") event.preventDefault();
            }}
            onFocus={() =>
              setPasswordChecker((prev) => ({
                ...prev,
                showConfirmPasswordChecker: false,
              }))
            }
            onBlur={onConfirmPasswordFocus}
            my="2"
            name="confirmPassword"
            onChange={onFormInfoChange}
            required
            type="password"
            placeholder="Confirm Password"
            autoComplete="on"
            overflowY="hidden"
            display="block"
            w="full"
            h="12"
            borderRadius="0.375rem"
          />
        </FormControl>
        <PasswordChecker />
        {signupForm.password !== signupForm.confirmPassword &&
        signupForm.password !== "" ? (
          <ConfirmPasswordChecker />
        ) : null}
        {userError && (
          <Alert status="error" borderRadius="xl" my="2">
            <AlertIcon />
            <AlertTitle>{FIREBASE_ERRORS[userError.message]}</AlertTitle>
          </Alert>
        )}
        <Button
          aria-label="Signup button"
          type="submit"
          w="full"
          margin="auto"
          marginTop="2"
          isLoading={loading}
          isDisabled={!isFormValid}
        >
          Signup
        </Button>
      </form>
    </Flex>
  );
}
