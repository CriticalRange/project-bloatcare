"use client";

import { Avatar, Flex, WrapItem } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CustomUserEmptyIcon } from "../../../../Icons/IconComponents/IconComponents";
import { auth } from "../../../../firebase/clientApp";

export default function ProfileIcon() {
  const [user] = useAuthState(auth);

  return (
    <Flex>
      <WrapItem>
        <Avatar
          size="md"
          name="User"
          referrerPolicy="no-referrer"
          src={user?.photoURL !== null ? `${user?.photoURL}` : ""}
          icon={user?.photoURL === null ? <CustomUserEmptyIcon /> : null}
        />
      </WrapItem>
    </Flex>
  );
}
