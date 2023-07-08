import React, { ReactElement } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { User } from "./models";

import SignIn from "./components/LoginView";

function App() {
  return (
    <Router>
      <AppEntry />
    </Router>
  );
}

function AppEntry() {
  const [user, setUser] = React.useState<User>(
    JSON.parse(sessionStorage.getItem("user") || "{}")
  );

  function updateUserInfo(userDetail: User) {
    setUser(userDetail);
    sessionStorage.setItem("user", JSON.stringify(userDetail));
    sessionStorage.setItem("loggedin", "true");
  }

  // A wrapper for <Route> that redirects to the login
  // screen if you're not yet authenticated.
  const PrivateRoute = ({ component: Component, path, ...props }: any) => {
    return (
      <Route
        path={path}
        {...props}
        element={
          sessionStorage.getItem("loggedin") === "true" ? (
            <Component />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    );
  };

  return (
    <section>
      <Routes>
        <Route path="/login" element={<div>login</div>}></Route>
        <Route path="*" element={<div>catchall</div>}></Route>
      </Routes>
    </section>
  );
}

const Navigation = () => (
  <nav>
    <Link to="/">Home</Link> | <Link to="login">Login</Link>
  </nav>
);

export default App;
