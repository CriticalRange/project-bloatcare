import {
  Card,
  Flex,
  Stack,
  Text,
  Heading,
  CardBody,
  Image,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

const MainCards = () => {
  const [user] = useAuthState(auth);

  return (
    <Flex>
      <Card>
        <CardBody>
          <Heading>Post title</Heading>
          <Image
            mt="2"
            mb="4"
            borderRadius="13"
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Green double couch with wooden legs"
          />
          <Stack spacing="3">
            <Text>Post description that will not overflow, or will it?</Text>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default MainCards;
