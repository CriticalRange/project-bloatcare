"use client";

import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { communitySettingsModalAtom } from "../../../atoms/modalAtoms";
import CommunitySettingsForm from "./Forms/CommunitySettingsForm";

const CommunitySettingsModal = () => {
  const params = useParams();
  const communityIdParam = params.communityId;
  const [communitySettingsModal, setcommunitySettingsModal] = useRecoilState(
    communitySettingsModalAtom
  );

  return (
    <Box>
      <Modal
        isOpen={communitySettingsModal.openCommunitySettingsModal}
        onClose={() =>
          setcommunitySettingsModal((prev) => ({
            ...prev,
            openCommunitySettingsModal: false,
          }))
        }
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Community Settings - {communityIdParam}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CommunitySettingsForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CommunitySettingsModal;
