"use client";

import {
  Card,
  Flex,
  Stack,
  Text,
  Heading,
  CardBody,
  Image,
  Avatar,
  Button,
  CardFooter,
  CardHeader,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import CommunityLoadingCard from "../../Community/CommunityBody/CommunityLoadingCard";
import { MotionFadingImage } from "../../Community/CommunityBody/MotionFadingImage";
import { useState } from "react";
import { useRecoilState } from "recoil";
import usePosts from "../../../hooks/usePosts";
import { postsLoadingAtom } from "../../atoms/postsAtom";
import {
  CustomCommentDotsVerticalIcon,
  CustomCommentsIcon,
  CustomThumbsDownIcon,
  CustomThumbsUpIcon,
} from "../../Icons/IconComponents/IconComponents";

const MainCards = () => {
  const { postState, setPostState, onSelectPost, onDeletePost } = usePosts();
  const [error, setError] = useState(false);
  const [postsLoading, setPostsLoading] = useRecoilState(postsLoadingAtom);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  return (
    <AnimatePresence>
      <Flex
        mx={{ base: "4" }}
        mt="2"
        mb="3"
        as={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={
          hasEnteredView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.95 }
        }
        exit={{ opacity: 0, scale: 1 }}
        onViewportEnter={() => setHasEnteredView(true)}
      >
        {postsLoading.postsLoading ? (
          <CommunityLoadingCard />
        ) : (
          <Card bg="transparent" border="2px solid gray">
            <CardHeader>
              <Flex direction="row" flex="1" gap={2} alignItems="center">
                <Avatar name="CriticalRange" src="" />
                <Flex direction="column">
                  <Text fontSize="3xl" color="black" _dark={{ color: "white" }}>
                    Post Title
                  </Text>
                  <Text size="sm">
                    By CriticalRange
                    {" • "}1 second ago
                    {/* {moment(new Date(post.createdAt.seconds * 1000)).fromNow()} */}
                  </Text>
                </Flex>
                <Flex flex="1" direction="row" justify="flex-end">
                  <IconButton
                    variant="ghost"
                    colorScheme="gray"
                    aria-label="See menu"
                    icon={<CustomCommentDotsVerticalIcon />}
                  />
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>
                Welcome to Bloatcare, the ultimate online destination where
                passions thrive, and discussions come alive. Embrace a world of
                endless possibilities as you connect with diverse communities
                and share your thoughts through compelling posts.
              </Text>
              {/* <MotionFadingImage key={post.id} post={post} /> */}
            </CardBody>
            <CardFooter>
              <Flex
                w="full"
                justify="space-around"
                direction="row"
                align="center"
              >
                <Flex cursor="pointer">
                  <Flex align="center" justify="space-around">
                    <IconButton
                      aria-label="Likes"
                      icon={<CustomThumbsUpIcon />}
                    ></IconButton>{" "}
                    <Text ml="2" mr="2">
                      9999
                    </Text>
                    •<Text ml="2">10</Text>
                    <IconButton
                      ml="2"
                      aria-label="Dislikes"
                      icon={<CustomThumbsDownIcon />}
                    ></IconButton>
                  </Flex>
                </Flex>
                <Flex align="inherit" direction="row" cursor="pointer">
                  <Button
                    variant="ghost"
                    colorScheme="gray"
                    aria-label="Comments"
                    leftIcon={<CustomCommentsIcon />}
                  >
                    {" "}
                    • <Text ml="3">9999</Text>
                  </Button>
                </Flex>
                <Flex
                  align="inherit"
                  direction="row"
                  justify="center"
                  cursor="pointer"
                >
                  <Menu flip>
                    <MenuButton
                      as={IconButton}
                      variant="ghost"
                      colorScheme="gray"
                      aria-label="See menu"
                      icon={<CustomCommentDotsVerticalIcon />}
                    ></MenuButton>
                    <MenuList
                      onClick={() => {}}
                      border="1px solid gray"
                      bg="#a60a0a"
                    >
                      <MenuItem bg="#a60a0a">Delete</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Flex>
            </CardFooter>
          </Card>
        )}
      </Flex>
    </AnimatePresence>
  );
};

export default MainCards;
