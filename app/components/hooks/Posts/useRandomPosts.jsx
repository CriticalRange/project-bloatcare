import axios from "axios";

const useRandomPosts = () => {
  const getRandomPosts = async (count, isAuthenticated, communityIds) => {
    console.log("Count is: ", count, "CommunityIds are: ", communityIds);
    try {
      await axios
        .get(
          isAuthenticated
            ? `/api/getRandomPosts?count=${count}&isAuthenticated=true&communityIds=${communityIds}`
            : `/api/getRandomPosts?count=${count}&isAuthenticated=false`
        )
        .then((response) => {
          console.log(response);
          return response.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getRandomPosts,
  };
};

export default useRandomPosts;
