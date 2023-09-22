import axios from "axios";

const useRandomPosts = () => {
  const getCommunityPosts = async (count, isAuthenticated, communityId) => {
    try {
      const response = await axios.get(
        `/api/getRandomPosts?count=${count}&isAuthenticated=${isAuthenticated}&communityIds=${communityId}`
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
