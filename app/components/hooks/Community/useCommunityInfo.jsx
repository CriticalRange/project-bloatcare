import axios from "axios";

const useCommunityInfo = () => {
  const fetchCommunityInfo = async (communityId) => {
    try {
      if (communityId === undefined) {
        throw new Error("COMMUNITYID_NOT_FOUND");
      }
      const response = await axios
        .get(`/api/communities/${communityId}`)
        .then((response) => {
          return response.data.response;
        });
      return response;
    } catch (error) {
      return error.response.data.error.message;
    }
  };

  const fetchRandomCommunities = async (count, isAuthenticated) => {
    try {
      const response = await axios
        .get(
          `/api/getRandomCommunities?count=${count}&isAuthenticated=${isAuthenticated}`
        )
        .then((response) => {
          return response.data;
        });
      return response;
    } catch (error) {
      return error.response.data.error.message;
    }
  };

  return {
    fetchCommunityInfo,
    fetchRandomCommunities,
  };
};

export default useCommunityInfo;
