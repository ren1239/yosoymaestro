'use client'
import { createContext,  useState, ReactNode, SetStateAction, Dispatch } from "react";

// Define the type for the context value
interface MenuContextType {
    menuIsActive: boolean;
    setMenuIsActive: Dispatch<SetStateAction<boolean>>;
}

// Create the context with the defined type
export const MenuContext = createContext<MenuContextType>({
    menuIsActive: false,
    setMenuIsActive: () => {}
});

// Provider component
export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [menuIsActive, setMenuIsActive] = useState(false);
    const value = { menuIsActive, setMenuIsActive };

    return (
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    );
};

