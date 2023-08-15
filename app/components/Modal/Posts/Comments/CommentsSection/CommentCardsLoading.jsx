import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  IconButton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import CommentCards from "../CommentCards";
import moment from "moment";
import {
  CustomAnimatedShareIcon,
  CustomThumbsUpIcon,
  CustomThumbsUpOutlineIcon,
  CustomThumbsDownIcon,
  CustomThumbsDownOutlineIcon,
} from "../../../../Icons/IconComponents/IconComponents";

const CommentCardsLoading = () => {
  return (
    <Flex w="full" boxShadow="0px 1px" my="1">
      <Card w="full">
        <CardHeader>
          <Flex>
            <Flex flex="1" justify="flex-start" align="center">
              <SkeletonCircle h="8" w="8" />
              <SkeletonText ml="3" />
            </Flex>
            <Flex justify="flex-end" mr="3" align="center">
              <SkeletonText mr="3"></SkeletonText>
              <IconButton
                aria-label="replyTo"
                icon={<CustomAnimatedShareIcon cursor="pointer" w="8" h="8" />}
              />
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <SkeletonText fontSize="xl"></SkeletonText>
        </CardBody>
        <CardFooter>
          <Flex align="center" justify="space-around">
            <IconButton
              backgroundColor="transparent"
              _hover={{ backgroundColor: "transparent" }}
              aria-label="Like"
              icon={<CustomThumbsUpOutlineIcon stroke="#fff" w="6" h="6" />}
            />{" "}
            <SkeletonText cursor="auto" ml="2" mr="2" />
            •
            <SkeletonText cursor="auto" ml="2" />
            <IconButton
              ml="2"
              backgroundColor="transparent"
              _hover={{ backgroundColor: "transparent" }}
              aria-label="Dislike"
              icon={<CustomThumbsDownOutlineIcon stroke="#fff" w="6" h="6" />}
            />
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default CommentCardsLoading;
