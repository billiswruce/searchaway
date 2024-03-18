import { useAuth0 } from "@auth0/auth0-react";
import login from "../img/Login.png";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <div className="login">
        <img src={login} alt="login" className="logincloud" />
        <button onClick={() => loginWithRedirect()} className="stylish-button">
          Log in
        </button>
      </div>
    </>
  );
};

export default LoginButton;
