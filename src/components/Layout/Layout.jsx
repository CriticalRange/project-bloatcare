import AuthModal from "../Modal/Auth/AuthModal";
import CreateCommunityModal from "../Modal/Community/Create/CommunityCreateModal";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <CreateCommunityModal />
      <AuthModal />
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
