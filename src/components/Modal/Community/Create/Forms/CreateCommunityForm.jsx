"use client";
// Form of Community creation form
// TODO: Add fade effect
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Icon,
  Input,
  Stack,
  Switch,
  Text,
  Textarea,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineUser, AiOutlineEye } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { Fade } from "@chakra-ui/react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, firestore } from "../../../../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { createCommunityModalAtom } from "../../../../../atoms/createCommunityModalAtom";
import CommunityNameChecker from "./communityNameChecker";
import { communityNameCheckerAtom } from "../../../../../atoms/checkers/communityNameCheckerAtom";
import { Tooltip } from "@chakra-ui/react";

const CreateCommunityForm = () => {
  const toast = useToast();
  const router = useRouter();

  // Get the current user info
  const [user] = useAuthState(auth);

  // Hooks
  const [communityNameChecker, setCommunityNameChecker] = useRecoilState(
    communityNameCheckerAtom
  );
  const [createCommunityModalForm, setCreateCommunityModalForm] = useState({
    title: "",
    description: "",
  });
  const [redirectSwitch, setRedirectSwitch] = useState(true);
  const [createCommunityModal, setCreateCommunityModal] = useRecoilState(
    createCommunityModalAtom
  );
  const [buttonLoading, setButtonLoading] = useState(false);
  const [checkboxSelectedOption, setCheckboxSelectedOption] =
    useState("Public");
  const [communityName, setCommunityName] = useState("");

  // Get the form info, if it's title (there aren't anything else right now) sets the community name
  const onFormInfoChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setCommunityName(value);
    }
    setCreateCommunityModalForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (value) => {
    setCheckboxSelectedOption(value);
  };

  const handleCreateCommunity = async (event) => {
    event.preventDefault();

    setButtonLoading(true);

    // Format the community name to have no special chars other than underscore, and check if it has at least 3 chars
    const format = /[-.!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;
    if (format.test(communityName) || communityName.length < 3) {
      toast({
        title: "Invalid Community Name!",
        description:
          "Community names cannot contain special characters other than underscore, and has to be at least 3 characters.",
        status: "error",
        duration: 2500,
        position: "bottom-left",
        isClosable: true,
      });
      return;
    }

    // Validate the community name not taken
    const communityDocRef = doc(
      firestore,
      "communities",
      communityName.toLocaleLowerCase().split(" ").join("")
    );

    await runTransaction(firestore, async (transaction) => {
      const communityDoc = await transaction.get(communityDocRef);
      if (communityDoc.exists()) {
        setButtonLoading(false);
        toast({
          title: "Community name taken!",
          description: "This community name is taken. Please try another one.",
          status: "error",
          duration: 2500,
          position: "bottom-left",
          isClosable: true,
        });
        return;
      }

      // Create the community (firestore)
      transaction.set(communityDocRef, {
        creatorId: user?.uid,
        createdAt: serverTimestamp(),
        displayName: communityName,
        numberOfMembers: 1,
        privacyType: checkboxSelectedOption,
      });

      // Create community snippets on user
      transaction.set(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
        {
          communityId: communityName.toLocaleLowerCase().split(" ").join(""),
          isModerator: true,
          isJoined: true,
        }
      );
      setTimeout(() => {
        setButtonLoading(false);
        toast({
          title: "Creation success!",
          description: `You successfully created your community. ${
            redirectSwitch ? "Redirecting..." : ""
          }`,
          status: "success",
          duration: 2500,
          position: "bottom-left",
          isClosable: true,
        });
        if (redirectSwitch) {
          router.push(`/communities/${communityName}`);
        }
        setCreateCommunityModal({ openCreateCommunityModal: false });
      }, 3000);
    });
  };

  return (
    <form onSubmit={handleCreateCommunity}>
      <Flex direction="column">
        <chakra.h4 fontSize="2xl" fontWeight="bold">
          Title
        </chakra.h4>
        <Input
          isRequired
          my="2"
          name="title"
          key="createCommunityTitleInput"
          onFocus={() =>
            setCommunityNameChecker((prev) => ({
              ...prev,
              showCommunityNameChecker: true,
            }))
          }
          onBlur={() =>
            setCommunityNameChecker((prev) => ({
              ...prev,
              showCommunityNameChecker: false,
            }))
          }
          onChange={onFormInfoChange}
          required
          type="text"
          placeholder="Community Title"
          overflowY="hidden"
          display="block"
          w="full"
          borderRadius="0.375rem"
        />
        <CommunityNameChecker />

        <chakra.h4 fontSize="2xl" fontWeight="bold">
          Community Type
        </chakra.h4>
        <Flex direction="column" mt="4">
          <chakra.label>
            <Flex alignContent="center" cursor="pointer">
              <Tooltip
                bg="brand.secondary"
                color="white"
                _dark={{ color: "black" }}
                hasArrow
                placement="left"
                aria-label="A tooltip"
                label="Public - Your community is visible to everyone"
              >
                <Flex align="center">
                  <Checkbox
                    defaultChecked
                    value="Public"
                    isIndeterminate={false}
                    isChecked={checkboxSelectedOption === "Public"}
                    onChange={() => handleCheckboxChange("Public")}
                    size="xl"
                  >
                    <Icon
                      as={AiOutlineUser}
                      fill="black"
                      _dark={{ fill: "white" }}
                      height="14"
                      width="14"
                    />
                  </Checkbox>
                </Flex>
              </Tooltip>
            </Flex>
          </chakra.label>

          <chakra.label>
            <Flex alignContent="center" cursor="pointer">
              <Tooltip
                bg="brand.secondary"
                color="white"
                _dark={{ color: "black" }}
                hasArrow
                placement="left"
                aria-label="Another tooltip"
                label="Restricted - Your community can be viewed by anyone, but with a reasonable
                  level of restriction."
              >
                <Flex align="center">
                  <Checkbox
                    value="Restricted"
                    isChecked={checkboxSelectedOption === "Restricted"}
                    onChange={() => handleCheckboxChange("Restricted")}
                    size="xl"
                  >
                    <Icon
                      as={AiOutlineEye}
                      fill="black"
                      _dark={{ fill: "white" }}
                      height="14"
                      width="14"
                    />
                  </Checkbox>
                </Flex>
              </Tooltip>
            </Flex>
          </chakra.label>
          <chakra.label>
            <Flex alignContent="center" cursor="pointer">
              <Tooltip
                bg="brand.secondary"
                color="white"
                _dark={{
                  color: "black",
                }}
                hasArrow
                placement="left"
                aria-label="Aanother tooltip"
                label="Private - Only people with access rights can see your community"
              >
                <Flex align="center">
                  <Checkbox
                    value="Private"
                    isChecked={checkboxSelectedOption === "Private"}
                    onChange={() => handleCheckboxChange("Private")}
                    size="xl"
                  >
                    <Icon
                      as={BiLockAlt}
                      fill="black"
                      _dark={{ fill: "white" }}
                      height="14"
                      width="14"
                    />
                  </Checkbox>
                </Flex>
              </Tooltip>
            </Flex>
          </chakra.label>
          <Flex>
            <Switch
              onChange={() => {
                setRedirectSwitch(!redirectSwitch);
              }}
              defaultChecked={true}
              size="lg"
              mt="3"
              ml="3"
            />
            <Text mt="3" ml="3">
              Auto redirect me to created community page
            </Text>
          </Flex>
        </Flex>
        <Button
          disabled={buttonLoading}
          isLoading={buttonLoading}
          my="4"
          bg="brand.primary"
          color="white"
          _dark={{ color: "white" }}
          _hover={{
            bg: "brand.secondary",
          }}
          type="submit"
        >
          Create
        </Button>
      </Flex>
    </form>
  );
};

export default CreateCommunityForm;
