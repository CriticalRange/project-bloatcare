"use client";

import { useRecoilState } from "recoil";
import { postsState } from "../components/atoms/postsAtom";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { firestore, storage } from "../components/firebase/clientApp";
import { deleteDoc, doc } from "firebase/firestore";

const usePosts = () => {
  const [postState, setPostState] = useRecoilState(postsState);

  const onSelectPost = () => {};

  const onDeletePost = async (post) => {
    try {
      // Check if it has an image, delete if exists
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);

        try {
          // Check if the image exists before attempting to delete it
          await getDownloadURL(imageRef);
          // If the image exists, delete it
          await deleteObject(imageRef);
        } catch (error) {
          if (error.code === "object-not-found") {
            console.log("Image not found in storage:", error);
          } else {
            console.error("Error while deleting the image:", error);
          }
        }
      }

      // Delete post document (firestore)
      const postDocRef = doc(firestore, "posts", post.id);
      await deleteDoc(postDocRef);

      // Update recoil state
      console.log(postState.posts);
      setPostState((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    postState,
    setPostState,
    onSelectPost,
    onDeletePost,
  };
};

export default usePosts;
