"use client"; // Error components must be Client Components

import { Alert, Button, Center, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BloatcareIcon } from "./components/Icons/Components/IconComponents";
import { motion } from "framer-motion";

export default function Error({ error, reset }) {
  const [showError, setShowError] = useState(false);
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
          <Text fontSize="3xl" fontWeight="bold" color="white">
            Something went wrong!
          </Text>
          <Button
            mt="4"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try to recover
          </Button>
          <Text mt="3" cursor="pointer" color="white">
            Show the Error
          </Text>
          {showError && (
            <Alert mt="4" status="error">
              {error.message}
            </Alert>
          )}
        </Flex>
      </Center>
    </motion.div>
  );
}
