import { Box, Flex } from "@chakra-ui/react";
import { communityDataStateAtom } from "../../atoms/communityDataStateAtom";
import { useRecoilState } from "recoil";

const Header = () => {
  const [communityData, setCommunityData] = useRecoilState(
    communityDataStateAtom
  );
  return (
    <Flex direction="column" width="100%" height="300px">
      <Box>{communityData.id}</Box>
    </Flex>
  );
};

export default Header;
