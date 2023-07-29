"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../components/firebase/clientApp";

const Profile = () => {
  const [user] = useAuthState(auth);
  // instead of getting it from useAuthState, make a profile page for every user
  return (
    <div>
      {user?.displayName === null ? user?.email : user?.displayName}&apos;s
      profile
    </div>
  );
};

export default Profile;
