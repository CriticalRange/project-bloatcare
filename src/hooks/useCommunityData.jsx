import { useRecoilState } from "recoil";
import { communitiesAtom } from "../atoms/communitiesAtom";

const useCommunityData = () => {
  const [communityState, setCommunityState] = useRecoilState(communitiesAtom);

  const onJoinOrLeaveCommunity = () => {
    joinCommunity();
  };

  const joinCommunity = () => {};

  const leaveCommunity = () => {};

  return {
    //data and functions
    communityState,
  };
};

export default useCommunityData;
