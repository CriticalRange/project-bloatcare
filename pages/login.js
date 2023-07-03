import { Button } from "@chakra-ui/react";
import useAuth from "../firebase/hook/auth";

function Login() {
  const { user, loginWithGoogle, error } = useAuth();
  return (
    <div>
      <Button onClick={loginWithGoogle}>Login via click</Button>
    </div>
  );
}

export default Login;
