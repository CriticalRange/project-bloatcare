import axios from "axios";

const useRandomPosts = () => {
  const getCommunityPosts = async (count, isAuthenticated, communityId) => {
    console.log("Count is: ", count, "CommunityIds are: ", communityId);
    try {
      const response = await axios.get(
        isAuthenticated
          ? `/api/getRandomPosts?count=${count}&isAuthenticated=true&communityIds=${communityId}`
          : `/api/getRandomPosts?count=${count}&isAuthenticated=false`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getCommunityPosts,
  };
};

export default useRandomPosts;
