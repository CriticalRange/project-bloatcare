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
  updateDoc,
} from "firebase/firestore";
import { authModalAtom } from "../atoms/authModalAtom";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const [communityData, setCommunityData] = useRecoilState(communitiesAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    snippets.find(async (item) => {
      await setCommunityData((prev) => ({
        ...prev,
        isJoined: item.isJoined,
      }));
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
    getSnippets();
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
      if (joinedDoc.exists()) {
        transaction.update(joinedRef, {
          isJoined: true,
        });
        setLoading(false);
        setCommunityData((prev) => ({
          ...prev,
          isJoined: true,
        }));
        return;
      }
      transaction.set(joinedRef, {
        communityId: communityData.communityId,
        isModerator: false,
        isJoined: true,
      });
      setLoading(false);
      setCommunityData((prev) => ({
        ...prev,
        isJoined: true,
      }));
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
    setCommunityData((prev) => ({
      ...prev,
      isJoined: false,
    }));
    setLoading(false);
  };

  useEffect(() => {
    getSnippets();
    if (!user) {
      setCommunityData((prev) => ({
        ...prev,
        isJoined: false,
      }));
      return;
    }
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
