import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const saveUser = (data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
    };

    const removeUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return <UserContext.Provider value={{ user, saveUser, removeUser }}>{children}</UserContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
