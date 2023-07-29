// All the button overrides will reside here.
import { defineStyleConfig } from "@chakra-ui/react";

const BrandButton = defineStyleConfig({
  // The styles all buttons have in common:
  baseStyle: {
    borderRadius: "5px",
  },
  sizes: {
    sm: {
      fontSize: "sm",
    },
    md: {
      fontSize: "md",
    },
  },
  variants: {
    outline: {
      border: "2px solid",
      borderColor: "#1e40af",
    },
    solid: {
      bg: "#1e40af",
      color: "white",
    },
    // The default size and variant values
    defaultProps: {
      size: "md",
      variant: "outline",
    },
  },
});
