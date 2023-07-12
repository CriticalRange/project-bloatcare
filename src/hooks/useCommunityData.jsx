import { useRecoilState } from "recoil";
import { communitiesAtom } from "../atoms/communitiesAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { authModalAtom } from "../atoms/authModalAtom";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const [communityData, setCommunityData] = useRecoilState(communitiesAtom);
  const [loading, setLoading] = useState(false);
  const [isJoined, setJoined] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = () => {
    if (!user) {
      setAuthModal((prev) => ({
        ...prev,
        openAuthModal: true,
      }));
      console.log("returning");
      return;
    }
    getSnippets();
    console.log("Starts");
    if (!isJoined) {
      console.log("Joining");
      joinCommunity();
    } else {
      console.log("Leaving");
      leaveCommunity();
    }
  };

  const getSnippets = async () => {
    // Get the required user snippet
    const snippetDocs = await getDocs(
      collection(firestore, `users/${user?.uid}/communitySnippets`)
    );
    // Print the snippet info to communityData atom
    const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
    setCommunityData((prev) => ({
      ...prev,
      userSnippets: snippets,
    }));
  };

  const joinCommunity = async () => {
    console.log("Setting loading to true");
    setLoading(true);
    const joinedRef = doc(
      firestore,
      `users/${user?.uid}/communitySnippets`,
      communityData.communityId
    );
    await setDoc(joinedRef, {
      communityId: communityData.communityId,
      isModerator: false,
    });
    setLoading(false);
    setJoined(true);
  };

  const leaveCommunity = async () => {
    console.log("Snippet delete");
    setLoading(true);
    const joinedRef = doc(
      firestore,
      `users/${user?.uid}/communitySnippets`,
      communityData.communityId
    );

    await deleteDoc(joinedRef);
    console.log("Snippet delete complete");
    setJoined(false);
    setLoading(false);
  };

  useEffect(() => {
    if (!user) {
      setJoined(false);
      return;
    }
    if (
      communityData.userSnippets.find(
        (item) => item.communityId !== communityData.communityId
      )
    ) {
      setJoined(false);
    } else {
      setJoined(true);
    }
    getSnippets();
  }, [user]);

  return {
    //data and functions
    communityData,
    onJoinOrLeaveCommunity,
    isJoined,
    loading,
  };
};

export default useCommunityData;
