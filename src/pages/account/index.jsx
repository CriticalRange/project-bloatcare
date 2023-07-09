"useclient";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  Tooltip,
  useEditableControls,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { useToast } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

function Account() {
  const toast = useToast();

  const onAccountUpdate = async (event) => {
    event.preventDefault();
  };

  const [user, authLoading, error] = useAuthState(auth);

  const [accountEditor, setAccountEditor] = useState({
    editedUsername: "",
    editedEmail: "",
  });

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
        <IconButton
          aria-label="Check"
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="Close"
          icon={<CloseIcon boxSize={3} />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : null;
  }

  return (
    <>
      {authLoading ? (
        <Flex mt="10" direction="column">
          <Flex direction="row">
            <Text fontSize="4xl" ml="3" mt="5">
              Hello,{" "}
            </Text>
            <SkeletonText
              mt="7"
              noOfLines={1}
              skeletonHeight={10}
              ml="3"
              w="xs"
            ></SkeletonText>
          </Flex>
          <SkeletonText
            ml="3"
            noOfLines={1}
            mt="8"
            skeletonHeight="20px"
            w="sm"
          >
            Let&apos;s quickly go over your details
          </SkeletonText>

          <Stack
            spacing={{ base: "8", sm: "18" }}
            direction={{ base: "column", md: "row" }}
          >
            <Box>
              <SkeletonText
                noOfLines={1}
                mt="14"
                ml="3"
                w="162px"
                skeletonHeight={10}
              >
                Username
              </SkeletonText>
              <Input as={Skeleton} mt="4" ml="3" w="162px" noOfLines={1} />
            </Box>
            <Box>
              <SkeletonText
                noOfLines={1}
                mt="14"
                ml="5"
                w="162px"
                skeletonHeight={10}
              >
                Email
              </SkeletonText>
              <Input as={Skeleton} noOfLines={1} mt="4" ml="5" w="162px" />
            </Box>
          </Stack>
        </Flex>
      ) : (
        <Flex mt="10" direction="column">
          <Text fontSize="4xl" ml="3" mt="5">
            Hello, {user.displayName === null ? user.email : user.displayName}
          </Text>
          <Text fontSize="2xl" ml="3" mt="5">
            Let&apos;s quickly go over your details
          </Text>
          <Box
            height="0.5"
            mt="5"
            bg="black"
            _dark={{ bg: "white" }}
            w="full"
          />
          <form onSubmit={onAccountUpdate}>
            <Box w="auto" h="5">
              <Alert status="error">
                <AlertIcon />
                <AlertTitle noOfLines={2}>
                  There are some unsaved changes!
                </AlertTitle>
                <Button size="md" type="submit">
                  Apply changes
                </Button>
              </Alert>
            </Box>
            <Stack spacing="0" align={{ base: "flex-start", md: "inherit" }}>
              <Flex direction="column">
                <Text fontSize="4xl" mt="10" ml="3">
                  Username
                </Text>
                <Editable
                  ml="5"
                  placeholder="Not set. Click here to set it"
                  defaultValue={
                    user?.displayName === null ? "" : user.displayName
                  }
                  fontSize="xl"
                  isPreviewFocusable={true}
                  selectAllOnFocus={true}
                  minH="auto"
                >
                  <Tooltip label="Click to edit" shouldWrapChildren={true}>
                    <Box
                      as={EditablePreview}
                      py={2}
                      px={4}
                      _hover={{
                        background: "gray.300",
                        _dark: { background: "gray.700" },
                      }}
                    />
                  </Tooltip>
                  <Input py={2} px={4} as={EditableInput} />
                  <EditableControls />
                </Editable>
              </Flex>
              <Flex direction="column">
                <Text fontSize="4xl" mt="10" ml="3">
                  Email
                </Text>
                <Editable
                  ml="5"
                  defaultValue={user.email}
                  fontSize="xl"
                  isPreviewFocusable={true}
                  selectAllOnFocus={true}
                >
                  <Tooltip label="Click to edit" shouldWrapChildren={true}>
                    <Box
                      as={EditablePreview}
                      py={2}
                      px={4}
                      _hover={{
                        background: "gray.300",
                        _dark: { background: "gray.700" },
                      }}
                    />
                  </Tooltip>
                  <Input py={2} px={4} as={EditableInput} />
                  <EditableControls />
                </Editable>
              </Flex>
            </Stack>
          </form>
        </Flex>
      )}
    </>
  );
}

export default Account;
