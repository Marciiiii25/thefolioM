//frontend/src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //Onappload:ifatokenexistsin localStorage, fetch the user's data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/auth/me")
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem("token")) // remove bad token
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);
  //login():callthebackend,savetoken, store user in state
  const login = async (identifier, password) => {
    const lookup = (identifier || "").toString().trim();
    const { data } = await API.post("/auth/login", {
      email: lookup,
      password,
    });
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data.user; //return user so caller can check role
  };
  //logout():cleartokenanduserfrom memory
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
//Customhook—usethisinsteadof useContext(AuthContext) everywhere
export const useAuth = () => useContext(AuthContext);
