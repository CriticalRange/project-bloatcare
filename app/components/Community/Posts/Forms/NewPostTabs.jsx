"use client";

import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import {
  CustomFormIcon,
  CustomMediaIcon,
} from "../../../Icons/Components/IconComponents";
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
          <CustomFormIcon w="8" h="8" />
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
          <CustomMediaIcon w="8" h="8" />
          <Text fontSize="xl">Media</Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default NewPostTabs;
