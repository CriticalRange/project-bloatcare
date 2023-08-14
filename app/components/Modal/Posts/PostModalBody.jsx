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
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { postModalAtom } from "../../atoms/postModalAtom";
import moment from "moment";
import { MotionFadingImage } from "../../Community/CommunityBody/MotionFadingImage";
import {
  CustomCommentDotsIcon,
  CustomThumbsUpIcon,
  CustomThumbsUpOutlineIcon,
  CustomThumbsDownIcon,
  CustomThumbsDownOutlineIcon,
  CustomCommentsIcon,
  CustomCommentDotsVerticalIcon,
} from "../../Icons/IconComponents/IconComponents";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDebouncedCallback } from "use-debounce";
import useMainPosts from "../../../hooks/useMainPosts";
import { authModalAtom } from "../../atoms/modalAtoms";
import { auth, firestore } from "../../firebase/clientApp";

const PostModalBody = () => {
  const {
    getPostsLogin,
    getPostsNoLogin,
    postState,
    setPostState,
    onSelectPost,
    onDeletePost,
    onLikePost,
    onDislikePost,
    loading,
    hasMore,
    setHasMore,
    isLiked,
    isDisliked,
  } = useMainPosts();
  const [postModal, setPostModal] = useRecoilState(postModalAtom);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const [user] = useAuthState(auth);
  const toast = useToast();
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [currentLikeStatus, setCurrentLikeStatus] = useState(
    postModal.postInfo.numberOfLikes
  );
  const [currentDislikeStatus, setCurrentDislikeStatus] = useState(
    postModal.postInfo.numberOfDislikes
  );
  const [isLikedLocal, setIsLikedLocal] = useState(false);
  const [isDislikedLocal, setIsDislikedLocal] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const debouncedLike = useDebouncedCallback(
    async (isLikedLocal, isDislikedLocal) => {
      const success = await onLikePost(
        postModal.postInfo,
        isLikedLocal,
        isDislikedLocal
      );
      if (!success) {
        setIsLikedLocal(isLikedLocal);
        setLikeLoading(false);
        setCurrentLikeStatus(currentLikeStatus);
        toast({
          title: `There was an error while ${
            isLiked ? "removing the like" : "adding a like"
          }`,
          description: "Please try again",
          status: "error",
          duration: 2500,
          position: "bottom-left",
          isClosable: true,
        });
        throw new Error("There was an error while liking the post");
      }
    },
    1000
  );

  const handleDelete = async () => {
    try {
      const success = await onDeletePost(postModal.postInfo);
      if (!success) {
        throw new Error("There was an error while deleting the post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      setLikeLoading(true);
      if (!user) {
        setAuthModal((prev) => ({
          ...prev,
          openAuthModal: true,
        }));
        toast({
          title: "You are not logged in!",
          description: "You are not allowed to like posts unless you log in",
          status: "error",
          duration: 2500,
          position: "bottom-left",
          isClosable: true,
        });
        setLikeLoading(false);
        return;
      }
      setIsLikedLocal(!isLikedLocal);
      setIsDislikedLocal(false);
      setCurrentDislikeStatus(
        isDislikedLocal ? currentDislikeStatus - 1 : currentDislikeStatus
      );
      setCurrentLikeStatus(
        isLikedLocal === false ? currentLikeStatus + 1 : currentLikeStatus - 1
      );
      debouncedLike(isLikedLocal, isDislikedLocal);
      setLikeLoading(false);
      toast({
        title: `Successfully ${isLikedLocal ? "removed like" : "added like"}`,
        status: "success",
        duration: 2500,
        position: "bottom-left",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async () => {
    try {
      setLikeLoading(true);
      if (!user) {
        setAuthModal((prev) => ({
          ...prev,
          openAuthModal: true,
        }));
        toast({
          title: "You are not logged in!",
          description: "You are not allowed to dislike posts unless you log in",
          status: "error",
          duration: 2500,
          position: "bottom-left",
          isClosable: true,
        });
        return;
      }
      setIsDislikedLocal(!isDislikedLocal);
      setIsLikedLocal(false);
      setCurrentLikeStatus(isLiked ? currentLikeStatus - 1 : currentLikeStatus);
      setCurrentDislikeStatus(
        isDislikedLocal === false
          ? currentDislikeStatus + 1
          : currentDislikeStatus - 1
      );
      const success = await onDislikePost(postModal.postInfo);
      if (!success) {
        setIsDislikedLocal(isDislikedLocal);
        setLikeLoading(false);
        setCurrentDislikeStatus(currentDislikeStatus);
        toast({
          title: `There was an error while ${
            isDisliked ? "removing the dislike" : "adding a dislike"
          }`,
          description: "Please try again",
          status: "error",
          duration: 2500,
          position: "bottom-left",
          isClosable: true,
        });
        throw new Error("There was an error while disliking the post");
      }
      setLikeLoading(false);
      toast({
        title: `Successfully ${
          isDislikedLocal ? "removed dislike" : "added dislike"
        }`,
        status: "success",
        duration: 2500,
        position: "bottom-left",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentLikeStatus = async () => {
    const userPostDocRef = doc(
      firestore,
      `users/${user?.uid}/postSnippets/${postModal.postInfo.id}`
    );
    const userPostDoc = await getDoc(userPostDocRef);
    if (!userPostDoc.exists()) {
      console.warn("User post document on getCurrentLikeStatus doesn't exist");
      return;
    }
    setIsLikedLocal(userPostDoc.data().isLiked);
    setIsDislikedLocal(userPostDoc.data().isDisliked);
  };

  useEffect(() => {
    getCurrentLikeStatus();
  }, []);

  return (
    <Flex>
      <Card mb="2" w="full" bg="transparent" boxShadow="0px 2px">
        <CardHeader>
          <Flex
            direction="row"
            flex="1"
            gap={2}
            alignItems="center"
            flexWrap="wrap"
          >
            <Flex direction="row" align="center">
              <Avatar
                name={postModal.postInfo.creatorDisplayName}
                src={postModal.postInfo.creatorImage}
                mr="3"
              />
              <Text
                fontSize="xl"
                color="black"
                _dark={{ color: "white" }}
                noOfLines={3}
              >
                {postModal.postInfo.creatorDisplayName}
                {" • "}
                {moment(
                  new Date(postModal.postInfo.createdAt?.seconds * 1000)
                ).fromNow()}
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
          <Text>{postModal.postInfo.description}</Text>
          <MotionFadingImage
            key={postModal.postInfo.id}
            post={postModal.postInfo}
          />
        </CardBody>
        <CardFooter>
          <Flex w="full" justify="space-around" direction="row" align="center">
            <Flex cursor="pointer">
              <Flex align="center" justify="space-around">
                <IconButton
                  isDisabled={likeLoading}
                  onClick={handleLike}
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
                  onClick={handleDislike}
                  ml="2"
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
                  onClick={() => handleDelete()}
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
  );
};

export default PostModalBody;
