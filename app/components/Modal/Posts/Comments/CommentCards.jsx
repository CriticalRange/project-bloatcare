import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  CustomAnimatedShareIcon,
  CustomThumbsDownIcon,
  CustomThumbsDownOutlineIcon,
  CustomThumbsUpIcon,
  CustomThumbsUpOutlineIcon,
} from "../../../Icons/Components/IconComponents";
import { useDebouncedCallback } from "use-debounce";
import { useRecoilState } from "recoil";
import { postModalAtom } from "../../../atoms/postsAtom";
import { authModalAtom } from "../../../atoms/modalAtoms";
import moment from "moment";
import { userAtom } from "../../../atoms/authAtom";

const CommentCards = ({ commentInfo }) => {
  const [postModal, setPostModal] = useRecoilState(postModalAtom);
  const [currentLikeStatus, setCurrentLikeStatus] = useState(
    postModal.postInfo.numberOfLikes
  );
  const [user, setUser] = useRecoilState(userAtom);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const toast = useToast();
  const [currentDislikeStatus, setCurrentDislikeStatus] = useState(
    postModal.postInfo.numberOfDislikes
  );
  const [isLikedLocal, setIsLikedLocal] = useState(false);
  const [isDislikedLocal, setIsDislikedLocal] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  return (
    <Flex w="full" boxShadow="0px 1px" my="1">
      <Card w="full">
        <CardHeader>
          <Flex>
            <Flex flex="1" justify="flex-start" align="center">
              <Avatar src={commentInfo.commenterImageURL} h="8" w="8" />
              <Text ml="3">{commentInfo.commenter}</Text>
            </Flex>
            <Flex justify="flex-end" mr="3" align="center">
              <Text mr="3">
                {moment(
                  new Date(commentInfo.createdAt?.seconds * 1000)
                ).fromNow()}
              </Text>
              <IconButton
                aria-label="replyTo"
                icon={<CustomAnimatedShareIcon cursor="pointer" w="8" h="8" />}
              />
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text fontSize="xl">{commentInfo.comment}</Text>
        </CardBody>
        <CardFooter>
          <Flex align="center" justify="space-around">
            <IconButton
              isDisabled={likeLoading}
              /* onClick={handleLike} */
              backgroundColor="transparent"
              _hover={{ backgroundColor: "transparent" }}
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
              backgroundColor="transparent"
              _hover={{ backgroundColor: "transparent" }}
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
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default CommentCards;
