"use client";

import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useDebouncedCallback } from "use-debounce";
import { MotionFadingImage } from "../../Posts/Card/MotionFadingImage";
import {
  CustomCommentDotsIcon,
  CustomCommentDotsVerticalIcon,
  CustomThumbsDownIcon,
  CustomThumbsDownOutlineIcon,
  CustomThumbsUpIcon,
  CustomThumbsUpOutlineIcon,
} from "../../Icons/Components/IconComponents";
import { authModalAtom } from "../../atoms/modalAtoms";
import { postModalAtom } from "../../atoms/postsAtom";
import { userAtom } from "../../atoms/authAtom";

const PostModalBody = () => {
  const [postModal, setPostModal] = useRecoilState(postModalAtom);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const toast = useToast();
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [currentLikeStatus, setCurrentLikeStatus] = useState(
    postModal.postInfo.numberOfLikes
  );
  const [currentDislikeStatus, setCurrentDislikeStatus] = useState(
    postModal.postInfo.numberOfDislikes
  );
  const [isLikedLocal, setIsLikedLocal] = useState(false);
  const [isDislikedLocal, setIsDislikedLocal] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  return (
    <Flex>
      <Card mb="2" w="full" bg="transparent" boxShadow="0px 2px">
        <CardHeader>
          <Flex
            direction="row"
            flex="1"
            gap={2}
            alignItems="center"
            flexWrap="wrap"
          >
            <Flex direction="row" align="center">
              <Avatar
                name={postModal.postInfo.creatorDisplayName}
                src={postModal.postInfo.creatorImage}
                mr="3"
              />
              <Text
                fontSize="xl"
                color="black"
                _dark={{ color: "white" }}
                noOfLines={3}
              >
                {postModal.postInfo.creatorDisplayName}
                {" • "}
                {moment(
                  new Date(postModal.postInfo.createdAt?.seconds * 1000)
                ).fromNow()}
              </Text>
            </Flex>
            <Flex flex="1" direction="row" justify="flex-end">
              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                icon={<CustomCommentDotsIcon w="6" h="6" />}
              />
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{postModal.postInfo.description}</Text>
          <MotionFadingImage
            key={postModal.postInfo.id}
            post={postModal.postInfo}
          />
        </CardBody>
        <CardFooter>
          <Flex w="full" justify="space-around" direction="row" align="center">
            <Flex cursor="pointer">
              <Flex align="center" justify="space-around">
                <IconButton
                  isDisabled={likeLoading}
                  /* onClick={handleLike} */
                  aria-label="Like"
                  icon={
                    isLikedLocal ? (
                      <CustomThumbsUpIcon w="6" h="6" />
                    ) : (
                      <CustomThumbsUpOutlineIcon stroke="#fff" w="6" h="6" />
                    )
                  }
                />{" "}
                <Text cursor="auto" ml="2" mr="2">
                  {currentLikeStatus}
                </Text>
                •
                <Text cursor="auto" ml="2">
                  {currentDislikeStatus}
                </Text>
                <IconButton
                  isDisabled={likeLoading}
                  /* onClick={handleDislike} */
                  ml="2"
                  aria-label="Dislike"
                  icon={
                    isDislikedLocal ? (
                      <CustomThumbsDownIcon w="6" h="6" />
                    ) : (
                      <CustomThumbsDownOutlineIcon stroke="#fff" w="6" h="6" />
                    )
                  }
                />
              </Flex>
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
                  icon={<CustomCommentDotsVerticalIcon />}
                ></MenuButton>
                <MenuList
                  /* onClick={() => handleDelete()} */
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

export default PostModalBody;
