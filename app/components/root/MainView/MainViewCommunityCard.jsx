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
import {
  CustomAnimatedArrowRightIcon,
  CustomExternalLinkIcon,
} from "../../Icons/Components/IconComponents";
import { Link } from "@chakra-ui/next-js";

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
          size="lg"
          boxShadow="0px 3px"
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
            bgColor="gray.300"
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
              <Heading size="md" color="white">
                BloatCare Communities
              </Heading>

              <Text py="2" color="white">
                Unleash your passions, ignite discussions, and some slogan text
              </Text>
            </CardBody>

            <CardFooter>
              <Flex justify="flex-end" align="flex-end">
                <Link href="/communities/Dummy">
                  <IconButton
                    bgColor="transparent"
                    aria-label="Go to community page"
                    icon={<CustomAnimatedArrowRightIcon />}
                  />
                </Link>
              </Flex>
            </CardFooter>
          </Stack>
        </Card>
      </Flex>
    </AnimatePresence>
  );
};

export default MainViewCommunityCard;
