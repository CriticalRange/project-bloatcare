"use client";

import { useRecoilState } from "recoil";
import { communitiesAtom } from "../../components/atoms/communitiesAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../components/firebase/clientApp";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  runTransaction,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { authModalAtom } from "../../components/atoms/modalAtoms";
import { communityLoading } from "../../components/atoms/communitiesAtom";
import { useParams, useRouter } from "next/navigation";

const useCommunityData = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const router = useRouter();
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const [communityData, setCommunityData] = useRecoilState(communitiesAtom);
  const [loading, setLoading] = useRecoilState(communityLoading);
  const params = useParams();
  const communityIdParam = params.commnityId;

  const getSnippets = async () => {
    // Get the required user's Community snippet document
    const snippetDocs = await getDocs(
      collection(firestore, `users/${user?.uid}/communitySnippets`)
    );
    // Save the data of each array to snippets
    const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
    // Save the snippets data to communityData atom
    setCommunityData((prev) => ({
      ...prev,
      userSnippets: snippets,
    }));
    // Also save the "isJoined" parameter for easy use
    snippets.filter(async (item) => {
      if (item.communityId === communityData.communityId) {
        setCommunityData((prev) => ({
          ...prev,
          isJoined: item.isJoined,
          isModerator: item.isModerator,
        }));
      }
    });
  };

  const onJoinOrLeaveCommunity = () => {
    // If pressed join, user will be prompted to sign in
    if (!user) {
      setAuthModal((prev) => ({
        ...prev,
        openAuthModal: true,
      }));
      return;
    }
    // If user is signed in, check if user is joined.
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
    setLoading(false);
  }, [communityIdParam]);

  return {
    //data and functions
    communityData,
    onJoinOrLeaveCommunity,
    loading,
  };
};

export default useCommunityData;
