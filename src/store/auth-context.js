import React, {
  useState,
  useEffect,
  useCallback,
} from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  roles: [],
  isLggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(
    expirationTime
  ).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem(
    "expirationDateTime"
  );
  const roles = JSON.parse(localStorage.getItem("roles"));

  const remainingTime = calculateRemainingTime(
    storedExpirationDate
  );

  if (remainingTime <= 0) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDateTime");
    localStorage.removeItem("roles");
    return null;
  }

  return {
    token: storedToken,
    remainingTime: remainingTime,
    roles: roles,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken,
    initialRoles = [];

  if (tokenData) {
    initialToken = tokenData.token;
    initialRoles = tokenData.roles;
  }
  const [token, setToken] = useState(initialToken);
  const [roles, setRoles] = useState(initialRoles);

  const userLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setRoles([]);
    localStorage.removeItem("token");
    localStorage.removeItem("roles");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (data, expirationTime) => {
    const { accessToken, roles } = data;
    localStorage.setItem("token", accessToken);
    localStorage.setItem(
      "expirationDateTime",
      expirationTime
    );
    localStorage.setItem("roles", JSON.stringify(roles));

    setToken(accessToken);
    setRoles(roles);

    const remainingTime = calculateRemainingTime(
      expirationTime
    );

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(
        logoutHandler,
        tokenData.remainingTime
      );
    }
  }, [tokenData, logoutHandler]);
  const contextValue = {
    token: token,
    roles: roles,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
