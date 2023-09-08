"use client"; // Error components must be Client Components

import { Button, Center, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { BloatcareIcon } from "./components/Icons/Components/IconComponents";
import { motion } from "framer-motion";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 1)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <Center h="100%">
        <Flex direction="column" align="center">
          <BloatcareIcon w="14" h="14" fill="#107cf1" cursor="pointer" />
          <Text>Something went wrong!</Text>
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try to recover
          </Button>
        </Flex>
      </Center>
    </motion.div>
  );
}
