"use client";

import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { selectedFileAtom } from "../../../atoms/postsAtom";
import { auth, firestore, storage } from "../../../firebase/clientApp";

const NewPostsForm = () => {
  const params = useParams();
  const communityIdParam = params.communityId;
  const [user] = useAuthState(auth);
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useRecoilState(selectedFileAtom);
  const [loading, setLoading] = useState(false);
  const [newPostFormInfo, setNewPostFormInfo] = useState({
    title: "",
    description: "",
  });

  const onNewPostFormInfoChange = (event) => {
    const { name, value } = event.target;
    setNewPostFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewPostForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    const postsCollection = collection(firestore, "posts");
    const totalPostsData = await getCountFromServer(postsCollection);
    const totalPosts = totalPostsData.data().count;
    const activePostDocRef = doc(firestore, "postsQuery", "loggedInQuery");
    const activePostDoc = await getDoc(activePostDocRef);
    console.log(activePostDoc.data());
    try {
      // Firestore post reference
      const postDocRef = await addDoc(collection(firestore, "posts"), {
        communityId: communityIdParam,
        creatorId: user?.uid,
        postId: totalPosts + 1,
        creatorDisplayName:
          user?.displayName !== undefined
            ? user?.displayName
            : user?.email.split("@")[0],
        creatorImage: user?.photoURL,
        title: newPostFormInfo.title,
        description: newPostFormInfo.description,
        numberOfComments: 0,
        numberOfLikes: 0,
        numberOfDislikes: 0,
        createdAt: serverTimestamp(),
      });
      await updateDoc(activePostDocRef, {
        [postDocRef.id]: {
          postId: totalPosts + 1,
          communityId: communityIdParam,
        },
      });
      // Check if a file is selected
      if (selectedFile) {
        // image document reference on firebase storage
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        // upload to storage bucket
        await uploadString(imageRef, selectedFile, "data_url");
        // Get the image url to save on posts document (Firestore)
        const downloadUrl = await getDownloadURL(imageRef);

        // Update the posts document on Firestore with new Image URL
        await updateDoc(postDocRef, {
          imageURL: downloadUrl,
        });
      }
      setLoading(false);
      router.push(`/communities/${communityIdParam}`);
    } catch (error) {
      console.log("Handle New Post Form Error: ", error.message);
    }
  };

  return (
    <Box mx="2" my="1">
      <form onSubmit={handleNewPostForm}>
        <label key="newPostTitle">
          <Flex direction="column">
            <Text my="2" fontSize="xl" fontWeight="bold">
              Post Title
            </Text>
            <Input
              onChange={onNewPostFormInfoChange}
              w="65%"
              name="title"
              borderColor="brand.secondary"
              _dark={{ borderColor: "gray" }}
            />
          </Flex>
        </label>
        <label key="newPostDesc">
          <Text my="2" fontSize="xl" fontWeight="bold">
            Post Description
          </Text>
          <Textarea
            onChange={onNewPostFormInfoChange}
            w="96%"
            h="225"
            alignContent="center"
            name="description"
            borderColor="brand.secondary"
            _dark={{ borderColor: "gray" }}
          />
        </label>
        {/* <label><TagsSystem /></label> */}
        <Center my="3">
          <Button type="submit" isLoading={loading}>
            Create
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export default NewPostsForm;
