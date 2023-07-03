import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  CloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export default function CustomAlert() {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });

  return isVisible ? (
    <Alert status="success" variant="top-accent">
      <CircularProgress isIndeterminate color="green.600" />
      <Box>
        <AlertTitle>Account created!</AlertTitle>
        <AlertDescription>
          Account created. Automatically logging in...
        </AlertDescription>
      </Box>
      <CloseButton
        className="w-20 h-20"
        alignSelf="flex-end"
        position="absolute"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  ) : null;
}
