import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import ProfileIcon from "./ProfileIcon";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { signOut } from "firebase/auth";

export default function NavbarProfile() {
  const toast = useToast();
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex mr="3">
      <Menu>
        <MenuButton
          as={Button}
          textColor="black"
          _dark={{
            textColor: "white",
          }}
          rightIcon={<ProfileIcon />}
        >
          <Text textOverflow="ellipsis" display={{ base: "none", md: "unset" }}>
            {user.displayName === null ? user.email : user.displayName}
          </Text>
        </MenuButton>
        <MenuList bg="white" _dark={{ bg: "black" }}>
          <Link href="/account">
            <MenuItem
              title="Account"
              bg="white"
              textColor="black"
              _dark={{ bg: "black", textColor: "white" }}
            >
              Account
            </MenuItem>
          </Link>
          <Link href="/settings">
            <MenuItem
              bg="white"
              textColor="black"
              _dark={{ bg: "black", textColor: "white" }}
            >
              Settings
            </MenuItem>
          </Link>
          <MenuItem
            bg="white"
            textColor="black"
            _dark={{ bg: "black", textColor: "white" }}
            onClick={() => {
              signOut(auth);
              toast({
                title: "Successfully logged out!.",
                description: "Logged out of your account.",
                status: "info",
                duration: 1600,
                isClosable: true,
                position: "bottom-left",
              });
            }}
          >
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
