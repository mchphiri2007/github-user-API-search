import React, { useState } from "react";

export const MainContext = React.createContext();

const MainProvider = ({ children }) => {
  const [usersData, setUsersData]       = useState(null);
  const [apiStatus, setApiStatus]       = useState(true);
  const [reposData, setReposData]       = useState([]);
  const [followersData, setFollowersData] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [searchTerm, setSearchTerm]     = useState("mchphiri2007");
  const [errorMsg, setErrorMsg]         = useState("");

  // FIX: Centralised fetch with proper error handling
  const getData = async (url) => {
    try {
      const res = await fetch(url);
      if (res.ok) {
        setApiStatus(true);
        setErrorMsg("");
        return await res.json();
      } else {
        setApiStatus(false);
        setErrorMsg(res.status === 404 ? "User not found." : "GitHub API error.");
        return null;
      }
    } catch (err) {
      setApiStatus(false);
      setErrorMsg("Network error. Please check your connection.");
      return null;
    }
  };

  const getUserData = async (userUrl) => {
    setLoading(true);
    const data = await getData(userUrl);
    setUsersData(data);
    setLoading(false);
  };

  const getReposData = async (reposUrl) => {
    const data = await getData(reposUrl);
    setReposData(data || []);
  };

  const getFollowersData = async (followersUrl) => {
    const data = await getData(followersUrl);
    setFollowersData(data || []);
  };

  return (
    <MainContext.Provider
      value={{
        loading,
        usersData,
        reposData,
        followersData,
        searchTerm,
        apiStatus,
        errorMsg,
        getUserData,
        getReposData,
        getFollowersData,
        setSearchTerm,
        setLoading,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
