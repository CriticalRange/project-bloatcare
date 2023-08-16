import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CustomExternalLinkIcon } from "../../Icons/Components/IconComponents";

const MainViewCommunityCard = () => {
  const [hasEnteredView, setHasEnteredView] = useState(false);

  return (
    <AnimatePresence>
      <Flex
        as={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={
          hasEnteredView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.95 }
        }
        exit={{ opacity: 1, scale: 1 }}
        onViewportEnter={() => setHasEnteredView(true)}
      >
        <Card
          border="4px solid gray"
          mx="3"
          my="3"
          h="250"
          display={{ base: "none", md: "block" }}
          direction={{ base: "column", sm: "row" }}
          position="relative"
        >
          {/* Image */}
          <Box
            as="img"
            src="https://firebasestorage.googleapis.com/v0/b/bloatcare.appspot.com/o/posts%2Fi5SnM3RXlHmrp72SKfaA%2Fimage?alt=media&token=a3e8901b-2780-4090-92ff-bd67c4890945"
            alt="My Image"
            objectFit="cover"
            w="100%"
            h="100%"
            position="absolute"
            top="0"
            left="0"
            zIndex="0"
          />

          {/* Gradient overlay */}
          <Box
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            zIndex="0"
            bgGradient="linear(to-t, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))"
            opacity="0.9"
          />
          <Stack>
            <CardBody zIndex="0">
              <Heading size="md">BloatCare Communities</Heading>

              <Text py="2">
                Unleash your passions, ignite discussions, and some slogan text
              </Text>
            </CardBody>

            <CardFooter>
              <IconButton
                aria-label="Go to community page"
                icon={<CustomExternalLinkIcon />}
              />
            </CardFooter>
          </Stack>
        </Card>
      </Flex>
    </AnimatePresence>
  );
};

export default MainViewCommunityCard;
