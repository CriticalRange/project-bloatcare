"use client";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
  chakra,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineUser, AiOutlineEye } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { Fade } from "@chakra-ui/react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../../../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const CreateCommunityForm = () => {
  const [user] = useAuthState(auth);
  const [createCommunityModalForm, setCreateCommunityModalForm] = useState({
    title: "",
    description: "",
  });

  const [checkboxSelectedOption, setCheckboxSelectedOption] = useState("");
  const [communityName, setCommunityName] = useState("");

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

    const format = /[-.!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;
    if (format.test(communityName) || communityName.length < 3) {
      console.log(
        "Community names cannot contain special characters other than underscore, and has to be at least 3 characters."
      );
    }
    // Validate the community name not taken
    const communityDocRef = doc(firestore, "communities", communityName);
    const communityDoc = await getDoc(communityDocRef);

    if (communityDoc.exists()) {
      console.log("That community name is taken. Please try another one.");

      return;
    }

    // Create the community (firestore)
    await setDoc(communityDocRef, {
      creatorId: user?.uid,
      createdAt: serverTimestamp(),
      numberOfMembers: 1,
      privacyType: checkboxSelectedOption,
    });
  };

  return (
    <form onSubmit={handleCreateCommunity}>
      <Flex direction="column">
        <label key="createCommunityTitle">
          <chakra.h4 fontSize="2xl" fontWeight="bold">
            Title
          </chakra.h4>
          <Input
            isRequired
            my="2"
            name="title"
            key="createCommunityTitleInput"
            onChange={onFormInfoChange}
            required
            type="text"
            placeholder="Title"
            overflowY="hidden"
            display="block"
            w="full"
            borderRadius="0.375rem"
          />
        </label>
        <label>
          <chakra.h4 fontSize="2xl" fontWeight="bold">
            Community Type
          </chakra.h4>
          <Flex direction="column" mt="4">
            <Stack spacing={2} direction="column">
              <Flex>
                <Checkbox
                  value="Public"
                  isIndeterminate={false}
                  isChecked={checkboxSelectedOption === "Public"}
                  onChange={() => handleCheckboxChange("Public")}
                  size="xl"
                >
                  <AiOutlineUser fill="black" size="30" />
                  <Text>Public</Text>
                </Checkbox>
                <Text ml="10">
                  <small>Your community is visible to everyone</small>
                </Text>
              </Flex>
              <Flex>
                <Checkbox
                  value="Restricted"
                  isChecked={checkboxSelectedOption === "Restricted"}
                  onChange={() => handleCheckboxChange("Restricted")}
                  size="xl"
                >
                  <AiOutlineEye fill="black" size="30" />
                  <Text>Restricted</Text>
                </Checkbox>
                <Text ml="10">
                  <small>
                    Your community can be viewed by anyone, but with a
                    reasonable level of restriction.
                  </small>
                </Text>
              </Flex>
              <Flex direction="row" alignContent="center">
                <Checkbox
                  value="Private"
                  isChecked={checkboxSelectedOption === "Private"}
                  onChange={() => handleCheckboxChange("Private")}
                  size="xl"
                >
                  <BiLockAlt fill="black" size="30" />
                  <Text>Private</Text>
                </Checkbox>
                <Text ml="10">
                  <small>
                    Only people with access rights can see your community
                  </small>
                </Text>
              </Flex>
            </Stack>
          </Flex>
        </label>
        <Button
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
