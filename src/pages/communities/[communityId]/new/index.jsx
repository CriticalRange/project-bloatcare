import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NewPostsForm from "../../../../components/Community/Posts/Forms/NewPostsForm";
import NewPostHeader from "../../../../components/Community/Posts/Forms/NewPostHeader";
import NewPostTabs from "../../../../components/Community/Posts/Forms/NewPostTabs";
import { useRecoilState } from "recoil";
import { createPostTabAtom } from "../../../../atoms/createPostTabAtom";
import NewPostsMedia from "../../../../components/Community/Posts/Forms/NewPostsMedia";

const NewCommunityPost = () => {
  const router = useRouter();
  const { communityId } = router.query;
  const [selectedTab, setSelectedTab] = useRecoilState(createPostTabAtom);

  return (
    <Flex direction="column">
      <NewPostHeader />
      <Flex
        direction="column"
        bg="white"
        _dark={{ bg: "black" }}
        borderTopLeftRadius="65"
        borderTopRightRadius="65"
        mx="3"
      >
        <NewPostTabs />
        {selectedTab === "post" ? (
          <NewPostsForm />
        ) : selectedTab === "media" ? (
          <NewPostsMedia />
        ) : null}
      </Flex>
    </Flex>
  );
};

export default NewCommunityPost;
