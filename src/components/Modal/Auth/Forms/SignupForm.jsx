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
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { passwordCheckerAtom, showPasswordAtom } from "../../../../atoms/atoms";
import { app, auth, firestore } from "../../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../../firebase/errors";
import ConfirmPasswordChecker from "./Checkers/ConfirmPasswordChecker";
import PasswordChecker, {
  passwordValidateRegex,
} from "./Checkers/PasswordChecker";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export default function SignupForm() {
  const toast = useToast();

  // get current user
  const [user] = useAuthState(auth);

  // UseState hooks (will only use here so didn't make an atom for it)
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isFormValid, setFormValid] = useState(false);

  // Atoms
  const [passwordChecker, setPasswordChecker] =
    useRecoilState(passwordCheckerAtom);
  const [showPassword, setShowPassword] = useRecoilState(showPasswordAtom);

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

    // Create user (firebase)
    await createUserWithEmailAndPassword(signupForm.email, signupForm.password);
    /* .then(async (userCredential) => {
        const user = userCredential.user;
        // GET Users Ref
        const usersDocRef = doc(firestore, "users", user?.uid);
        const usersDoc = await getDoc(usersDocRef);

        // If User info exists console log and return
        if (usersDoc.exists()) {
          console.log("That username is taken. Please try another one.");
          return;
        }

        // Create the user on firestore
        await setDoc(usersDocRef, {
          createdAt: serverTimestamp(),
          userUid: signupForm.username,
        });

        // Create another one so that we can query names
        const usersQueryDocRef = doc(firestore, "users", signupForm.username);
        await setDoc(usersQueryDocRef, {
          createdAt: serverTimestamp(),
          userUid: user?.uid,
        });

        console.log("User successfully created and added to Firestore.");
      })
      .catch((error) => {
        console.log("Error creating user:", error);
      }); */
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
          ></Input>
          <Text>Pick something eligible :D</Text>{" "}
          {/* Make a username checker when firestore initializes */}
        </label>
        <label key="emailLabel">
          <h4>Email</h4>
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
        </label>
        <label key="passwordLabel">
          <h4>Password</h4>
          <InputGroup size="md" alignContent="center">
            <Input
              onFocus={onPasswordFocus}
              onBlur={() =>
                setPasswordChecker((prev) => ({
                  ...prev,
                  showPasswordChecker: false,
                }))
              }
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
            <InputRightElement alignContent="center">
              <IconButton
                zIndex="999"
                mt="6"
                mr="2"
                aria-label="show Password"
                icon={showPassword.showPassword ? <HiEye /> : <HiEyeOff />}
              />
            </InputRightElement>
          </InputGroup>
        </label>
        <PasswordChecker />
        <label key="confirmPasswordLabel">
          <h4>Confirm Password</h4>
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
            key="confirmPasswordInput"
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
        </label>
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
