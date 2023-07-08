import React, { ReactElement } from "react";
import "./App.css";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
} from "react-router-dom";
import { User } from "./models";

import SignIn from "./components/LoginView";

interface NavProps {
  user: User | null;
}

function App() {
  return (
    <Router>
      <AppEntry />
    </Router>
  );
}

const ProtectedRoute = ({ user, redirectPath = "/login", children }: any) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

function AppEntry() {
  const [user, setUser] = React.useState<User | null>(null);
  console.log(JSON.parse(sessionStorage.getItem("user") || "{}"));

  const handleLogin = () => setUser({ id: 1, username: "robin" });
  const handleLogout = () => setUser(null);

  function updateUserInfo(userDetail: User) {
    setUser(userDetail);
    sessionStorage.setItem("user", JSON.stringify(userDetail));
    sessionStorage.setItem("loggedin", "true");
  }

  // A wrapper for <Route> that redirects to the login
  // screen if you're not yet authenticated.

  return (
    <>
      <Navigation user={user} />
      <Routes>
        <Route
          path="/login"
          element={<SignIn updateUserInfo={updateUserInfo} />}
        ></Route>
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="analytics" element={<div>analytics</div>}></Route>
          <Route path="admin" element={<div>admin</div>}></Route>
        </Route>
        <Route
          path="*"
          element={
            <div>
              <h2>Test</h2>
              <div>catchall</div>
            </div>
          }
        ></Route>
      </Routes>
    </>
  );
}

const Navigation = ({ user }: NavProps) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        MyApp
      </Typography>
      <Button color="inherit" component={Link} to="/">
        Home
      </Button>
      {user ? (
        <Button color="inherit" component={Link} to="/logout">
          Logout
        </Button>
      ) : (
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
      )}
      <Button color="inherit" component={Link} to="/admin">
        Admin
      </Button>
    </Toolbar>
  </AppBar>
);

export default App;
