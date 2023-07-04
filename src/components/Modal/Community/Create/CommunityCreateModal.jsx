import {
  Button,
  Input,
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
import { useState } from "react";

const CreateCommunityModal = () => {
  const [createCommunityModal, setCreateCommunityModal] = useRecoilState(
    createCommunityModalAtom
  );

  const [createCommunityModalForm, setCreateCommunityModalForm] = useState({
    title: "",
    description: "",
  });

  const onFormInfoChange = (event) => {
    const { name, value } = event.target;
    setCreateCommunityModalForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Modal
        isOpen={createCommunityModal.openCreateCommunityModal}
        onClose={() =>
          setCreateCommunityModal({ openCreateCommunityModal: false })
        }
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a community</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              /* onSubmit={handleCreateCommunity} */ className="form"
              key="createCommunityForm"
            >
              <label key="createCommunityTitle">
                <h4>Title</h4>
                <Input
                  my="2"
                  name="title"
                  key="createCommunityTitleInput"
                  onChange={onFormInfoChange}
                  required
                  type="text"
                  placeholder="Title"
                  className="overflow-y-hidden block w-full h-12 rounded-md"
                ></Input>
              </label>
              <label key="createCommunityDescription">
                <h4>Description</h4>
                <Input
                  w="full"
                  borderRadius="6px"
                  my="2"
                  name="description"
                  key="createCommunityDescriptionInput"
                  onChange={onFormInfoChange}
                  required
                  type="text"
                  placeholder="Description"
                ></Input>
              </label>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
