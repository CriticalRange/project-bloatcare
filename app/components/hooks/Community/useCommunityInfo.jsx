import axios from "axios";

const useCommunityInfo = () => {
  const fetchCommunityInfo = async (communityId) => {
    try {
      if (communityId === undefined) {
        throw new Error("USER_NOT_FOUND");
      }
      const response = await axios
        .get(`/api/communities/${communityId}`)
        .then((response) => {
          return response.data.Communities;
        });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchCommunityInfo,
  };
};

export default useCommunityInfo;
