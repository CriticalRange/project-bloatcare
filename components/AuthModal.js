"use client";
import React from "react";
import { Button, Modal } from "flowbite-react";
import { useAuthModalStore, useCredentialsStore } from "../pages/api/stores";
import SignupForm from "./SingupForm";
import SigninForm from "./SigninForm";
import { shallow } from "zustand/shallow";

export default function AuthModal() {
  const { isModalOpen, toggleModalOpen } = useAuthModalStore(
    (state) => ({
      isModalOpen: state.isModalOpen,
      toggleModalOpen: state.toggleModalOpen,
    }),
    shallow
  );

  const { authType, setAuthType } = useCredentialsStore(
    (state) => ({
      authType: state.authType,
      setAuthType: state.setAuthType,
    }),
    shallow
  );

  return (
    <Modal
      dismissible
      size="xl"
      key="signupModal"
      show={isModalOpen && 1}
      onClose={() => {
        toggleModalOpen(!isModalOpen);
      }}
    >
      <div>
        <Modal.Header>
          {authType === "signin" ? "Sign in to BloatCare" : "Sign up"}
        </Modal.Header>
      </div>
      <Modal.Body key="signupModalBody">
        {authType === "signin" ? <SigninForm /> : <SignupForm />}
        <hr className="w-56 h-1 m-auto mt-0 bg-gray-400 rounded md:my-3 dark:bg-gray-700" />
        <div className="flex justify-around space-y-6">
          <Button
            onClick={() => {
              if (authType === "signin") {
                setAuthType("signup");
              } else if (authType === "signup") {
                setAuthType("signin");
              }
            }}
          >
            {authType === "signin" ? "Not signed up?" : "Already signed up?"}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
