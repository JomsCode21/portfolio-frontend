import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem('portfolio_token')) return setLoading(false);
    authService
      .me()
      .then((r) => setUser(r.user))
      .catch(() => localStorage.removeItem('portfolio_token'))
      .finally(() => setLoading(false));
  }, []);
  const login = async (credentials) => {
    const r = await authService.login(credentials);
    localStorage.setItem('portfolio_token', r.token);
    setUser(r.user);
  };
  const logout = () => {
    localStorage.removeItem('portfolio_token');
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
  );
}
