import { Collapse, Flex, Stack } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { passwordCheckerAtom } from "../../../../../atoms/atoms";

const ConfirmPasswordChecker = () => {
  const [passwordChecker, setPasswordChecker] =
    useRecoilState(passwordCheckerAtom);

  return (
    <Collapse in={passwordChecker.showConfirmPasswordChecker}>
      <Stack borderColor="white" bg="red.500" borderRadius="5">
        <Flex direction="column" p="2" align="center" textColor="white">
          Passwords do not match
        </Flex>
      </Stack>
    </Collapse>
  );
};

export default ConfirmPasswordChecker;
