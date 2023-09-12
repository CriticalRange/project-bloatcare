"use client";

import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  Stack,
  Text,
  Tooltip,
  useEditableControls,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../components/atoms/authAtom";

function Account() {
  const user = useRecoilValue(userAtom);
  const [showChangesPopup, setChangesPopup] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
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

  const onFormInfoChange = (event) => {
    const { name, value } = event.target;
    name === "username"
      ? (value !== editForm.username
          ? setChangesPopup(true)
          : setChangesPopup(false),
        setEditForm((prev) => ({
          ...prev,
          username: value,
        })))
      : name === "email"
      ? (value !== editForm.username
          ? setChangesPopup(true)
          : setChangesPopup(false),
        setEditForm((prev) => ({
          ...prev,
          email: value,
        })))
      : setEditForm((prev) => ({
          ...prev,
          [name]: value,
        }));
  };

  const onAccountUpdate = async (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    // @ts-ignore
    setEditForm({ username: user?.Display_Name, email: user?.Email });
  }, []);

  return (
    <>
      {user.length !== 0 ? (
        <Flex mt="10" direction="column">
          <Text fontSize="4xl" ml="3" mt="5">
            Hello,{" "}
            {
              // @ts-ignore
              user?.Display_Name
            }
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
            {showChangesPopup ? (
              <Box w="auto" h="5">
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle noOfLines={2}>
                    There are some unsaved changes!
                  </AlertTitle>
                  <Button
                    size="md"
                    aria-label="Aply changes button"
                    type="submit"
                  >
                    Apply changes
                  </Button>
                </Alert>
              </Box>
            ) : null}
            <Stack spacing="0" align={{ base: "flex-start", md: "inherit" }}>
              <Flex direction="column">
                <Text fontSize="4xl" mt="10" ml="3">
                  Username
                </Text>
                <Editable
                  ml="5"
                  placeholder="Not set. Click here to set it"
                  defaultValue={
                    // @ts-ignore
                    user?.Display_Name === null ? "" : user?.Display_Name
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
                  <Input
                    name="username"
                    onChange={onFormInfoChange}
                    py={2}
                    px={4}
                    as={EditableInput}
                  />
                  <EditableControls />
                </Editable>
              </Flex>
              <Flex direction="column">
                <Text fontSize="4xl" mt="10" ml="3">
                  Email
                </Text>
                <Editable
                  ml="5"
                  // @ts-ignore
                  defaultValue={user?.Email}
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
                  <Input
                    name="email"
                    onChange={onFormInfoChange}
                    py={2}
                    px={4}
                    as={EditableInput}
                  />
                  <EditableControls />
                </Editable>
              </Flex>
            </Stack>
          </form>
        </Flex>
      ) : null}
    </>
  );
}

export default Account;
