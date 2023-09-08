"use client";

import { useRecoilState } from "recoil";
import { userAtom } from "../components/atoms/authAtom";
import { Avatar, Box, Center, Flex, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

const Profile = () => {
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  // instead of getting it from useAuthState, make a profile page for every user
  return (
    <Box>
      <Flex direction="column">
        <Center>
          <Flex
            my="3"
            h="60"
            w="90%"
            bgColor="white"
            background="url(/images/random-nature-image.jpg)"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            borderRadius="10"
          ></Flex>
        </Center>
        <Avatar
          size="lg"
          position="absolute"
          left="10%"
          bottom="10%"
          name="Profile Picture"
          src="/images/criticalrange.jpg"
        />
        <Flex direction="row">
          <Flex direction="column" ml="18%">
            <Text fontSize="lg">
              {
                // @ts-ignore
                userInfo?.Display_Name === null
                  ? // @ts-ignore
                    userInfo?.Email
                  : // @ts-ignore
                    userInfo?.Display_Name
              }
              &apos;s profile
            </Text>
            <Text>1000 Reputation</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Profile;
