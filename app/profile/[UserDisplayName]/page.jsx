"use client";

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
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { CustomUserEmptyIcon } from "../../components/Icons/Components/IconComponents";
import UserCommunities from "../../components/Profile/Tabs/UserCommunities";
import UserFollowers from "../../components/Profile/Tabs/UserFollowers";
import UserPosts from "../../components/Profile/Tabs/UserPosts";
import { userAtom } from "../../components/atoms/authAtom";
import { profileInfoAtom } from "../../components/atoms/authAtom";

const Profile = () => {
  const params = useParams();
  // A way to get the userDisplayName parameter
  const userDisplayName = params.UserDisplayName;

  // State
  // @ts-ignore
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const [profileOwnerInfo, setProfileOwnerInfo] =
    useRecoilState(profileInfoAtom);

  // Gets the Profile's owner's user Info
  const getProfileOwnerInfo = async () => {
    await axios
      .get(`/api/users/${userDisplayName}`)
      .then(async (response) => {
        console.log("Repsonse: ", response.data);
        console.log("User: ", userInfo);
        setProfileOwnerInfo({ ...response.data });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProfileOwnerInfo();
  }, []);
  console.log("User outside: ", userInfo);

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
          {
            // @ts-ignore
            profileOwnerInfo.Photo_URL === "" ? (
              <Avatar
                size="lg"
                position="absolute"
                left="3%"
                bottom="-12%"
                icon={<CustomUserEmptyIcon w="10" h="10" />}
              />
            ) : (
              <Avatar
                size="lg"
                position="absolute"
                left="3%"
                bottom="-12%"
                // @ts-ignore
                src={profileOwnerInfo.Photo_URL}
              />
            )
          }
        </Flex>
      </Center>
      <Flex direction="row" mx="10%">
        <Flex flex="1" direction="column" ml="18">
          {!profileOwnerInfo.authenticated ? (
            <SkeletonText noOfLines={1} skeletonHeight={6} width="40" />
          ) : (
            <Text fontSize="2xl" fontWeight="bold">
              {
                // @ts-ignore
                profileOwnerInfo.Display_Name
              }
            </Text>
          )}
          <Text fontSize="xs">
            {
              // @ts-ignore
              profileOwnerInfo.Reputation || 1000
            }{" "}
            Reputation
          </Text>
        </Flex>
        <Flex justify="flex-end" gap={2}>
          {userInfo.authenticated ? (
            // @ts-ignore
            userInfo.Uid !== profileOwnerInfo.Uid ? (
              <Show above="sm">
                <Button>Follow</Button>
                <Button bgColor="black" color="white">
                  Message
                </Button>
              </Show>
            ) : (
              <Button bgColor="black" color="white">
                Manage
              </Button>
            )
          ) : (
            <Show above="sm">
              <Button>Follow</Button>
              <Button bgColor="black" color="white">
                Message
              </Button>
            </Show>
          )}
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
