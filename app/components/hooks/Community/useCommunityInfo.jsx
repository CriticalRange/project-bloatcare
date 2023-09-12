import axios from "axios";

const useCommunityInfo = () => {
  const fetchUserCommunityInfo = async (userDisplayName) => {
    try {
      if (userDisplayName === undefined) {
        throw new Error("USER_NOT_FOUND");
      }
      const response = await axios
        .get(`/api/users/${userDisplayName}`)
        .then((response) => {
          return response.data.Communities;
        });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchUserCommunityInfo,
  };
};

export default useCommunityInfo;
