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
} from "@chakra-ui/react";
import moment from "moment/moment";
import { BiCommentDots } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineThumbsUpDown } from "react-icons/md";

const CommunityCards = ({
  id,
  communityId,
  communityImageUrl,
  creatorId,
  creatorDisplayName,
  title,
  description,
  numberOfComments,
  numberOfLikes,
  imageURL,
  createdAt,
}) => {
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
            <Avatar name={creatorDisplayName} src="" />
            <Flex direction="column">
              <Text fontSize="3xl" color="black" _dark={{ color: "white" }}>
                {title}
              </Text>
              <Text size="sm">
                By {creatorDisplayName}
                {" • "}
                {moment(new Date(createdAt.seconds * 1000)).fromNow()}
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
          <Text>{description}</Text>
          <Image
            maxH="100%"
            maxW="100%"
            display={imageURL ? "block" : "none"}
            mt="2"
            mb="4"
            borderRadius="13"
            src={imageURL ? imageURL : ""}
            alt={title}
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
                • <Text ml="3">{numberOfLikes}</Text>
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
                • <Text ml="3">{numberOfComments}</Text>
              </Button>
            </Flex>
            <Flex
              align="inherit"
              direction="row"
              justify="center"
              cursor="pointer"
            >
              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                icon={<BsThreeDotsVertical />}
              ></IconButton>
            </Flex>
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default CommunityCards;
