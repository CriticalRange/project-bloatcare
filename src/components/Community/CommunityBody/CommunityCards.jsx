import {
  Card,
  Flex,
  Stack,
  Text,
  Heading,
  CardBody,
  Image,
  CardHeader,
  CardFooter,
  Avatar,
  IconButton,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import moment from "moment/moment";
import { BiCommentDots } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineThumbsUpDown } from "react-icons/md";
import usePosts from "../../../hooks/usePosts";
import { useState } from "react";

const CommunityCards = ({ post }) => {
  const { postState, setPostState, onSelectPost, onDeletePost } = usePosts();
  const [error, setError] = useState(false);

  const handleDelete = async () => {
    try {
      const success = await onDeletePost(post);
      if (!success) {
        throw new Error("There was an error while deleting the post");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Flex mx="8" mt="2" mb="3">
      <Card
        w="full"
        cursor="pointer"
        bg="white"
        _dark={{ bg: "black" }}
        border="4px solid gray"
      >
        <CardHeader>
          <Flex
            direction="row"
            flex="1"
            gap={2}
            alignItems="center"
            flexWrap="wrap"
          >
            <Avatar name={post.creatorDisplayName} src="" />
            <Flex direction="column">
              <Text fontSize="3xl" color="black" _dark={{ color: "white" }}>
                {post.title}
              </Text>
              <Text size="sm">
                By {post.creatorDisplayName}
                {" • "}
                {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
              </Text>
            </Flex>
            <Flex flex="1" direction="row" justify="flex-end">
              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                icon={<BsThreeDotsVertical />}
              />
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{post.description}</Text>
          <Image
            maxH="100%"
            maxW="100%"
            display={post.imageURL ? "block" : "none"}
            mt="2"
            mb="4"
            borderRadius="13"
            src={post.imageURL ? post.imageURL : ""}
            alt={post.title}
          />
        </CardBody>
        <CardFooter>
          <Flex w="full" justify="space-around" direction="row" align="center">
            <Flex align="inherit" cursor="pointer">
              <Button
                variant="ghost"
                colorScheme="gray"
                aria-label="Likes & Dislikes"
                leftIcon={<MdOutlineThumbsUpDown />}
              >
                {" "}
                • <Text ml="3">{post.numberOfLikes}</Text>
              </Button>
            </Flex>
            <Flex align="inherit" direction="row" cursor="pointer">
              <Button
                variant="ghost"
                colorScheme="gray"
                aria-label="Comments"
                leftIcon={<BiCommentDots />}
              >
                {" "}
                • <Text ml="3">{post.numberOfComments}</Text>
              </Button>
            </Flex>
            <Flex
              align="inherit"
              direction="row"
              justify="center"
              cursor="pointer"
            >
              <Menu flip>
                <MenuButton
                  as={IconButton}
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<BsThreeDotsVertical />}
                ></MenuButton>
                <MenuList
                  onClick={() => handleDelete()}
                  border="1px solid gray"
                  bg="#a60a0a"
                >
                  <MenuItem bg="#a60a0a">Delete</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default CommunityCards;
