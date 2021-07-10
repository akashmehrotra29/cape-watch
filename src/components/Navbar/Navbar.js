import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import { LogoutModal } from "../";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const [showMenuDrawer, setShowMenuDrawer] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();

  const authHandler = () => {
    user
      ? setShowLogoutModal(true)
      : navigate("/login", { state: { from: pathname } });
  };

  return (
    <div className={`${styles.navOuter}`}>
      {showLogoutModal && (
        <LogoutModal setShowLogoutModal={setShowLogoutModal} />
      )}
      <div className={` ${styles.flexRow} ${styles.widthFull}`}>
        <Link to="/" className={`${styles.logoContainer} ${styles.link}`}>
          <img onClick={()=>{navigate("/")}}
            src="https://res.cloudinary.com/akash29/image/upload/c_scale,h_60,w_60/v1625941960/cape-watch-app-logo_ueq003.png"
            alt="logo"
          />
        </Link>

        <div
          className={`${styles.desktopMenu} ${styles.link} ${styles.widthFull}`}
        >
          <Link className={`${styles.link}`} to="/">
            Videos
          </Link>
          <div className={`${styles.spaceHr}`}></div>
          <Link className={`${styles.link}`} to="/playlists">
            Playlists
          </Link>
          <div className={`${styles.spaceHr}`}></div>

          {user && (
            <div>
              <Link className={`${styles.link}`} to="/account">
                Account
              </Link>
            </div>
          )}

          <div className={`${styles.spaceHr}`}></div>
          <div className={`${styles.link}`} onClick={authHandler}>
            {user ? "Logout" : "Login"}
          </div>
          <div className={`${styles.spaceHr}`}></div>
        </div>

        <div className={`${styles.mobileMenu}`}>
          <button
            onClick={() => setShowMenuDrawer((val) => !val)}
            className={` ${styles.hamburgerIcon}`}
          >
            <span className="material-icons-outlined">menu</span>
          </button>
          <div
            className={`${styles.menuDrawer} ${
              showMenuDrawer && styles.menuDrawerActive
            }`}
            onClick={() => setShowMenuDrawer(false)}
          >
            <ul className={`${styles.flexColumn}`}>
              <li>
                <Link className={`${styles.menuLink}`} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className={`${styles.menuLink}`} to="/playlists">
                  Playlists
                </Link>
              </li>
              <li>
                {user && (
                  <Link className={`${styles.menuLink}`} to="/account">
                    Account
                  </Link>
                )}
              </li>
              <li>
                <div className={`${styles.menuLink}`} onClick={authHandler}>
                  {user ? "Logout" : "Login"}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
