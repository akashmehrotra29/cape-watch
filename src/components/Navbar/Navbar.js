import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const [showMenuDrawer, setShowMenuDrawer] = useState(false);

  return (
    <div className={`${styles.navOuter}`}>
      <div className={` ${styles.flexRow} ${styles.widthFull}`}>
        <Link to="/" className={`${styles.logoContainer} ${styles.link}`}>
          <span className={styles.logoText}>Home</span>
        </Link>

        <div
          className={`${styles.desktopMenu} ${styles.link} ${styles.widthFull}`}
        >
          <Link className={`${styles.link}`} to="/">
            Home
          </Link>
          <div className={`${styles.spaceHr}`}></div>
          <Link className={`${styles.link}`} to="/playlists">
            Playlists
          </Link>
          <div className={`${styles.spaceHr}`}></div>
          <Link className={`${styles.link}`} to="/account">
            Account
          </Link>
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
                <Link className={`${styles.menuLink}`} to="/account">
                  Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
