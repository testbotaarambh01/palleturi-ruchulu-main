import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ADMIN_SESSION_KEY = 'palleturi-ruchulu-admin-session';
const ADMIN_USERNAME = 'shanmukh4127';
const ADMIN_PASSWORD = 'shanmukh4127';

const AdminAuthContext = createContext(null);

const readJson = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(() => readJson(ADMIN_SESSION_KEY, null));

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminUser));
    } else {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    }
  }, [adminUser]);

  const loginAdmin = ({ username, password }) => {
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return { success: false, message: 'Invalid admin credentials.' };
    }

    const session = { username: ADMIN_USERNAME, role: 'admin' };
    setAdminUser(session);
    return { success: true };
  };

  const logoutAdmin = () => setAdminUser(null);

  const value = useMemo(
    () => ({
      adminUser,
      isAdminAuthenticated: Boolean(adminUser),
      loginAdmin,
      logoutAdmin,
    }),
    [adminUser],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export const useAdminAuth = () => useContext(AdminAuthContext);
