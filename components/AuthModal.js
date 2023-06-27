import React from "react";
import { Modal } from "flowbite-react";
import { useLoginModalStore } from "../pages/api/stores";
import SignupForm from "./SingupForm";

export default function SignupModal() {
  const isModalOpen = useLoginModalStore((state) => state.isModalOpen);
  const toggleModalOpen = useLoginModalStore((state) => state.toggleModalOpen);

  return (
    <Modal
      key="signupModal"
      show={isModalOpen && 1}
      onClose={() => {
        toggleModalOpen(!isModalOpen);
      }}
    >
      <div key="signupModalHeader">
        <Modal.Header className="text-center">Login</Modal.Header>
      </div>
      <Modal.Body key="signupModalBody">
        <SignupForm />
        <hr className="w-56 h-1 m-auto mt-0 bg-gray-400 rounded md:my-3 dark:bg-gray-700" />
        <div className="flex flex-row justify-around border-box"></div>
      </Modal.Body>
    </Modal>
  );
}
