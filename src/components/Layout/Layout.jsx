// Wrapped to _app (meaning it's 1 tier down)
import { useRouter } from "next/router";
import AuthModal from "../Modal/Auth/AuthModal";
import CreateCommunityModal from "../Modal/Community/Create/CommunityCreateModal";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      {router.pathname !== "/auth/discord" ? <Navbar /> : null}
      <CreateCommunityModal />
      <AuthModal />
      <main>{children}</main>
    </>
  );
};

export default Layout;
