import { Avatar, Box, Flex, WrapItem } from "@chakra-ui/react";

const CommunityImage = () => {
  return (
    <Flex>
      <Box>
        <WrapItem>
          <Avatar
            size="lg"
            name="Community Image"
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png?w=740&t=st=1688047810~exp=1688048410~hmac=57a83b88b6799d42406b0f7ed2e33213cea22c514a42e66526d2c13206e3398a"
          />
        </WrapItem>
      </Box>
    </Flex>
  );
};

export default CommunityImage;
