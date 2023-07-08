import { Avatar, Flex, WrapItem } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../../firebase/clientApp";

export default function ProfileIcon() {
  const [user] = useAuthState(auth);
  return (
    <Flex>
      <WrapItem>
        <Avatar
          size="md"
          name="User"
          src={
            user.photoURL === null
              ? "https://cdn-icons-png.flaticon.com/512/847/847969.png?w=740&t=st=1688047810~exp=1688048410~hmac=57a83b88b6799d42406b0f7ed2e33213cea22c514a42e66526d2c13206e3398a"
              : `${user.photoURL}`
          }
        ></Avatar>
      </WrapItem>
    </Flex>
  );
}
