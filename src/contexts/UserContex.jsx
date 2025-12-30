import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
