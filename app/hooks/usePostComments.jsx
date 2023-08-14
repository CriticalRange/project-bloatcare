import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, firestore } from "../components/firebase/clientApp";
import { useRecoilState } from "recoil";
import { postModalAtom } from "../components/atoms/postModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { commentsAtom } from "../components/atoms/postsAtom";

const usePostComments = () => {
  const [user] = useAuthState(auth);
  const [commentState, setCommentState] = useRecoilState(commentsAtom);
  const [postModal, setPostModal] = useRecoilState(postModalAtom);
  const getPostComments = async () => {
    setCommentState((prev) => ({
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
      setCommentState((prev) => ({
        ...prev,
        isEmpty: true,
      }));
      return;
    }
    setCommentState((prev) => ({
      ...prev,
      comments: [postCommentsDoc.data()],
      isEmpty: false,
    }));
  };

  return {
    getPostComments,
  };
};

export default usePostComments;
