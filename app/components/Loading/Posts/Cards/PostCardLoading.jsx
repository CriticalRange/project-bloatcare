"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import {
  CustomCommentDotsIcon,
  CustomCommentDotsVerticalIcon,
  CustomThumbsDownOutlineIcon,
  CustomThumbsUpOutlineIcon,
} from "../../../Icons/Components/IconComponents";

const PostCardLoading = () => {
  return (
    <Card w="full" bg="transparent" boxShadow="0px 2px">
      <CardHeader>
        <Flex
          mt="2"
          mb="3"
          direction="row"
          flex="1"
          gap={2}
          alignItems="center"
          flexWrap="wrap"
        >
          <SkeletonCircle size="12" />
          <Flex direction="column">
            <SkeletonText
              mt="2"
              w="base"
              noOfLines={1}
              skeletonHeight="6"
              color="black"
              _dark={{ color: "white" }}
            ></SkeletonText>
            <Flex direction="row" my="3" align="center">
              <SkeletonText
                noOfLines={1}
                skeletonHeight="3"
                w="36"
              ></SkeletonText>
              <Text ml="3">{" • "}</Text>
              <SkeletonText noOfLines={1} ml="3" skeletonHeight="3" w="36">
                By
              </SkeletonText>
            </Flex>
          </Flex>
          <Flex flex="1" direction="row" justify="flex-end">
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<CustomCommentDotsVerticalIcon />}
            />
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <SkeletonText noOfLines={3} skeletonHeight="4"></SkeletonText>
        <Skeleton mt="6" h="200" />
      </CardBody>
      <CardFooter>
        <Flex w="full" justify="space-around" direction="row" align="center">
          <Flex align="inherit" cursor="pointer">
            <Button
              variant="ghost"
              colorScheme="gray"
              aria-label="Likes & Dislikes"
              leftIcon={<CustomThumbsUpOutlineIcon />}
              rightIcon={<CustomThumbsDownOutlineIcon />}
            >
              {" "}
              •
              <SkeletonText
                noOfLines={1}
                skeletonHeight="3"
                ml="2"
                w="12"
              ></SkeletonText>
            </Button>
          </Flex>
          <Flex align="inherit" direction="row" cursor="pointer">
            <Button
              variant="ghost"
              colorScheme="gray"
              aria-label="Comments"
              leftIcon={<CustomCommentDotsIcon />}
            >
              {" "}
              •{" "}
              <SkeletonText
                noOfLines={1}
                skeletonHeight="3"
                ml="2"
                w="12"
              ></SkeletonText>
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
                icon={<CustomCommentDotsVerticalIcon />}
              ></MenuButton>
            </Menu>
          </Flex>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default PostCardLoading;
