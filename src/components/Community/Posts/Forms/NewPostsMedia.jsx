import { Box, Button, Center, Flex, Image } from "@chakra-ui/react";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";

const NewPostsMedia = () => {
  return (
    <Flex direction="column" h="300px" align="center" justify="center">
      <Uploady>
        <Box boxSize="30px">
          <UploadPreview fallbackUrl="https://icon-library.net/images/image-placeholder-icon/image-placeholder-icon-6.jpg" />
        </Box>
        <Button w="15%" as={UploadButton}>
          Upload new Image
        </Button>
      </Uploady>
    </Flex>
  );
};

export default NewPostsMedia;
