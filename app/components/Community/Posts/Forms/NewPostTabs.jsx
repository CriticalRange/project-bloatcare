"use client";

import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { FaWpforms } from "react-icons/fa";
import { MdOutlinePermMedia } from "react-icons/md";
import { useRecoilState } from "recoil";
import { createPostTabAtom } from "../../../atoms/createPostTabAtom";

const NewPostTabs = () => {
  const [selectedTab, setSelectedTab] = useRecoilState(createPostTabAtom);

  return (
    <Flex justify="center" my="1">
      <Stack ml="2" spacing={2} direction="row">
        <Flex
          bg="transparent"
          onClick={() => {
            setSelectedTab("post");
          }}
          as={Button}
          borderWidth="2px"
          borderBottomColor={selectedTab === "post" ? "blue" : "none"}
        >
          <FaWpforms size={36} />
          <Text fontSize="xl">Post</Text>
        </Flex>
        <Flex
          bg="transparent"
          onClick={() => {
            setSelectedTab("media");
          }}
          as={Button}
          borderWidth="2px"
          borderBottomColor={selectedTab === "media" ? "blue" : "none"}
        >
          <MdOutlinePermMedia size={36} />
          <Text fontSize="xl">Media</Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default NewPostTabs;
