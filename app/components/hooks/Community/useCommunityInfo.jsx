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

  return {
    fetchCommunityInfo,
  };
};

export default useCommunityInfo;
