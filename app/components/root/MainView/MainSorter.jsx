"use client";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { CustomRefreshIcon } from "../../Icons/Components/IconComponents";
import CustomSortAzSvg from "../../Icons/Custom/CustomIcons/CustomSortAzSvg";
import CustomSortZaSvg from "../../Icons/Custom/CustomIcons/CustomSortZaSvg";
import { useRecoilState } from "recoil";
import { userAtom } from "../../atoms/authAtom";
import usePostInfo from "../../hooks/Posts/usePostInfo";
import { postsState } from "../../atoms/postsAtom";

const MainSorter = () => {
  const { getHomePosts } = usePostInfo();

  // States
  const [user, setUser] = useRecoilState(userAtom);
  const [posts, setPosts] = useRecoilState(postsState);

  const getFirstPosts = async () => {
    // Getst the posts when page loads
    setPosts((prev) => ({
      ...prev,
      posts: [],
    }));
    // Fetches custom hook
    const response = await getHomePosts(10, user.authenticated);
    // We can find out if no community found bu just checking if response is undefined
    if (response === undefined) {
      setPosts((prev) => ({
        isEmpty: true,
        posts: [],
        selectedPost: null,
        isLoaded: true,
      }));
      return;
    }
    // Update the posts atom with the new posts
    setPosts((prev) => ({
      isEmpty: false,
      posts: [...prev.posts, ...response],
      selectedPost: null,
      isLoaded: true,
    }));
  };

  return (
    <Flex
      borderRadius="5px"
      direction="row"
      my="2"
      flex="1"
      alignItems="center"
      justify="flex-end"
    >
      <Button mr="2" aria-label="refresh button" onClick={getFirstPosts}>
        {" "}
        <Icon as={CustomRefreshIcon} w="8" h="10" />
      </Button>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Sort By
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Icon as={CustomSortAzSvg} w="10" h="10" />
          </MenuItem>
          <MenuItem>
            <Icon as={CustomSortZaSvg} w="10" h="10" />
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default MainSorter;
