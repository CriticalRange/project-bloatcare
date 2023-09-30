"use client";

import { Box, Button, Flex, Text, Textarea, useToast } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { postModalAtom } from "../../../../atoms/postsAtom";
import { useEffect, useState } from "react";
import { commentsAtom } from "../../../../atoms/postsAtom";
import { authModalAtom } from "../../../../atoms/modalAtoms";
import { v4 as uuidv4 } from "uuid";
import CommentCards from "../CommentCards";
import dynamic from "next/dynamic";
import CommentCardsLoading from "./CommentCardsLoading";
import { userAtom } from "../../../../atoms/authAtom";

const CommentsSection = () => {
  const [postModal, setPostModal] = useRecoilState(postModalAtom);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const toast = useToast();

  const [commentForm, setCommentForm] = useState("");

  const DynamicComments = dynamic(() => import("./Comments"), {
    loading: () => <CommentCardsLoading />,
  });

  return (
    <Flex direction="column">
      <Flex direction="column" w="full">
        <form /* onSubmit={onCreateComment} */>
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
