import { useAuth0 } from "@auth0/auth0-react";
import "../Home.css";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    //om isLoading är true så renderas "Loading ..."
    return <div className="loading">Loading ...</div>;
  }

  return (
    //&& som renderar ut profilens visningsbild om är true/authenticated
    isAuthenticated && (
      <div>
        <img src={user?.picture} className="profileimg" />
      </div>
    )
  );
};

export default Profile;
