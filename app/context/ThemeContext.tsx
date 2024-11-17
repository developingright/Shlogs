"use client"
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
    theme: "light", 
    toggle: () => {} 
});

const getFromLocalStorage = () => {
    if (typeof window !== "undefined") { 
        const value = localStorage.getItem("theme");
        return value || "light";
    }
    return "light"; 
};

import { ReactNode } from "react";

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState(getFromLocalStorage);

    const toggle = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
};
