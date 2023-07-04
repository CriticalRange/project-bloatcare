import AuthModal from "../Modal/Auth/Modal/AuthModal";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <AuthModal />
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
