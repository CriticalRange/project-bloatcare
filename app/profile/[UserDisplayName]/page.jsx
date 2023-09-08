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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

const Profile = ({ params }) => {
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  return (
    <Box>
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
            <Text fontSize="2xl" fontWeight="bold">
              {
                // @ts-ignore
                userInfo?.Display_Name === null
                  ? // @ts-ignore
                    userInfo?.Email
                  : // @ts-ignore
                    userInfo?.Display_Name
              }
            </Text>
            <Text fontSize="xs">1000 Reputation</Text>
          </Flex>
          <Flex justify="flex-end" gap={2}>
            <Show above="sm">
              <Button>Follow</Button>
              <Button bgColor="black">Message</Button>
            </Show>
          </Flex>
        </Flex>
        <Box mt="6">
          <Tabs variant="enclosed">
            <TabList mb="1em">
              <Tab>Posts</Tab>
              <Tab>Communities</Tab>
              <Tab>Followers</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>{/* <UserPosts> */}</TabPanel>
              <TabPanel>{/* <UserCommunities> */}</TabPanel>
              <TabPanel>{/* <UserFollowers> */}</TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
