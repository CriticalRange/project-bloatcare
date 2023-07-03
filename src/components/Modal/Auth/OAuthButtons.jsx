import { Button, Flex, Image } from "@chakra-ui/react";

function OAuthButtons() {
  return (
    <Flex>
      <Button>
        Continue with{" "}
        <Image
          src="images/google-logo.png"
          ml="2"
          width="6"
          height="6"
          alt="Google logo"
        />
      </Button>
    </Flex>
  );
}

export default OAuthButtons;
