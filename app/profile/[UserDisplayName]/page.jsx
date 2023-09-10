"use client";

import { useRecoilState } from "recoil";
import { userAtom } from "../../components/atoms/authAtom";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Show,
  SkeletonText,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { profileInfoAtom } from "../../components/atoms/postsAtom";
import UserPosts from "../../components/Profile/UserPosts";
import UserCommunities from "../../components/Profile/UserCommunities";
import UserFollowers from "../../components/Profile/UserFollowers";

const Profile = () => {
  const params = useParams();
  const userDisplayName = params.UserDisplayName;
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const [profileOwnerInfo, setProfileOwnerInfo] =
    useRecoilState(profileInfoAtom);

  const getProfileOwnerData = async () => {
    await axios
      .get(`/api/users/${userDisplayName}`)
      .then(async (response) => {
        setProfileOwnerInfo(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProfileOwnerData();
  }, []);
  return (
    <Flex direction="column">
      <Center>
        <Flex
          my="3"
          h="52"
          w="85%"
          bgColor="white"
          background="url(/images/random-nature-image.jpg)"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          borderRadius="10"
          position="relative"
        >
          <Avatar
            size="lg"
            position="absolute"
            left="3%"
            bottom="-12%"
            name="Profile Picture"
            src="/images/criticalrange.jpg"
          />
        </Flex>
      </Center>
      <Flex direction="row" mx="10%">
        <Flex flex="1" direction="column" ml="18">
          {profileOwnerInfo.length === 0 ? (
            <SkeletonText noOfLines={1} skeletonHeight={6} width="40" />
          ) : (
            <Text fontSize="2xl" fontWeight="bold">
              {
                // @ts-ignore
                profileOwnerInfo?.Display_Name
              }
            </Text>
          )}
          <Text fontSize="xs">1000 Reputation</Text>
        </Flex>
        <Flex justify="flex-end" gap={2}>
          <Show above="sm">
            <Button>Follow</Button>
            <Button bgColor="black" color="white">
              Message
            </Button>
          </Show>
        </Flex>
      </Flex>
      <Box mt="6">
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Posts</Tab>
            <Tab>Communities</Tab>
            <Tab>Followers</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UserPosts />
            </TabPanel>
            <TabPanel>
              <UserCommunities />
            </TabPanel>
            <TabPanel>
              <UserFollowers />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default Profile;
