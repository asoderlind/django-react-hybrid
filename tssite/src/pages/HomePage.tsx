import React from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  const { user } = React.useContext(AuthContext);
  return user ? (
    <div>
      <p>You are logged in to the homepage!</p>
    </div>
  ) : (
    <div>
      <p>You are not logged in, redirecting...</p>
    </div>
  );
};

export default HomePage;
