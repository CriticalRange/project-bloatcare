"use client";

import { Button, Flex, IconButton, Text, useColorMode } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { communitiesAtom } from "../../atoms/communitiesAtom";
import Posts from "../Posts/Posts";
import CommunitySorter from "./CommunitySorter";
import { postsState } from "../../atoms/postsAtom";
import { Link } from "@chakra-ui/next-js";
import { useParams } from "next/navigation";
import { CustomAnimatedArrowRightIcon } from "../../Icons/Components/IconComponents";

const CommunityBody = () => {
  const [communityData, setCommunityData] = useRecoilState(communitiesAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  const [postState, setPostState] = useRecoilState(postsState);

  const params = useParams();
  const communityIdParam = params.communityId;

  return (
    <Flex direction="column" _dark={{ bg: "customGray" }}>
      <Flex
        align="center"
        maxW={{ base: "100%", sm: "850px" }}
        mt="3"
        mx="3"
        h="auto"
        borderRadius={
          colorMode === "light" ? "65" : colorMode === "dark" ? "0" : null
        }
      >
        <Flex flex="1" direction="column">
          <Flex flex="1" direction="row" justify="flex-start">
            <Text fontSize="2xl" fontWeight="bold" mt="3">
              Posts on {communityData.communityId}
            </Text>
            <CommunitySorter />
          </Flex>
          {postState.isEmpty ? (
            <Flex flex="1" mt="10" direction={{ base: "column", md: "row" }}>
              <Text fontSize="3xl">No posts created by anyone... yet</Text>
              <Flex flex="1" direction="row" justify="flex-end" mr="10">
                <Link href={`/communities/${communityIdParam}/new`}>
                  <Text fontSize="2xl">Be the first</Text>
                  <IconButton
                    aria-label="Be the first"
                    icon={<CustomAnimatedArrowRightIcon w="8" h="8" />}
                  />
                </Link>
              </Flex>
            </Flex>
          ) : (
            <Flex flex="1" direction="column">
              <Posts />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommunityBody;
