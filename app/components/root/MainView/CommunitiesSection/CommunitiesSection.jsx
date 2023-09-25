"use client";

import { useRecoilState } from "recoil";
import { userAtom } from "../../../atoms/authAtom";
import { Box } from "@chakra-ui/react";
import useCommunityInfo from "../../../hooks/Community/useCommunityInfo";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainViewCommunityCard from "../MainViewCommunityCard";
import CommunityCardLoading from "../../../Loading/Communities/Cards/CommunityCardLoading";

const CommunitiesSection = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [randomCommunities, setRandomCommunities] = useState([]);
  const [communitiesLoaded, setCommunitiesLoaded] = useState(false);
  const { fetchRandomCommunities } = useCommunityInfo();
  const params = useParams();

  const getRandomCommunities = async () => {
    const response = await fetchRandomCommunities(5, user.authenticated);
    setRandomCommunities((prev) => [...prev, ...response]);
    setCommunitiesLoaded(true);
  };

  useEffect(() => {
    getRandomCommunities();
  }, []);

  return (
    <>
      {!communitiesLoaded ? (
        <>
          <CommunityCardLoading />
          <CommunityCardLoading />
          <CommunityCardLoading />
          <CommunityCardLoading />
          <CommunityCardLoading />
          <CommunityCardLoading />
          <CommunityCardLoading />
          <CommunityCardLoading />
          <CommunityCardLoading />
          <CommunityCardLoading />
        </>
      ) : (
        randomCommunities.map((community, index) => {
          return (
            <MainViewCommunityCard
              key={`${community.CommunityId}-${index}-${community.communityCreatedAt}`}
              community={community}
            />
          );
        })
      )}
    </>
  );
};

export default CommunitiesSection;
