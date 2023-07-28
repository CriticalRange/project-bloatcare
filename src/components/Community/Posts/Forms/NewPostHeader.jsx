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
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase/clientApp";
import useCommunityData from "../../../../hooks/useCommunityData";
import Link from "next/link";

const NewPostHeader = () => {
  const [user] = useAuthState(auth);
  const { communityData, onJoinOrLeaveCommunity, loading } = useCommunityData();

  const router = useRouter();
  const { communityId } = router.query;
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
            {communityId}
          </MenuButton>
          <MenuList>
            {user
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
              : null}
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default NewPostHeader;
