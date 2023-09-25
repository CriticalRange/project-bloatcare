import axios from "axios";

const usePostInfo = () => {
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

  const getHomePosts = async (count, isAuthenticated) => {
    try {
      const response = await axios.get(
        `/api/getRandomPosts?count=${count}&isAuthenticated=${isAuthenticated}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getCommunityPosts,
    getHomePosts,
  };
};

export default usePostInfo;
