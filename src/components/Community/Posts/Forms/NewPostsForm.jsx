import { Box, Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import NewPostTabs from "./NewPostTabs";

const NewPostsForm = () => {
  return (
    <Box mx="2" my="1">
      <form>
        <label>
          <Flex direction="column">
            <Text my="2" fontSize="xl" fontWeight="bold">
              Post Title
            </Text>
            <Input
              w="65%"
              name="postTitle"
              borderColor="brand.secondary"
              _dark={{ borderColor: "gray" }}
            />
          </Flex>
        </label>
        <label>
          <Text my="2" fontSize="xl" fontWeight="bold">
            Post Description
          </Text>
          <Input
            w="96%"
            h="225"
            alignContent="center"
            name="postDescription"
            borderColor="brand.secondary"
            _dark={{ borderColor: "gray" }}
          />
        </label>
        {/* <label><TagsSystem /></label> */}
        <Center my="3">
          <Button>Create</Button>
        </Center>
      </form>
    </Box>
  );
};

export default NewPostsForm;
