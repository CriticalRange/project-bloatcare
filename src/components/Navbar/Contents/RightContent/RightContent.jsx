import { Button, Flex } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { authModalAtom } from "../../../../atoms/authModalAtom";
import { auth } from "../../../../firebase/clientApp";
import NavbarProfile from "../LeftContent/Profile/NavbarProfile";
import LightSwitch from "../LeftContent/LightSwitch";
import CommunityDropdown from "../LeftContent/CommunityDropdown";

const RightContent = () => {
  const [authModalState, setAuthModalState] = useRecoilState(authModalAtom);
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex flex="1" justify="flex-end">
      <LightSwitch />
      <CommunityDropdown />
      {user ? (
        <NavbarProfile />
      ) : (
        <Button
          marginRight="3"
          color="white"
          bg="#1e40af"
          textColor="white"
          _hover={{
            bg: "#60a5fa",
          }}
          _dark={{
            textColor: "white",
          }}
          onClick={() =>
            setAuthModalState({ openAuthModal: true, authModalView: "signin" })
          }
        >
          Login
        </Button>
      )}
    </Flex>
  );
};

export default RightContent;
