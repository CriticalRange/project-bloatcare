"use client";

import { Flex } from "@chakra-ui/react";
import NewPostsForm from "../Posts/Forms/NewPostsForm";
import NewPostHeader from "../Posts/Forms/NewPostHeader";
import NewPostTabs from "../Posts/Forms/NewPostTabs";
import { useRecoilState } from "recoil";
import { createPostTabAtom } from "../../atoms/postsAtom.jsx";
import NewPostsMedia from "../Posts/Forms/NewPostsMedia";

const NewCommunityPost = () => {
  const [selectedTab, setSelectedTab] = useRecoilState(createPostTabAtom);

  return (
    <Flex direction="column">
      <NewPostHeader />
      <Flex
        direction="column"
        bg="white"
        _dark={{ bg: "black" }}
        borderTopLeftRadius="65"
        borderTopRightRadius="65"
        mx="3"
      >
        <NewPostTabs />
        {selectedTab === "post" ? (
          <NewPostsForm />
        ) : selectedTab === "media" ? (
          <NewPostsMedia />
        ) : null}
      </Flex>
    </Flex>
  );
};

export default NewCommunityPost;
