//kod från auth0 dokumentationen som används för att logga in
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button onClick={() => loginWithRedirect()} className="stylish-button">
      Logga in
    </button>
  );
};

export default LoginButton;
