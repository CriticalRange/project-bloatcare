"use client";

import { useRecoilState } from "recoil";
import { communitiesAtom } from "../components/atoms/communitiesAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../components/firebase/clientApp";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  runTransaction,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { authModalAtom } from "../components/atoms/authModalAtom";
import { communityLoading } from "../components/atoms/communityLoading";

const useCommunityData = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const [communityData, setCommunityData] = useRecoilState(communitiesAtom);
  const [loading, setLoading] = useRecoilState(communityLoading);

  const getSnippets = async () => {
    // Get the required user snippet
    const snippetDocs = await getDocs(
      collection(firestore, `users/${user?.uid}/communitySnippets`)
    );
    // check if snippet exists
    const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
    // Save the snippet info to communityData atom
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
    setLoading(true);
    getSnippets();
    setCommunityData((prev) => ({
      ...prev,
      isJoined: false,
    }));
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
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [user]);

  return {
    //data and functions
    communityData,
    onJoinOrLeaveCommunity,
    loading,
  };
};

export default useCommunityData;
