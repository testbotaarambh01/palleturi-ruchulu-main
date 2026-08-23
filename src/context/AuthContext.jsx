import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const USERS_KEY = 'palleturi-ruchulu-users';
const SESSION_KEY = 'palleturi-ruchulu-session';
const REMEMBERED_EMAIL_KEY = 'palleturi-ruchulu-remembered-email';

const AuthContext = createContext(null);

const readJson = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const normalizeEmail = (email) => email.trim().toLowerCase();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readJson(SESSION_KEY, null));

  useEffect(() => {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [user]);

  const signup = ({ fullName, email, password }) => {
    const users = readJson(USERS_KEY, []);
    const cleanEmail = normalizeEmail(email);

    if (users.some((existingUser) => existingUser.email === cleanEmail)) {
      return { success: false, message: 'An account already exists with this email.' };
    }

    const newUser = {
      id: crypto.randomUUID(),
      fullName: fullName.trim(),
      email: cleanEmail,
      password,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    setUser({ id: newUser.id, fullName: newUser.fullName, email: newUser.email });
    return { success: true };
  };

  const login = ({ email, password, remember }) => {
    const cleanEmail = normalizeEmail(email);
    const users = readJson(USERS_KEY, []);
    const foundUser = users.find((existingUser) => existingUser.email === cleanEmail);

    if (!foundUser || foundUser.password !== password) {
      return { success: false, message: 'Email or password is incorrect.' };
    }

    if (remember) {
      localStorage.setItem(REMEMBERED_EMAIL_KEY, cleanEmail);
    } else {
      localStorage.removeItem(REMEMBERED_EMAIL_KEY);
    }

    setUser({ id: foundUser.id, fullName: foundUser.fullName, email: foundUser.email });
    return { success: true };
  };

  const logout = () => setUser(null);

  const canResetPassword = (email) => {
    const cleanEmail = normalizeEmail(email);
    const users = readJson(USERS_KEY, []);
    return users.some((existingUser) => existingUser.email === cleanEmail);
  };

  const rememberedEmail = () => localStorage.getItem(REMEMBERED_EMAIL_KEY) || '';

  const value = useMemo(
    () => ({
      canResetPassword,
      isAuthenticated: Boolean(user),
      login,
      logout,
      rememberedEmail,
      signup,
      user,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
