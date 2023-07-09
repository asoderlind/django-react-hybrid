import React from "react";
import AuthContext from "../context/AuthContext";

async function getTodos() {
  return fetch("http://localhost:8000/api/todos/", {
    credentials: "include",
  }).then((res) => res.json());
}

const HomePage = () => {
  const { user, authTokens } = React.useContext(AuthContext);

  return user ? (
    <div>
      <p>You are logged in to the homepage! {user.username}</p>
    </div>
  ) : (
    <div>
      <p>You are not logged in, redirecting...</p>
    </div>
  );
};

export default HomePage;
