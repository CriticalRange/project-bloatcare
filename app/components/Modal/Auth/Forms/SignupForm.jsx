"use client";

import {
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
import axios from "axios";
import * as jose from "jose";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useDebouncedCallback } from "use-debounce";
import {
  CustomAnimatedLoadingSpinnerIcon,
  CustomEyeClosed,
  CustomEyeOpen,
} from "../../../Icons/Components/IconComponents";
import { userAtom } from "../../../atoms/authAtom";
import {
  authModalAtom,
  emailConfirmationModalAtom,
} from "../../../atoms/modalAtoms";
import {
  passwordCheckerAtom,
  showPasswordAtom,
} from "../../../atoms/passwordsAtom";
import ConfirmPasswordChecker from "./Checkers/ConfirmPasswordChecker";
import PasswordChecker, {
  passwordValidateRegex,
} from "./Checkers/PasswordChecker";

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
  const [createUserLoading, setCreateUserLoading] = useState(false);
  const [isFormValid, setFormValid] = useState(false);
  const [formChecker, setFormChecker] = useState({
    usernameStatus: "unknown",
    usernameLoading: false,
    usernameInvalid: false,
  });
  const [passwordChecker, setPasswordChecker] =
    useRecoilState(passwordCheckerAtom);
  const [emailConfirmationModal, setEmailConfirmationModal] = useRecoilState(
    emailConfirmationModalAtom
  );
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const [showPassword, setShowPassword] = useRecoilState(showPasswordAtom);

  const debouncedUsername = useDebouncedCallback(async (value) => {
    if (value.length != 0) {
      setFormChecker((prev) => ({
        ...prev,
        usernameLoading: true,
        usernameInvalid: false,
      }));
      axios
        .post("/api/usernames/", {
          Username: signupForm.username,
        })
        .then((response) => {
          if (!response.data.available) {
            setFormChecker((prev) => ({
              ...prev,
              usernameLoading: false,
              usernameStatus: "taken",
              usernameInvalid: false,
            }));
            return;
          } else {
            setFormChecker((prev) => ({
              ...prev,
              usernameLoading: false,
              usernameStatus: "available",
              usernameInvalid: false,
            }));
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
      // Create user (Custom api endpoint "/api/users" with a POST Request) and save it in userInfo atom
      setCreateUserLoading(true);
      try {
        const alg = process.env.NEXT_PUBLIC_ACCESS_JWT_ALGORITHM;
        const accessSecret = new TextEncoder().encode(
          `${process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET_KEY}`
        );

        const encodedPassword = await new jose.SignJWT({
          Password: signupForm.password,
        })
          .setProtectedHeader({ alg })
          .sign(accessSecret);
        await axios
          .post("/api/users", {
            Display_Name: signupForm.username,
            Email: signupForm.email,
            Password: encodedPassword,
            Phone_Number: "nothereyet",
          })
          .then(async (response) => {
            const accessData = await jose.jwtVerify(
              response.data.access_token,
              accessSecret
            );
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            Cookies.set("accessToken", response.data.access_token, {
              expires: 1 / 48,
              secure: true,
              sameSite: "strict",
            });
            Cookies.set("refreshToken", response.data.refresh_token, {
              expires: 100,
              secure: true,
              sameSite: "strict",
            });
            // @ts-ignore
            setUserInfo({
              authenticated: true,
              Custom_Claims: accessData.payload.Custom_Claims,
              Disabled: !!accessData.payload.Disabled,
              // @ts-ignore
              Display_Name: accessData.payload.Display_Name,
              // @ts-ignore
              Email: accessData.payload.Email,
              // @ts-ignore
              Email_Verified: accessData.payload.Email_Verified,
              // @ts-ignore
              Metadata: JSON.parse(accessData.payload.Metadata),
              // @ts-ignore
              Photo_Url: accessData.payload.Photo_Url,
              // @ts-ignore
              Provider_Data: JSON.parse(accessData.payload.Provider_Data),
              // @ts-ignore
              Uid: accessData.payload.Uid,
              // @ts-ignore
              Password_Hash: accessData.payload.Password_Hash,
              // @ts-ignore
              Phone_Number: accessData.payload.Phone_Number,
              // @ts-ignore
              Password_Salt: accessData.payload.Password_Salt,
              // @ts-ignore
              Tokens_Valid_After_Time:
                accessData.payload.Tokens_Valid_After_Time,
              // @ts-ignore
              Verification_Code: accessData.payload.Verification_Code,
              // @ts-ignore
              Communities: JSON.parse(accessData.payload.Communities),
            });

            localStorage.setItem(
              "tempCommunities",
              // @ts-ignore
              JSON.parse(accessData.payload.Communities)
            );
          })
          .catch((error) => {
            console.log(error);
            setCreateUserLoading(false);
          });
        await axios
          .post("/auth/sendVerificationCode", {
            Email: signupForm.email,
          })
          .then(() => {
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
            setCreateUserLoading(false);
            setAuthModal((prev) => ({
              ...prev,
              openAuthModal: false,
            }));
            setEmailConfirmationModal((prev) => ({
              ...prev,
              openEmailConfirmationModal: true,
            }));
          });
      } catch (error) {}
    }
  };

  const onFormInfoChange = async (event) => {
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
                autoComplete="true"
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
              autoComplete="true"
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
        {/* {userError && (
          <Alert status="error" borderRadius="xl" my="2">
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
          </Alert>
        )} */}
        <Button
          aria-label="Signup button"
          type="submit"
          w="full"
          margin="auto"
          marginTop="2"
          isLoading={createUserLoading}
          isDisabled={!isFormValid}
        >
          Signup
        </Button>
      </form>
    </Flex>
  );
}
