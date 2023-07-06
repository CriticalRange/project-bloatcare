// Same as _app, but need to wrap it to _app (meaning it's 1 tier down)
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
