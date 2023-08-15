import { Flex, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { commentsAtom } from "../../../../atoms/postsAtom";
import dynamic from "next/dynamic";
import CommentCardsLoading from "./CommentCardsLoading";

const Comments = () => {
  const [commentState, setCommentState] = useRecoilState(commentsAtom);
  const DynamicCommentCards = dynamic(() => import("../CommentCards"), {
    loading: () => <CommentCardsLoading />,
  });
  return (
    <Flex
      w="full"
      my="1"
      h={Object.keys(commentState.comments || {}).length === 0 ? "md" : "auto"}
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
        Object.values(commentState.comments?.[0] || {}).map((value) => (
          <DynamicCommentCards
            key={`${value.createdAt}-${value.commenter}`}
            commentInfo={value}
          />
        ))
      )}
    </Flex>
  );
};

export default Comments;
