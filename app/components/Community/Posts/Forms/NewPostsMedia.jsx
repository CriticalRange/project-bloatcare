"use client";

import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  CustomAnimatedRemoveIcon,
  CustomExternalLinkIcon,
} from "../../../Icons/IconComponents/IconComponents";
import { selectedFileAtom } from "../../../atoms/postsAtom";
import { Link } from "@chakra-ui/next-js";
import { confirmationModalAtom } from "../../../atoms/confirmationModalAtom";
import ConfirmationModal from "../../../Modal/Confirmation/ConfirmationModal";

const NewPostsMedia = () => {
  const toast = useToast();
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useRecoilState(selectedFileAtom);
  const [hoverPreview, setHoverPreview] = useState(false);
  const [confirmationModal, setConfirmationModal] = useRecoilState(
    confirmationModalAtom
  );

  const onImageSelected = (event) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      if (event.target.files?.[0].type !== "image/png") {
        setSelectedFile("");
        toast({
          title: "Image format is not supported.",
          description: "Please try again with a png.",
          status: "error",
          duration: 3500,
          position: "bottom-left",
          isClosable: true,
        });
        event.target.value = "";
        return;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result.toString());
      }
    };
  };
  return (
    <Flex direction="column" h="400px" align="center">
      <Flex
        my="3"
        as={Button}
        onClick={() => inputRef.current.click()}
        borderColor="brand.secondary"
        borderWidth="2px"
      >
        Select Files
        <Input ref={inputRef} hidden type="file" onChange={onImageSelected} />
      </Flex>
      <hr />
      <Flex w="90%" h="80%">
        {selectedFile !== "" ? (
          <Flex maxW="250px" maxH="150px" p="2">
            <Box position="absolute">
              <Tooltip label="Delete">
                <IconButton
                  onClick={() => {
                    setConfirmationModal({
                      confirmationModalView: "removeImage",
                      openConfirmationModal: true,
                    });
                  }}
                  bg="transparent"
                  aria-label="Delete"
                  icon={
                    <Icon
                      w="8"
                      h="8"
                      as={CustomAnimatedRemoveIcon}
                      color="white"
                      _dark={{ color: "black" }}
                    />
                  }
                />
              </Tooltip>
              <Box>
                <a
                  href={selectedFile}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Tooltip label="Open">
                    <IconButton
                      bg="transparent"
                      aria-label="Delete"
                      icon={
                        <Icon
                          w="8"
                          h="8"
                          as={CustomExternalLinkIcon}
                          color="white"
                          _dark={{ color: "black" }}
                        />
                      }
                    />
                  </Tooltip>
                </a>
              </Box>
            </Box>
            <Flex justify="flex-start">
              <Image src={selectedFile} alt="The selected file" />
            </Flex>
            <ConfirmationModal inputRef={inputRef} />
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default NewPostsMedia;
