"use client";

import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { selectedFileAtom } from "../../../atoms/postsAtom";
import { userAtom } from "../../../atoms/authAtom";

const NewPostsForm = () => {
  const params = useParams();
  const communityIdParam = params.communityId;
  const [user, setUser] = useRecoilState(userAtom);
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useRecoilState(selectedFileAtom);
  const [loading, setLoading] = useState(false);
  const [newPostFormInfo, setNewPostFormInfo] = useState({
    title: "",
    description: "",
  });

  const onNewPostFormInfoChange = (event) => {
    const { name, value } = event.target;
    setNewPostFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box mx="2" my="1">
      <form /* onSubmit={handleNewPostForm} */>
        <label key="newPostTitle">
          <Flex direction="column">
            <Text my="2" fontSize="xl" fontWeight="bold">
              Post Title
            </Text>
            <Input
              onChange={onNewPostFormInfoChange}
              w="65%"
              name="title"
              borderColor="brand.secondary"
              _dark={{ borderColor: "gray" }}
            />
          </Flex>
        </label>
        <label key="newPostDesc">
          <Text my="2" fontSize="xl" fontWeight="bold">
            Post Description
          </Text>
          <Textarea
            onChange={onNewPostFormInfoChange}
            w="96%"
            h="225"
            alignContent="center"
            name="description"
            borderColor="brand.secondary"
            _dark={{ borderColor: "gray" }}
          />
        </label>
        {/* <label><TagsSystem /></label> */}
        <Center my="3">
          <Button aria-label="Create" type="submit" isLoading={loading}>
            Create
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export default NewPostsForm;
