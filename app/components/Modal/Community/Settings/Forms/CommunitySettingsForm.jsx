import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import React from "react";

const CommunitySettingsForm = () => {
  const params = useParams();
  const communityIdParam = params.communityId;
  return (
    <Box>
      <form>
        <Box>
          <label key="communityNameInput">
            <FormControl>
              <FormLabel>Community Name</FormLabel>
              <Input
                name="communityName"
                defaultValue={communityIdParam}
              ></Input>
              <FormHelperText>Choose something eligible</FormHelperText>
            </FormControl>
          </label>
        </Box>
        <Box mt="2">
          <label key="communityDescInput">
            <FormControl>
              <FormLabel>Community Name</FormLabel>
              <Textarea
                name="communityDesc"
                defaultValue={communityIdParam}
              ></Textarea>
              <FormHelperText>Describe your community</FormHelperText>
            </FormControl>
          </label>
        </Box>
      </form>
    </Box>
  );
};

export default CommunitySettingsForm;
