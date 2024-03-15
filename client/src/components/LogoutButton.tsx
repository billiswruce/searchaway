import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout({ logoutParams: { returnTo: window.location.origin } });
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
