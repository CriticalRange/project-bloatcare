import React from "react";
import { useRecoilState } from "recoil";
import { profileInfoAtom } from "../atoms/postsAtom";
import { Box, Text } from "@chakra-ui/react";

const UserFollowers = () => {
  const [profileOwnerInfo, setProfileOwnerInfo] =
    useRecoilState(profileInfoAtom);
  return (
    <Box>
      <Text>
        {
          // @ts-ignore
          profileOwnerInfo.Display_Name
        }
        &apos; followers
      </Text>
    </Box>
  );
};

export default UserFollowers;
