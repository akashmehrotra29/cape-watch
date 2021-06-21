import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../contexts";
import styles from "./Signup.module.css";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, createUserWithCredentials } = useAuth();

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/", { replace: true });
  }, []);

  const signupHandler = async (e) => {
    e.preventDefault();
    setSignupStatus("loading");
    const { success, message } = await createUserWithCredentials(
      name,
      email,
      password
    );

    if (success) {
      setSignupStatus("success");
      navigate(state?.from ? state.from : "/", { replace: true });
    } else {
      setSignupStatus("failed");
      setErrorMessage(message);
    }
  };

  return (
    <div>
      <div className={`${styles.container}`}>
        <div className={`${styles.left}`}>
          <div className={`${styles.header}`}>
            <h2 className={`${styles.animation} ${styles.a1}`}>Welcome Back</h2>
            <h4 className={`${styles.animation} ${styles.a2}`}>
              Create a new account and start your journey
            </h4>
          </div>

          <form className={`${styles.from}`} onSubmit={(e) => signupHandler(e)}>
            <input
              type="text"
              className={`${styles.formField} ${styles.animation} ${styles.a3}`}
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              {signupStatus === "loading" ? " Please Wait" : "Signup"}
            </button>
          </form>

          <p className={` ${styles.link} ${styles.animation} ${styles.a5}`}>
            <div onClick={(() => navigate("/login"), { replace: "true" })}>
              Already a menber? Login
            </div>
          </p>

          {signupStatus === "failed" && <div>{errorMessage}</div>}
        </div>
        <div className={`${styles.right}`}></div>
      </div>
    </div>
  );
};
