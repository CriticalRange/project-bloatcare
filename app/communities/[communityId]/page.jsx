"use client";

import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { communitiesAtom } from "../../components/atoms/communitiesAtom";
import CommunityHeader from "../../components/Community/CommunityHeader/CommunityHeader";
import { firestore } from "../../components/firebase/clientApp";
import CommunityBody from "../../components/Community/CommunityBody/CommunityBody";
import { useParams } from "next/navigation";

const CommunityPage = ({ communityData }) => {
  const [communityDataState, setCommunityDataState] =
    useRecoilState(communitiesAtom);
  const params = useParams();
  const communityIdParam = params.communityId;

  const getCommunityDocuments = async () => {
    try {
      // @ts-ignore
      const communityDocRef = doc(firestore, "communities", communityIdParam);
      const communityDoc = await getDoc(communityDocRef);
      console.log("Community doc taken");
      // @ts-ignore
      setCommunityDataState((prev) => ({
        ...prev,
        communityId: communityIdParam,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCommunityDocuments();
  }, [communityIdParam]);
  return (
    <div>
      <CommunityHeader />
      <CommunityBody />
    </div>
  );
};

export default CommunityPage;
