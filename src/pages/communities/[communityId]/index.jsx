"use client";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";
import { communityDataStateAtom } from "../../../atoms/communityDataStateAtom";
import Header from "../../../components/Community/Header";
import { firestore } from "../../../firebase/clientApp";

const CommunityPage = ({ communityData }) => {
  const [communityDataState, setCommunityDataState] = useRecoilState(
    communityDataStateAtom
  );

  useEffect(() => {
    setCommunityDataState((prev) => ({ ...prev, id: communityData.id }));
  }, [communityData.id, setCommunityDataState]);

  if (!communityData) {
    return <div>No community found with that name</div>;
  }
  return (
    <div>
      <Header />
    </div>
  );
};

export async function getServerSideProps(context) {
  // Get community data and pass it to client
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data })
            )
          : "",
      },
    };
  } catch (error) {
    // Need to add one of those custom erro pages hee
    console.log("getServerSideProps error: ", error);
  }
}

export default CommunityPage;
