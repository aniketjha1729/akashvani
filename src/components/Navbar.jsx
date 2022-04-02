import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../api";
import { setAuth } from "../store/authSlice";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const classes = useStyles();
  const logout = async () => {
    const { data } = await logoutUser();
    dispatch(setAuth(data));
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/"> AkashVani</Link>
          </Typography>
          {user ? (
            <>
              <Button color="inherit">{user.name}</Button> &nbsp;
              <Button color="inherit" onClick={logout}>
                <MdLogout size="24px" />
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link to="/login"> Login</Link>
              </Button>
              <Button color="inherit">
                <Link to="/register"> SignUp</Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
