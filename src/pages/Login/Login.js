import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth-context";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("loggedin");
  const [errorMessage, setErrorMessage] = useState("");

  const { user, loginUserWithCredentials } = useAuth();

  const navigate = useNavigate();
  const { state } = useLocation();

  const loginHandler = async (event) => {
    event.preventDefault();
    setLoginStatus("loading");
    const { success, message } = await loginUserWithCredentials(
      email,
      password
    );

    if (success) {
      setLoginStatus("success");
      navigate(state?.from ? state.from : "/", { replace: true });
    } else {
      setErrorMessage(message);
      setLoginStatus("failed");
    }
  };

  useEffect(() => {
    user && navigate("/", { replace: true });
  }, []);

  return (
    <div>
      <div className={`${styles.container}`}>
        <div className={`${styles.left}`}>
          <div className={`${styles.header}`}>
            <h2 className={`${styles.animation} ${styles.a1}`}>Welcome Back</h2>
            <h4 className={`${styles.animation} ${styles.a2}`}>
              Log in to your account using email and password
            </h4>
          </div>
          <form className={`${styles.from}`} onSubmit={(e) => loginHandler(e)}>
            <input
              type="email"
              className={`${styles.formField} ${styles.animation} ${styles.a3}`}
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className={`${styles.formField} ${styles.animation} ${styles.a4}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p></p>
            <button
              className={`${styles.animation} ${styles.a6}`}
              type="submit"
            >
              {loginStatus === "loading" ? " Please Wait" : "Login"}
            </button>
          </form>
          <p className={` ${styles.link} ${styles.animation} ${styles.a5}`}>
            <div onClick={() => navigate("/signup", { replace: "true" })}>
              Not a member? Create account
            </div>
          </p>
          {loginStatus === "failed" && <div>{errorMessage}</div>}
        </div>
        <div className={`${styles.right}`}></div>
      </div>
    </div>
  );
};
