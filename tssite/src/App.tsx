import React, { ReactElement } from "react";
import "./App.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
} from "@material-ui/core";
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

  function updateUserInfo(userDetail: User) {
    setUser(userDetail);
    sessionStorage.setItem("user", JSON.stringify(userDetail));
    sessionStorage.setItem("loggedin", "true");
  }

  return (
    <>
      <Navigation user={user} />
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />}></Route>
        {/* Login page */}
        <Route
          path="/login"
          element={<SignIn updateUserInfo={updateUserInfo} />}
        ></Route>
        {/* Logout page */}
        <Route path="/logout" element={<></>}></Route>
        {/* Protected routes */}
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="app" element={<div>app</div>}></Route>
        </Route>
      </Routes>
    </>
  );
}

const LandingPage = () => (
  <Container>
    <Paper elevation={3}>
      <Typography variant="h4">Welcome to My App!</Typography>
      <Typography variant="body1">
        This is a to-do list app where you can...
      </Typography>
    </Paper>
  </Container>
);

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
      <Button color="inherit" component={Link} to="/app">
        app
      </Button>
      <Button color="inherit" component={Link} to="/admin">
        Admin
      </Button>
    </Toolbar>
  </AppBar>
);

export default App;
