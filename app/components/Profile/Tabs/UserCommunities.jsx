import React from "react";
import { useRecoilState } from "recoil";
import { profileInfoAtom } from "../../atoms/authAtom";
import { Box, Text } from "@chakra-ui/react";

const UserCommunities = () => {
  const [profileOwnerInfo, setProfileOwnerInfo] =
    useRecoilState(profileInfoAtom);
  return (
    <Box>
      <Text>
        {
          // @ts-ignore
          profileOwnerInfo.Display_Name
        }
        &apos;s communities
      </Text>

      {profileOwnerInfo// @ts-ignore
      .Communities.map((community) => {
        return (
          <Box key={community.id}>
            <Text>
              {
                // @ts-ignore
                community.CommunityName
              }
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default UserCommunities;
