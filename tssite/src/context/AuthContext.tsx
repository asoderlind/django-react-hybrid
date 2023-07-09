import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { AuthToken, TokenResponse } from "../models";

interface ContextProps {
  user: AuthToken | null;
  setUser: (user: AuthToken) => void;
  authTokens: TokenResponse | null;
  setAuthTokens: (data: TokenResponse) => void;
  logoutUser: (e: any) => void;
}

const AuthContext = createContext<Partial<ContextProps>>({});

export default AuthContext;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? (jwtDecode(localStorage.getItem("authTokens") as string) as AuthToken)
      : null
  );
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? (JSON.parse(
          localStorage.getItem("authTokens") as string
        ) as TokenResponse)
      : null
  );

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  let logoutUser = () => {
    localStorage.removeItem("authTokens");
    setAuthTokens(null);
    setUser(null);
    navigate("/login");
  };

  const updateToken = async () => {
    const apiUrl = "http://127.0.0.1:8000";
    try {
      const response = await fetch(`${apiUrl}/api/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: authTokens?.refresh }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong while refreshing the token!");
      }

      const data = await response.json();
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } catch (error) {
      console.error(error);
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    const REFRESH_INTERVAL = 1000 * 60 * 4; // 4 minutes
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authTokens,
        setAuthTokens,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
