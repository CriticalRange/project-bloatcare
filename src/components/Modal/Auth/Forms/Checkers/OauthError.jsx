import { Collapse, Flex, Stack } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { oauthErrorAtom } from "../../../../../atoms/oauthErrorAtom";

const OauthError = () => {
  const [oauthError, setOauthError] = useRecoilState(oauthErrorAtom);

  return (
    <Collapse in={oauthError.showOauthError}>
      <Stack borderColor="white" bg="red.500" borderRadius="5">
        <Flex
          direction="column"
          p="2"
          align="center"
          bg="yellow.400"
          textColor="black"
        >
          Pop-up is closed by you
        </Flex>
      </Stack>
    </Collapse>
  );
};

export default OauthError;
