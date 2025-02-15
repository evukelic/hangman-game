import { AppBar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router";

import LogoWhiteSvg from "../assets/icons/logo_white.svg";
import { AppDispatch, RootState } from "../redux/store";
import { clearUsername } from "../redux/userActions";
import { RoutePath } from "../utils/enums";
import styles from "./Header.module.css";

const Header = () => {
  const username = useSelector((state: RootState) => state.username);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <AppBar className={styles.container}>
        <Link
          to={RoutePath.HOME}
          onClick={() => dispatch(clearUsername())}
          className={styles.link}
        >
          <img
            src={LogoWhiteSvg}
            alt="White Hangman Logo"
            className={styles.headerIcon}
          />
        </Link>
        {username && (
          <Typography className={styles.user} variant="h4">
            Hi, {username}
          </Typography>
        )}
      </AppBar>

      <Outlet />
    </>
  );
};

export default Header;
