import { Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

export const MotionFadingImage = ({ post }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          isLoaded && isInView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 1 }
        }
        transition={{ duration: 0.2, delay: 0.3 }}
        viewport={{ once: true }}
        onViewportEnter={() => setIsInView(true)}
      >
        <Image
          maxH="100%"
          maxW="100%"
          display={post.imageURL ? "block" : "none"}
          mt="2"
          mb="4"
          borderRadius="13"
          src={post.imageURL ? post.imageURL : ""}
          alt={post.title}
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>
    </section>
  );
};
