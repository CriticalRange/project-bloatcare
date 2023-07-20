import { useRecoilState } from "recoil";
import { postsAtom } from "../atoms/postsAtom";

const usePosts = () => {
  const [postState, setPostState] = useRecoilState(postsAtom);

  const onSelectPost = () => {};

  const onDeletePost = () => {};

  return {
    postState,
    setPostState,
  };
};

export default usePosts;
