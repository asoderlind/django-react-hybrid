import { useContext } from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Button } from "@mui/material";
import AuthContext from "../context/AuthContext";

const Sidebar = () => {
  let { decodedAuthToken, logoutUser } = useContext(AuthContext);

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/todo">
          <ListItemText primary="ToDo" />
        </ListItem>
        <ListItem button component={Link} to="/signal">
          <ListItemText primary="SignalPage" />
        </ListItem>
        {decodedAuthToken ? (
          <ListItem button onClick={logoutUser}>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
