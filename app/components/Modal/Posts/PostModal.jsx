import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { postModalAtom } from "../../atoms/postModalAtom";
import { useRecoilState } from "recoil";
import PostModalBody from "./PostModalBody";
import CommentsSection from "./Comments/CommentsSection";

const PostModal = () => {
  const [postModal, setPostModal] = useRecoilState(postModalAtom);

  const handlePostModalClose = () => {
    setPostModal((prev) => ({ ...prev, openPostModal: false }));
  };
  return (
    <Flex>
      <Modal
        isOpen={postModal.openPostModal}
        onClose={handlePostModalClose}
        size="2xl"
        key="postModal"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{postModal.postInfo.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PostModalBody />
            <CommentsSection />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default PostModal;
