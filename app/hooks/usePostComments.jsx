import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React from "react";
import { auth, firestore } from "../components/firebase/clientApp";
import { useRecoilState } from "recoil";
import { postModalAtom } from "../components/atoms/postModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { commentsAtom } from "../components/atoms/postsAtom";

const usePostComments = () => {
  const [user] = useAuthState(auth);
  const [comments, setComments] = useRecoilState(commentsAtom);
  const [postModal, setPostModal] = useRecoilState(postModalAtom);
  const getPostComments = async () => {
    setComments((prev) => ({
      ...prev,
      comments: [],
    }));
    const postCommentsDocRef = doc(
      firestore,
      "comments",
      postModal.postInfo.id
    );
    const postCommentsDoc = await getDoc(postCommentsDocRef);
    if (!postCommentsDoc.exists) {
      console.log("Post comments document doesn't exist");
    }
    setComments([postCommentsDoc.data()]);
  };

  return {
    getPostComments,
  };
};

export default usePostComments;
