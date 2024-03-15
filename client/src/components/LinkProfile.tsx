import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    //om isLoading är true så renderas "Loading ..."
    return <div className="loading">Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user?.picture} className="profile-img" />
      </div>
    )
  );
};

export default Profile;
