"use client";

import { Button, Flex } from "@chakra-ui/react";
import React from "react";

const page = () => {
  const callHandler = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        name: "John Doe",
      }),
    });
  };
  return (
    <Flex>
      <Button onClick={callHandler}>Make a call</Button>
    </Flex>
  );
};

export default page;
