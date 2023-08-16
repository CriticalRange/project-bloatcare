import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";
import { postModalAtom } from "../../atoms/postsAtom";
import PostModalBody from "./PostModalBody";

const PostModal = () => {
  const [postModal, setPostModal] = useRecoilState(postModalAtom);

  const handlePostModalClose = () => {
    setPostModal((prev) => ({ ...prev, openPostModal: false }));
  };
  const DynamicCommentsSection = dynamic(() =>
    import("./Comments/CommentsSection/CommentsSection")
  );
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
            <DynamicCommentsSection />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default PostModal;
