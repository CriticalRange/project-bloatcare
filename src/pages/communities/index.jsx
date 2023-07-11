import { Heading } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { communitiesAtom } from "../../atoms/communitiesAtom";
import { useEffect } from "react";

const Communities = () => {
  const [communityData, setCommunityData] = useRecoilState(communitiesAtom);

  return (
    <div>
      {/* <CommunitiesSearch /> */}
      <Heading>Your communities:</Heading>
    </div>
  );
};

export default Communities;
