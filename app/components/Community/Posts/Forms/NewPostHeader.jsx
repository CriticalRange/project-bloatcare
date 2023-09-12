"use client";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { userAtom } from "../../../atoms/authAtom";

const NewPostHeader = () => {
  const params = useParams();
  const communityIdParam = params.communityId;
  const [user, setUser] = useRecoilState(userAtom);
  return (
    <Flex direction="row" p="6" align="center">
      <Text fontSize="3xl">New Post for</Text>
      <Box ml="3">
        <Menu>
          <MenuButton
            bg="transparent"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {communityIdParam === null
              ? "Please choose a community"
              : communityIdParam}
          </MenuButton>
          <MenuList>
            {/* {user
              ? communityData.userSnippets.map((snippet) => {
                  return (
                    <Link
                      key={snippet.communityId}
                      href={`/communities/${snippet.communityId}/new`}
                    >
                      <MenuItem>{snippet.communityId}</MenuItem>
                    </Link>
                  );
                })
              : null} */}
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default NewPostHeader;
