import { Box, Button, Checkbox, CheckboxGroup, Flex, Icon, Input, Stack, Textarea, chakra  } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineUser, AiOutlineEye } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";

const CreateCommunityForm = () => {
  const UserIconChakra = chakra(AiOutlineUser);
  const RestrictedIconChakra = chakra(AiOutlineEye);
  const PrivateIconChakra = chakra(BiLockAlt);

  const [createCommunityModalForm, setCreateCommunityModalForm] = useState({
    title: "",
    description: "",
  });

  const [checkboxSelectedOption, setCheckboxSelectedOption] = useState('');

  const onFormInfoChange = (event) => {
    const [ name, value ] = event.target;
    setCreateCommunityModalForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (value) => {
    setCheckboxSelectedOption(value);
  };

  handleCreateCommunity = async () => {
    // Validate the community
    // Create the community collection (firestore)
  }

  return (
    <form>
    <Flex direction="column">
      <label key="createCommunityTitle">
        <chakra.h4 fontSize="2xl" fontWeight="bold">Title</chakra.h4>
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
      <label key="createCommunityDescription">
        <chakra.h4 fontSize="2xl" fontWeight="bold">Description</chakra.h4>
        <Textarea
          w="full"
          borderRadius="6px"
          my="2"
          name="description"
          key="createCommunityDescriptionInput"
          onChange={onFormInfoChange}
          required
          placeholder="Description"
        ></Textarea>
      </label>
      <label>
        <chakra.h4 fontSize="2xl" fontWeight="bold">Community Type</chakra.h4>
        <Stack spacing={2} direction="column">
          <Checkbox
            value="Public"
            isChecked={checkboxSelectedOption === 'Public'}
            onChange={() => handleCheckboxChange('Public')}
            icon={<UserIconChakra color="black" _dark={{color: "white"}} size="30" />}
            size="lg"
          >
            Public
          </Checkbox>
          <Checkbox
            value="Restricted"
            isChecked={checkboxSelectedOption === 'Restricted'}
            onChange={() => handleCheckboxChange('Restricted')}
            icon={<RestrictedIconChakra color="black" _dark={{color: "white"}} size="30" />}
            size="lg"
          >
            Restricted
          </Checkbox>
          <Checkbox
            value="Private"
            isChecked={checkboxSelectedOption === 'Private'}
            onChange={() => handleCheckboxChange('Private')}
            icon={<PrivateIconChakra color="black" _dark={{color: "white"}} size="30" />}
            size="lg"
          >
            Private
          </Checkbox>
        </Stack>
      </label>
      <Button my="4" type="submit">Create</Button>
    </Flex></form>
  );
};

export default CreateCommunityForm;
