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
          {user.email}
        </MenuButton>
        <MenuList bg="white" _dark={{ bg: "black" }}>
          <MenuItem
            bg="white"
            textColor="black"
            _dark={{ bg: "black", textColor: "white" }}
          >
            <Link href="/account">Account</Link>
          </MenuItem>
          <MenuItem
            bg="white"
            textColor="black"
            _dark={{ bg: "black", textColor: "white" }}
          >
            <Link href="/settings">Settings</Link>
          </MenuItem>
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
