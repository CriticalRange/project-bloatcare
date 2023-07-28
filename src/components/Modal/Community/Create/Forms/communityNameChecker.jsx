import { Collapse, Stack, Flex, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { communityNameCheckerAtom } from "../../../../../atoms/checkers/communityNameCheckerAtom";

const CommunityNameChecker = () => {
  const [communityNameChecker, setCommunityNameChecker] = useRecoilState(
    communityNameCheckerAtom
  );

  return (
    <Collapse in={communityNameChecker.showCommunityNameChecker}>
      <Stack borderColor="white" bg="yellow.500" borderRadius="5">
        <Flex direction="column" p="2" textColor="white">
          <Text fontSize="md">Community name should contain:</Text>
          <Text>No special characters other than underscore</Text>
          <Text>At least 3 characters</Text>
        </Flex>
      </Stack>
    </Collapse>
  );
};

export default CommunityNameChecker;
