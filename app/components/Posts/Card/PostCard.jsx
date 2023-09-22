"use client";

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import {
  CustomCommentDotsIcon,
  CustomCommentDotsVerticalIcon,
  CustomCommentsIcon,
  CustomThumbsDownIcon,
  CustomThumbsUpIcon,
} from "../../Icons/Components/IconComponents";
import { MotionFadingImage } from "./MotionFadingImage";

const CommunityCards = ({ post }) => {
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [newNumberOfLikes, setNewNumberOfLikes] = useState(post.numberOfLikes);
  const [newNumberOfDislikes, setNewNumberOfDislikes] = useState(
    post.numberOfDislikes
  );

  const handleOverMillion = () => {
    if (post.numberOfLikes >= 1000000) {
      setNewNumberOfLikes((post.numberOfLikes / 1000000).toFixed(1) + "M");
    } else {
      setNewNumberOfLikes(post.numberOfLikes.toLocaleString());
    }
    if (post.numberOfDislikes >= 1000000) {
      setNewNumberOfDislikes(
        (post.numberOfDislikes / 1000000).toFixed(1) + "M"
      );
    } else {
      setNewNumberOfDislikes(post.numberOfDislikes.toLocaleString());
    }
  };

  useEffect(() => {
    handleOverMillion();
  }, []);

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
        <Card w="full" bg="transparent" border="4px solid gray">
          <CardHeader>
            <Flex
              direction="row"
              flex="1"
              gap={2}
              alignItems="center"
              flexWrap="wrap"
            >
              <Avatar name={post.creatorDisplayName} src={post.creatorImage} />
              <Flex direction="column">
                <Text fontSize="3xl" color="black" _dark={{ color: "white" }}>
                  {post.title}
                </Text>
                <Text size="sm">
                  By {post.creatorDisplayName}
                  {" • "}
                  {moment(new Date(JSON.parse(post.createdAt))).fromNow()}
                </Text>
              </Flex>
              <Flex flex="1" direction="row" justify="flex-end">
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<CustomCommentDotsIcon w="6" h="6" />}
                />
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Text>{post.description}</Text>
            <MotionFadingImage key={post.id} post={post} />
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
                    {newNumberOfLikes}
                  </Text>
                  •<Text ml="2">{newNumberOfDislikes}</Text>
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
                  • <Text ml="3">{post.numberOfComments}</Text>
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
                    /* onClick={() => handleDelete()} */
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
      </Flex>
    </AnimatePresence>
  );
};

export default CommunityCards;
