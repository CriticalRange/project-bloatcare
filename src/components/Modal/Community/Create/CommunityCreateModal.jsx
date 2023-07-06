"use client";
// Modal pops up allows you to create community
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { createCommunityModalAtom } from "../../../../atoms/atoms";
import CreateCommunityForm from "./Forms/CreateCommunityForm";

const CreateCommunityModal = () => {
  const [createCommunityModal, setCreateCommunityModal] = useRecoilState(
    createCommunityModalAtom
  );

  return (
    <>
      <Modal
        size="3xl"
        isOpen={createCommunityModal.openCreateCommunityModal}
        onClose={() =>
          setCreateCommunityModal({ openCreateCommunityModal: false })
        }
      >
        <ModalOverlay />
        <ModalContent bg="white" _dark={{ bg: "black" }}>
          <ModalHeader>Create a community</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateCommunityForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
