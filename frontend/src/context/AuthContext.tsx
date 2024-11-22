/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";

type User = {
    name: string;
    email: string;
};

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loggedIn, setLoggedIn] = useState(true);

    // Fetch if user cookie is valid
    useEffect(() => {
        // Logic to check for cookie and set user/auth state
    }, []);

    const signup = async (name: string, email: string, password: string) => {};
    const login = async (email: string, password: string) => {};
    const logout = async () => {};

    const value = {
        user,
        isLoggedIn: loggedIn,  // Pass boolean, not state setter
        login,
        logout,
        signup
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth=()=>useContext(AuthContext)
export default AuthProvider;
