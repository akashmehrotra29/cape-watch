import axios from "axios";

export const loginService = (email, password) => {
  return axios.post("https://capewatch.akashmehrotra29.repl.co/users/login", {
    email,
    password,
  });
};

export const signupService = (name, email, password) => {
  return axios.post("https://capewatch.akashmehrotra29.repl.co/users/signup", {
    name,
    email,
    password,
  });
};

export const accountService = (id, name, email, password) => {
  return axios.post("https://capewatch.akashmehrotra29.repl.co/users/account", {
    id,
    name,
    email,
    password,
  });
};
