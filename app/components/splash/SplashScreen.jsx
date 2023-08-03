"use client";

import { Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const SplashScreen = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setPageLoading(true);
    const url = `${pathname}?${searchParams}`;
    console.log(url);
    setPageLoading(false);
    // You can now use the current URL
    // ...
  }, [pathname, searchParams]);

  return (
    <>
      {pageLoading ? (
        <Flex w="100%" h="100%">
          <Center>
            <Spinner />
            <Text>BloatCare</Text>
          </Center>
        </Flex>
      ) : null}
    </>
  );
};

export default SplashScreen;
