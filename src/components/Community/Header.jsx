import { Box, Flex } from "@chakra-ui/react";

const Header = ({ communityData }) => {
  return (
    <Flex direction="column" width="100%" height="300px">
      <Box>{communityData.id}</Box>
    </Flex>
  );
};

export default Header;
