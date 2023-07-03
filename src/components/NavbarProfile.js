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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ProfileIcon from "./ProfileIcon";
import { shallow } from "zustand/shallow";
import { useCredentialsStore } from "../pages/api/stores";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";

export default function NavbarProfile() {
  const toast = useToast();

  const router = useRouter();

  const { userInfo, setUserInfo } = useCredentialsStore(
    (state) => ({
      userInfo: state.userInfo,
      setUserInfo: state.setUserInfo,
    }),
    shallow
  );

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ProfileIcon />}>
        {userInfo.user.email}
      </MenuButton>
      <MenuList>
        <MenuItem>
          <Link href="/account">Account</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/settings">Settings</Link>
        </MenuItem>
        <MenuItem
          onClick={() => (
            auth.signOut(),
            setUserInfo(null),
            console.log("logged out hopefully: ", userInfo),
            toast({
              title: "Successfully logged out!.",
              description: "Logged out of your account.",
              status: "info",
              duration: 1600,
              isClosable: true,
              position: "bottom-left",
            })
          )}
        >
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
