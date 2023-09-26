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
  CustomAnimatedRemoveIcon,
  CustomAnimatedShareIcon,
  CustomCommentDotsIcon,
  CustomCommentDotsVerticalIcon,
  CustomCommentsIcon,
  CustomDeleteIcon,
  CustomThumbsDownIcon,
  CustomThumbsUpIcon,
} from "../../Icons/Components/IconComponents";
import { MotionFadingImage } from "./MotionFadingImage";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../atoms/authAtom";

const PostCards = ({ post }) => {
  const user = useRecoilValue(userAtom);
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

  const handlePostDelete = async () => {
    console.log("Post delete starts");
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
        <Card w="full" bg="transparent" boxShadow="0px 4px 2px">
          <CardHeader>
            <Flex
              direction="row"
              flex="1"
              gap={2}
              alignItems="center"
              flexWrap="wrap"
            >
              <Avatar name={post.creatorDisplayName} src={post.creatorImage} />
              <Text size="sm">
                By {post.creatorDisplayName}
                {" • "}
                {moment(new Date(JSON.parse(post.createdAt))).fromNow()}
              </Text>
              <Flex flex="1" direction="row" justify="flex-end">
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<CustomCommentDotsIcon w="6" h="6" />}
                />
              </Flex>
            </Flex>
            <Flex direction="column">
              <Text fontSize="3xl" color="black" _dark={{ color: "white" }}>
                {post.title}
              </Text>
            </Flex>
          </CardHeader>
          <CardBody>
            <Text>{post.description}</Text>
            <MotionFadingImage key={post.postId} post={post} />
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
                  <MenuList border="1px solid gray">
                    {user.Display_Name === post.creatorDisplayName ? (
                      <MenuItem>
                        <Flex
                          direction="row"
                          align="center"
                          onClick={() => handlePostDelete()}
                        >
                          <CustomDeleteIcon w="8" h="8" fill="red" mr="2" />
                        </Flex>
                        Delete
                      </MenuItem>
                    ) : null}

                    <MenuItem>
                      <Flex direction="row" align="center">
                        <CustomAnimatedShareIcon w="8" h="8" mr="2" />
                        Share
                      </Flex>
                    </MenuItem>
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

export default PostCards;
