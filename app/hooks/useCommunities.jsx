import { getDocs, collection } from "firebase/firestore";
import { useEffect } from "react";
import { auth, firestore } from "../components/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { communitiesAtom } from "../components/atoms/communitiesAtom";

const useCommunities = () => {
  const [user] = useAuthState(auth);
  const [communityData, setCommunityData] = useRecoilState(communitiesAtom);

  const getUserSnippets = async () => {
    const snippetDocs = await getDocs(
      collection(firestore, `users/${user?.uid}/communitySnippets`)
    );
    const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
    const filteredSnippets = snippets.filter(
      (snippet) => snippet.isJoined === true
    );
    setCommunityData((prev) => ({
      ...prev,
      userSnippets: filteredSnippets,
    }));
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    getUserSnippets();
  }, [user]);

  return {
    communityData,
  };
};

export default useCommunities;
