import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  CustomAnimatedShareIcon,
  CustomThumbsDownIcon,
  CustomThumbsDownOutlineIcon,
  CustomThumbsUpIcon,
  CustomThumbsUpOutlineIcon,
} from "../../../Icons/Components/IconComponents";
import { doc, getDoc } from "firebase/firestore";
import { useDebouncedCallback } from "use-debounce";
import { auth, firestore } from "../../../firebase/clientApp";
import { useRecoilState } from "recoil";
import { postModalAtom } from "../../../atoms/postsAtom";
import useMainPosts from "../../../../hooks/Posts/useMainPosts";
import { authModalAtom } from "../../../atoms/modalAtoms";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";

const CommentCards = ({ commentInfo }) => {
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
  const [currentLikeStatus, setCurrentLikeStatus] = useState(
    postModal.postInfo.numberOfLikes
  );
  const [user] = useAuthState(auth);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const toast = useToast();
  const [currentDislikeStatus, setCurrentDislikeStatus] = useState(
    postModal.postInfo.numberOfDislikes
  );
  const [isLikedLocal, setIsLikedLocal] = useState(false);
  const [isDislikedLocal, setIsDislikedLocal] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const debouncedLike = useDebouncedCallback(async () => {
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
  }, 1000);

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
      debouncedLike();
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
    <Flex w="full" boxShadow="0px 1px" my="1">
      <Card w="full">
        <CardHeader>
          <Flex>
            <Flex flex="1" justify="flex-start" align="center">
              <Avatar src={commentInfo.commenterImageURL} h="8" w="8" />
              <Text ml="3">{commentInfo.commenter}</Text>
            </Flex>
            <Flex justify="flex-end" mr="3" align="center">
              <Text mr="3">
                {moment(
                  new Date(commentInfo.createdAt?.seconds * 1000)
                ).fromNow()}
              </Text>
              <IconButton
                aria-label="replyTo"
                icon={<CustomAnimatedShareIcon cursor="pointer" w="8" h="8" />}
              />
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text fontSize="xl">{commentInfo.comment}</Text>
        </CardBody>
        <CardFooter>
          <Flex align="center" justify="space-around">
            <IconButton
              isDisabled={likeLoading}
              onClick={handleLike}
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
              onClick={handleDislike}
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
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default CommentCards;
