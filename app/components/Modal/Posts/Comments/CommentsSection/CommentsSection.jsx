"use client";

import { Box, Button, Flex, Text, Textarea, useToast } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { postModalAtom } from "../../../../atoms/postsAtom";
import usePostComments from "../../../../../hooks/Posts/usePostComments";
import { useEffect, useState } from "react";
import { commentsAtom } from "../../../../atoms/postsAtom";
import { auth, firestore } from "../../../../firebase/clientApp";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { authModalAtom } from "../../../../atoms/modalAtoms";
import { v4 as uuidv4 } from "uuid";
import CommentCards from "../CommentCards";
import dynamic from "next/dynamic";
import CommentCardsLoading from "./CommentCardsLoading";

const CommentsSection = () => {
  const [postModal, setPostModal] = useRecoilState(postModalAtom);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const [user] = useAuthState(auth);
  const toast = useToast();
  const { getPostComments } = usePostComments();

  const [commentForm, setCommentForm] = useState("");

  const DynamicComments = dynamic(() => import("./Comments"), {
    loading: () => <CommentCardsLoading />,
  });

  const onCreateComment = async (event) => {
    event.preventDefault();
    if (commentForm === "") {
      return;
    }
    if (!user) {
      setAuthModal((prev) => ({
        ...prev,
        openAuthModal: true,
      }));
      toast({
        title: "You are not logged in!",
        description:
          "You are not allowed to comment on posts unless you log in",
        status: "error",
        duration: 2500,
        position: "bottom-left",
        isClosable: true,
      });
      return;
    }
    const postCommentsDocRef = doc(
      firestore,
      "comments",
      postModal.postInfo.id
    );
    const postCommentsDoc = await getDoc(postCommentsDocRef);
    const randomUUID = uuidv4();
    if (!postCommentsDoc.exists()) {
      await setDoc(postCommentsDocRef, {
        [randomUUID]: {
          comment: commentForm,
          createdAt: serverTimestamp(),
          commenter: user?.displayName,
          commenterImageURL: user?.photoURL,
          replyingTo: "none",
        },
      });
      getPostComments();
      return;
    }
    await updateDoc(postCommentsDocRef, {
      [randomUUID]: {
        comment: commentForm,
        createdAt: serverTimestamp(),
        commenter: user?.displayName,
        commenterImageURL: user?.photoURL,
        replyingTo: "none",
      },
    });
    getPostComments();
  };

  useEffect(() => {
    getPostComments();
  }, []);

  return (
    <Flex direction="column">
      <Flex direction="column" w="full">
        <form onSubmit={onCreateComment}>
          <Text fontSize="xl" my="2">
            Create a Comment
          </Text>
          <Textarea
            name="commentTextBox"
            onChange={(event) => setCommentForm(event.target.value)}
            resize="none"
            w="full"
          ></Textarea>
          <Button aria-label="post button" type="submit">
            Post
          </Button>
        </form>
      </Flex>
      <Flex direction="column">
        <Text fontSize="xl" my="1">
          Comments
        </Text>
        <DynamicComments />
      </Flex>
    </Flex>
  );
};

export default CommentsSection;
