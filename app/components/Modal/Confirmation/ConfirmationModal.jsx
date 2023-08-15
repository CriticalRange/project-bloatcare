import React, { forwardRef, useRef } from "react";
import { useRecoilState } from "recoil";
import { confirmationModalAtom } from "../../atoms/modalAtoms";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { selectedFileAtom } from "../../atoms/postsAtom";

const ConfirmationModal = ({ inputRef }) => {
  const [confirmationModalState, setConfirmationModalState] = useRecoilState(
    confirmationModalAtom
  );
  const [selectedFile, setSelectedFile] = useRecoilState(selectedFileAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleConfirmationModalClose = () => {
    setConfirmationModalState((prev) => ({
      ...prev,
      openConfirmationModal: false,
    }));
  };

  return (
    <Modal
      isOpen={confirmationModalState.openConfirmationModal}
      onClose={handleConfirmationModalClose}
      size="sm"
      key="confirmationModal"
    >
      <ModalOverlay />
      <ModalContent
        textColor="black"
        bg="white"
        _dark={{
          textColor: "white",
          bg: "black",
        }}
      >
        <ModalHeader>
          {confirmationModalState.confirmationModalView === "removeImage"
            ? "Are you sure"
            : null}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {confirmationModalState.confirmationModalView === "removeImage" ? (
            <Box>Are you sure you want to delete this image?</Box>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Box>
            <Button
              aria-label="cancel button"
              variant="ghost"
              onClick={() =>
                setConfirmationModalState((prev) => ({
                  ...prev,
                  openConfirmationModal: false,
                }))
              }
            >
              Cancel
            </Button>
            <Button
              aria-label="delete button"
              colorScheme="red"
              mr={3}
              onClick={() => {
                setConfirmationModalState((prev) => ({
                  ...prev,
                  openConfirmationModal: false,
                }));
                setSelectedFile("");
                inputRef.current.value = "";
                toast({
                  title: "Successfully removed.",
                  description: "Successfully removed the file.",
                  status: "success",
                  duration: 3500,
                  position: "bottom-left",
                  isClosable: true,
                });
              }}
            >
              Delete
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
ConfirmationModal.displayName = "ConfirmationModal";

export default ConfirmationModal;
