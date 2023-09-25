"use client";

import {
  Hide,
  Flex,
  Card,
  Icon,
  Stack,
  CardBody,
  CardFooter,
  IconButton,
  Box,
  SkeletonText,
} from "@chakra-ui/react";
import {
  BloatcareIcon,
  CustomAnimatedArrowRightIcon,
} from "../../../Icons/Components/IconComponents";

const CommunityCardLoading = () => {
  return (
    <Hide below="md">
      <Flex w="full">
        <Card w="100%" boxShadow="0px 3px" mx="3" my="3" h="250">
          {/* Image */}
          <Icon
            as={BloatcareIcon}
            objectFit="cover"
            bgColor="gray.300"
            w="100%"
            h="100%"
            position="absolute"
            top="0"
            left="0"
            zIndex="0"
          />

          {/* Gradient overlay */}
          <Box
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            zIndex="0"
            bgGradient="linear(to-t, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))"
            opacity="0.9"
          />
          <Stack>
            <CardBody zIndex="0">
              <SkeletonText
                noOfLines={2}
                size="md"
                color="white"
              ></SkeletonText>

              <SkeletonText
                mt="2"
                noOfLines={4}
                py="2"
                color="white"
              ></SkeletonText>
            </CardBody>

            <CardFooter>
              <Flex justify="flex-end" align="flex-end">
                <IconButton
                  backgroundColor="whiteAlpha.500"
                  aria-label="Go to community page"
                  icon={<CustomAnimatedArrowRightIcon color="black" />}
                />
              </Flex>
            </CardFooter>
          </Stack>
        </Card>
      </Flex>
    </Hide>
  );
};

export default CommunityCardLoading;
