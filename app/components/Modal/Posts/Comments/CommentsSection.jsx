"use client";

import { Box, Button, Flex, Text, Textarea, useToast } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { postModalAtom } from "../../../atoms/postModalAtom";
import usePostComments from "../../../../hooks/usePostComments";
import { useEffect, useState } from "react";
import { commentsAtom } from "../../../atoms/postsAtom";
import { auth, firestore } from "../../../firebase/clientApp";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { authModalAtom } from "../../../atoms/modalAtoms";
import { v4 as uuidv4 } from "uuid";
import CommentCards from "./CommentCards";

const CommentsSection = () => {
  const [postModal, setPostModal] = useRecoilState(postModalAtom);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const [commentState, setCommentState] = useRecoilState(commentsAtom);
  const [user] = useAuthState(auth);
  const toast = useToast();
  const { getPostComments } = usePostComments();
  const randomUUID = uuidv4();

  const [commentForm, setCommentForm] = useState("");

  const onCreateComment = async (event) => {
    event.preventDefault();
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
          <Button type="submit">Post</Button>
        </form>
      </Flex>
      <Flex direction="column">
        <Text fontSize="xl" my="1">
          Comments
        </Text>
        <Flex
          w="full"
          my="1"
          h={
            Object.keys(commentState.comments || {}).length === 0
              ? "md"
              : "auto"
          }
          borderRadius="md"
          boxShadow="0px 2px 1px"
          align="center"
          direction="column"
        >
          {Object.keys(commentState.comments || {})?.length === 0 ||
          commentState.isEmpty ? (
            <Text mt="5" fontSize="2xl">
              No comments yet
            </Text>
          ) : (
            Object.values(commentState.comments?.[0] || {}).map(
              (value) => (
                console.log("mappedValues:", value),
                (
                  <CommentCards
                    key={`${value.createdAt}-${value.commenter}`}
                    commentInfo={value}
                  />
                )
              )
            )
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommentsSection;
