import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";
import Header from "../../../components/Community/Header";
import { Box } from "@chakra-ui/react";

const CommunityPage = ({ communityData }) => {
  if (!communityData) {
    return <div>No community found with that name</div>;
  }
  return (
    <Box>
      <Header communityData={communityData} />
    </Box>
  );
};

export async function getServerSideProps(context) {
  console.log(context);
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
