import {
  Button,
  Flex,
  Input,
  Image,
  Center,
  IconButton,
  Box,
  Text,
  Icon,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { selectedFileAtom } from "../../../../atoms/postsAtom";
import { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";

const NewPostsMedia = () => {
  const toast = useToast();
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useRecoilState(selectedFileAtom);
  const [hoverPreview, setHoverPreview] = useState(false);

  const onImageSelected = (event) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
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
      <Flex mt="2" maxW="600px" maxH="600px">
        {selectedFile !== "" ? (
          <Box>
            <Flex
              mx="3"
              transition="filter 0.3s ease"
              _hover={{ filter: "brightness(50%)" }}
              onMouseEnter={() => setHoverPreview(true)}
              onMouseLeave={() => setHoverPreview(false)}
            >
              <Image src={selectedFile} alt="The selected file" />
              {hoverPreview ? (
                <Box position="absolute">
                  <Tooltip label="Delete">
                    <IconButton
                      onClick={() => {
                        setSelectedFile("");
                        toast({
                          title: "Successfully removed.",
                          description: "Successfully removed the file.",
                          status: "success",
                          duration: 3500,
                          position: "bottom-left",
                          isClosable: true,
                        });
                      }}
                      bg="transparent"
                      aria-label="Delete"
                      icon={
                        <Icon
                          w="8"
                          h="8"
                          as={FaTrash}
                          color="white"
                          _dark={{ color: "black" }}
                        />
                      }
                    />
                  </Tooltip>
                  <Box>
                    <Tooltip label="View">
                      <IconButton
                        bg="transparent"
                        aria-label="Delete"
                        icon={
                          <Icon
                            w="8"
                            h="8"
                            as={BiLinkExternal}
                            color="white"
                            _dark={{ color: "black" }}
                          />
                        }
                      />
                    </Tooltip>
                  </Box>
                </Box>
              ) : null}
            </Flex>
          </Box>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default NewPostsMedia;
