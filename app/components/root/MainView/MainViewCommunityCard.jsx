import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Hide,
  Icon,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  BloatcareIcon,
  CustomAnimatedArrowRightIcon,
  CustomExternalLinkIcon,
} from "../../Icons/Components/IconComponents";
import { Image, Link } from "@chakra-ui/next-js";

const MainViewCommunityCard = ({ community }) => {
  const [hasEnteredView, setHasEnteredView] = useState(false);

  return (
    <AnimatePresence>
      <Hide below="md">
        <Flex
          w="full"
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
          <Card maxW="440" boxShadow="0px 3px" mx="3" my="3" h="250">
            {/* Image */}
            {community.CommunityImage === "" ? (
              <Box
                as="img"
                alt={`Community image for ${community.CommunityName}`}
                objectFit="cover"
                bgColor="gray.300"
                w="100%"
                h="100%"
                position="absolute"
                top="0"
                left="0"
                zIndex="0"
              />
            ) : (
              <Icon
                as={BloatcareIcon}
                objectFit="cover"
                bgColor="gray.300"
                w="100%"
                h="100%"
                position="absolute"
                top="0"
                left="0"
                zIndex="0"
              />
            )}

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
                  {community.CommunityName}
                </Heading>

                <Text py="2" color="white">
                  {community.CommunityDescription !== ""
                    ? community.CommunityDescription
                    : "Description couldn't be found, but the community still looks great!"}
                </Text>
              </CardBody>

              <CardFooter>
                <Flex justify="flex-end" align="flex-end">
                  <Link href={`/communities/${community.CommunityName}`}>
                    <IconButton
                      backgroundColor="whiteAlpha.500"
                      aria-label="Go to community page"
                      icon={<CustomAnimatedArrowRightIcon color="black" />}
                    />
                  </Link>
                </Flex>
              </CardFooter>
            </Stack>
          </Card>
        </Flex>
      </Hide>
    </AnimatePresence>
  );
};

export default MainViewCommunityCard;
