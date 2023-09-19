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
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { MotionFadingImage } from "../../Posts/Card/MotionFadingImage";
import {
  CustomCommentDotsIcon,
  CustomThumbsUpIcon,
  CustomThumbsDownIcon,
  CustomCommentsIcon,
  CustomCommentDotsVerticalIcon,
  CustomThumbsDownOutlineIcon,
  CustomThumbsUpOutlineIcon,
  CustomDeleteIcon,
  CustomAnimatedShareIcon,
} from "../../Icons/Components/IconComponents";
import { useDebouncedCallback } from "use-debounce";
import { authModalAtom } from "../../atoms/modalAtoms";
import { postModalAtom } from "../../atoms/postsAtom";
import { userAtom } from "../../atoms/authAtom";

const MainCards = ({ post }) => {
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const toast = useToast();
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [currentLikeStatus, setCurrentLikeStatus] = useState(
    post.numberOfLikes
  );
  const [postModal, setPostModal] = useRecoilState(postModalAtom);
  const [currentDislikeStatus, setCurrentDislikeStatus] = useState(
    post.numberOfDislikes
  );
  const [isLikedLocal, setIsLikedLocal] = useState(false);
  const [isDislikedLocal, setIsDislikedLocal] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

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
        <Card mb="2" w="full" bg="transparent" boxShadow="0px 2px">
          <CardHeader>
            <Flex direction="column">
              <Flex
                direction="row"
                flex="1"
                gap={2}
                alignItems="center"
                flexWrap="wrap"
              >
                <Avatar
                  name={post.creatorDisplayName}
                  src={post.creatorImage}
                  w="10"
                  h="10"
                />
                <Text size="md">{post.creatorDisplayName}</Text>
                <Flex flex="1" justify="flex-end" align="center">
                  <Text size="sm">
                    {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Text
              mb="5"
              fontSize="2xl"
              color="black"
              cursor="pointer"
              _dark={{ color: "white" }}
              noOfLines={3}
              /* onClick={handleSelectPost} */
            >
              {post.title}
            </Text>
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
              <Flex align="center" justify="space-around">
                <IconButton
                  isDisabled={likeLoading}
                  /* onClick={handleLike} */
                  backgroundColor="transparent"
                  _hover={{ backgroundColor: "transparent" }}
                  aria-label="Like"
                  icon={
                    isLikedLocal ? (
                      <CustomThumbsUpIcon w="6" h="6" />
                    ) : (
                      <CustomThumbsUpOutlineIcon stroke="#fff" w="6" h="6" />
                    )
                  }
                />{" "}
                <Text cursor="auto" ml="2" mr="2">
                  {currentLikeStatus}
                </Text>
                •
                <Text cursor="auto" ml="2">
                  {currentDislikeStatus}
                </Text>
                <IconButton
                  isDisabled={likeLoading}
                  /* onClick={handleDislike} */
                  ml="2"
                  backgroundColor="transparent"
                  _hover={{ backgroundColor: "transparent" }}
                  aria-label="Dislike"
                  icon={
                    isDislikedLocal ? (
                      <CustomThumbsDownIcon w="6" h="6" />
                    ) : (
                      <CustomThumbsDownOutlineIcon stroke="#fff" w="6" h="6" />
                    )
                  }
                />
              </Flex>
              <Flex align="inherit" direction="row" cursor="pointer">
                <Button
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="Comments"
                  leftIcon={<CustomCommentsIcon />}
                  /* onClick={handleSelectPost} */
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
                <Menu size="sm" flip isLazy>
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
                  >
                    <MenuItem>
                      <Stack direction="row" gap={2}>
                        <CustomDeleteIcon w="6" h="6" fill="red" />
                        <Text fontWeight="semibold">Delete</Text>
                      </Stack>
                    </MenuItem>
                    <MenuItem>
                      <Stack direction="row" gap={2}>
                        <CustomAnimatedShareIcon w="6" h="6" fill="red" />
                        <Text fontWeight="semibold">Share</Text>
                      </Stack>
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

export default MainCards;
