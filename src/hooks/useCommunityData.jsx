import { useRecoilState } from "recoil";
import { communitiesAtom } from "../atoms/communitiesAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  runTransaction,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { authModalAtom } from "../atoms/authModalAtom";

const useCommunityData = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const [communityData, setCommunityData] = useRecoilState(communitiesAtom);
  const [loading, setLoading] = useState(false);

  const getSnippets = async () => {
    // Get the required user snippet
    const snippetDocs = await getDocs(
      collection(firestore, `users/${user?.uid}/communitySnippets`)
    );
    // check if snippet exists
    const existingSnippet = snippetDocs.docs.find(
      (doc) => doc.id === communityData.communityId
    );
    if (!existingSnippet) {
      const newSnippetRef = doc(
        firestore,
        `users/${user?.uid}/communitySnippets`,
        communityData.communityId
      );
      await setDoc(newSnippetRef, {
        communityId: communityData.communityId,
        isJoined: false,
        isModerator: false,
      });
    }
    // Print the snippet info to communityData atom
    const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
    setCommunityData((prev) => ({
      ...prev,
      userSnippets: snippets,
    }));
    snippets.forEach(async (item) => {
      if (item.communityId === communityData.communityId) {
        await setCommunityData((prev) => ({
          ...prev,
          isJoined: item.isJoined,
        }));
      }
    });
  };

  const onJoinOrLeaveCommunity = () => {
    if (!user) {
      setAuthModal((prev) => ({
        ...prev,
        openAuthModal: true,
      }));
      return;
    }
    if (!communityData.isJoined) {
      joinCommunity();
    } else {
      leaveCommunity();
    }
  };

  const joinCommunity = async () => {
    setLoading(true);
    const joinedRef = doc(
      firestore,
      `users/${user?.uid}/communitySnippets`,
      communityData.communityId
    );
    await runTransaction(firestore, async (transaction) => {
      const joinedDoc = await transaction.get(joinedRef);
      transaction.set(joinedRef, {
        communityId: communityData.communityId,
        isModerator: false,
        isJoined: true,
      });
      setCommunityData((prev) => ({
        ...prev,
        isJoined: true,
      }));
      setLoading(false);
    });
  };

  const leaveCommunity = async () => {
    setLoading(true);
    const joinedRef = doc(
      firestore,
      `users/${user?.uid}/communitySnippets`,
      communityData.communityId
    );
    await updateDoc(joinedRef, {
      isJoined: false,
    });
    await setCommunityData((prev) => ({
      ...prev,
      isJoined: false,
    }));
    setLoading(false);
  };

  useEffect(() => {
    if (!user) {
      setCommunityData((prev) => ({
        ...prev,
        isJoined: false,
      }));
      return;
    }
    getSnippets();
    setCommunityData((prev) => ({
      ...prev,
      isJoined: false,
    }));
    console.log(communityData.isJoined);
    if (communityData.isJoined === true) {
      setCommunityData((prev) => ({
        ...prev,
        isJoined: true,
      }));
    } else {
      setCommunityData((prev) => ({
        ...prev,
        isJoined: false,
      }));
    }
  }, [user]);

  return {
    //data and functions
    communityData,
    onJoinOrLeaveCommunity,
    loading,
  };
};

export default useCommunityData;
