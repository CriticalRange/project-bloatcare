"use client";
// Community creation form
// TODO: Add fade effect
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Switch,
  Text,
  Textarea,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { communityNameCheckerAtom } from "../../../../atoms/communitiesAtom";
import { createCommunityModalAtom } from "../../../../atoms/modalAtoms";
import {
  CustomAnimatedLoadingSpinnerIcon,
  CustomEyeOpen,
  CustomLockIcon,
  CustomUserEmptyIcon,
} from "../../../../Icons/Components/IconComponents";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import { userAtom } from "../../../../atoms/authAtom";

const CreateCommunityForm = () => {
  const toast = useToast();
  const router = useRouter();

  // States
  const [user, setUser] = useRecoilState(userAtom);
  const [communityNameChecker, setCommunityNameChecker] = useRecoilState(
    communityNameCheckerAtom
  );
  const [createCommunityForm, setCreateCommunityForm] = useState({
    title: "",
    description: "",
  });
  const [remainingChars, setRemainingChars] = useState(21);
  const [redirectSwitch, setRedirectSwitch] = useState(true);
  const [createCommunityModal, setCreateCommunityModal] = useRecoilState(
    createCommunityModalAtom
  );
  const [titleChecker, setTitleChecker] = useState({
    titleStatus: "unknown",
    titleLoading: false,
    titleInvalid: false,
  });
  const [buttonLoading, setButtonLoading] = useState(false);
  const [checkboxSelectedOption, setCheckboxSelectedOption] =
    useState("Public");

  // Title checker debounced for performance
  const debouncedTitle = useDebouncedCallback(async (value) => {
    if (value.length !== 0) {
      setTitleChecker((prev) => ({
        ...prev,
        titleLoading: true,
        titleInvalid: false,
      }));
      // Validate the community name not taken
      await axios
        .get(`/api/communities/${createCommunityForm.title}`)
        .then((response) => {
          if (response.data.response === undefined) {
            setTitleChecker((prev) => ({
              ...prev,
              titleInvalid: false,
              titleLoading: false,
              titleStatus: "available",
            }));
          } else {
            setTitleChecker((prev) => ({
              ...prev,
              titleInvalid: false,
              titleLoading: false,
              titleStatus: "taken",
            }));
          }
        });
    } else {
      setTitleChecker((prev) => ({
        ...prev,
        titleStatus: "unknown",
      }));
    }
  }, 1000);

  // Get the form info, if it's title (there aren't anything else right now) sets the community name
  const onFormInfoChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      const truncatedValue = value.slice(0, 21);
      if (remainingChars <= 0) {
        setCreateCommunityForm((prev) => ({
          ...prev,
          title: truncatedValue,
        }));
      }
      setRemainingChars(21 - truncatedValue.length);
      debouncedTitle(value);
    }
    setCreateCommunityForm((prev) => ({
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
    if (
      format.test(createCommunityForm.title) ||
      createCommunityForm.title.length < 3
    ) {
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

    // Create the community

    let addedCommunity;
    await axios
      .post("/api/communities", {
        communityName: createCommunityForm.title,
        communityType: checkboxSelectedOption,
        communityDesc: createCommunityForm.description,
      })
      .then((communityResponse) => {
        (addedCommunity = {
          name: createCommunityForm.title,
          id: communityResponse.data.id,
          isJoined: true,
          isModerator: true,
        }),
          // @ts-ignore
          axios
            .patch("/api/users", {
              // @ts-ignore
              Uid: user.Uid,
              Communities: addedCommunity,
            })
            .then((response) => {
              setUser((prev) => ({
                ...prev,
                Communities: [...prev.Communities, addedCommunity],
              }));
              localStorage.setItem(
                "tempCommunities",
                JSON.stringify([...user.Communities, addedCommunity])
              );
              setButtonLoading(false);
              router.push(`/communities/${createCommunityForm.title}`);
              router.refresh();
              setCreateCommunityModal((prev) => ({
                ...prev,
                openCreateCommunityModal: false,
              }));
            });
      });
  };

  return (
    <form onSubmit={handleCreateCommunity}>
      <label>
        <FormControl>
          <FormLabel fontSize="2xl" fontWeight="semibold">
            Title
          </FormLabel>
          <InputGroup>
            <Input
              defaultValue={createCommunityModal.defaultTitle}
              maxLength={21}
              isRequired
              my="2"
              name="title"
              key="createCommunityTitleInput"
              onChange={onFormInfoChange}
              required
              type="text"
              placeholder="Community Title"
            />
            <InputRightElement my="2" mr="1">
              <Text>{remainingChars}</Text>
            </InputRightElement>
          </InputGroup>
          {titleChecker.titleInvalid ? (
            <FormHelperText my="1" color="red.400">
              title can&apos;t be empty
            </FormHelperText>
          ) : titleChecker.titleLoading ? (
            <CustomAnimatedLoadingSpinnerIcon my="1" w="6" h="6" />
          ) : titleChecker.titleStatus === "unknown" ? (
            <FormHelperText fontWeight="semibold" my="1" color="gray">
              Pick something eligible
            </FormHelperText>
          ) : titleChecker.titleStatus === "taken" ? (
            <FormHelperText my="1" color="red.400">
              title is taken
            </FormHelperText>
          ) : titleChecker.titleStatus === "available" ? (
            <FormHelperText my="1" color="green.500">
              title is available to use
            </FormHelperText>
          ) : null}
        </FormControl>
      </label>
      <Box mt="2">
        <label>
          <FormControl>
            <FormLabel fontSize="2xl" fontWeight="semibold">
              Community Description
            </FormLabel>
            <Textarea
              name="description"
              placeholder="Community Description"
            ></Textarea>
            <FormHelperText>Describe your community</FormHelperText>
          </FormControl>
        </label>
      </Box>
      <label>
        <FormControl>
          <FormLabel fontSize="2xl" fontWeight="semibold">
            Community Type
          </FormLabel>
          <Stack gap={4}>
            <Box>
              <Checkbox
                defaultChecked
                value="Public"
                isIndeterminate={false}
                isChecked={checkboxSelectedOption === "Public"}
                onChange={() => handleCheckboxChange("Public")}
                name="publicCheckbox"
                size="xl"
              >
                <Tooltip
                  width={{ base: "200px", md: "350px" }}
                  bg="colors.brand.secondary"
                  color="colors.white"
                  _dark={{ color: "black" }}
                  hasArrow
                  placement="right"
                  aria-label="Public tooltip"
                  label="Public - Your community is visible to everyone"
                >
                  <Icon
                    as={CustomUserEmptyIcon}
                    fill="black"
                    _dark={{ fill: "white" }}
                    height="12"
                    width="12"
                  />
                </Tooltip>
              </Checkbox>
            </Box>

            <Box>
              <Checkbox
                value="Restricted"
                isChecked={checkboxSelectedOption === "Restricted"}
                onChange={() => handleCheckboxChange("Restricted")}
                size="xl"
                name="RestrictedCheckbox"
              >
                <Tooltip
                  width={{ base: "200px", md: "350px" }}
                  bg="colors.brand.secondary"
                  color="colors.white"
                  _dark={{ color: "black" }}
                  hasArrow
                  placement="right"
                  aria-label="Restricted tooltip"
                  label="Restricted - Your community can be viewed by anyone, but with a reasonable
                    level of restriction."
                >
                  <Icon
                    as={CustomEyeOpen}
                    fill="black"
                    _dark={{ fill: "white" }}
                    height="12"
                    width="12"
                  />
                </Tooltip>
              </Checkbox>
            </Box>

            <Box>
              <Checkbox
                value="Private"
                isChecked={checkboxSelectedOption === "Private"}
                onChange={() => handleCheckboxChange("Private")}
                size="xl"
                name="PrivateCheckbox"
              >
                <Tooltip
                  width={{ base: "200px", md: "350px" }}
                  bg="colors.brand.secondary"
                  color="colors.white"
                  _dark={{
                    color: "colors.black",
                  }}
                  hasArrow
                  placement="right"
                  aria-label="Private tooltip"
                  label="Private - Only people with access rights can see your community"
                >
                  <Icon
                    as={CustomLockIcon}
                    fill="colors.black"
                    _dark={{ fill: "white" }}
                    height="12"
                    width="12"
                  />
                </Tooltip>
              </Checkbox>
            </Box>
          </Stack>
        </FormControl>
      </label>
      <Box mt="2">
        <label>
          <FormControl>
            <FormLabel fontSize="2xl" fontWeight="semibold">
              Additional Settings
            </FormLabel>
            <Flex align="center">
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
          </FormControl>
        </label>
      </Box>
      <Button
        aria-label="create Community button"
        isDisabled={
          titleChecker.titleStatus === "taken" ||
          titleChecker.titleInvalid ||
          titleChecker.titleStatus === "unknown"
        }
        isLoading={buttonLoading}
        my="4"
        bg="colors.brand.primary"
        color="white"
        _dark={{ color: "white" }}
        _hover={{
          bg: "colors.brand.secondary",
        }}
        type="submit"
      >
        Create
      </Button>
    </form>
  );
};

export default CreateCommunityForm;
