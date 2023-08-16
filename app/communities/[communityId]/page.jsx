import dynamic from "next/dynamic";

const CommunityPage = () => {
  const DynamicCommunity = dynamic(
    () => import("../../components/Community/Community"),
    {
      loading: () => <div>Loading</div>,
    }
  );
  return <DynamicCommunity />;
};

export default CommunityPage;
