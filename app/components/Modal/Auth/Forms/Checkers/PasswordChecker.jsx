"use client";

import { Box, Collapse, Flex, Progress, Stack, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import {
  CustomCheckmark,
  CustomRemoveIcon,
} from "../../../../Icons/IconComponents/IconComponents";
import { passwordCheckerAtom } from "../../../../atoms/checkers/passwordCheckerAtom";

export const passwordValidateRegex = ["[A-Z]", "[a-z]", "[0-9]", "\\W"];

const PasswordChecker = () => {
  const [passwordChecker, setPasswordChecker] =
    useRecoilState(passwordCheckerAtom);
  const calculateStrengthPercentage = () => {
    const {
      showPasswordChecker,
      passwordsMatch,
      showConfirmPasswordChecker,
      ...restPasswordChecker
    } = passwordChecker;
    const trueCount = Object.values(restPasswordChecker).filter(
      (value) => value
    ).length;

    if (trueCount === 0) {
      return 0;
    } else if (trueCount === 1) {
      return 20;
    } else if (trueCount === 2) {
      return 40;
    } else if (trueCount === 3) {
      return 60;
    } else if (trueCount === 4) {
      return 80;
    } else if (trueCount === 5) {
      return 100;
    }
  };
  const strengthPercentage = calculateStrengthPercentage();

  return (
    <Collapse in={passwordChecker.showPasswordChecker} animateOpacity>
      <Stack borderColor="white" bg="yellow.500" borderRadius="5">
        <Flex direction="column" mb="2" textColor="white">
          <Text ml="2" fontWeight="bold">
            Password must contain the following:
          </Text>

          <Box ml="2">
            {passwordChecker.testIsLowercase ? (
              <CustomCheckmark color="green" />
            ) : (
              <CustomRemoveIcon color="red" />
            )}{" "}
            A lowercase letter
          </Box>

          <Box ml="2">
            {" "}
            {passwordChecker.testIsUppercase ? (
              <CustomCheckmark color="green" />
            ) : (
              <CustomRemoveIcon color="red" />
            )}{" "}
            A capital (uppercase) letter
          </Box>

          <Box ml="2">
            {" "}
            {passwordChecker.testIsNumbers ? (
              <CustomCheckmark color="green" />
            ) : (
              <CustomRemoveIcon color="red" />
            )}{" "}
            A number
          </Box>

          <Box ml="2">
            {" "}
            {passwordChecker.testIsSpecialChars ? (
              <CustomCheckmark color="green" />
            ) : (
              <CustomRemoveIcon color="red" />
            )}{" "}
            A special Character
          </Box>

          <Box ml="2">
            {" "}
            {passwordChecker.testPasswordLength ? (
              <CustomCheckmark color="green" />
            ) : (
              <CustomRemoveIcon color="red" />
            )}{" "}
            Minimum 8 characters
          </Box>
        </Flex>
        <Progress
          mx="2"
          borderRadius="5"
          colorScheme="green"
          size="sm"
          value={strengthPercentage}
        />
      </Stack>
      <br />
    </Collapse>
  );
};

export default PasswordChecker;
